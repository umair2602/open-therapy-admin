import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  phone?: string
  dateOfBirth?: Date
  subscription: 'Free' | 'Basic' | 'Premium'
  status: 'Active' | 'Inactive' | 'Suspended'
  lastActive: Date
  joinDate: Date
  sessions: number
  totalTime: number
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
  },
  subscription: {
    type: String,
    enum: ['Free', 'Basic', 'Premium'],
    default: 'Free',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active',
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  sessions: {
    type: Number,
    default: 0,
  },
  totalTime: {
    type: Number,
    default: 0, // in minutes
  },
}, {
  timestamps: true,
})

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema)
