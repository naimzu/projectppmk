import React, { useState, useEffect } from 'react';
import { Bell, LogOut, User, Menu, X } from 'lucide-react';
import { authStore } from '../../store/authStore';
import { dataStore } from '../../store/dataStore';
import { formatRelative } from '../../utils/date';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';

interface TopBarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuToggle, isSidebarOpen }) => {
  const [user, setUser] = useState(authStore.getUser());
  const [notifications, setNotifications] = useState(user ? dataStore.getNotifications(user.id) : []);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      const currentUser = authStore.getUser();
      setUser(currentUser);
      if (currentUser) {
        setNotifications(dataStore.getNotifications(currentUser.id));
      }
    });
    return unsubscribe;
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    if (user) {
      dataStore.markNotificationsAsRead(user.id);
      setNotifications(dataStore.getNotifications(user.id));
    }
  };

  const handleLogout = () => {
    authStore.logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="glass-dark border-b border-white/10 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="glass-button p-2 lg:hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-semibold text-white">PPMK Management System</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="glass-button p-2 relative"
            >
              <Bell size={20} className="text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass-card p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-xs text-blue-300 hover:text-blue-200"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {notifications.slice(0, 5).map(notification => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg ${notification.read ? 'bg-white/5' : 'bg-white/10'} cursor-pointer hover:bg-white/15 transition-colors`}
                      onClick={() => notification.link && navigate(notification.link)}
                    >
                      <div className="flex items-start gap-2">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5"></div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{notification.title}</p>
                          <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatRelative(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate(ROUTES.NOTIFICATIONS);
                  }}
                  className="w-full mt-3 text-center text-sm text-blue-300 hover:text-blue-200"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 glass rounded-lg px-3 py-2">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
            ) : (
              <User size={20} className="text-white" />
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-300">{user?.role.replace(/_/g, ' ')}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="glass-button p-2 hover:bg-red-500/20"
          >
            <LogOut size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
