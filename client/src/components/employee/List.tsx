import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

interface Employee {
  _id: string;
  employeeId: string;
  dob: string;
  profileImage: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  department: {
    dep_name: string;
  };
}

const List = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterEmployees, setFilterEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/employees');
        if (response.data.success) {
          setEmployees(response.data.employees);
          setFilterEmployees(response.data.employees);
        }
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const records = employees.filter((emp) => 
      emp.userId.firstName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterEmployees(records);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this employee?")) {
        try {
            const response = await api.delete(`/api/employees/${id}`);
            if(response.data.success) {
                const updated = employees.filter(emp => emp._id !== id);
                setEmployees(updated);
                setFilterEmployees(updated);
            }
        } catch {
            alert("Error deleting employee");
        }
    }
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Manage Employees</h3>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
            <input 
                type="text"
                placeholder="Search By Name"
                className="bg-secondary text-white pl-10 pr-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-accent"
                onChange={handleFilter}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>

        <Link 
            to="/admin-dashboard/add-employee" 
            className="bg-accent hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 transition"
        >
            <Plus className="w-4 h-4" />
            Add New Employee
        </Link>
      </div>

      <div className="bg-secondary rounded-lg shadow-lg overflow-hidden">
        {loading ? (
            <div className="p-6 text-center text-white">Loading...</div>
        ) : (
            <table className="w-full text-left text-textMuted">
            <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
                <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">DOB</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
                {filterEmployees.map((emp, index) => (
                <tr key={emp._id} className="hover:bg-gray-700 transition align-middle">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                        <img 
                            src={`http://localhost:5000/uploads/${emp.profileImage}`} 
                            alt=""
                            className="w-10 h-10 rounded-full object-cover border border-gray-600" 
                        />
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                        {emp.userId.firstName} {emp.userId.lastName}
                    </td>
                    <td className="px-6 py-4">{new Date(emp.dob).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{emp.department.dep_name}</td>
                    <td className="px-6 py-4 flex gap-4">
                        <Link 
                            to={`/admin-dashboard/employees/${emp._id}`}
                            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition"
                        >
                            <Pencil className="w-4 h-4" />
                        </Link>
                        
                        {/* New Salary Button */}
                        <Link 
                            to={`/admin-dashboard/salary/${emp._id}`}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded transition flex items-center justify-center min-w-[32px]"
                            title="Salary History"
                        >
                             <span className="text-md font-bold text-white">$</span>
                        </Link>

                        <button 
                            onClick={() => handleDelete(emp._id)}
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

export default List;