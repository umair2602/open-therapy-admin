import mongoose, { Document, Schema } from "mongoose";

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlanDocument extends Document {
  id: string; // Custom ID for the plan (e.g., 'openthera_premium_annual')
  icon: string; // Icon name/key used by RN app
  title: string;
  subtitle: string;
  price: string;
  priceSubtitle: string;
  advantage?: string; // Optional (e.g., 'mais vantajoso')
  detail?: string; // Optional (e.g., '30% OFF')
  features: PlanFeature[];
  buttonText: string;
  buttonVariant: 'primary' | 'secondary';
  isActive: boolean; // To enable/disable plans
  displayOrder: number; // For sorting plans
}

const PlanFeatureSchema = new Schema<PlanFeature>({
  text: { type: String, required: true },
  included: { type: Boolean, default: true }
});

const PricingPlanSchema = new Schema<PricingPlanDocument>(
  {
    id: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    price: { type: String, required: true },
    priceSubtitle: { type: String, required: true },
    advantage: { type: String },
    detail: { type: String },
    features: { type: [PlanFeatureSchema], default: [] },
    buttonText: { type: String, required: true },
    buttonVariant: { type: String, enum: ['primary', 'secondary'], default: 'secondary' },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.PricingPlan ||
  mongoose.model<PricingPlanDocument>(
    "PricingPlan",
    PricingPlanSchema,
    "pricing_plans"
  );