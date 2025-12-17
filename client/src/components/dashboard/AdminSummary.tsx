import React from 'react';
import { Users, Building2, DollarSign } from 'lucide-react';

// Reusable Card Component
const SummaryCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg shadow-lg border-l-4 border-transparent hover:border-accent transition duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-textMuted text-sm uppercase tracking-wide mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-white">{value}</h3>
                </div>
                <div className={`p-3 rounded-full ${color} bg-opacity-20 text-white`}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

const AdminSummary = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard title="Total Employees" value={12} icon={<Users />} color="bg-blue-600" />
        <SummaryCard title="Departments" value={4} icon={<Building2 />} color="bg-yellow-600" />
        <SummaryCard title="Monthly Pay" value="$14,500" icon={<DollarSign />} color="bg-green-600" />
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-secondary p-6 rounded-lg shadow-lg">
             <h4 className="text-xl font-bold text-white mb-4">Leave Requests (Pending)</h4>
             <div className="text-textMuted text-sm italic">No pending requests found.</div>
         </div>

         <div className="bg-secondary p-6 rounded-lg shadow-lg">
             <h4 className="text-xl font-bold text-white mb-4">Task Status</h4>
             <div className="text-textMuted text-sm italic">System running smoothly.</div>
         </div>
      </div>
    </div>
  );
};

export default AdminSummary;