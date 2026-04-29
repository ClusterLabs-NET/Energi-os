
import React from 'react';
import { Card, Button, StatusBadge } from '../components/CoreComponents';
import { MOCK_EVENTS } from '../mockData';
import { Calendar as CalendarIcon, MapPin, Users, Clock } from 'lucide-react';

export const CalendarView: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Federation Calendar 2025</h2>
          <Button><CalendarIcon size={16} className="mr-2"/> Add Event</Button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
             {MOCK_EVENTS.map(event => (
                <Card key={event.id} className="p-0 flex flex-col md:flex-row overflow-hidden group hover:shadow-md transition-shadow">
                   <div className="bg-slate-100 p-6 flex flex-col items-center justify-center min-w-[120px] border-r border-slate-200">
                      <span className="text-red-600 font-bold text-xl">{new Date(event.date).getDate()}</span>
                      <span className="text-slate-500 uppercase text-xs font-medium">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-slate-400 text-xs">{new Date(event.date).getFullYear()}</span>
                   </div>
                   <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                         <StatusBadge status={event.status} />
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-4">
                         <span className="flex items-center gap-1"><MapPin size={14}/> {event.location}</span>
                         <span className="flex items-center gap-1"><Users size={14}/> {event.participants} Participants</span>
                         <span className="flex items-center gap-1"><Clock size={14}/> {event.type}</span>
                      </div>
                   </div>
                </Card>
             ))}
          </div>
          
          <div className="space-y-6">
             <Card className="p-6">
                <h3 className="font-bold text-slate-900 mb-4">Upcoming Filters</h3>
                <div className="space-y-2">
                   <label className="flex items-center space-x-2 text-sm text-slate-700">
                      <input type="checkbox" className="rounded text-slate-900 focus:ring-slate-900" defaultChecked />
                      <span>Tournaments</span>
                   </label>
                   <label className="flex items-center space-x-2 text-sm text-slate-700">
                      <input type="checkbox" className="rounded text-slate-900 focus:ring-slate-900" defaultChecked />
                      <span>Training Camps</span>
                   </label>
                   <label className="flex items-center space-x-2 text-sm text-slate-700">
                      <input type="checkbox" className="rounded text-slate-900 focus:ring-slate-900" />
                      <span>Seminars</span>
                   </label>
                </div>
             </Card>
          </div>
       </div>
    </div>
  );
};
