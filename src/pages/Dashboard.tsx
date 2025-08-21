import React, { useEffect, useState } from 'react';
import { Calendar, Users, Megaphone, FileText, TrendingUp, Activity } from 'lucide-react';
import { authStore } from '../store/authStore';
import { dataStore } from '../store/dataStore';
import { formatDate, isEventUpcoming } from '../utils/date';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';

export const Dashboard: React.FC = () => {
  const [user] = useState(authStore.getUser());
  const events = dataStore.getEvents();
  const announcements = dataStore.getAnnouncements();
  const clubs = dataStore.getClubs();

  const upcomingEvents = events.filter(isEventUpcoming).length;
  const myEvents = user ? events.filter(e => e.attendees.includes(user.id)).length : 0;

  const roleWidgets = {
    PPMK_MEMBER: [
      { label: 'Upcoming Events', value: upcomingEvents, icon: Calendar, color: 'bg-blue-500/20' },
      { label: 'Available Clubs', value: clubs.length, icon: Users, color: 'bg-green-500/20' },
      { label: 'Announcements', value: announcements.length, icon: Megaphone, color: 'bg-purple-500/20' },
      { label: 'My Applications', value: 1, icon: FileText, color: 'bg-orange-500/20' }
    ],
    CLUB_MEMBER: [
      { label: 'Club Events', value: myEvents, icon: Calendar, color: 'bg-blue-500/20' },
      { label: 'Announcements', value: announcements.length, icon: Megaphone, color: 'bg-purple-500/20' },
      { label: 'Activities', value: 12, icon: Activity, color: 'bg-green-500/20' },
      { label: 'Progress', value: '85%', icon: TrendingUp, color: 'bg-orange-500/20' }
    ],
    CLUB_HICOM: [
      { label: 'Managed Events', value: events.filter(e => e.organizerId === user?.id).length, icon: Calendar, color: 'bg-blue-500/20' },
      { label: 'Club Members', value: 45, icon: Users, color: 'bg-green-500/20' },
      { label: 'Pending Applications', value: 1, icon: FileText, color: 'bg-orange-500/20' },
      { label: 'Active Proposals', value: 1, icon: TrendingUp, color: 'bg-purple-500/20' }
    ],
    PPMK_BIRO: [
      { label: 'Total Events', value: events.length, icon: Calendar, color: 'bg-blue-500/20' },
      { label: 'Total Clubs', value: clubs.length, icon: Users, color: 'bg-green-500/20' },
      { label: 'Total Members', value: 135, icon: Users, color: 'bg-purple-500/20' },
      { label: 'System Health', value: '98%', icon: Activity, color: 'bg-green-500/20' }
    ],
    PPMK_HICOM: [
      { label: 'Total Events', value: events.length, icon: Calendar, color: 'bg-blue-500/20' },
      { label: 'Pending Proposals', value: 1, icon: FileText, color: 'bg-orange-500/20' },
      { label: 'Active Clubs', value: clubs.length, icon: Users, color: 'bg-green-500/20' },
      { label: 'System Activity', value: '94%', icon: Activity, color: 'bg-purple-500/20' }
    ]
  };

  const widgets = user ? roleWidgets[user.role] : [];

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-300">Here's your overview for today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgets.map((widget, index) => {
          const Icon = widget.icon;
          return (
            <div key={index} className="glass-card p-6">
              <div className={`inline-flex p-3 rounded-lg ${widget.color} mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <p className="text-gray-300 text-sm mb-1">{widget.label}</p>
              <p className="text-2xl font-bold text-white">{widget.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {events.filter(isEventUpcoming).slice(0, 3).map(event => (
              <Link 
                key={event.id} 
                to={ROUTES.EVENTS}
                className="block glass rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-white">{event.title}</h3>
                    <p className="text-sm text-gray-300 mt-1">{event.location}</p>
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(event.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Announcements</h2>
          <div className="space-y-3">
            {announcements.slice(0, 3).map(announcement => (
              <Link 
                key={announcement.id}
                to={ROUTES.ANNOUNCEMENTS}
                className="block glass rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <h3 className="font-medium text-white">{announcement.title}</h3>
                <p className="text-sm text-gray-300 mt-1 line-clamp-2">{announcement.content}</p>
                <p className="text-xs text-gray-400 mt-2">By {announcement.author}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {user?.role === 'CLUB_HICOM' && (
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to={ROUTES.EVENTS} className="glass-button text-center py-3">
              Create Event
            </Link>
            <Link to={ROUTES.APPLICATIONS_REVIEW} className="glass-button text-center py-3">
              Review Applications
            </Link>
            <Link to={ROUTES.PROPOSALS} className="glass-button text-center py-3">
              Submit Proposal
            </Link>
            <Link to={ROUTES.CLUB_MANAGE} className="glass-button text-center py-3">
              Manage Members
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
