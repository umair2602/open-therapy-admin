import dbConnect from '@/lib/db/mongodb'
import EmotionCategory from '@/models/EmotionCategory'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const { name, description, aiPrompt } = await request.json()

    if (!name || !description || !aiPrompt) {
      return NextResponse.json(
        { message: 'Name, description, and AI prompt are required' },
        { status: 400 }
      )
    }

    // Find the category
    const category = await EmotionCategory.findById(params.id)
    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }

    // Check if emotion already exists
    const existingEmotion = category.emotions.find(
      emotion => emotion.name.toLowerCase() === name.toLowerCase()
    )
    if (existingEmotion) {
      return NextResponse.json(
        { message: 'Emotion with this name already exists' },
        { status: 400 }
      )
    }

    // Add new emotion
    category.emotions.push({
      name,
      description,
      aiPrompt,
      isActive: true,
    })

    await category.save()

    return NextResponse.json({
      message: 'Emotion added successfully',
      emotion: {
        name,
        description,
        aiPrompt,
        isActive: true,
      },
    })

  } catch (error) {
    console.error('Error adding emotion:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
