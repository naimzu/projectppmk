import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { authStore } from '../../store/authStore';
import { ROUTES } from '../../config/routes';

export const AppShell: React.FC = () => {
  const [user, setUser] = useState(authStore.getUser());
  const [authReady, setAuthReady] = useState(authStore.isAuthReady());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getUser());
      setAuthReady(authStore.isAuthReady());
    });
    return unsubscribe;
  }, []);

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 relative">
        <Sidebar role={user.role} isOpen={isSidebarOpen} />
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
