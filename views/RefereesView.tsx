
import React, { useState } from 'react';
import { UserCheck, Award, CheckSquare, Plus, ArrowLeft, Mail, Phone, Calendar, Shield, MapPin, FileText } from 'lucide-react';
import { StatWidget, Card, Button, StatusBadge } from '../components/CoreComponents';
import { MOCK_REFEREES } from '../mockData';
import { Referee } from '../types';

export const RefereesView: React.FC = () => {
  const [selectedReferee, setSelectedReferee] = useState<Referee | null>(null);

  // --- Detailed Referee Profile ---
  if (selectedReferee) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4">
        <button 
          onClick={() => setSelectedReferee(null)} 
          className="flex items-center text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="mr-2" size={18} /> Back to Directory
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: ID Card */}
          <div className="space-y-6">
             <Card className="p-8 text-center border-t-4 border-t-slate-900">
                <div className="w-32 h-32 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6 border-4 border-white shadow-lg">
                   <UserCheck size={64} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedReferee.name}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                   <Award size={16} className="text-blue-600" />
                   <span className="font-semibold text-blue-700">{selectedReferee.rank}</span>
                </div>
                <div className="mt-6 flex justify-center">
                   <StatusBadge status={selectedReferee.status} />
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100 text-left space-y-4">
                   <div className="flex items-center gap-3">
                      <Mail size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-600">{selectedReferee.email || 'N/A'}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Phone size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-600">{selectedReferee.phone || 'N/A'}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Shield size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-600">License Exp: <span className="font-mono font-bold text-slate-800">{selectedReferee.licenseExpiry}</span></span>
                   </div>
                </div>
             </Card>

             {/* KPIs */}
             <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                   <div className="text-3xl font-bold text-slate-900">{selectedReferee.eventsOfficiated}</div>
                   <div className="text-xs text-slate-500 uppercase font-medium mt-1">Events</div>
                </Card>
                <Card className="p-4 text-center">
                   <div className="text-3xl font-bold text-slate-900">{new Date().getFullYear() - 2018}</div>
                   <div className="text-xs text-slate-500 uppercase font-medium mt-1">Years Active</div>
                </Card>
             </div>
          </div>

          {/* Right Column: History & Certs */}
          <div className="lg:col-span-2 space-y-6">
             <Card className="p-6">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                   <FileText size={20} className="text-slate-500" /> Certifications & Seminars
                </h3>
                <div className="space-y-4">
                   {selectedReferee.history?.filter(h => h.role === 'Certification').map((cert, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                         <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                            <Award size={20} />
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-900">{cert.eventName}</h4>
                            <p className="text-sm text-slate-600 mt-1">Completed on {cert.date}</p>
                         </div>
                      </div>
                   ))}
                   {(!selectedReferee.history || !selectedReferee.history.some(h => h.role === 'Certification')) && (
                      <p className="text-slate-400 italic text-sm">No certification records found.</p>
                   )}
                </div>
             </Card>

             <Card className="p-6">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                   <Calendar size={20} className="text-slate-500" /> Recent Officiating Assignments
                </h3>
                <div className="space-y-4">
                   {selectedReferee.history?.filter(h => h.role !== 'Certification').map((event, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                               <Shield size={18} />
                            </div>
                            <div>
                               <h4 className="font-bold text-slate-900">{event.eventName}</h4>
                               <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                  <span>{event.date}</span> • <span className="font-medium text-slate-700">{event.role}</span>
                               </div>
                            </div>
                         </div>
                         <StatusBadge status="Completed" />
                      </div>
                   ))}
                   {(!selectedReferee.history || selectedReferee.history.length === 0) && (
                      <p className="text-slate-400 italic text-sm">No recent assignment records found.</p>
                   )}
                </div>
             </Card>
          </div>
        </div>
      </div>
    );
  }

  // --- Directory List View ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold text-slate-900">Referees Directory</h2>
            <p className="text-slate-500">Manage officials, certifications, and assignments.</p>
         </div>
         <Button><Plus size={16} className="mr-2"/> Register Referee</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatWidget title="Total Referees" value={MOCK_REFEREES.length} icon={UserCheck} />
        <StatWidget title="International Rank" value={MOCK_REFEREES.filter(r => r.rank === 'International').length} icon={Award} trendDirection="up" trend="Elite" />
        <StatWidget title="Active" value={MOCK_REFEREES.filter(r => r.status === 'Active').length} icon={CheckSquare} />
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
           <h3 className="font-bold text-slate-800">All Registered Officials</h3>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
             <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
               <tr>
                 <th className="px-6 py-3">Official Name</th>
                 <th className="px-6 py-3">Rank & License</th>
                 <th className="px-6 py-3">Expiry</th>
                 <th className="px-6 py-3">Events</th>
                 <th className="px-6 py-3">Status</th>
                 <th className="px-6 py-3 text-right">Actions</th>
               </tr>
             </thead>
             <tbody>
               {MOCK_REFEREES.map(ref => (
                 <tr key={ref.id} className="border-b hover:bg-slate-50 group cursor-pointer" onClick={() => setSelectedReferee(ref)}>
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <UserCheck size={16} />
                         </div>
                         <div className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors">{ref.name}</div>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="flex flex-col">
                         <span className="font-medium text-slate-900">{ref.rank}</span>
                         <span className="text-xs text-slate-500">License Active</span>
                      </div>
                   </td>
                   <td className="px-6 py-4 font-mono text-slate-500">{ref.licenseExpiry}</td>
                   <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-700 font-bold text-xs">
                         {ref.eventsOfficiated}
                      </span>
                   </td>
                   <td className="px-6 py-4"><StatusBadge status={ref.status} /></td>
                   <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedReferee(ref); }}>View Profile</Button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </Card>
    </div>
  );
};
