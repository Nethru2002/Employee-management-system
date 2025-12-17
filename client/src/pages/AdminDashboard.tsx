import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Navbar from '../components/dashboard/Navbar';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-primary">
      {/* Left Side */}
      <Sidebar />

      {/* Right Side (Main Content) */}
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <Navbar />
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 scrollbar-hide">
             <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;