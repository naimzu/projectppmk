import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Megaphone, ArrowRight } from 'lucide-react';
import { dataStore } from '../store/dataStore';
import { formatDate, isEventUpcoming } from '../utils/date';
import { ROUTES } from '../config/routes';

export const Landing: React.FC = () => {
  const events = dataStore.getEvents().filter(isEventUpcoming).slice(0, 3);
  const clubs = dataStore.getClubs();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="glass-dark border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">PPMK Club Management</h1>
              <Link to={ROUTES.LOGIN} className="glass-button">
                Login
              </Link>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              Welcome to PPMK Club Management System
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Connect, collaborate, and grow with our vibrant community of clubs and members
            </p>
            <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-2 glass-button text-lg px-6 py-3">
              Get Started <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Public Events */}
      <div className="container mx-auto px-6 py-16">
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-white" size={28} />
            <h3 className="text-2xl font-bold text-white">Upcoming Events</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event.id} className="glass rounded-lg overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-2">{event.title}</h4>
                  <p className="text-sm text-gray-300 mb-2">{event.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{formatDate(event.date)}</span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clubs */}
      <div className="container mx-auto px-6 py-16">
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-white" size={28} />
            <h3 className="text-2xl font-bold text-white">Our Clubs</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {clubs.map(club => (
              <div key={club.id} className="glass rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">{club.logo}</div>
                <h4 className="font-semibold text-white mb-2">{club.name}</h4>
                <p className="text-sm text-gray-300 mb-4">{club.description}</p>
                <div className="text-sm text-gray-400">
                  {club.memberCount} members
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="glass-card p-12 text-center">
          <Megaphone className="text-white mx-auto mb-4" size={48} />
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Join Our Community?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Login to access exclusive features, join clubs, participate in events, and connect with fellow members.
          </p>
          <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-2 glass-button text-lg px-8 py-4">
            Login Now <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
