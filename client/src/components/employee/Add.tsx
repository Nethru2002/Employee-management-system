import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

// Defined Interface for Department
interface Department {
    _id: string;
    dep_name: string;
}

const Add = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        employeeId: '',
        dob: '',
        gender: '',
        maritalStatus: '',
        designation: '',
        department: '',
        salary: '',
        role: ''
    });
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();

    // Fetch Departments for Dropdown
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key as keyof typeof formData]);
        });
        if(image) {
            data.append('image', image);
        }

        try {
            const response = await api.post('/api/employees/add', data);
            if(response.data.success) {
                navigate('/admin-dashboard/employees');
            }
        } catch {
            alert("Error Adding Employee");
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-secondary p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-white">Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-white">First Name</label>
                        <input type="text" name="firstName" onChange={handleChange} placeholder="First Name" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>
                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-white">Last Name</label>
                        <input type="text" name="lastName" onChange={handleChange} placeholder="Last Name" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-white">Email</label>
                        <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>
                    {/* Employee ID */}
                    <div>
                        <label className="block text-sm font-medium text-white">Employee ID</label>
                        <input type="text" name="employeeId" onChange={handleChange} placeholder="EMP001" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>
                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-white">Date of Birth</label>
                        <input type="date" name="dob" onChange={handleChange} required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>
                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-white">Gender</label>
                        <select name="gender" onChange={handleChange} required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {/* Marital Status */}
                    <div>
                        <label className="block text-sm font-medium text-white">Marital Status</label>
                        <select name="maritalStatus" onChange={handleChange} required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white">
                            <option value="">Select Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>
                    {/* Designation */}
                    <div>
                        <label className="block text-sm font-medium text-white">Designation</label>
                        <input type="text" name="designation" onChange={handleChange} placeholder="Software Engineer" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>
                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-white">Department</label>
                        <select name="department" onChange={handleChange} required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white">
                            <option value="">Select Department</option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>
                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-white">Salary</label>
                        <input type="number" name="salary" onChange={handleChange} placeholder="50000" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>
                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-white">Password</label>
                        <input type="password" name="password" onChange={handleChange} placeholder="******" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>
                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-white">Role</label>
                        <select name="role" onChange={handleChange} required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white">
                            <option value="">Select Role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="EMPLOYEE">Employee</option>
                        </select>
                    </div>
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-white">Upload Image</label>
                        <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>
                </div>
                <button 
                    type="submit"
                    className="w-full mt-6 bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                >
                    Add Employee
                </button>
            </form>
        </div>
    )
}

export default Add;