import dbConnect from "@/lib/db/mongodb";
import PricingPlan from "@/models/PricingPlan";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const searchParams = req.nextUrl.searchParams;
    const activeOnly = searchParams.get('active') === 'true';
    
    const filter = activeOnly ? { isActive: true } : {};
    const plans = await PricingPlan.find(filter).sort({ displayOrder: 1, createdAt: 1 });
    
    return NextResponse.json(plans, { status: 200 });
  } catch (error) {
    console.error("GET pricing plans error:", error);
    return NextResponse.json(
      { message: "Error fetching pricing plans" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    
    // Check if plan ID already exists
    const existingPlan = await PricingPlan.findOne({ id: body.id });
    if (existingPlan) {
      return NextResponse.json(
        { message: "Plan with this ID already exists" },
        { status: 400 }
      );
    }
    
    const plan = await PricingPlan.create(body);
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error("POST pricing plan error:", error);
    return NextResponse.json(
      { message: "Error creating pricing plan" },
      { status: 500 }
    );
  }
}