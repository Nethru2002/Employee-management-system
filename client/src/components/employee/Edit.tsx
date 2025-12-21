import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

interface Department {
    _id: string;
    dep_name: string;
}

const Edit = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        maritalStatus: '',
        designation: '',
        department: '',
        salary: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 1. Fetch Departments
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

    // 2. Fetch Employee Data
    useEffect(() => {
        const fetchEmployee = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/employees/${id}`);
                if (response.data.success) {
                    const emp = response.data.employee;
                    setFormData({
                        firstName: emp.userId.firstName,
                        lastName: emp.userId.lastName,
                        maritalStatus: emp.maritalStatus,
                        designation: emp.designation,
                        department: emp.department._id,
                        salary: emp.salary,
                    });
                }
            } catch {
                alert("Error fetching employee data");
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.put(`/api/employees/${id}`, formData);
            if(response.data.success) {
                navigate('/admin-dashboard/employees');
            }
        } catch {
            alert("Error Updating Employee");
        }
    }

    if (loading) return <div className='text-white text-center mt-10'>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-secondary p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-white">Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-white">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-white">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label className="block text-sm font-medium text-white">Marital Status</label>
                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white">
                            <option value="">Select Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="block text-sm font-medium text-white">Designation</label>
                        <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-white">Department</label>
                        <select name="department" value={formData.department} onChange={handleChange} required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white">
                            <option value="">Select Department</option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-white">Salary</label>
                        <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" />
                    </div>

                </div>

                <button 
                    type="submit"
                    className="w-full mt-6 bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                >
                    Update Employee
                </button>
            </form>
        </div>
    )
}

export default Edit;