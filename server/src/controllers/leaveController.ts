import { Request, Response } from 'express';
import Leave from '../models/Leave';
import Employee from '../models/Employee';

// 1. Add Leave Request
export const addLeave = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;
        
        // Find the Employee record linked to this User
        // (Assuming the frontend sends the userId from the Auth Context)
        const employee = await Employee.findOne({ userId });
        if(!employee) {
             return res.status(404).json({ success: false, error: "Employee record not found" });
        }

        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        await newLeave.save();
        return res.status(200).json({ success: true, message: "Leave Request Added" });

    } catch (error: any) {
        return res.status(500).json({ success: false, error: "addLeave server error" });
    }
}

// 2. Get Leaves (Admin sees all, Employee sees own)
export const getLeaves = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params; 
        let leaves;

        if (id) {
            // If ID provided, get leaves for that specific employee
            leaves = await Leave.find({ employeeId: id }).populate({
                path: 'employeeId',
                populate: { path: 'userId', select: 'firstName lastName' }
            });
        } else {
            // Get ALL leaves (For Admin View)
            leaves = await Leave.find().populate({
                path: 'employeeId',
                populate: { 
                    path: 'userId', 
                    select: 'firstName lastName profileImage' 
                }
            });
        }
        
        return res.status(200).json({ success: true, leaves });

    } catch (error: any) {
         return res.status(500).json({ success: false, error: "getLeaves server error" });
    }
}

// 3. Get Single Leave Detail
export const getLeaveDetail = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById(id).populate({
            path: 'employeeId',
            populate: { 
                path: 'userId', 
                select: 'firstName lastName profileImage' 
            }
        });
        return res.status(200).json({ success: true, leave });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: "getLeaveDetail server error" });
    }
}

// 4. Update Leave Status (Approve/Reject)
export const updateLeaveStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
        
        if (!leave) return res.status(404).json({ success: false, error: "Leave not found" });

        return res.status(200).json({ success: true, leave });

    } catch (error: any) {
        return res.status(500).json({ success: false, error: "updateLeaveStatus server error" });
    }
}