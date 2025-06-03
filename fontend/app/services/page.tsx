import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tent, Mountain, Users, Calendar, MapPin, Star, Filter, Search, MessageCircle, CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      name: "Cắm trại núi cao Sapa",
      location: "Sapa, Lào Cai",
      duration: "2-3 ngày",
      capacity: "4-6 người",
      price: 2500000,
      rating: 4.8,
      reviews: 124,
      image: "mountain",
      tags: ["Núi", "Trekking", "Phổ biến"],
      availability: "Còn 3 slot",
      description:
        "Trải nghiệm cắm trại trên núi cao với view tuyệt đẹp, bao gồm lều, thực phẩm và hướng dẫn viên chuyên nghiệp",
    },
    {
      id: 2,
      name: "Cắm trại bãi biển Phú Quốc",
      location: "Phú Quốc, Kiên Giang",
      duration: "1-2 ngày",
      capacity: "2-4 người",
      price: 1800000,
      rating: 4.9,
      reviews: 89,
      image: "beach",
      tags: ["Biển", "Lặn", "Mới"],
      availability: "Còn 5 slot",
      description: "Cắm trại bên bờ biển với hoạt động lặn ngắm san hô, BBQ hải sản tươi ngon",
    },
    {
      id: 3,
      name: "Cắm trại gia đình Đà Lạt",
      location: "Đà Lạt, Lâm Đồng",
      duration: "2-4 ngày",
      capacity: "6-10 người",
      price: 3200000,
      rating: 4.7,
      reviews: 156,
      image: "family",
      tags: ["Gia đình", "Trẻ em", "Ưu đãi"],
      availability: "Còn 2 slot",
      description: "Gói dành cho gia đình với nhiều hoạt động vui chơi, an toàn cho trẻ em",
    },
    {
      id: 4,
      name: "Cắm trại rừng Cát Tiên",
      location: "Cát Tiên, Đồng Nai",
      duration: "3-4 ngày",
      capacity: "4-8 người",
      price: 2800000,
      rating: 4.6,
      reviews: 78,
      image: "forest",
      tags: ["Rừng", "Động vật", "Khám phá"],
      availability: "Hết chỗ",
      description: "Khám phá thiên nhiên hoang dã, quan sát động vật trong môi trường tự nhiên",
    },
    {
      id: 5,
      name: "Cắm trại thác Sekumpul",
      location: "Bali, Indonesia",
      duration: "3-5 ngày",
      capacity: "2-6 người",
      price: 4500000,
      rating: 4.9,
      reviews: 203,
      image: "waterfall",
      tags: ["Thác nước", "Quốc tế", "Premium"],
      availability: "Còn 4 slot",
      description: "Tour quốc tế đến thác nước nổi tiếng Bali với dịch vụ cao cấp",
    },
    {
      id: 6,
      name: "Cắm trại sa mạc Mũi Né",
      location: "Mũi Né, Bình Thuận",
      duration: "1-2 ngày",
      capacity: "2-4 người",
      price: 1500000,
      rating: 4.5,
      reviews: 67,
      image: "desert",
      tags: ["Sa mạc", "Hoàng hôn", "Độc đáo"],
      availability: "Còn 6 slot",
      description: "Trải nghiệm cắm trại trên đồi cát với hoàng hôn tuyệt đẹp",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <img src="/ai-avatar.jpg" className="h-12 w-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-pulse" />
            </div>
           <span className="text-3xl font-bold text-green-600">OG Camping</span>
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
            <Button variant="outline" asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Đăng ký</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dịch vụ cắm trại</h1>
          <p className="text-gray-600 text-lg">Khám phá các gói dịch vụ cắm trại đa dạng, từ núi cao đến bãi biển</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Bộ lọc tìm kiếm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Tên địa điểm..." className="pl-10" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Loại địa điểm</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="mountain">Núi</SelectItem>
                    <SelectItem value="beach">Biển</SelectItem>
                    <SelectItem value="forest">Rừng</SelectItem>
                    <SelectItem value="desert">Sa mạc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Số người</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn số người" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 người</SelectItem>
                    <SelectItem value="3-4">3-4 người</SelectItem>
                    <SelectItem value="5-6">5-6 người</SelectItem>
                    <SelectItem value="7+">7+ người</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Thời gian</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 ngày</SelectItem>
                    <SelectItem value="3-4">3-4 ngày</SelectItem>
                    <SelectItem value="5+">5+ ngày</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">Khoảng giá (VNĐ)</label>
              <div className="px-2">
                <Slider
                  defaultValue={[1000000, 5000000]}
                  max={5000000}
                  min={1000000}
                  step={100000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1.000.000đ</span>
                  <span>5.000.000đ</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button>Áp dụng bộ lọc</Button>
              <Button variant="outline">Xóa bộ lọc</Button>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white"
            >
              {/* Image with overlay */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className={`absolute inset-0 transition-transform duration-300 group-hover:scale-110 ${
                    service.image === "mountain"
                      ? "bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600"
                      : service.image === "beach"
                        ? "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600"
                        : service.image === "family"
                          ? "bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-600"
                          : service.image === "forest"
                            ? "bg-gradient-to-br from-green-400 via-emerald-500 to-green-600"
                            : service.image === "waterfall"
                              ? "bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600"
                              : "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500"
                  }`}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-white/90 text-gray-800 hover:bg-white text-xs font-medium backdrop-blur-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Availability */}
                <div className="absolute top-4 right-4">
                  <Badge
                    className={`${
                      service.availability === "Hết chỗ"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white font-medium`}
                  >
                    {service.availability}
                  </Badge>
                </div>

                {/* Icon */}
                <div className="absolute bottom-4 right-4 opacity-80">
                  {service.image === "mountain" && <Mountain className="w-8 h-8 text-white" />}
                  {service.image === "beach" && <Tent className="w-8 h-8 text-white" />}
                  {service.image === "family" && <Users className="w-8 h-8 text-white" />}
                  {service.image === "forest" && <Mountain className="w-8 h-8 text-white" />}
                  {service.image === "waterfall" && <Mountain className="w-8 h-8 text-white" />}
                  {service.image === "desert" && <Mountain className="w-8 h-8 text-white" />}
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1 line-clamp-1">{service.name}</h3>
                  <div className="flex items-center gap-1 text-sm opacity-90">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{service.location}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                {/* Rating and Reviews */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{service.rating}</span>
                    <span className="text-sm text-gray-500">({service.reviews} đánh giá)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{service.capacity}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{service.description}</p>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-green-600">{service.price.toLocaleString("vi-VN")}đ</span>
                    <span className="text-gray-500 text-sm">/gói</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="hover:bg-gray-50">
                      <Link href={`/services/${service.id}`}>Chi tiết</Link>
                    </Button>
                    <Button
                      size="sm"
                      disabled={service.availability === "Hết chỗ"}
                      asChild={service.availability !== "Hết chỗ"}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {service.availability === "Hết chỗ" ? (
                        "Hết chỗ"
                      ) : (
                        <Link href={`/booking/${service.id}`}>Đặt ngay</Link>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Service CTA */}
        <Card className="mt-12 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black" />
          <CardContent className="relative text-center py-12">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Tent className="w-8 h-8" />
                <h3 className="text-3xl font-bold">Tạo gói dịch vụ riêng</h3>
                <Star className="w-8 h-8" />
              </div>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Không tìm thấy gói phù hợp? Hãy tự thiết kế chuyến cắm trại hoàn hảo theo sở thích của bạn với thiết bị
                và dịch vụ tùy chọn
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                  <Link href="/custom-service">
                    <Tent className="w-5 h-5 mr-2" />
                    Tạo gói riêng ngay
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-gray-900 border-white hover:bg-white hover:text-gray-900"
                  asChild
                >
                  <Link href="/ai-consultant">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Tư vấn với AI
                  </Link>
                </Button>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Tự chọn thiết bị</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Linh hoạt thời gian</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Giá cả minh bạch</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Consultant CTA */}
        <Card className="mt-8 bg-gradient-to-r from-green-600 to-green-700 text-while">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Không tìm thấy gói phù hợp?</h3>
            <p className="text-green-700 mb-8">
              Để AI tư vấn giúp bạn tìm gói dịch vụ hoàn hảo dựa trên sở thích và ngân sách
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/ai-consultant">Tư vấn với AI ngay</Link>
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
