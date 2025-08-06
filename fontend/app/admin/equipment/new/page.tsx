'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tent, Image as ImageIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { fetchUser, submitEquipment } from '@/app/api/admin';

interface EquipmentFormData {
  name: string;
  category: string;
  area: string;
  description: string;
  quantity_in_stock: number;
  image: File | null;
  available: number;
  price_per_day: number;
  status: 'available' | 'out_of_stock';
}

interface User {
  _id: string;
  role: string | string[];
  name?: string;
  email?: string;
  avatar?: string;
}

export default function NewEquipmentPage() {
  const [formData, setFormData] = useState<EquipmentFormData>({
    name: '',
    category: '',
    area: '',
    description: '',
    quantity_in_stock: 0,
    image: null,
    available: 0,
    price_per_day: 0,
    status: 'available',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  // Check storage availability
  const isStorageAvailable = (): boolean => {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.error('localStorage is unavailable:', e);
      return false;
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!isStorageAvailable()) {
          setError('Browser storage is disabled. Please enable localStorage to continue.');
          router.push('/login');
          return;
        }

        // Get token and userId from localStorage
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          console.warn('Missing authToken or userId in localStorage');
          setError('Authentication token or user ID not found. Please log in.');
          router.push('/login');
          return;
        }

        // Check if user data is stored in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const parsedUser: User = JSON.parse(storedUser);
            const userRole = Array.isArray(parsedUser.role)
              ? parsedUser.role[0]?.toUpperCase()
              : typeof parsedUser.role === 'string'
              ? parsedUser.role.toUpperCase()
              : undefined;

            if (userRole === 'ADMIN') {
              console.log('User loaded from localStorage:', parsedUser);
              setUser(parsedUser);
              setIsLoading(false);
              return;
            }
          } catch (parseError) {
            console.error('Failed to parse stored user data:', parseError);
            localStorage.removeItem('user');
          }
        }

        // Fetch user data from API
        console.log('Fetching user data for userId:', userId);
        const userData = await fetchUser(token, Number(userId));
        const userRole = Array.isArray(userData.role)
          ? userData.role[0]?.toUpperCase()
          : typeof userData.role === 'string'
          ? userData.role.toUpperCase()
          : undefined;

        if (!userRole || userRole !== 'ADMIN') {
          console.warn('User is not an admin or role is invalid:', userData.role);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('user');
          setError('Unauthorized access. Admin role required.');
          router.push('/login');
          return;
        }

        // Store user data in localStorage
        console.log('Storing user data in localStorage:', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } catch (err: any) {
        console.error('Error loading user:', {
          status: err.status,
          message: err.message,
          data: err.data,
          stack: err.stack,
        });
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('user');
          setError('Session expired or unauthorized. Please log in again.');
          router.push('/login');
        } else {
          setError(err.message || 'Failed to load user data. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setSubmitError('Please select a JPEG or PNG file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('File size must not exceed 5MB.');
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (formData.available > formData.quantity_in_stock) {
      setSubmitError('Available quantity cannot exceed stock quantity.');
      return;
    }

    if (!formData.image) {
      setSubmitError('Please select an image.');
      return;
    }

    if (!formData.area) {
      setSubmitError('Please select an area.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.warn('No authToken found during form submission');
        setSubmitError('Authentication token not found. Please log in.');
        router.push('/login');
        return;
      }

      console.log('Submitting equipment with data:', formData);
      await submitEquipment(token, formData);
      router.push('/admin?tab=equipment');
    } catch (err: any) {
      console.error('Error submitting equipment:', {
        status: err.status,
        message: err.message,
        data: err.data,
        stack: err.stack,
      });
      setSubmitError(err.message || 'Failed to add equipment. Please try again.');
    }
  };

  const handleInputChange = (field: keyof EquipmentFormData, value: string | number | File) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Unable to authenticate user. Please log in again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Tent className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">OG Camping Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <Avatar>
                <AvatarImage src={user.avatar ?? '/admin-avatar.png'} />
                <AvatarFallback>{user.name?.[0] ?? 'AD'}</AvatarFallback>
              </Avatar>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => router.push('/admin?tab=equipment')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Equipment</h1>
          <p className="text-gray-600">Enter equipment details to add to inventory</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4">{error}</div>
        )}
        {submitError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4">{submitError}</div>
        )}

        <Card className="border-0 shadow-lg max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Equipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Equipment Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., 4-Person Tent"
                  className="border-gray-300 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tent">Tent</SelectItem>
                    <SelectItem value="Sleeping Bag">Sleeping Bag</SelectItem>
                    <SelectItem value="Air Mattress">Air Mattress</SelectItem>
                    <SelectItem value="Folding Table">Folding Table</SelectItem>
                    <SelectItem value="Folding Chair">Folding Chair</SelectItem>
                    <SelectItem value="Stove">Stove</SelectItem>
                    <SelectItem value="Lantern">Lantern</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="area">Area *</Label>
                <Select
                  value={formData.area}
                  onValueChange={(value) => handleInputChange('area', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inside Tent">Inside Tent</SelectItem>
                    <SelectItem value="Outside Tent">Outside Tent</SelectItem>
                    <SelectItem value="Kitchen">Kitchen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of the equipment"
                  className="border-gray-300 focus:border-green-500"
                />
              </div>

              <div>
                <Label htmlFor="image">Image *</Label>
                <div className="relative">
                  <Input
                    id="image"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                    className="border-gray-300 focus:border-green-500"
                    required
                  />
                  <ImageIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Image Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="mt-2 h-32 w-auto rounded-md border border-gray-300"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="price_per_day">Rental Price (VND/day) *</Label>
                <Input
                  id="price_per_day"
                  type="number"
                  value={formData.price_per_day}
                  onChange={(e) => handleInputChange('price_per_day', Number(e.target.value))}
                  placeholder="e.g., 100000"
                  className="border-gray-300 focus:border-green-500"
                  min="0"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity_in_stock">Stock Quantity *</Label>
                  <Input
                    id="quantity_in_stock"
                    type="number"
                    value={formData.quantity_in_stock}
                    onChange={(e) => handleInputChange('quantity_in_stock', Number(e.target.value))}
                    placeholder="e.g., 10"
                    className="border-gray-300 focus:border-green-500"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="available">Available Quantity *</Label>
                  <Input
                    id="available"
                    type="number"
                    value={formData.available}
                    onChange={(e) => handleInputChange('available', Number(e.target.value))}
                    placeholder="e.g., 5"
                    className="border-gray-300 focus:border-green-500"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    handleInputChange('status', value as 'available' | 'out_of_stock')
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">In Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0"
                >
                  Add Equipment
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => router.push('/admin?tab=equipment')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}