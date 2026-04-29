
import React, { useState } from 'react';
import { Card, Button, StatusBadge } from '../components/CoreComponents';
import { MOCK_COMMITTEES } from '../mockData';
import { Users, Calendar, FileText, ChevronRight, Mail, Phone } from 'lucide-react';
import { Committee } from '../types';

export const CommitteesView: React.FC = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<Committee>(MOCK_COMMITTEES[0]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Committees Management</h2>
           <p className="text-slate-500">Oversee federation sub-committees, members, and meeting records.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
         {/* Sidebar List */}
         <Card className="p-0 overflow-hidden border-r border-slate-200">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
               <h3 className="font-bold text-slate-700">All Committees</h3>
            </div>
            <div className="divide-y divide-slate-100 max-h-[700px] overflow-y-auto">
               {MOCK_COMMITTEES.map(committee => (
                  <button 
                     key={committee.id}
                     onClick={() => setSelectedCommittee(committee)}
                     className={`w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group ${selectedCommittee.id === committee.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
                  >
                     <div>
                        <div className={`font-medium ${selectedCommittee.id === committee.id ? 'text-blue-700' : 'text-slate-900'}`}>{committee.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{committee.members.length} Members</div>
                     </div>
                     <ChevronRight size={16} className={`text-slate-400 ${selectedCommittee.id === committee.id ? 'text-blue-500' : ''}`} />
                  </button>
               ))}
            </div>
         </Card>

         {/* Detail View */}
         <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="p-6 border-t-4 border-t-blue-600">
               <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedCommittee.name}</h2>
               <p className="text-slate-500 mb-4">{selectedCommittee.description}</p>
               <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                     <Users size={16} /> <span>{selectedCommittee.members.length} Members</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                     <Calendar size={16} /> <span>Next Meeting: {selectedCommittee.nextMeeting || 'TBD'}</span>
                  </div>
               </div>
            </Card>

            {/* Members */}
            <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-slate-900">Committee Members</h3>
                  <Button size="sm" variant="outline">Manage Members</Button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCommittee.members.map(member => (
                     <div key={member.id} className="p-4 border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <div className="font-bold text-slate-900">{member.name}</div>
                              <div className="text-blue-600 text-xs font-bold uppercase">{member.role}</div>
                           </div>
                           <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                              <Users size={16} />
                           </div>
                        </div>
                        <div className="space-y-1 mt-3">
                           <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Mail size={12} /> {member.email}
                           </div>
                           <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Phone size={12} /> {member.phone}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            {/* Meetings */}
            <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-slate-900">Meeting Records</h3>
                  <Button size="sm">Schedule Meeting</Button>
               </div>
               <div className="space-y-4">
                  {selectedCommittee.meetings.map(meeting => (
                     <div key={meeting.id} className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="bg-white border border-slate-200 rounded-lg p-2 text-center min-w-[60px]">
                           <div className="text-xs text-slate-500 uppercase">{new Date(meeting.date).toLocaleString('default', { month: 'short' })}</div>
                           <div className="text-lg font-bold text-slate-900">{new Date(meeting.date).getDate()}</div>
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-start">
                              <h4 className="font-bold text-slate-900">{meeting.title}</h4>
                              <StatusBadge status={meeting.status} />
                           </div>
                           <p className="text-sm text-slate-500 mt-1">{meeting.summary}</p>
                           {meeting.documentUrl && (
                              <a href="#" className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium mt-2 hover:underline">
                                 <FileText size={12} /> View Minutes
                              </a>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};
