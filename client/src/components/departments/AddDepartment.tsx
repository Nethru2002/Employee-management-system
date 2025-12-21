import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import api from '../../services/api';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/departments/add', department);
            if(response.data.success) {
                navigate('/admin-dashboard/departments');
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                alert(error.response.data.error || "Error Adding Department");
            } else {
                alert("Server Error. Please check the backend terminal.");
            }
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-secondary p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-white">Add New Department</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="dep_name" className="text-sm font-medium text-white">Department Name</label>
                    <input 
                        type="text" 
                        name="dep_name"
                        onChange={handleChange}
                        placeholder="Enter Dep Name" 
                        className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white focus:outline-none focus:border-accent" 
                        required 
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="description" className="text-sm font-medium text-white">Description</label>
                    <textarea 
                        name="description" 
                        placeholder="Description"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white focus:outline-none focus:border-accent" 
                        rows={4}
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full mt-6 bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                >
                    Add Department
                </button>
            </form>
        </div>
    )
}

export default AddDepartment;