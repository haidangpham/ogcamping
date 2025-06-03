import { type NextRequest, NextResponse } from "next/server"

// Mock equipment inventory
const equipment = [
  {
    id: 1,
    name: "Lều cắm trại 4 người",
    category: "Lều",
    price: 150000,
    priceUnit: "ngày",
    available: 12,
    total: 15,
    description: "Lều chống thấm nước, dễ dựng, phù hợp cho 4 người",
    features: ["Chống thấm", "Dễ dựng", "Thoáng khí"],
    status: "available",
  },
  {
    id: 2,
    name: "Bếp gas mini",
    category: "Nấu ăn",
    price: 80000,
    priceUnit: "ngày",
    available: 8,
    total: 10,
    description: "Bếp gas nhỏ gọn, tiết kiệm nhiên liệu",
    features: ["Nhỏ gọn", "Tiết kiệm", "An toàn"],
    status: "available",
  },
  {
    id: 3,
    name: "Đèn pin LED siêu sáng",
    category: "Chiếu sáng",
    price: 50000,
    priceUnit: "ngày",
    available: 20,
    total: 25,
    description: "Đèn pin LED công suất cao, pin lâu",
    features: ["Siêu sáng", "Pin lâu", "Chống nước"],
    status: "available",
  },
  {
    id: 4,
    name: "Túi ngủ cao cấp",
    category: "Ngủ nghỉ",
    price: 120000,
    priceUnit: "ngày",
    available: 0,
    total: 8,
    description: "Túi ngủ ấm áp, nhẹ, phù hợp mọi thời tiết",
    features: ["Ấm áp", "Nhẹ", "Chống ẩm"],
    status: "out_of_stock",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")

    let filteredEquipment = equipment

    if (category && category !== "all") {
      filteredEquipment = filteredEquipment.filter((item) => item.category.toLowerCase() === category.toLowerCase())
    }

    if (status && status !== "all") {
      filteredEquipment = filteredEquipment.filter((item) => item.status === status)
    }

    return NextResponse.json({
      success: true,
      equipment: filteredEquipment,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch equipment" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const equipmentData = await request.json()

    const newEquipment = {
      id: equipment.length + 1,
      ...equipmentData,
      status: equipmentData.available > 0 ? "available" : "out_of_stock",
      createdAt: new Date().toISOString(),
    }

    equipment.push(newEquipment)

    return NextResponse.json({
      success: true,
      equipment: newEquipment,
      message: "Equipment added successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add equipment" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()

    const equipmentIndex = equipment.findIndex((item) => item.id === id)

    if (equipmentIndex === -1) {
      return NextResponse.json({ success: false, error: "Equipment not found" }, { status: 404 })
    }

    equipment[equipmentIndex] = {
      ...equipment[equipmentIndex],
      ...updateData,
      status: updateData.available > 0 ? "available" : "out_of_stock",
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      equipment: equipment[equipmentIndex],
      message: "Equipment updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update equipment" }, { status: 500 })
  }
}
