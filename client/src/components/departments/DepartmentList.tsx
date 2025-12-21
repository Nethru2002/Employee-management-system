import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

interface Department {
  _id: string;
  dep_name: string;
  description: string;
}

const DepartmentList = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterRecords, setFilterRecords] = useState<Department[]>([]);

  // Fetch Departments on Load
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/departments');
        if (response.data.success) {
          setDepartments(response.data.departments);
          setFilterRecords(response.data.departments);
        }
      } catch {
        alert("Error fetching departments");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  // Search Functionality
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const records = departments.filter((dep) => 
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterRecords(records);
  };

  // Delete Functionality
  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this department?")) {
        try {
            const response = await api.delete(`/api/departments/${id}`);
            if(response.data.success) {
                // Remove from state immediately (Optimistic UI)
                const updatedDeps = departments.filter(dep => dep._id !== id);
                setDepartments(updatedDeps);
                setFilterRecords(updatedDeps);
            }
        } catch {
            alert("Error deleting department");
        }
    }
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Manage Departments</h3>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        {/* Search Bar */}
        <div className="relative">
            <input 
                type="text"
                placeholder="Search By Dep Name"
                className="bg-secondary text-white pl-10 pr-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-accent"
                onChange={handleFilter}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>

        {/* Add Button */}
        <Link 
            to="/admin-dashboard/add-department" 
            className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition"
        >
            <Plus className="w-4 h-4" />
            Add New Department
        </Link>
      </div>

      {/* Table */}
      <div className="bg-secondary rounded-lg shadow-lg overflow-hidden">
        {loading ? (
            <div className="p-6 text-center text-white">Loading...</div>
        ) : (
            <table className="w-full text-left text-textMuted">
            <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
                <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Department Name</th>
                <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
                {filterRecords.map((dep, index) => (
                <tr key={dep._id} className="hover:bg-gray-700 transition">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-white">{dep.dep_name}</td>
                    <td className="px-6 py-4 flex gap-4">
                        <Link 
                            to={`/admin-dashboard/department/${dep._id}`}
                            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition"
                        >
                            <Pencil className="w-4 h-4" />
                        </Link>
                        <button 
                            onClick={() => handleDelete(dep._id)}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;