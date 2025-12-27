import { Request, Response } from 'express';
import Salary from '../models/Salary';
import Employee from '../models/Employee';

// 1. Add Salary
export const addSalary = async (req: Request, res: Response): Promise<any> => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        // Calculate Net Salary
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();

        return res.status(200).json({ success: true, message: "Salary Added Successfully" });

    } catch (error: any) {
        return res.status(500).json({ success: false, error: "salary add server error" });
    }
}

// 2. Get Salary History by Employee ID
export const getSalary = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        // Check if employeeId is provided
        // We find all salary records where 'employeeId' matches the param
        const salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');
        
        return res.status(200).json({ success: true, salary });

    } catch (error: any) {
         return res.status(500).json({ success: false, error: "salary get server error" });
    }
}