import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Settings, FileText, Wallet } from 'lucide-react';
import { useAuth } from '../../context/authContext';

const Sidebar = () => {
  const { user } = useAuth();

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-200 ${
      isActive
        ? "bg-accent text-white shadow-md"
        : "text-textMuted hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <div className="bg-secondary text-white h-screen fixed left-0 top-0 bottom-0 w-64 flex flex-col shadow-xl">
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <h3 className="text-2xl font-bold font-pacific text-center font-sans tracking-wider">
          Enterprise EMS
        </h3>
      </div>

      <div className="px-4 py-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Main</p>
        <NavLink to="/admin-dashboard" className={navItemClass} end>
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/admin-dashboard/employees" className={navItemClass}>
          <Users className="w-5 h-5" />
          <span>Employees</span>
        </NavLink>
        
        <NavLink to="/admin-dashboard/departments" className={navItemClass}>
          <Building2 className="w-5 h-5" />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/admin-dashboard/leaves" className={navItemClass}>
          <FileText className="w-5 h-5" />
          <span>Leave</span>
        </NavLink>

        <NavLink to="/admin-dashboard/salary" className={navItemClass}>
          <Wallet className="w-5 h-5" />
          <span>Salary / Payroll</span>
        </NavLink>

        <NavLink to="/admin-dashboard/settings" className={navItemClass}>
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </div>

      {/* Footer / User Info */}
      <div className="mt-auto p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold">
                 {user?.firstName?.charAt(0)}
              </div>
              <div>
                  <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Sidebar;