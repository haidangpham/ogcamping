"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tent, Package, Search, Filter, ShoppingCart, Star, CheckCircle, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

export default function EquipmentPage() {
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [priceRange, setPriceRange] = useState([0, 500000])

  const equipment = [
    {
      id: 1,
      name: "Lều cắm trại 2 người Coleman",
      category: "Lều",
      price: 120000,
      originalPrice: 150000,
      rating: 4.8,
      reviews: 156,
      available: 12,
      total: 15,
      image: "tent-2p",
      features: ["Chống nước", "Dễ dựng", "Nhẹ"],
      description: "Lều 2 người chất lượng cao, chống nước tuyệt đối, dễ dàng lắp đặt trong 5 phút.",
      isPopular: true,
    },
    {
      id: 2,
      name: "Lều cắm trại 4 người Premium",
      category: "Lều",
      price: 180000,
      originalPrice: 220000,
      rating: 4.9,
      reviews: 203,
      available: 8,
      total: 12,
      image: "tent-4p",
      features: ["Rộng rãi", "Chống UV", "Thông gió tốt"],
      description: "Lều gia đình 4 người với không gian rộng rãi, hệ thống thông gió hiện đại.",
      isNew: true,
    },
    {
      id: 3,
      name: "Bếp gas mini portable",
      category: "Nấu ăn",
      price: 80000,
      originalPrice: 100000,
      rating: 4.7,
      reviews: 89,
      available: 20,
      total: 25,
      image: "stove",
      features: ["Tiết kiệm gas", "An toàn", "Compact"],
      description: "Bếp gas mini tiện lợi, tiết kiệm nhiên liệu, phù hợp cho mọi chuyến đi.",
    },
    {
      id: 4,
      name: "Bộ nồi cắm trại titanium",
      category: "Nấu ăn",
      price: 150000,
      originalPrice: 180000,
      rating: 4.6,
      reviews: 67,
      available: 15,
      total: 20,
      image: "cookset",
      features: ["Siêu nhẹ", "Chống dính", "Bền bỉ"],
      description: "Bộ nồi titanium cao cấp, siêu nhẹ và bền bỉ, lý tưởng cho trekking.",
    },
    {
      id: 5,
      name: "Đèn pin LED siêu sáng",
      category: "Chiếu sáng",
      price: 50000,
      originalPrice: 70000,
      rating: 4.5,
      reviews: 234,
      available: 30,
      total: 35,
      image: "flashlight",
      features: ["Siêu sáng", "Pin lâu", "Chống nước"],
      description: "Đèn pin LED công suất cao, pin sử dụng lên đến 20 giờ liên tục.",
    },
    {
      id: 6,
      name: "Đèn lồng cắm trại solar",
      category: "Chiếu sáng",
      price: 90000,
      originalPrice: 120000,
      rating: 4.8,
      reviews: 145,
      available: 18,
      total: 22,
      image: "lantern",
      features: ["Năng lượng mặt trời", "Sạc USB", "Chống nước"],
      description: "Đèn lồng năng lượng mặt trời, có thể sạc điện thoại, hoàn toàn thân thiện môi trường.",
      isEco: true,
    },
    {
      id: 7,
      name: "Túi ngủ mùa hè",
      category: "Ngủ nghỉ",
      price: 100000,
      originalPrice: 130000,
      rating: 4.4,
      reviews: 98,
      available: 25,
      total: 30,
      image: "sleeping-summer",
      features: ["Thoáng mát", "Nhẹ", "Dễ gấp"],
      description: "Túi ngủ mùa hè thoáng mát, phù hợp cho thời tiết từ 15-25°C.",
    },
    {
      id: 8,
      name: "Túi ngủ mùa đông cao cấp",
      category: "Ngủ nghỉ",
      price: 200000,
      originalPrice: 250000,
      rating: 4.9,
      reviews: 167,
      available: 10,
      total: 15,
      image: "sleeping-winter",
      features: ["Siêu ấm", "Chống ẩm", "Compact"],
      description: "Túi ngủ cao cấp chịu được nhiệt độ -10°C, lý tưởng cho cắm trại mùa đông.",
      isPremium: true,
    },
  ]

  const categories = ["Tất cả", "Lều", "Nấu ăn", "Chiếu sáng", "Ngủ nghỉ", "Nội thất", "An toàn"]

  const addToCart = (item: any) => {
    const existing = selectedItems.find((selected) => selected.id === item.id)
    if (existing) {
      setSelectedItems((prev) =>
        prev.map((selected) => (selected.id === item.id ? { ...selected, quantity: selected.quantity + 1 } : selected)),
      )
    } else {
      setSelectedItems((prev) => [...prev, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (id: number) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, change: number) => {
    setSelectedItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change
            if (newQuantity <= 0) return null
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter(Boolean),
    )
  }

  const getTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <img src="/ai-avatar.jpg" className="h-12 w-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-pulse" />
            </div>
           <span className="text-3xl font-bold text-green-600">OG Camping</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/services"
              className="text-gray-600 hover:text-green-600 transition-all duration-300 font-medium"
            >
              Dịch vụ
            </Link>
            <Link href="/equipment" className="text-green-600 font-semibold relative">
              Thuê thiết bị
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full"></div>
            </Link>
            <Link
              href="/ai-consultant"
              className="text-gray-600 hover:text-green-600 transition-all duration-300 font-medium"
            >
              Tư vấn AI
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 transition-all duration-300 font-medium">
              Về chúng tôi
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-green-600 transition-all duration-300 font-medium"
            >
              Liên hệ
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              asChild
              className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              <Link href="/login">Đăng nhập</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/register">Đăng ký</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <Package className="w-10 h-10 text-green-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text ">
              Thuê thiết bị cắm trại
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá bộ sưu tập thiết bị cắm trại chất lượng cao với giá thuê hợp lý. Tất cả đều được kiểm tra kỹ lưỡng
            và bảo trì định kỳ.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Filter className="w-5 h-5 text-green-600" />
              Bộ lọc tìm kiếm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="text-sm font-semibold mb-3 block text-gray-700">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tên thiết bị..."
                    className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-3 block text-gray-700">Danh mục</label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-semibold mb-3 block text-gray-700">Tình trạng</label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Tình trạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Còn hàng</SelectItem>
                    <SelectItem value="limited">Sắp hết</SelectItem>
                    <SelectItem value="popular">Phổ biến</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-semibold mb-3 block text-gray-700">Sắp xếp</label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Phổ biến nhất</SelectItem>
                    <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                    <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                    <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold mb-3 block text-gray-700">Khoảng giá (VNĐ/ngày)</label>
              <div className="px-3">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500000}
                  min={0}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{priceRange[0].toLocaleString("vi-VN")}đ</span>
                  <span>{priceRange[1].toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg">
                Áp dụng bộ lọc
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Xóa bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Equipment Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {equipment.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm"
                >
                  {/* Image with overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className={`absolute inset-0 transition-transform duration-500 group-hover:scale-110 ${
                        item.image === "tent-2p"
                          ? "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600"
                          : item.image === "tent-4p"
                            ? "bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600"
                            : item.image === "stove"
                              ? "bg-gradient-to-br from-orange-400 via-red-500 to-pink-600"
                              : item.image === "cookset"
                                ? "bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-600"
                                : item.image === "flashlight"
                                  ? "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600"
                                  : item.image === "lantern"
                                    ? "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600"
                                    : item.image === "sleeping-summer"
                                      ? "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600"
                                      : "bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600"
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {item.isPopular && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold">Phổ biến</Badge>
                      )}
                      {item.isNew && (
                        <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold">Mới</Badge>
                      )}
                      {item.isEco && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold">Eco</Badge>
                      )}
                      {item.isPremium && (
                        <Badge className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold">
                          Premium
                        </Badge>
                      )}
                    </div>

                    {/* Availability */}
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={`${item.available > 5 ? "bg-green-500" : item.available > 0 ? "bg-yellow-500" : "bg-red-500"} text-white font-semibold`}
                      >
                        {item.available > 0 ? `Còn ${item.available}` : "Hết hàng"}
                      </Badge>
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-3 right-3 opacity-80">
                      <Package className="w-8 h-8 text-white" />
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="text-lg font-bold mb-1 line-clamp-1">{item.name}</h3>
                      <p className="text-sm opacity-90">{item.category}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{item.rating}</span>
                        <span className="text-sm text-gray-500">({item.reviews})</span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">
                            {item.price.toLocaleString("vi-VN")}đ
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-gray-400 line-through">
                              {item.originalPrice.toLocaleString("vi-VN")}đ
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">/ngày</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-0">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{item.description}</p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Chi tiết
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => addToCart(item)}
                        disabled={item.available === 0}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        {item.available === 0 ? "Hết hàng" : "Thêm vào giỏ"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                  Giỏ thuê ({selectedItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Chưa có thiết bị nào</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg bg-white/50">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.price.toLocaleString("vi-VN")}đ/ngày</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-6 w-6 p-0"
                          >
                            -
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-6 w-6 p-0"
                          >
                            +
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Tổng cộng:</span>
                        <span className="font-bold text-green-600">{getTotalPrice().toLocaleString("vi-VN")}đ</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">*Giá thuê theo ngày</p>

                      <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 shadow-lg">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Thuê ngay
                      </Button>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Ưu đãi đặc biệt</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Thuê từ 3 ngày giảm 10%</li>
                    <li>• Thuê từ 7 ngày giảm 20%</li>
                    <li>• Miễn phí giao nhận trong nội thành</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Consultant CTA */}
        <Card className="mt-12 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-black border-0 shadow-2xl">
        <CardContent className="text-center py-12">
        <Zap className="w-16 h-16 mx-auto mb-6 text-lime-300 drop-shadow-lg" />
        <h3 className="text-3xl font-bold mb-4 drop-shadow-md">Không biết chọn thiết bị nào?</h3>
        <p className="text-xl text-lime-300 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow">
          AI tư vấn thông minh sẽ giúp bạn chọn thiết bị phù hợp nhất dựa trên loại hình cắm trại và ngân sách
        </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-lg"
            >
              <Link href="/ai-consultant">
                <Zap className="w-5 h-5 mr-2" />
                Tư vấn AI miễn phí
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Tent className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">OG Camping</span>
              </div>
              <p className="text-gray-400">Mang đến trải nghiệm cắm trại hoàn hảo với công nghệ AI tiên tiến</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Dịch vụ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Cắm trại núi
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Cắm trại biển
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Cắm trại gia đình
                  </Link>
                </li>
                <li>
                  <Link href="/equipment" className="hover:text-white transition-colors">
                    Thuê thiết bị
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/ai-consultant" className="hover:text-white transition-colors">
                    Tư vấn AI
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/policy" className="hover:text-white transition-colors">
                    Chính sách
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📞 1900 1234</li>
                <li>📧 info@ogcamping.vn</li>
                <li>📍 123 Đường ABC, TP.HCM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OG Camping Private. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
