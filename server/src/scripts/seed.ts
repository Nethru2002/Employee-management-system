import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to DB:', error);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  await connectDB();

  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@ems.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit();
    }

    // Create Admin
    const admin = new User({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@ems.com',
      password: 'admin123', // This will be hashed by our pre-save hook
      role: 'ADMIN',
      designation: 'System Administrator',
      department: 'IT',
      isActive: true,
      onboardingStatus: 'COMPLETED'
    });

    await admin.save();
    console.log('Admin created successfully');
    process.exit();
    
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();