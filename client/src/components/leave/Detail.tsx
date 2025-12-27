import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

interface Leave {
    _id: string;
    employeeId: {
        userId: {
            firstName: string;
            lastName: string;
            profileImage: string;
        };
        employeeId: string;
        designation: string;
    };
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
}

const Detail = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState<Leave | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await api.get(`/api/leave/${id}`);
                if (response.data.success) {
                    setLeave(response.data.leave);
                }
            } catch {
                alert("Error fetching leave details");
            }
        };
        fetchLeave();
    }, [id]);

    const changeStatus = async (status: string) => {
        try {
            const response = await api.put(`/api/leave/${id}`, { status });
            if(response.data.success) {
                navigate('/admin-dashboard/leaves');
            }
        } catch {
            alert("Error updating status");
        }
    }

    if (!leave) return <div className='text-white text-center mt-10'>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-secondary p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Leave Details</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-textMuted'>
                <div className='flex items-center gap-4'>
                    <img 
                        src={`http://localhost:5000/uploads/${leave.employeeId.userId.profileImage}`} 
                        alt="" 
                        className="w-24 h-24 rounded-full object-cover border-2 border-accent"
                    />
                    <div>
                        <h3 className='text-xl font-bold text-white'>
                            {leave.employeeId.userId.firstName} {leave.employeeId.userId.lastName}
                        </h3>
                        <p>{leave.employeeId.designation}</p>
                        <p className='text-sm'>Emp ID: {leave.employeeId.employeeId}</p>
                    </div>
                </div>

                <div className='bg-primary p-4 rounded-md'>
                    <p className='mb-2'><strong>Leave Type:</strong> {leave.leaveType}</p>
                    <p className='mb-2'><strong>Reason:</strong> {leave.reason}</p>
                    <p className='mb-2'><strong>Status:</strong> 
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold 
                            ${leave.status === 'Approved' ? 'bg-green-500 text-white' : 
                              leave.status === 'Rejected' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}>
                            {leave.status}
                        </span>
                    </p>
                    <p><strong>Duration:</strong> {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Action Buttons: Only show if Pending */}
            {leave.status === 'Pending' && (
                <div className='flex justify-center gap-4 mt-8'>
                    <button 
                        onClick={() => changeStatus("Approved")}
                        className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded'
                    >
                        Approve
                    </button>
                    <button 
                        onClick={() => changeStatus("Rejected")}
                        className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded'
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    )
}

export default Detail;