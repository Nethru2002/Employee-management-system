import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

interface Salary {
  _id: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  payDate: string;
  employeeId: {
      employeeId: string;
  }
}

const View = () => {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchSalaries = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/salary/${id}`);
        if (response.data.success) {
          setSalaries(response.data.salary);
        }
      } catch {
        alert("Error fetching salary history");
      } finally {
        setLoading(false);
      }
    };
    fetchSalaries();
  }, [id]);

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white">Salary History</h3>
      </div>

      <div className="bg-secondary rounded-lg shadow-lg overflow-hidden">
        {loading ? (
            <div className="p-6 text-center text-white">Loading...</div>
        ) : (
             salaries.length === 0 ? (
                 <div className="p-6 text-center text-textMuted">No salary records found for this employee.</div>
             ) : (
            <table className="w-full text-left text-textMuted">
            <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
                <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Emp ID</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">Allowance</th>
                <th className="px-6 py-3">Deduction</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Pay Date</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
                {salaries.map((salary, index) => (
                <tr key={salary._id} className="hover:bg-gray-700 transition">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{salary.employeeId.employeeId}</td>
                    <td className="px-6 py-4">{salary.basicSalary}</td>
                    <td className="px-6 py-4">{salary.allowances}</td>
                    <td className="px-6 py-4">{salary.deductions}</td>
                    <td className="px-6 py-4 font-bold text-green-400">{salary.netSalary}</td>
                    <td className="px-6 py-4">{new Date(salary.payDate).toLocaleDateString()}</td>
                </tr>
                ))}
            </tbody>
            </table>
             )
        )}
      </div>
    </div>
  );
};

export default View;