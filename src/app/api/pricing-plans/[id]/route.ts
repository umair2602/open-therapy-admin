import dbConnect from "@/lib/db/mongodb";
import PricingPlan from "@/models/PricingPlan";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const plan = await PricingPlan.findById(id);
    if (!plan)
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    console.error("GET pricing plan by id error:", error);
    return NextResponse.json(
      { message: "Error fetching pricing plan" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const body = await req.json();
    
    // If changing the custom 'id' field, check it doesn't conflict
    if (body.id) {
      const existingPlan = await PricingPlan.findOne({ 
        id: body.id, 
        _id: { $ne: id } 
      });
      if (existingPlan) {
        return NextResponse.json(
          { message: "Plan with this ID already exists" },
          { status: 400 }
        );
      }
    }
    
    const plan = await PricingPlan.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!plan)
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    console.error("PUT pricing plan error:", error);
    return NextResponse.json(
      { message: "Error updating pricing plan" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await params;
    await PricingPlan.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE pricing plan error:", error);
    return NextResponse.json(
      { message: "Error deleting pricing plan" },
      { status: 500 }
    );
  }
}