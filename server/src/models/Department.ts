import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  dep_name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    dep_name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

// Mongoose now waits for this function to finish automatically.
DepartmentSchema.pre('save', async function () {
  const dep = this as IDepartment;
  
  if (dep.isModified('dep_name')) {
    dep.dep_name = dep.dep_name.charAt(0).toUpperCase() + dep.dep_name.slice(1);
  }
});

export default mongoose.model<IDepartment>('Department', DepartmentSchema);