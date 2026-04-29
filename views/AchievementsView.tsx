

import React, { useState } from 'react';
import { Trophy, Archive, ArrowLeft, MapPin, Calendar, Users, Briefcase, Stethoscope, Medal, Flag } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Card, Button } from '../components/CoreComponents';
import { MOCK_ACHIEVEMENTS } from '../mockData';
import { Achievement } from '../types';

export const AchievementsView: React.FC = () => {
   const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

   const MEDAL_HISTORY = [
      { year: '2021', Medals: 15 },
      { year: '2022', Medals: 18 },
      { year: '2023', Medals: 22 },
      { year: '2024', Medals: 28 },
      { year: '2025', Medals: 10 },
   ];

   const currentAchievements = MOCK_ACHIEVEMENTS.filter(a => !a.isArchive);
   const archivedAchievements = MOCK_ACHIEVEMENTS.filter(a => a.isArchive);

   // --- Detail View: Tournament Participation ---
   if (selectedAchievement) {
      const stats = selectedAchievement.delegationStats || { totalAthletes: 0, totalStaff: 0, totalMedics: 0 };
      const roster = selectedAchievement.roster || [];
      const totalDelegation = stats.totalAthletes + stats.totalStaff + stats.totalMedics;

      return (
         <div className="space-y-6 animate-in slide-in-from-right-4">
            <button 
               onClick={() => setSelectedAchievement(null)} 
               className="flex items-center text-slate-500 hover:text-slate-900 transition-colors font-medium"
            >
               <ArrowLeft className="mr-2" size={18} /> Back to Achievements
            </button>

            {/* Hero Section */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                     <div>
                        <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold uppercase tracking-wider text-sm">
                           {selectedAchievement.year} Season
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedAchievement.tournamentName}</h1>
                        <div className="flex flex-wrap gap-4 text-slate-300 text-sm">
                           <span className="flex items-center gap-1"><MapPin size={16}/> {selectedAchievement.location || 'International'}</span>
                           <span className="flex items-center gap-1"><Calendar size={16}/> {selectedAchievement.date || 'Event Dates'}</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="text-center px-6 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                           <div className="text-xs text-slate-400 uppercase font-bold">Team Rank</div>
                           <div className="text-3xl font-bold flex items-center gap-1 justify-center">
                              <span className="text-lg">#</span>{selectedAchievement.rank}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Decorative Background */}
               <Trophy className="absolute -right-6 -bottom-6 text-white/5 w-64 h-64 rotate-12" />
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <Card className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                     <Flag size={24} />
                  </div>
                  <div>
                     <p className="text-slate-500 text-xs uppercase font-bold">Total Delegation</p>
                     <p className="text-2xl font-bold text-slate-900">{totalDelegation}</p>
                  </div>
               </Card>
               <Card className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                     <Users size={24} />
                  </div>
                  <div>
                     <p className="text-slate-500 text-xs uppercase font-bold">Athletes</p>
                     <p className="text-2xl font-bold text-slate-900">{stats.totalAthletes}</p>
                  </div>
               </Card>
               <Card className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                     <Briefcase size={24} />
                  </div>
                  <div>
                     <p className="text-slate-500 text-xs uppercase font-bold">Coaching Staff</p>
                     <p className="text-2xl font-bold text-slate-900">{stats.totalStaff}</p>
                  </div>
               </Card>
               <Card className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-red-50 text-red-600 rounded-full">
                     <Stethoscope size={24} />
                  </div>
                  <div>
                     <p className="text-slate-500 text-xs uppercase font-bold">Medical</p>
                     <p className="text-2xl font-bold text-slate-900">{stats.totalMedics}</p>
                  </div>
               </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Left: Medal Tally */}
               <Card className="p-6 h-fit">
                  <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                     <Trophy size={18} className="text-yellow-500" /> Event Medal Tally
                  </h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                           <span className="font-medium text-yellow-900">Gold</span>
                        </div>
                        <span className="text-2xl font-bold text-yellow-600">{selectedAchievement.gold}</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-slate-100 border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                           <span className="font-medium text-slate-700">Silver</span>
                        </div>
                        <span className="text-2xl font-bold text-slate-500">{selectedAchievement.silver}</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-xl">
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                           <span className="font-medium text-orange-900">Bronze</span>
                        </div>
                        <span className="text-2xl font-bold text-orange-600">{selectedAchievement.bronze}</span>
                     </div>
                  </div>
               </Card>

               {/* Right: Roster */}
               <Card className="lg:col-span-2 p-6">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-slate-900">Official Roster & Results</h3>
                     <Button size="sm" variant="outline">Export Report</Button>
                  </div>
                  
                  {roster.length > 0 ? (
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                           <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                              <tr>
                                 <th className="px-4 py-3">Member Name</th>
                                 <th className="px-4 py-3">Role</th>
                                 <th className="px-4 py-3">Category</th>
                                 <th className="px-4 py-3">Result</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                              {roster.map((member, idx) => (
                                 <tr key={idx} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{member.name}</td>
                                    <td className="px-4 py-3">
                                       <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                          member.role === 'Athlete' ? 'bg-blue-50 text-blue-700' :
                                          member.role === 'Coach' ? 'bg-emerald-50 text-emerald-700' :
                                          member.role === 'Medic' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'
                                       }`}>
                                          {member.role}
                                       </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">{member.category || '-'}</td>
                                    <td className="px-4 py-3">
                                       {member.result ? (
                                          <div className={`flex items-center gap-2 font-medium ${
                                             member.result === 'Gold' ? 'text-yellow-600' :
                                             member.result === 'Silver' ? 'text-slate-500' :
                                             member.result === 'Bronze' ? 'text-orange-600' : 'text-slate-900'
                                          }`}>
                                             {['Gold', 'Silver', 'Bronze'].includes(member.result) && <Medal size={14} />}
                                             {member.result}
                                          </div>
                                       ) : '-'}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  ) : (
                     <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
                        <Users size={32} className="mx-auto mb-2 opacity-50"/>
                        <p>Detailed roster data is archived for this event.</p>
                     </div>
                  )}
               </Card>
            </div>
         </div>
      );
   }

   // --- Main Dashboard View ---
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Stats */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Total Medals (2024)</p>
            <h2 className="text-5xl font-bold mt-2">28</h2>
          </div>
          <div className="flex flex-col items-center md:items-start">
             <div className="w-12 h-12 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center mb-2"><Trophy size={24} /></div>
             <span className="text-2xl font-bold">8 Gold</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
             <div className="w-12 h-12 bg-slate-400/20 text-slate-300 rounded-full flex items-center justify-center mb-2"><Trophy size={24} /></div>
             <span className="text-2xl font-bold">8 Silver</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
             <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mb-2"><Trophy size={24} /></div>
             <span className="text-2xl font-bold">12 Bronze</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-slate-900 mb-6">Medal History (5 Years)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MEDAL_HISTORY}>
                <defs>
                  <linearGradient id="colorMedals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis />
                <RechartsTooltip />
                <Area type="monotone" dataKey="Medals" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMedals)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-bold text-slate-900 mb-6">Recent Tournament Results</h3>
          <div className="space-y-4">
            {currentAchievements.map(ach => (
              <div 
                  key={ach.id} 
                  onClick={() => setSelectedAchievement(ach)}
                  className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                      {ach.rank}<span className="text-[10px] align-top">th</span>
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{ach.tournamentName}</h4>
                       <p className="text-xs text-slate-500">{ach.year} • Rank #{ach.rank}</p>
                    </div>
                 </div>
                 <div className="flex gap-3 text-sm font-medium">
                    <span className="text-yellow-600 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> {ach.gold}</span>
                    <span className="text-slate-600 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div> {ach.silver}</span>
                    <span className="text-orange-700 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400"></div> {ach.bronze}</span>
                 </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Archive Section */}
      <Card className="p-6">
         <div className="flex items-center gap-2 mb-6">
            <Archive className="text-slate-500" size={24}/>
            <h3 className="font-bold text-slate-900 text-lg">Tournament Archive</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                  <tr>
                     <th className="px-6 py-3">Year</th>
                     <th className="px-6 py-3">Tournament</th>
                     <th className="px-6 py-3">Team Rank</th>
                     <th className="px-6 py-3 text-center">Gold</th>
                     <th className="px-6 py-3 text-center">Silver</th>
                     <th className="px-6 py-3 text-center">Bronze</th>
                     <th className="px-6 py-3 text-right">Details</th>
                  </tr>
               </thead>
               <tbody>
                  {archivedAchievements.map(ach => (
                     <tr 
                        key={ach.id} 
                        onClick={() => setSelectedAchievement(ach)}
                        className="border-b hover:bg-slate-50 cursor-pointer group"
                     >
                        <td className="px-6 py-4 font-bold text-slate-700">{ach.year}</td>
                        <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-blue-700 transition-colors">{ach.tournamentName}</td>
                        <td className="px-6 py-4">#{ach.rank}</td>
                        <td className="px-6 py-4 text-center text-yellow-600 font-bold">{ach.gold}</td>
                        <td className="px-6 py-4 text-center text-slate-600 font-bold">{ach.silver}</td>
                        <td className="px-6 py-4 text-center text-orange-600 font-bold">{ach.bronze}</td>
                        <td className="px-6 py-4 text-right">
                           <span className="text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Participation</span>
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