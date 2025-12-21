import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/departments/${id}`);
                if(response.data.success) {
                    setDepartment(response.data.department);
                }
            } catch {
                alert("Error fetching department");
            } finally {
                setLoading(false);
            }
        }
        fetchDepartment();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.put(`/api/departments/${id}`, department);
            if(response.data.success) {
                navigate('/admin-dashboard/departments');
            }
        } catch {
            alert("Error Updating Department");
        }
    }

    if(loading) return <div className='text-white text-center mt-10'>Loading...</div>

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-secondary p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-white">Edit Department</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="dep_name" className="text-sm font-medium text-white">Department Name</label>
                    <input 
                        type="text" 
                        name="dep_name"
                        value={department.dep_name}
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
                        value={department.description}
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
                    Update Department
                </button>
            </form>
        </div>
    )
}

export default EditDepartment;