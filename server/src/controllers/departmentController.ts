import { Request, Response } from 'express';
import Department from '../models/Department';

// 1. Get all departments
export const getDepartments = async (req: Request, res: Response): Promise<any> => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: "getDepartments server error" });
    }
}

// 2. Add a new department
export const addDepartment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { dep_name, description } = req.body;
        
        // Validation
        if (!dep_name) {
            return res.status(400).json({ success: false, error: "Department Name is required" });
        }

        const newDep = new Department({
            dep_name,
            description
        });

        await newDep.save();
        return res.status(200).json({ success: true, department: newDep });

    } catch (error: any) {
        // Log the real error to the server terminal so we can see it
        console.error("Error Adding Department:", error);
        
        // Return the specific error message to the frontend
        return res.status(500).json({ success: false, error: "addDepartment server error: " + error.message });
    }
}

// 3. Get Single Department (For Edit)
export const getDepartment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);
        
        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, department });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: "getDepartment server error" });
    }
}

// 4. Update Department
export const updateDepartment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body;
        const department = await Department.findByIdAndUpdate(id, { dep_name, description }, { new: true });
        return res.status(200).json({ success: true, department });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: "updateDepartment server error" });
    }
}

// 5. Delete Department
export const deleteDepartment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        await Department.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Department deleted" });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: "deleteDepartment server error" });
    }
}