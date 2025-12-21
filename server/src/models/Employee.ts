import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  userId: mongoose.Types.ObjectId; // Link to the User Auth account
  employeeId: string;
  dob: Date;
  gender: string;
  maritalStatus: string;
  designation: string;
  department: mongoose.Types.ObjectId; // Reference to Department Model
  salary: number;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    designation: { type: String },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    salary: { type: Number, required: true },
    profileImage: { type: String }, // URL to the image
  },
  { timestamps: true }
);

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);