import { type NextRequest, NextResponse } from "next/server"

// Mock AI response - In production, this would integrate with OpenAI API
export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate contextual response based on message content
    const response = generateAIResponse(message, context)

    return NextResponse.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process AI request" }, { status: 500 })
  }
}

function generateAIResponse(message: string, context?: any): string {
  const lowerMessage = message.toLowerCase()

  // Camping service recommendations
  if (lowerMessage.includes("gia đình") || lowerMessage.includes("family")) {
    return `Tuyệt vời! Dựa trên nhu cầu cắm trại gia đình của bạn, tôi khuyên bạn nên xem xét:

🏕️ **Gói Cắm trại gia đình Đà Lạt** - 3.200.000đ
• Thời gian: 2-4 ngày
• Phù hợp: 6-10 người
• Bao gồm: Lều lớn, hoạt động trẻ em, BBQ
• Đánh giá: 4.7/5 ⭐

Gói này có nhiều hoạt động an toàn cho trẻ em và không gian rộng rãi. Bạn có muốn tôi tư vấn thêm về chi tiết không?`
  }

  if (lowerMessage.includes("mới bắt đầu") || lowerMessage.includes("beginner") || lowerMessage.includes("người mới")) {
    return `Với người mới bắt đầu, tôi khuyên bạn nên chọn:

🌊 **Gói Cắm trại bãi biển Phú Quốc** - 1.800.000đ
• Thời gian: 1-2 ngày (phù hợp để làm quen)
• Có hướng dẫn viên kinh nghiệm
• Thiết bị đầy đủ, không cần chuẩn bị gì
• Hoạt động đa dạng: lặn, BBQ

Đây là lựa chọn tuyệt vời để bắt đầu hành trình cắm trại của bạn! Bạn có muốn biết thêm về chuẩn bị gì không?`
  }

  if (lowerMessage.includes("thiết bị") || lowerMessage.includes("equipment")) {
    return `Dựa trên loại hình cắm trại bạn quan tâm, tôi gợi ý những thiết bị cần thiết:

🎒 **Thiết bị cơ bản:**
• Lều cắm trại 4 người - 150.000đ/ngày
• Túi ngủ cao cấp - 120.000đ/ngày  
• Đèn pin LED siêu sáng - 50.000đ/ngày
• Bếp gas mini - 80.000đ/ngày

💡 **Gợi ý:** Nếu đi cắm trại núi, nên thuê thêm áo ấm và giày trekking. Bạn có muốn tôi tư vấn gói thiết bị phù hợp không?`
  }

  if (lowerMessage.includes("giá") || lowerMessage.includes("price") || lowerMessage.includes("budget")) {
    return `Tôi hiểu bạn quan tâm đến giá cả. Dưới đây là các gói theo mức giá:

💰 **Dưới 2 triệu:**
• Cắm trại biển Phú Quốc - 1.800.000đ
• Cắm trại sa mạc Mũi Né - 1.500.000đ

💰 **2-3 triệu:**
• Cắm trại núi Sapa - 2.500.000đ
• Cắm trại rừng Cát Tiên - 2.800.000đ

💰 **Trên 3 triệu:**
• Cắm trại gia đình Đà Lạt - 3.200.000đ
• Cắm trại quốc tế Bali - 4.500.000đ

Bạn có ngân sách dự kiến bao nhiêu để tôi tư vấn chính xác hơn?`
  }

  if (lowerMessage.includes("so sánh") || lowerMessage.includes("compare")) {
    return `Tôi sẽ so sánh 2 gói phổ biến nhất:

🏔️ **Cắm trại núi Sapa** vs 🏖️ **Cắm trại biển Phú Quốc**

**Sapa:**
✅ Khí hậu mát mẻ, view núi đẹp
✅ Hoạt động trekking thú vị
❌ Thời tiết có thể lạnh, khó khăn hơn

**Phú Quốc:**
✅ Thời tiết ấm áp, dễ chịu
✅ Hoạt động biển đa dạng
❌ Có thể đông khách vào mùa cao điểm

Bạn thích khám phá núi hay biển hơn?`
  }

  // Default responses
  const defaultResponses = [
    `Cảm ơn bạn đã chia sẻ! Để tư vấn chính xác nhất, bạn có thể cho tôi biết thêm về:
• Số người tham gia?
• Thời gian dự kiến (bao nhiêu ngày)?
• Ngân sách dự tính?
• Loại địa điểm yêu thích (núi, biển, rừng...)?`,

    `Tôi hiểu nhu cầu của bạn. Dựa trên thông tin này, tôi sẽ phân tích và đưa ra những gợi ý phù hợp nhất. Bạn có thể cung cấp thêm thông tin về ngân sách và số người tham gia không?`,

    `Đây là câu hỏi rất hay! Tôi sẽ giúp bạn tìm ra giải pháp tốt nhất. Để tư vấn chính xác, bạn có thể chia sẻ thêm về kinh nghiệm cắm trại và sở thích cá nhân không?`,
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}
