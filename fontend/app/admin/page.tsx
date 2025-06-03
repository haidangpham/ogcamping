"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tent,
  Users,
  ShoppingCart,
  Star,
  Package,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  MessageCircle,
  AlertTriangle,
  UserPlus,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [isCreateStaffOpen, setIsCreateStaffOpen] = useState(false)
  const [staffFormData, setStaffFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "staff",
    department: "",
  })

  // Mock data
  const stats = [
    { title: "Tổng khách hàng", value: "1,234", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Đơn hàng tháng này", value: "89", change: "+8%", icon: ShoppingCart, color: "text-green-600" },
    { title: "Doanh thu tháng", value: "245M", change: "+15%", icon: DollarSign, color: "text-yellow-600" },
    { title: "Đánh giá TB", value: "4.7", change: "+0.2", icon: Star, color: "text-purple-600" },
  ]

  const recentBookings = [
    {
      id: "OGC001",
      customer: "Nguyễn Văn A",
      service: "Cắm trại Sapa",
      date: "15/12/2024",
      amount: "2.500.000đ",
      status: "confirmed",
    },
    {
      id: "OGC002",
      customer: "Trần Thị B",
      service: "Thuê lều 4 người",
      date: "14/12/2024",
      amount: "450.000đ",
      status: "completed",
    },
    {
      id: "OGC003",
      customer: "Lê Văn C",
      service: "Cắm trại Phú Quốc",
      date: "13/12/2024",
      amount: "1.800.000đ",
      status: "pending",
    },
    {
      id: "OGC004",
      customer: "Phạm Thị D",
      service: "Cắm trại Đà Lạt",
      date: "12/12/2024",
      amount: "3.200.000đ",
      status: "cancelled",
    },
  ]

  const staff = [
    {
      id: 1,
      name: "Nguyễn Văn E",
      email: "nvane@ogcamping.vn",
      phone: "0123456789",
      role: "staff",
      department: "Hướng dẫn viên",
      joinDate: "15/10/2024",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị F",
      email: "tthif@ogcamping.vn",
      phone: "0987654321",
      role: "staff",
      department: "Kho thiết bị",
      joinDate: "20/09/2024",
      status: "active",
    },
    {
      id: 3,
      name: "Lê Văn G",
      email: "lvang@ogcamping.vn",
      phone: "0456789123",
      role: "manager",
      department: "Quản lý tour",
      joinDate: "05/08/2024",
      status: "active",
    },
  ]

  const services = [
    {
      id: 1,
      name: "Cắm trại núi Sapa",
      location: "Sapa",
      price: "2.500.000đ",
      bookings: 45,
      rating: 4.8,
      status: "active",
    },
    {
      id: 2,
      name: "Cắm trại biển Phú Quốc",
      location: "Phú Quốc",
      price: "1.800.000đ",
      bookings: 32,
      rating: 4.9,
      status: "active",
    },
    {
      id: 3,
      name: "Cắm trại gia đình Đà Lạt",
      location: "Đà Lạt",
      price: "3.200.000đ",
      bookings: 28,
      rating: 4.7,
      status: "active",
    },
    {
      id: 4,
      name: "Cắm trại rừng Cát Tiên",
      location: "Đồng Nai",
      price: "2.800.000đ",
      bookings: 15,
      rating: 4.6,
      status: "inactive",
    },
  ]

  const equipment = [
    {
      id: 1,
      name: "Lều cắm trại 4 người",
      category: "Lều",
      price: "150.000đ/ngày",
      available: 12,
      total: 15,
      status: "available",
    },
    {
      id: 2,
      name: "Bếp gas mini",
      category: "Nấu ăn",
      price: "80.000đ/ngày",
      available: 8,
      total: 10,
      status: "available",
    },
    {
      id: 3,
      name: "Đèn pin LED",
      category: "Chiếu sáng",
      price: "50.000đ/ngày",
      available: 20,
      total: 25,
      status: "available",
    },
    {
      id: 4,
      name: "Túi ngủ cao cấp",
      category: "Ngủ nghỉ",
      price: "120.000đ/ngày",
      available: 0,
      total: 8,
      status: "out_of_stock",
    },
  ]

  const customers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      bookings: 5,
      spent: "12.500.000đ",
      joined: "15/10/2024",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      bookings: 3,
      spent: "8.200.000đ",
      joined: "20/09/2024",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0456789123",
      bookings: 7,
      spent: "18.900.000đ",
      joined: "05/08/2024",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 border-0">Đã xác nhận</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Hoàn thành</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Chờ xử lý</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-0">Đã hủy</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-0">Hoạt động</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 border-0">Tạm dừng</Badge>
      case "available":
        return <Badge className="bg-green-100 text-green-800 border-0">Còn hàng</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800 border-0">Hết hàng</Badge>
      default:
        return (
          <Badge variant="secondary" className="border-0">
            Không xác định
          </Badge>
        )
    }
  }

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating staff:", staffFormData)
    setIsCreateStaffOpen(false)
    setStaffFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "staff",
      department: "",
    })
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

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/admin-avatar.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Quản trị</h1>
          <p className="text-gray-600">Quản lý hệ thống OG Camping</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} so với tháng trước</p>
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
          <TabsList className="grid w-full lg:w-auto grid-cols-6 bg-gray-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
              Đơn hàng
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
              Dịch vụ
            </TabsTrigger>
            <TabsTrigger value="equipment" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
              Thiết bị
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
              Khách hàng
            </TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
              Nhân viên
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Đơn hàng gần đây</CardTitle>
                  <CardDescription>Các đơn đặt dịch vụ mới nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.slice(0, 4).map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-3 border rounded-lg border-gray-200"
                      >
                        <div>
                          <h4 className="font-medium">{booking.customer}</h4>
                          <p className="text-sm text-gray-600">{booking.service}</p>
                          <p className="text-xs text-gray-500">{booking.date}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(booking.status)}
                          <p className="text-sm font-medium mt-1">{booking.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50">
                    Xem tất cả đơn hàng
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                  <CardDescription>Các tính năng quản lý thường dùng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white border-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm dịch vụ mới
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Quản lý kho thiết bị
                  </Button>
                  <Dialog open={isCreateStaffOpen} onOpenChange={setIsCreateStaffOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Thêm nhân viên
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border-0">
                      <DialogHeader>
                        <DialogTitle>Tạo tài khoản nhân viên</DialogTitle>
                        <DialogDescription>Điền thông tin để tạo tài khoản nhân viên mới</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCreateStaff} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="staffName">Họ và tên *</Label>
                            <Input
                              id="staffName"
                              value={staffFormData.fullName}
                              onChange={(e) => setStaffFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                              placeholder="Nguyễn Văn A"
                              className="border-gray-300 focus:border-green-500"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="staffEmail">Email *</Label>
                            <Input
                              id="staffEmail"
                              type="email"
                              value={staffFormData.email}
                              onChange={(e) => setStaffFormData((prev) => ({ ...prev, email: e.target.value }))}
                              placeholder="email@ogcamping.vn"
                              className="border-gray-300 focus:border-green-500"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="staffPhone">Số điện thoại *</Label>
                            <Input
                              id="staffPhone"
                              value={staffFormData.phone}
                              onChange={(e) => setStaffFormData((prev) => ({ ...prev, phone: e.target.value }))}
                              placeholder="0123456789"
                              className="border-gray-300 focus:border-green-500"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="staffRole">Vai trò *</Label>
                            <Select
                              value={staffFormData.role}
                              onValueChange={(value) => setStaffFormData((prev) => ({ ...prev, role: value }))}
                            >
                              <SelectTrigger className="border-gray-300 focus:border-green-500">
                                <SelectValue placeholder="Chọn vai trò" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="staff">Nhân viên</SelectItem>
                                <SelectItem value="manager">Quản lý</SelectItem>
                                <SelectItem value="guide">Hướng dẫn viên</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="staffDepartment">Bộ phận</Label>
                          <Select
                            value={staffFormData.department}
                            onValueChange={(value) => setStaffFormData((prev) => ({ ...prev, department: value }))}
                          >
                            <SelectTrigger className="border-gray-300 focus:border-green-500">
                              <SelectValue placeholder="Chọn bộ phận" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="guide">Hướng dẫn viên</SelectItem>
                              <SelectItem value="equipment">Kho thiết bị</SelectItem>
                              <SelectItem value="tour">Quản lý tour</SelectItem>
                              <SelectItem value="customer">Chăm sóc khách hàng</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="staffPassword">Mật khẩu tạm thời *</Label>
                          <Input
                            id="staffPassword"
                            type="password"
                            value={staffFormData.password}
                            onChange={(e) => setStaffFormData((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="••••••••"
                            className="border-gray-300 focus:border-green-500"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Nhân viên sẽ được yêu cầu đổi mật khẩu khi đăng nhập lần đầu
                          </p>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0">
                            Tạo tài khoản
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsCreateStaffOpen(false)}
                            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Hủy
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Xem báo cáo chi tiết
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Cảnh báo hệ thống
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">Thiết bị sắp hết</p>
                      <p className="text-sm text-yellow-700">Túi ngủ cao cấp đã hết hàng, cần nhập thêm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">Đánh giá mới</p>
                      <p className="text-sm text-blue-700">5 đánh giá mới cần phản hồi từ khách hàng</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quản lý nhân viên</CardTitle>
                    <CardDescription>Danh sách nhân viên và thông tin</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isCreateStaffOpen} onOpenChange={setIsCreateStaffOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 text-white border-0">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Thêm nhân viên
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Xuất danh sách
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm nhân viên..."
                      className="pl-10 border-gray-300 focus:border-green-500"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48 border-gray-300">
                      <SelectValue placeholder="Bộ phận" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="guide">Hướng dẫn viên</SelectItem>
                      <SelectItem value="equipment">Kho thiết bị</SelectItem>
                      <SelectItem value="tour">Quản lý tour</SelectItem>
                      <SelectItem value="customer">Chăm sóc khách hàng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên nhân viên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Điện thoại</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Bộ phận</TableHead>
                      <TableHead>Ngày vào làm</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              member.role === "manager"
                                ? "bg-purple-100 text-purple-800 border-0"
                                : "bg-blue-100 text-blue-800 border-0"
                            }
                          >
                            {member.role === "manager" ? "Quản lý" : "Nhân viên"}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>{member.joinDate}</TableCell>
                        <TableCell>{getStatusBadge(member.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-900 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other existing tabs content remains the same but with updated button styles */}
          <TabsContent value="bookings">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quản lý đơn hàng</CardTitle>
                    <CardDescription>Tất cả đơn đặt dịch vụ và thiết bị</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      <Filter className="w-4 h-4 mr-2" />
                      Lọc
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Xuất Excel
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm đơn hàng..."
                      className="pl-10 border-gray-300 focus:border-green-500"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48 border-gray-300">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Dịch vụ</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Số tiền</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.customer}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quản lý dịch vụ</CardTitle>
                    <CardDescription>Danh sách các gói dịch vụ cắm trại</CardDescription>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white border-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm dịch vụ
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên dịch vụ</TableHead>
                      <TableHead>Địa điểm</TableHead>
                      <TableHead>Giá</TableHead>
                      <TableHead>Lượt đặt</TableHead>
                      <TableHead>Đánh giá</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.location}</TableCell>
                        <TableCell>{service.price}</TableCell>
                        <TableCell>{service.bookings}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {service.rating}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(service.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-900 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quản lý thiết bị</CardTitle>
                    <CardDescription>Kho thiết bị cho thuê</CardDescription>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white border-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm thiết bị
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên thiết bị</TableHead>
                      <TableHead>Danh mục</TableHead>
                      <TableHead>Giá thuê</TableHead>
                      <TableHead>Tồn kho</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipment.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>
                              {item.available}/{item.total}
                            </span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${item.available === 0 ? "bg-red-500" : item.available <= 3 ? "bg-yellow-500" : "bg-green-500"}`}
                                style={{ width: `${(item.available / item.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-900 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quản lý khách hàng</CardTitle>
                    <CardDescription>Danh sách khách hàng và thông tin</CardDescription>
                  </div>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-2" />
                    Xuất danh sách
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên khách hàng</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Điện thoại</TableHead>
                      <TableHead>Số đơn</TableHead>
                      <TableHead>Tổng chi tiêu</TableHead>
                      <TableHead>Ngày tham gia</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.bookings}</TableCell>
                        <TableCell>{customer.spent}</TableCell>
                        <TableCell>{customer.joined}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
