import mongoose from 'mongoose'

export interface IEmotionCategory extends mongoose.Document {
  name: string
  color: string
  description: string
  isMainCategory: boolean
  parentCategory?: mongoose.Types.ObjectId
  emotions: Array<{
    name: string
    description: string
    aiPrompt: string
    isActive: boolean
  }>
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const emotionCategorySchema = new mongoose.Schema<IEmotionCategory>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    default: '#3b82f6',
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isMainCategory: {
    type: Boolean,
    default: false,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmotionCategory',
    required: function() {
      return !this.isMainCategory
    },
  },
  emotions: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    aiPrompt: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

// Index for efficient queries
emotionCategorySchema.index({ isMainCategory: 1, order: 1 })
emotionCategorySchema.index({ parentCategory: 1, order: 1 })

export default mongoose.models.EmotionCategory || mongoose.model<IEmotionCategory>('EmotionCategory', emotionCategorySchema)
