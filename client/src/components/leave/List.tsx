import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Plus, Eye, Search } from 'lucide-react';
import { useAuth } from '../../context/authContext';

interface Leave {
  _id: string;
  employeeId: {
      userId: {
          firstName: string;
          lastName: string;
          profileImage: string;
      };
      employeeId: string;
      department: {
          dep_name: string;
      }
  };
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

const List = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [filteredLeaves, setFilteredLeaves] = useState<Leave[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await api.get('/api/leave'); 
        if (response.data.success) {
          setLeaves(response.data.leaves);
          setFilteredLeaves(response.data.leaves);
        }
      } catch {
        alert("Error fetching leaves");
      }
    };
    fetchLeaves();
  }, [user]);

  const filterByStatus = (status: string) => {
      if(status === 'All') {
          setFilteredLeaves(leaves);
      } else {
          setFilteredLeaves(leaves.filter(leave => leave.status === status));
      }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLowerCase();
      const records = leaves.filter(leave => 
        leave.employeeId.userId.firstName.toLowerCase().includes(value) ||
        leave.employeeId.employeeId.toLowerCase().includes(value)
      );
      setFilteredLeaves(records);
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Manage Leaves</h3>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
             {/* Search */}
            <div className="relative">
                <input 
                    type="text"
                    placeholder="Search By Name/ID"
                    className="bg-secondary text-white pl-10 pr-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-accent"
                    onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            </div>
            
            {/* Status Filter Buttons */}
            <div className='flex gap-2'>
                <button onClick={() => filterByStatus('Pending')} className='bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded'>Pending</button>
                <button onClick={() => filterByStatus('Approved')} className='bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded'>Approved</button>
                <button onClick={() => filterByStatus('Rejected')} className='bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded'>Rejected</button>
                <button onClick={() => filterByStatus('All')} className='bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded'>All</button>
            </div>
        </div>

        <Link 
            to="/admin-dashboard/leave/add" 
            className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition"
        >
            <Plus className="w-4 h-4" />
            Add New Leave
        </Link>
      </div>

      <div className="bg-secondary rounded-lg shadow-lg overflow-hidden">
            <table className="w-full text-left text-textMuted">
            <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
                <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Leave Type</th>
                <th className="px-6 py-3">From</th>
                <th className="px-6 py-3">To</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
                {filteredLeaves.map((leave, index) => (
                <tr key={leave._id} className="hover:bg-gray-700 transition align-middle">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-white">
                        {leave.employeeId.userId.firstName} {leave.employeeId.userId.lastName}
                    </td>
                    <td className="px-6 py-4">{leave.leaveType}</td>
                    <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold 
                            ${leave.status === 'Approved' ? 'bg-green-500 text-white' : 
                              leave.status === 'Rejected' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}>
                            {leave.status}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <Link 
                            to={`/admin-dashboard/leave/${leave._id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition flex w-fit"
                        >
                            <Eye className="w-4 h-4" />
                        </Link>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
      </div>
    </div>
  );
};

export default List;