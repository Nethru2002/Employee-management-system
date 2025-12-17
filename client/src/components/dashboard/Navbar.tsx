import { useAuth } from '../../context/authContext';
import { LogOut, Bell } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center h-16 bg-secondary px-6 shadow-md border-b border-gray-700">
      <div className="text-textMuted text-sm">
        Welcome Back, <span className="text-white font-bold">{user?.firstName}</span>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="text-textMuted hover:text-white transition">
            <Bell className="w-5 h-5" />
        </button>

        <button 
          onClick={logout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm transition shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;