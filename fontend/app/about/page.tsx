import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tent, Users, Target, Heart, Shield, Zap, MessageCircle, Star, CheckCircle,Sparkles } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { number: "1,000+", label: "Khách hàng hài lòng", icon: Users },
    { number: "50+", label: "Địa điểm cắm trại", icon: Tent },
    { number: "4.8/5", label: "Đánh giá trung bình", icon: Star },
    { number: "24/7", label: "Hỗ trợ khách hàng", icon: MessageCircle },
  ]

  const values = [
    {
      icon: Heart,
      title: "Đam mê thiên nhiên",
      description: "Chúng tôi tin rằng thiên nhiên là nơi con người tìm thấy sự bình yên và kết nối với chính mình.",
    },
    {
      icon: Shield,
      title: "An toàn tuyệt đối",
      description:
        "Mọi hoạt động đều được đảm bảo an toàn với thiết bị chất lượng cao và hướng dẫn viên chuyên nghiệp.",
    },
    {
      icon: Zap,
      title: "Công nghệ tiên tiến",
      description: "Ứng dụng AI và công nghệ hiện đại để mang đến trải nghiệm tốt nhất cho khách hàng.",
    },
    {
      icon: Target,
      title: "Chất lượng hàng đầu",
      description: "Cam kết cung cấp dịch vụ chất lượng cao với giá cả hợp lý và phù hợp với mọi đối tượng.",
    },
  ]

  const team = [
    {
      name: "Nguyễn Văn An",
      role: "CEO & Founder",
      experience: "10+ năm kinh nghiệm",
      description: "Chuyên gia về du lịch sinh thái và cắm trại",
    },
    {
      name: "Trần Thị Bình",
      role: "Head of Operations",
      experience: "8+ năm kinh nghiệm",
      description: "Quản lý vận hành và đảm bảo chất lượng dịch vụ",
    },
    {
      name: "Lê Văn Cường",
      role: "Lead Guide",
      experience: "12+ năm kinh nghiệm",
      description: "Hướng dẫn viên trưởng với chứng chỉ quốc tế",
    },
    {
      name: "Phạm Thị Dung",
      role: "AI Technology Lead",
      experience: "6+ năm kinh nghiệm",
      description: "Phát triển hệ thống AI tư vấn thông minh",
    },
  ]

  const achievements = [
    "Giải thưởng 'Dịch vụ du lịch xuất sắc' năm 2023",
    "Top 10 công ty du lịch sinh thái hàng đầu Việt Nam",
    "Chứng nhận ISO 9001:2015 về quản lý chất lượng",
    "Đối tác chiến lược của 20+ khu bảo tồn thiên nhiên",
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
            <Link href="/services" className="text-gray-600 hover:text-green-600 transition-colors">
              Dịch vụ
            </Link>
            <Link href="/equipment" className="text-gray-600 hover:text-green-600 transition-colors">
              Thuê thiết bị
            </Link>
            <Link href="/ai-consultant" className="text-gray-600 hover:text-green-600 transition-colors">
              Tư vấn AI
            </Link>
            <Link href="/about" className="text-green-600 font-medium">
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

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
         {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
          <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Về OG Camping</h1>
          <p className="text-2xl text-green-300 mb-8 max-w-3xl mx-auto">
            Chúng tôi là đội ngũ đam mê thiên nhiên, mang đến những trải nghiệm cắm trại độc đáo và an toàn nhất cho mọi
            người
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sứ mệnh của chúng tôi</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                OG Camping được thành lập với sứ mệnh mang đến những trải nghiệm cắm trại an toàn, thú vị và đáng nhớ
                cho mọi người. Chúng tôi tin rằng thiên nhiên có sức mạnh chữa lành và kết nối con người với nhau.
              </p>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Với sự kết hợp giữa kinh nghiệm lâu năm và công nghệ AI tiên tiến, chúng tôi cam kết cung cấp dịch vụ tư
                vấn thông minh và cá nhân hóa cho từng khách hàng.
              </p>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Tent className="w-24 h-24 text-white/80" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những giá trị này định hướng mọi hoạt động của chúng tôi và tạo nên sự khác biệt trong dịch vụ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Đội ngũ chuyên gia</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những con người đam mê và giàu kinh nghiệm, luôn sẵn sàng mang đến trải nghiệm tốt nhất cho bạn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-2">{member.role}</p>
                  <Badge variant="secondary" className="mb-3">
                    {member.experience}
                  </Badge>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng khám phá thiên nhiên?</h2>
          <p className="text-xl text-green-300 mb-8 max-w-2xl mx-auto">
            Hãy để chúng tôi giúp bạn tạo ra những kỷ niệm đáng nhớ với thiên nhiên
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/services">Đặt dịch vụ ngay</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-green-600 border-white hover:bg-white hover:text-green-600"
              asChild
            >
              <Link href="/ai-consultant">Tư vấn miễn phí</Link>
            </Button>
          </div>
        </div>
      </section>

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
