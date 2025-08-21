import React from 'react';
import { NavLink } from 'react-router-dom';
import { sidebarConfig } from '../../config/routes';
import { UserRole } from '../../types';
import clsx from 'clsx';

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, isOpen }) => {
  const routes = sidebarConfig[role] || [];

  return (
    <aside className={clsx(
      'glass-dark h-full transition-all duration-300 lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full',
      'fixed lg:relative z-40 w-64'
    )}>
      <nav className="p-4 space-y-2">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                  isActive
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                )
              }
            >
              <Icon size={20} />
              <span>{route.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
