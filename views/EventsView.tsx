
import React, { useState } from 'react';
import { Card, Button, StatusBadge, SegmentedControl, ProgressBar } from '../components/CoreComponents';
import { MOCK_EVENTS } from '../mockData';
import { Calendar, MapPin, Users, Plus, ClipboardList, Shield, GraduationCap, Trophy } from 'lucide-react';
import { FederationEvent, EventType } from '../types';

export const EventsView: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredEvents = filter === 'All' 
    ? MOCK_EVENTS 
    : MOCK_EVENTS.filter(e => {
        if (filter === 'Tournaments') return e.type === 'Tournament' || e.type === 'Selection';
        if (filter === 'Promotions') return e.type === 'Promotion Test';
        if (filter === 'Education') return e.type === 'Workshop';
        return true;
    });

  const getEventIcon = (type: EventType) => {
    switch(type) {
        case 'Tournament': return <Trophy size={20} className="text-yellow-600"/>;
        case 'Promotion Test': return <GraduationCap size={20} className="text-slate-900"/>;
        case 'Workshop': return <ClipboardList size={20} className="text-blue-600"/>;
        case 'Selection': return <Shield size={20} className="text-red-600"/>;
        default: return <Calendar size={20} className="text-slate-500"/>;
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Events Management</h2>
            <p className="text-slate-500">Centralized operations for tournaments, grading, and workshops.</p>
          </div>
          <Button><Plus size={16} className="mr-2"/> Create Event</Button>
       </div>

       <SegmentedControl 
         options={['All', 'Tournaments', 'Promotions', 'Education']} 
         value={filter} 
         onChange={setFilter} 
         className="w-full md:w-auto"
       />

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
             <Card key={event.id} className="p-6 hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-slate-900 group">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                         {getEventIcon(event.type)}
                      </div>
                      <div>
                         <StatusBadge status={event.type} />
                         <span className="text-xs text-slate-400 ml-2 uppercase font-medium tracking-wide">
                            Org: {event.organizer}
                         </span>
                      </div>
                   </div>
                   <StatusBadge status={event.status} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{event.description}</p>

                {/* Operations Data Grid */}
                <div className="bg-slate-50 rounded-xl p-4 mb-6 grid grid-cols-2 gap-4 text-sm">
                   <div>
                      <span className="text-slate-400 text-xs block mb-1">Date</span>
                      <span className="font-medium text-slate-700 flex items-center gap-1">
                         <Calendar size={14} className="text-slate-400"/> {event.date}
                      </span>
                   </div>
                   <div>
                      <span className="text-slate-400 text-xs block mb-1">Location</span>
                      <span className="font-medium text-slate-700 flex items-center gap-1 truncate">
                         <MapPin size={14} className="text-slate-400"/> {event.location}
                      </span>
                   </div>
                   <div>
                      <span className="text-slate-400 text-xs block mb-1">Fee</span>
                      <span className="font-medium text-slate-900">
                         {event.fee ? `${event.fee} AED` : 'Free'}
                      </span>
                   </div>
                   <div>
                      <span className="text-slate-400 text-xs block mb-1">Supervisors</span>
                      <span className="font-medium text-slate-700 truncate">
                         {event.supervisors?.length ? `${event.supervisors.length} Panelists` : 'TBD'}
                      </span>
                   </div>
                </div>

                {/* Registration Progress */}
                {event.capacity && (
                   <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                         <span className="font-medium text-slate-700 flex items-center gap-2">
                            <Users size={14} /> Registrations
                         </span>
                         <span className="text-slate-500">
                            <span className="font-bold text-slate-900">{event.registeredCount}</span> / {event.capacity}
                         </span>
                      </div>
                      <ProgressBar 
                        progress={(event.registeredCount || 0) / event.capacity * 100} 
                        colorClass={(event.registeredCount || 0) / event.capacity > 0.9 ? 'bg-red-500' : 'bg-blue-600'}
                      />
                   </div>
                )}
                
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-2">
                   <Button size="sm" variant="outline">View Panel</Button>
                   <Button size="sm">Manage Event</Button>
                </div>
             </Card>
          ))}
       </div>
    </div>
  );
};
