import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Users } from 'lucide-react';
import { authStore } from '../store/authStore';
import { ROUTES } from '../config/routes';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authStore.login(email, password)) {
      navigate(ROUTES.DASHBOARD);
    } else {
      setError('Invalid email or password');
    }
  };

  const quickLogin = (email: string) => {
    setEmail(email);
    setPassword('password123');
  };

  const testAccounts = [
    { email: 'member@ppmk.local', role: 'PPMK Member' },
    { email: 'clubmember@ppmk.local', role: 'Club Member' },
    { email: 'clubhicom@ppmk.local', role: 'Club HICOM' },
    { email: 'biro@ppmk.local', role: 'PPMK BIRO' },
    { email: 'hicom@ppmk.local', role: 'PPMK HICOM' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <Users className="text-white mx-auto mb-4" size={48} />
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Login to PPMK Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full glass-button py-3 flex items-center justify-center gap-2 font-medium"
            >
              <LogIn size={20} />
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to={ROUTES.LANDING} className="text-sm text-gray-300 hover:text-white">
              Back to Home
            </Link>
          </div>
        </div>

        {/* Test Accounts */}
        <div className="glass-card p-6 mt-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Quick Login (Test Accounts)</h3>
          <div className="space-y-2">
            {testAccounts.map(account => (
              <button
                key={account.email}
                onClick={() => quickLogin(account.email)}
                className="w-full text-left glass hover:bg-white/10 rounded-lg px-3 py-2 transition-colors"
              >
                <p className="text-sm text-white font-medium">{account.role}</p>
                <p className="text-xs text-gray-400">{account.email}</p>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Password: password123</p>
        </div>
      </div>
    </div>
  );
};
