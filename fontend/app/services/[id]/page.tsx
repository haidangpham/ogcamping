"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Star, Clock, Shield, Utensils, Tent, Camera, ArrowLeft, Settings } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getServiceById } from "@/app/api/serviceApi"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
interface ServiceResponseDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  minDays: number;
  maxDays: number;
  minCapacity: number;
  maxCapacity: number;
  availableSlots: number;
  duration: string;
  capacity: string;
  tag: { id: number; name: string };
  averageRating: number;
  totalReviews: number;
  imageUrl: string;
  highlights: string[];
  included: string[];
  itinerary: ItineraryDTO[];
}
interface ItineraryDTO {
  day: string;
  title: string;
  activities: string[];
}


export default function ServiceDetailPage() {
  const params = useParams<{ id: string }>(); // type-safe params
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPeople, setSelectedPeople] = useState(4);
  const [service, setService] = useState<ServiceResponseDTO | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ email: string; name: string; role: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (params?.id) {
      getServiceById(Number(params.id)).then(setService).catch(console.error);
    }
  }, [params?.id]);

  const today = new Date().toISOString().split("T")[0];
  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUser(null)
  }
  // Handle dashboard navigation based on role
  const handleDashboardNavigation = () => {
    if (user?.role === 'ADMIN') {
      router.push('/admin')
    } else if (user?.role === 'STAFF') {
      router.push('/staff')
    } else {
      router.push('/dashboard')
    }
  }
  if (!service) {
    return <p className="p-6">Đang tải dữ liệu dịch vụ...</p>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Tent className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">OG Camping</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/services" className="text-green-600 font-medium">
              Dịch vụ
            </Link>
            <Link href="/equipment" className="text-gray-600 hover:text-green-600 transition-colors">
              Thuê thiết bị
            </Link>
            <Link href="/ai-consultant" className="text-gray-600 hover:text-green-600 transition-colors">
              Tư vấn AI
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
              Về chúng tôi
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
              Liên hệ
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <span className="text-gray-800 font-medium">{user?.name}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5 text-gray-800" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleDashboardNavigation}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Đăng nhập</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Đăng ký</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/services" className="flex items-center gap-2 text-gray-600 hover:text-green-600">
            <ArrowLeft className="w-4 h-4" />
            Quay lại dịch vụ
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="h-64 md:h-80 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {service.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {service.capacity}
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white">{service.availableSlots}</Badge>
              </div>
            </div>

            {/* Service Details */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="itinerary">Lịch trình</TabsTrigger>
                <TabsTrigger value="included">Bao gồm</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Mô tả dịch vụ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">{service.description}</p>

                    <div>
                      <h3 className="font-semibold mb-3">Điểm nổi bật</h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        {service.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 p-4 bg-green-50 rounded-lg">
                      <div className="text-center">
                        <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-medium">An toàn</h4>
                        <p className="text-sm text-gray-600">Bảo hiểm đầy đủ</p>
                      </div>
                      <div className="text-center">
                        <Utensils className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-medium">Ẩm thực</h4>
                        <p className="text-sm text-gray-600">Món địa phương</p>
                      </div>
                      <div className="text-center">
                        <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-medium">Nhiếp ảnh</h4>
                        <p className="text-sm text-gray-600">Hỗ trợ chụp ảnh</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="itinerary">
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch trình chi tiết</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {service.itinerary.map((day, index) => (
                        <div key={index} className="border-l-4 border-green-500 pl-4">
                          <h3 className="font-semibold text-lg text-green-700">{day.day}</h3>
                          <h4 className="font-medium mb-3">{day.title}</h4>
                          <div className="space-y-2">
                            {day.activities.map((activity, actIndex) => (
                              <div key={actIndex} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">{activity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="included">
                <Card>
                  <CardHeader>
                    <CardTitle>Dịch vụ bao gồm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.included.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Đánh giá từ khách hàng</CardTitle>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{service.rating}</span>
                        <span className="text-gray-500">({service.reviews.length} đánh giá)</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {service.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{review.user}</h4>
                                <div className="flex items-center gap-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Đặt dịch vụ</span>
                  <Badge variant="secondary">{service.availableSlots}</Badge>
                </CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold text-green-600">{service.price.toLocaleString("vi-VN")}đ</span>
                  <span className="text-gray-500">/gói</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ngày khởi hành</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Số người tham gia</label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={selectedPeople}
                    onChange={(e) => setSelectedPeople(Number(e.target.value))}
                  >
                    <option value={2}>2 người</option>
                    <option value={3}>3 người</option>
                    <option value={4}>4 người</option>
                    <option value={5}>5 người</option>
                    <option value={6}>6 người</option>
                  </select>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Giá gói:</span>
                    <span>{service.price.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Phụ thu ({selectedPeople > 4 ? selectedPeople - 4 : 0} người):</span>
                    <span>{selectedPeople > 4 ? ((selectedPeople - 4) * 200000).toLocaleString("vi-VN") : 0}đ</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-green-600">
                      {(service.price + (selectedPeople > 4 ? (selectedPeople - 4) * 200000 : 0)).toLocaleString(
                        "vi-VN",
                      )}
                      đ
                    </span>
                  </div>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link href={`/booking/${service.id}?date=${selectedDate}&people=${selectedPeople}`}>Đặt ngay</Link>
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/ai-consultant">Tư vấn với AI</Link>
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <p>✓ Miễn phí hủy trong 24h</p>
                  <p>✓ Hỗ trợ 24/7</p>
                  <p>✓ Bảo hiểm du lịch</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
