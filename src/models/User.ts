import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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
  // Authentication fields
  password?: string
  googleId?: string
  appleId?: string
  authProvider?: 'email' | 'google' | 'apple'
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
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
  // Authentication fields
  password: {
    type: String,
    trim: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  appleId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  authProvider: {
    type: String,
    enum: ['email', 'google', 'apple'],
    default: 'email',
  },
}, {
  timestamps: true,
})

// Hash password before saving (only if password is modified)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema)
