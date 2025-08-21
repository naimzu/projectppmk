
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, ChevronRight } from 'lucide-react';
import { dataStore } from '../store/dataStore';
import { authStore } from '../store/authStore';
import { formatDate, formatDateTime, isEventPast, isEventUpcoming } from '../utils/date';
import clsx from 'clsx';

export const Events: React.FC = () => {
  const [user] = useState(authStore.getUser());
  const [events, setEvents] = useState(dataStore.getEvents());
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredEvents = events.filter(event => {
    if (filter === 'upcoming') return isEventUpcoming(event.date);
    if (filter === 'past') return isEventPast(event.date);
    return true;
  });

  const handleRSVP = (eventId: string) => {
    if (!user) return;
    
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    // Organizers cannot RSVP to their own events
    if (event.organizerId === user.id) return;
    
    const isAttending = event.attendees.includes(user.id);
    dataStore.rsvpEvent(eventId, user.id, !isAttending);
    setEvents(dataStore.getEvents());
  };

  const canRSVP = (event: typeof events[0]) => {
    return user && event.organizerId !== user.id && isEventUpcoming(event.date);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Events</h1>
        
        <div className="flex gap-2">
          {(['all', 'upcoming', 'past'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                'px-4 py-2 rounded-lg transition-all capitalize',
                filter === f ? 'glass bg-white/20 text-white' : 'glass-button'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => {
          const isAttending = user ? event.attendees.includes(user.id) : false;
          const isPast = isEventPast(event.date);
          const isOrganizer = user?.id === event.organizerId;
          
          return (
            <div key={event.id} className="glass-card overflow-hidden">
              {event.image && (
                <img 
                  src={event.image} 
                  alt={event.title}
                  className={clsx(
                    'w-full h-48 object-cover',
                    isPast && 'opacity-50'
                  )}
                />
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                  {isPast && (
                    <span className="text-xs bg-gray-500/30 text-gray-300 px-2 py-1 rounded">
                      Past
                    </span>
                  )}
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar size={16} />
                    <span