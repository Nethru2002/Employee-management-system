import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import EmployeeList from './components/employee/List';
import AddEmployee from './components/employee/Add';
import EditEmployee from './components/employee/Edit';
import { AuthProvider } from './context/authContext';
import PrivateRoutes from './utils/PrivateRoutes';
import AddSalary from './components/salary/Add';
import ViewSalary from './components/salary/View';
import LeaveList from './components/leave/List';
import AddLeave from './components/leave/Add';
import LeaveDetail from './components/leave/Detail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin-dashboard" element={
            <PrivateRoutes>
               <AdminDashboard />
            </PrivateRoutes>
          }>
             <Route index element={<AdminSummary />} />

             {/* Department Routes */}
             <Route path="departments" element={<DepartmentList />} />
             <Route path="add-department" element={<AddDepartment />} />
             <Route path="department/:id" element={<EditDepartment />} />

             {/* Employee Routes */}
             <Route path="employees" element={<EmployeeList />} />
             <Route path="add-employee" element={<AddEmployee />} />
             <Route path="employees/:id" element={<EditEmployee />} />

             <Route path="salary" element={<Navigate to="/admin-dashboard/salary/add" />} />
             <Route path="salary/add" element={<AddSalary />} />
             <Route path="salary/:id" element={<ViewSalary />} />

             <Route path="leaves" element={<LeaveList />} />
             <Route path="leave/add" element={<AddLeave />} />
             <Route path="leave/:id" element={<LeaveDetail />} />
             
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;