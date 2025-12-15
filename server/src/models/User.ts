import mongoose, { Document, Schema, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

// 1. Define Interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'HR' | 'EMPLOYEE';
  department: string;
  designation: string;
  isActive: boolean;
  salary: number;
  lastLogin?: Date;
  onboardingStatus: 'PENDING' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 2. Define Schema
const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    role: { 
      type: String, 
      enum: ['ADMIN', 'HR', 'EMPLOYEE'], 
      default: 'EMPLOYEE' 
    },
    department: { type: String, default: 'General' },
    designation: { type: String, default: 'Staff' },
    salary: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    onboardingStatus: { type: String, enum: ['PENDING', 'COMPLETED'], default: 'PENDING' }
  },
  { timestamps: true }
);

// 3. Pre-save hook
// FIX: We type 'next' as 'any' to prevent TS from thinking it is an Options object.
// We also cast 'this' inside to IUser.
UserSchema.pre('save', async function (next: any) {
  const user = this as IUser;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 4. Compare Password Method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;
  return await bcrypt.compare(candidatePassword, user.password);
};

export default mongoose.model<IUser>('User', UserSchema);