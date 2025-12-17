import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminSummary from './components/dashboard/AdminSummary';
import { AuthProvider } from './context/authContext';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/admin-dashboard" element={
            <PrivateRoutes>
               <AdminDashboard />
            </PrivateRoutes>
          }>
             {/* Nested Routes inside Dashboard */}
             <Route index element={<AdminSummary />} />
             
             {/* We will build these next! */}
             <Route path="employees" element={<div className='text-white'>Employee List Coming Soon</div>} />
             <Route path="departments" element={<div className='text-white'>Department List Coming Soon</div>} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;