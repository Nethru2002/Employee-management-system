import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Lock, Mail } from 'lucide-react';
import { isAxiosError } from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post('/api/auth/login', { email, password });
      
      if (response.data.success) {
        login(response.data.token, response.data.user);
        navigate('/admin-dashboard'); 
      }
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.error);
      } else {
        setError("Server Error. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-textMain">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-secondary">
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
          Employee Management
        </h2>
        <p className="mb-6 text-center text-textMuted">Sign in to your enterprise account</p>

        {error && <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 border border-red-400 rounded">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-textMuted" htmlFor="email">Email Address</label>
            <div className="relative">
                <Mail className="absolute left-3 top-3 text-textMuted h-5 w-5" />
                <input
                type="email"
                id="email"
                className="w-full px-10 py-2 border rounded-md bg-primary text-textMain border-gray-600 focus:outline-none focus:border-accent"
                placeholder="admin@ems.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-textMuted" htmlFor="password">Password</label>
            <div className="relative">
                <Lock className="absolute left-3 top-3 text-textMuted h-5 w-5" />
                <input
                type="password"
                id="password"
                className="w-full px-10 py-2 border rounded-md bg-primary text-textMain border-gray-600 focus:outline-none focus:border-accent"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-bold text-white transition duration-200 rounded bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 shadow-md transform active:scale-95"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;