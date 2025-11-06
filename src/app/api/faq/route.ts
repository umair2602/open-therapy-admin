// app/api/faqs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Faq from '@/models/Faq';

// GET - Fetch all FAQs (with optional filters)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');
    
    let query: any = {};
    
    if (category && category !== 'All Categories') {
      query.category = category;
    }
    
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }
    
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: 'i' } },
        { answer: { $regex: search, $options: 'i' } }
      ];
    }
    
    const faqs = await Faq.find(query).sort({ displayOrder: 1, createdAt: -1 });
    
    return NextResponse.json({ success: true, data: faqs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new FAQ
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { question, answer, category, isActive, displayOrder } = body;
    
    if (!question || !answer) {
      return NextResponse.json(
        { success: false, error: 'Question and answer are required' },
        { status: 400 }
      );
    }
    
    const faq = await Faq.create({
      question,
      answer,
      category: category || 'General',
      isActive: isActive !== undefined ? isActive : true,
      displayOrder: displayOrder || 0
    });
    
    return NextResponse.json({ success: true, data: faq }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
