import mongoose, { Document, Schema } from 'mongoose';

export interface ISalary extends Document {
  employeeId: mongoose.Types.ObjectId;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  payDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SalarySchema = new Schema<ISalary>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number },
    deductions: { type: Number },
    netSalary: { type: Number },
    payDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISalary>('Salary', SalarySchema);