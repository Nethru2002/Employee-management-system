import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/authContext';

const Add = () => {
    const { user } = useAuth();
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/leave/add', {
                userId: user?._id, 
                leaveType,
                startDate,
                endDate,
                reason
            });
            if(response.data.success) {
                navigate('/admin-dashboard/leaves');
            }
        } catch {
            alert("Error Adding Leave");
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-secondary p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-white">Request Leave</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                    
                    {/* Leave Type */}
                    <div>
                        <label className="block text-sm font-medium text-white">Leave Type</label>
                        <select 
                            onChange={(e) => setLeaveType(e.target.value)} 
                            className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" 
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-white">From Date</label>
                        <input type="date" onChange={(e) => setStartDate(e.target.value)} className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" required />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-medium text-white">To Date</label>
                        <input type="date" onChange={(e) => setEndDate(e.target.value)} className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" required />
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="block text-sm font-medium text-white">Reason</label>
                        <textarea 
                            onChange={(e) => setReason(e.target.value)} 
                            className="mt-1 w-full p-2 block border border-gray-600 rounded-md bg-primary text-white" 
                            rows={4}
                            required 
                            placeholder="Reason for leave..."
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    className="w-full mt-6 bg-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                >
                    Submit Request
                </button>
            </form>
        </div>
    )
}

export default Add;