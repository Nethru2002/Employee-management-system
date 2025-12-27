import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

interface Department {
    _id: string;
    dep_name: string;
}

interface Employee {
    _id: string;
    employeeId: string;
    userId: {
        firstName: string;
        lastName: string;
    };
    department: {
        _id: string;
    };
}

const Add = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    
    // Controlled inputs
    const [department, setDepartment] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [basicSalary, setBasicSalary] = useState('');
    const [allowances, setAllowances] = useState('');
    const [deductions, setDeductions] = useState('');
    const [payDate, setPayDate] = useState('');
    
    const navigate = useNavigate();

    // 1. Fetch Departments on Load
    useEffect(() => {
        const fetchDepartments = async () => {
          try {
            const response = await api.get('/api/departments');
            if (response.data.success) {
              setDepartments(response.data.departments);
            }
          } catch {
            alert("Error fetching departments");
          }
        };
        fetchDepartments();
    }, []);

    // 2. Fetch Employees when Department Changes
    const handleDepartmentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const depId = e.target.value;
        setDepartment(depId);
        setEmployees([]); // Reset employees
        setEmployeeId(''); // Reset selected employee
        
        try {
            // Fetch all employees and filter locally (simplest approach for now)
            const empResponse = await api.get('/api/employees');
            if (empResponse.data.success) {
                 // Added type to 'emp' so no implicit any
                 const filtered = empResponse.data.employees.filter((emp: Employee) => emp.department._id === depId);
                 setEmployees(filtered);
            }
        } catch {
            alert("Error fetching employees");
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/salary/add', {
                employeeId,
                basicSalary,
                allowances,
                deductions,
                payDate
            });
            if(response.data.success) {
                navigate('/admin-dashboard/employees');
            }
        } catch {
            alert("Error adding salary");
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-secondary p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-white">Add Salary</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Select Department */}
                    <div>
                        <label className="block text-sm font-medium text-white">Department</label>
                        <select 
                            name="department" 
                            value={department}
                            onChange={handleDepartmentChange} 
                            className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" 
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Select Employee */}
                    <div>
                        <label className="block text-sm font-medium text-white">Employee</label>
                        <select 
                            name="employeeId" 
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)} 
                            className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" 
                            required
                        >
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>{emp.employeeId} - {emp.userId.firstName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Basic Salary */}
                    <div>
                        <label className="block text-sm font-medium text-white">Basic Salary</label>
                        <input type="number" onChange={(e) => setBasicSalary(e.target.value)} placeholder="Basic Salary" className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" required />
                    </div>

                    {/* Allowances */}
                    <div>
                        <label className="block text-sm font-medium text-white">Allowances</label>
                        <input type="number" onChange={(e) => setAllowances(e.target.value)} placeholder="Allowances" className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" required />
                    </div>

                    {/* Deductions */}
                    <div>
                        <label className="block text-sm font-medium text-white">Deductions</label>
                        <input type="number" onChange={(e) => setDeductions(e.target.value)} placeholder="Deductions" className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" required />
                    </div>

                    {/* Pay Date */}
                    <div>
                        <label className="block text-sm font-medium text-white">Pay Date</label>
                        <input type="date" onChange={(e) => setPayDate(e.target.value)} className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" required />
                    </div>

                </div>

                <button 
                    type="submit"
                    className="w-full mt-6 bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                >
                    Pay Salary
                </button>
            </form>
        </div>
    )
}

export default Add;