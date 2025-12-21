import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Import File System to delete images
import Employee from '../models/Employee';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// 1. Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Save files here
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

export const upload = multer({ storage: storage });

// 2. Add Employee (Create User + Employee Record)
export const addEmployee = async (req: Request, res: Response): Promise<any> => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            role
        } = req.body;

        // check if user exists
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ success: false, error: "User already registered" });
        }

        // Create User (Auth)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password, // Hook will hash this
            role,
            profileImage: req.file ? req.file.filename : ""
        });
        
        const savedUser = await newUser.save();

        // Create Employee (Profile)
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            profileImage: req.file ? req.file.filename : ""
        });

        await newEmployee.save();

        return res.status(201).json({ success: true, message: "Employee Created" });

    } catch (error: any) {
        console.error("Error adding employee:", error);
        return res.status(500).json({ success: false, error: "Server Error in adding employee" });
    }
};

// 3. Get Employees
export const getEmployees = async (req: Request, res: Response): Promise<any> => {
    try {
        // Populate 'userId' to get name/email, and 'department' to get department name
        const employees = await Employee.find()
            .populate('userId', { password: 0 }) // Exclude password
            .populate('department');
        
        return res.status(200).json({ success: true, employees });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: "Get Employees Server Error" });
    }
}

// 4. Get Single Employee
export const getEmployee = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        let employee; 
        
        // Check if the ID provided is valid
        try {
             employee = await Employee.findById(id)
                .populate('userId', { password: 0 })
                .populate('department');
        } catch (err) {
             return res.status(404).json({ success: false, error: "Invalid Employee ID" });
        }

        if(!employee) return res.status(404).json({ success: false, error: "Employee not found" });

        return res.status(200).json({ success: true, employee });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: "Get Employee Server Error" });
    }
}

// 5. Update Employee
export const updateEmployee = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById(id);
        if(!employee) return res.status(404).json({ success: false, error: "Employee not found" });

        // Update User Collection
        const user = await User.findById(employee.userId);
        if(user) {
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            await user.save();
        }

        // Update Employee Collection
        employee.maritalStatus = maritalStatus || employee.maritalStatus;
        employee.designation = designation || employee.designation;
        employee.department = department || employee.department;
        employee.salary = salary || employee.salary;

        await employee.save();

        return res.status(200).json({ success: true, message: "Employee Updated" });

    } catch (error: any) {
        return res.status(500).json({ success: false, error: "Update Employee Server Error" });
    }
}

// 6. Delete Employee
export const deleteEmployee = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // 1. Delete the User Record (Login access)
        await User.findByIdAndDelete(employee.userId);

        // 2. Delete the Profile Image (if exists)
        if(employee.profileImage) {
            const imagePath = path.join(__dirname, '../../public/uploads', employee.profileImage);
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting image file:", err);
            });
        }

        // 3. Delete the Employee Record
        await Employee.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Employee deleted" });

    } catch (error: any) {
        console.error("Error deleting employee:", error);
        return res.status(500).json({ success: false, error: "Delete Employee Server Error" });
    }
}