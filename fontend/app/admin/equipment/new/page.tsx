'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tent, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface EquipmentFormData {
  name: string;
  category: string;
  description: string;
  quantity_in_stock: number;
  image: File | null;
  available: number;
  price_per_day: number;
  status: 'available' | 'out_of_stock';
}

interface User {
  _id: string;
  role: string;
}

export default function NewEquipmentPage() {
  const [formData, setFormData] = useState<EquipmentFormData>({
    name: '',
    category: '',
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

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const userResponse = await axios.get('http://localhost:8080/users/me');
        if (userResponse.data.role !== 'admin') {
          router.push('/login');
          return;
        }
        setUser(userResponse.data);
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('user');
          router.push('/login');
        } else {
          setError(err.response?.data?.error || 'Lỗi khi tải dữ liệu');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setSubmitError('Vui lòng chọn file JPEG hoặc PNG');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('Kích thước file không được vượt quá 5MB');
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
      setSubmitError('Số lượng có sẵn không thể lớn hơn số lượng tồn kho');
      return;
    }

    if (!formData.image) {
      setSubmitError('Vui lòng chọn một hình ảnh');
      return;
    }

    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      if (formData.description) formDataToSend.append('description', formData.description);
      formDataToSend.append('quantity_in_stock', formData.quantity_in_stock.toString());
      formDataToSend.append('available', formData.available.toString());
      formDataToSend.append('price_per_day', formData.price_per_day.toString());
      formDataToSend.append('status', formData.status);
      if (formData.image) formDataToSend.append('image', formData.image);

      await axios.post('http://localhost:8080/gears', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/admin/dashboard?tab=equipment');
    } catch (err: any) {
      setSubmitError(err.response?.data?.error || 'Lỗi khi thêm thiết bị');
    }
  };

  const handleInputChange = (field: keyof EquipmentFormData, value: string | number | File) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  if (!user) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Tent className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">OG Camping Admin</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => router.push('/admin')}
          >
            Quay lại Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm Thiết Bị Mới</h1>
          <p className="text-gray-600">Nhập thông tin thiết bị để thêm vào kho</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4">{error}</div>
        )}
        {submitError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4">{submitError}</div>
        )}

        {/* Form */}
        <Card className="border-0 shadow-lg max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Thông Tin Thiết Bị</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Tên thiết bị *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ví dụ: Lều 4 người"
                  className="border-gray-300 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Danh mục *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lều">Lều</SelectItem>
                    <SelectItem value="Túi ngủ">Túi ngủ</SelectItem>
                    <SelectItem value="Bếp">Bếp</SelectItem>
                    <SelectItem value="Ghế">Ghế</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Mô tả chi tiết về thiết bị"
                  className="border-gray-300 focus:border-green-500"
                />
              </div>

              <div>
                <Label htmlFor="image">Hình ảnh *</Label>
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
                    <p className="text-sm text-gray-600">Xem trước hình ảnh:</p>
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="mt-2 h-32 w-auto rounded-md border border-gray-300"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="price_per_day">Giá thuê (VND/ngày) *</Label>
                <Input
                  id="price_per_day"
                  type="number"
                  value={formData.price_per_day}
                  onChange={(e) => handleInputChange('price_per_day', Number(e.target.value))}
                  placeholder="Ví dụ: 100000"
                  className="border-gray-300 focus:border-green-500"
                  min="0"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity_in_stock">Số lượng tồn kho *</Label>
                  <Input
                    id="quantity_in_stock"
                    type="number"
                    value={formData.quantity_in_stock}
                    onChange={(e) => handleInputChange('quantity_in_stock', Number(e.target.value))}
                    placeholder="Ví dụ: 10"
                    className="border-gray-300 focus:border-green-500"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="available">Số lượng có sẵn *</Label>
                  <Input
                    id="available"
                    type="number"
                    value={formData.available}
                    onChange={(e) => handleInputChange('available', Number(e.target.value))}
                    placeholder="Ví dụ: 5"
                    className="border-gray-300 focus:border-green-500"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Trạng thái *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    handleInputChange('status', value as 'available' | 'out_of_stock')
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Còn hàng</SelectItem>
                    <SelectItem value="out_of_stock">Hết hàng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0"
                >
                  Thêm thiết bị
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => router.push('/admin?tab=equipment')}
                >
                  Hủy
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
