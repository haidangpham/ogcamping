"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tent,
  Calendar,
  Package,
  Users,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  ShoppingCart,
  MessageCircle,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [userRole] = useState("customer") // This would come from auth context

  const stats = {
    customer: [
      { title: "Chuyến đi đã đặt", value: "12", icon: Calendar, color: "text-blue-600" },
      { title: "Thiết bị đã thuê", value: "28", icon: Package, color: "text-green-600" },
      { title: "Điểm tích lũy", value: "2,450", icon: Star, color: "text-yellow-600" },
      { title: "Đánh giá trung bình", value: "4.8", icon: TrendingUp, color: "text-purple-600" },
    ],
    admin: [
      { title: "Tổng khách hàng", value: "1,234", icon: Users, color: "text-blue-600" },
      { title: "Đơn hàng tháng này", value: "89", icon: ShoppingCart, color: "text-green-600" },
      { title: "Doanh thu tháng", value: "245M", icon: TrendingUp, color: "text-yellow-600" },
      { title: "Đánh giá trung bình", value: "4.7", icon: Star, color: "text-purple-600" },
    ],
  }

  const recentBookings = [
    {
      id: 1,
      service: "Cắm trại núi Sapa",
      date: "15/12/2024",
      status: "confirmed",
      amount: "2.500.000đ",
    },
    {
      id: 2,
      service: "Thuê lều 4 người",
      date: "10/12/2024",
      status: "completed",
      amount: "450.000đ",
    },
    {
      id: 3,
      service: "Cắm trại biển Phú Quốc",
      date: "05/12/2024",
      status: "pending",
      amount: "1.800.000đ",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Đã xác nhận</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Hoàn thành</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ xử lý</Badge>
      default:
        return <Badge variant="secondary">Không xác định</Badge>
    }
  }

  const currentStats = userRole === "admin" ? stats.admin : stats.customer

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2">
            <Tent className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">OG Camping</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/user-avatar.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại, John Doe!</h1>
          <p className="text-gray-600">
            {userRole === "admin"
              ? "Quản lý hệ thống OG Camping của bạn"
              : "Quản lý các chuyến cắm trại và thiết bị của bạn"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full lg:w-auto grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="bookings">Đặt chỗ</TabsTrigger>
            <TabsTrigger value="equipment">Thiết bị</TabsTrigger>
            <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Đặt chỗ gần đây</CardTitle>
                  <CardDescription>Các đơn đặt dịch vụ và thiết bị mới nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{booking.service}</h4>
                          <p className="text-sm text-gray-600">{booking.date}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(booking.status)}
                          <p className="text-sm font-medium mt-1">{booking.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Xem tất cả
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                  <CardDescription>Các tính năng thường sử dụng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <Link href="/services">
                      <Calendar className="w-4 h-4 mr-2" />
                      Đặt dịch vụ mới
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/equipment">
                      <Package className="w-4 h-4 mr-2" />
                      Thuê thiết bị
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/ai-consultant">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Tư vấn AI
                    </Link>
                  </Button>
                  {userRole === "admin" && (
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Xem báo cáo
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  Gợi ý từ AI
                </CardTitle>
                <CardDescription>Dựa trên lịch sử và sở thích của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-green-50">
                    <h4 className="font-medium text-green-800 mb-2">Gói được đề xuất</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Cắm trại rừng Cát Tiên - phù hợp với sở thích khám phá thiên nhiên của bạn
                    </p>
                    <Button size="sm" variant="outline">
                      Xem chi tiết
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h4 className="font-medium text-blue-800 mb-2">Thiết bị nên thuê</h4>
                    <p className="text-sm text-blue-700 mb-3">Túi ngủ cao cấp - thích hợp cho chuyến đi núi sắp tới</p>
                    <Button size="sm" variant="outline">
                      Thuê ngay
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử đặt chỗ</CardTitle>
                <CardDescription>Quản lý tất cả các đơn đặt dịch vụ và thiết bị</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Tính năng đang được phát triển...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment">
            <Card>
              <CardHeader>
                <CardTitle>Thiết bị đã thuê</CardTitle>
                <CardDescription>Theo dõi tình trạng thiết bị và lịch trả</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Tính năng đang được phát triển...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>Cập nhật thông tin tài khoản và cài đặt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Tính năng đang được phát triển...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
