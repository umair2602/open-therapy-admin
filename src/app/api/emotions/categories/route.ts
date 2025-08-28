import dbConnect from '@/lib/db/mongodb'
import EmotionCategory from '@/models/EmotionCategory'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    // Get all main categories with their emotions
    const categories = await EmotionCategory.find({ isMainCategory: true })
      .sort({ order: 1 })
      .lean()

    return NextResponse.json(categories)

  } catch (error) {
    console.error('Error fetching emotion categories:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
