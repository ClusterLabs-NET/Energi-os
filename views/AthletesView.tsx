
import React, { useState } from 'react';
import { Card, Button, StatusBadge, PieChartWidget } from '../components/CoreComponents';
import { MOCK_ATHLETES } from '../mockData';
import { Athlete } from '../types';
import { Filter, Search, User, ArrowLeft, Trophy, Activity, Calendar, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const AthletesView: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  
  const filtered = MOCK_ATHLETES.filter(a => 
     a.name.toLowerCase().includes(filter.toLowerCase()) || 
     a.clubName.toLowerCase().includes(filter.toLowerCase())
  );

  // Stats Logic
  const beltDataMap: Record<string, number> = {};
  MOCK_ATHLETES.forEach(a => beltDataMap[a.belt] = (beltDataMap[a.belt] || 0) + 1);
  const beltData = Object.keys(beltDataMap).map(k => ({ name: k, value: beltDataMap[k] }));

  // Mock Age Groups (Calculating approximate age from DOB)
  const ageGroups = { 'Under 10': 0, '10-14 (Cadet)': 0, '15-17 (Junior)': 0, '18+ (Senior)': 0 };
  MOCK_ATHLETES.forEach(a => {
     const year = parseInt(a.dob.split('-')[0]);
     const age = 2025 - year;
     if (age < 10) ageGroups['Under 10']++;
     else if (age <= 14) ageGroups['10-14 (Cadet)']++;
     else if (age <= 17) ageGroups['15-17 (Junior)']++;
     else ageGroups['18+ (Senior)']++;
  });
  const ageData = Object.keys(ageGroups).map(k => ({ name: k, value: ageGroups[k as keyof typeof ageGroups] }));

  // --- Detailed Athlete Profile View ---
  if (selectedAthlete) {
    const goldCount = selectedAthlete.results.filter(r => r.medal === 'Gold').length;
    const silverCount = selectedAthlete.results.filter(r => r.medal === 'Silver').length;
    const bronzeCount = selectedAthlete.results.filter(r => r.medal === 'Bronze').length;

    // Generate pseudo-history for the chart based on current points
    const performanceData = [
       { event: 'Q1 2024', points: Math.max(0, selectedAthlete.points - 120) },
       { event: 'Q2 2024', points: Math.max(0, selectedAthlete.points - 80) },
       { event: 'Q3 2024', points: Math.max(0, selectedAthlete.points - 30) },
       { event: 'Q4 2024', points: selectedAthlete.points },
    ];

    return (
      <div className="space-y-6 animate-in slide-in-from-right-4">
         <button 
            onClick={() => setSelectedAthlete(null)} 
            className="flex items-center text-slate-500 hover:text-slate-900 transition-colors font-medium"
         >
            <ArrowLeft className="mr-2" size={18} /> Back to Directory
         </button>

         {/* Header Profile Section */}
         <Card className="p-8 border-l-4 border-l-slate-900">
            <div className="flex flex-col md:flex-row gap-8 items-start">
               <div className="w-32 h-32 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300 shadow-inner flex-shrink-0">
                  <User size={64} />
               </div>
               <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                     <div>
                        <div className="flex items-center gap-3 mb-1">
                           <h1 className="text-3xl font-bold text-slate-900">{selectedAthlete.name}</h1>
                           <StatusBadge status={selectedAthlete.belt} />
                        </div>
                        <p className="text-slate-500 text-lg flex items-center gap-2">
                           <span className="font-semibold text-slate-700">{selectedAthlete.clubName}</span> 
                           {selectedAthlete.squad && <span>• <span className="text-blue-600 font-bold">{selectedAthlete.squad} Squad</span></span>}
                        </p>
                     </div>
                     <div className="text-left md:text-right mt-2 md:mt-0">
                        <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Ranking Points</div>
                        <div className="text-4xl font-bold text-slate-900">{selectedAthlete.points}</div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                     <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-xs text-slate-400 uppercase block mb-1">WTF ID</span>
                        <span className="font-mono font-medium">{selectedAthlete.wtfId}</span>
                     </div>
                     <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-xs text-slate-400 uppercase block mb-1">Weight Class</span>
                        <span className="font-medium">{selectedAthlete.weightClass}</span>
                     </div>
                     <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-xs text-slate-400 uppercase block mb-1">Date of Birth</span>
                        <span className="font-medium">{selectedAthlete.dob}</span>
                     </div>
                     <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-xs text-slate-400 uppercase block mb-1">Gender</span>
                        <span className="font-medium">{selectedAthlete.gender}</span>
                     </div>
                  </div>
               </div>
            </div>
         </Card>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Stats & Medals */}
            <div className="space-y-6">
               <Card className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <Trophy size={18} className="text-yellow-500"/> Lifetime Medals
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                     <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                        <div className="text-2xl font-bold text-yellow-600">{goldCount}</div>
                        <div className="text-xs text-yellow-600/80 font-medium uppercase">Gold</div>
                     </div>
                     <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
                        <div className="text-2xl font-bold text-slate-600">{silverCount}</div>
                        <div className="text-xs text-slate-500 font-medium uppercase">Silver</div>
                     </div>
                     <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <div className="text-2xl font-bold text-orange-600">{bronzeCount}</div>
                        <div className="text-xs text-orange-600/80 font-medium uppercase">Bronze</div>
                     </div>
                  </div>
               </Card>

               <Card className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <Activity size={18} className="text-blue-500"/> Progress Chart
                  </h3>
                  <div className="h-48">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                           <defs>
                              <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#0f172a" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} />
                           <XAxis dataKey="event" tick={{fontSize: 12}} />
                           <RechartsTooltip />
                           <Area type="monotone" dataKey="points" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorPoints)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </Card>
            </div>

            {/* Right Column: Results History */}
            <div className="lg:col-span-2 space-y-6">
               <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Calendar size={18} className="text-slate-500"/> Tournament Record
                     </h3>
                     <Button size="sm" variant="outline">Export History</Button>
                  </div>
                  
                  <div className="space-y-4">
                     {selectedAthlete.results.length > 0 ? (
                        selectedAthlete.results.map((result, idx) => (
                           <div key={idx} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                 result.medal === 'Gold' ? 'bg-yellow-100 text-yellow-600' : 
                                 result.medal === 'Silver' ? 'bg-slate-200 text-slate-600' : 
                                 result.medal === 'Bronze' ? 'bg-orange-100 text-orange-600' : 
                                 'bg-slate-100 text-slate-400'
                              }`}>
                                 {result.medal !== 'None' ? <Trophy size={20} /> : <Activity size={20} />}
                              </div>
                              <div className="flex-1">
                                 <h4 className="font-bold text-slate-900">{result.tournamentName}</h4>
                                 <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                    <span className="flex items-center gap-1"><Calendar size={12}/> {result.date}</span>
                                    <span className="flex items-center gap-1"><MapPin size={12}/> International</span>
                                 </div>
                              </div>
                              <div className="text-right">
                                 {result.medal !== 'None' ? (
                                    <div className={`font-bold text-sm px-3 py-1 rounded-full ${
                                       result.medal === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 
                                       result.medal === 'Silver' ? 'bg-slate-200 text-slate-700' : 
                                       'bg-orange-100 text-orange-700'
                                    }`}>
                                       {result.medal} Medal
                                    </div>
                                 ) : (
                                    <div className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
                                       Participation
                                    </div>
                                 )}
                                 <div className="text-xs text-slate-400 mt-1">{result.category}</div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                           <Activity size={32} className="mx-auto mb-2 opacity-50"/>
                           <p>No tournament records available.</p>
                        </div>
                     )}
                  </div>
               </Card>
            </div>
         </div>
      </div>
    );
  }

  // --- Main Directory View ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold">Club Athletes Directory</h2>
            <p className="text-slate-500 text-sm mt-1">Registry of all affiliated athletes across the kingdom.</p>
         </div>
         <div className="flex gap-2">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                  type="text" 
                  placeholder="Search athletes..." 
                  className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none w-64"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
               />
            </div>
            <Button variant="outline"><Filter size={16} className="mr-2"/> Filter</Button>
            <Button>Register Athlete</Button>
         </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 p-6">
            <h3 className="font-bold text-slate-900 mb-6">Age Group Distribution</h3>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
                     <XAxis dataKey="name" />
                     <YAxis />
                     <RechartsTooltip />
                     <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={60} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>
         <PieChartWidget title="Belt Demographics" data={beltData} colors={['#e5e7eb', '#facc15', '#4ade80', '#60a5fa', '#f87171', '#1e293b']} />
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
           <h3 className="font-bold text-slate-800">All Registered Athletes ({MOCK_ATHLETES.length})</h3>
        </div>
        <div className="max-h-[600px] overflow-y-auto">
           <table className="w-full text-sm text-left">
             <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
               <tr>
                 <th className="px-6 py-3">Athlete</th>
                 <th className="px-6 py-3">Club</th>
                 <th className="px-6 py-3">Belt</th>
                 <th className="px-6 py-3">Squad</th>
                 <th className="px-6 py-3">Category</th>
                 <th className="px-6 py-3">WTF Points</th>
                 <th className="px-6 py-3 text-right">Actions</th>
               </tr>
             </thead>
             <tbody>
               {filtered.slice(0, 100).map(ath => (
                 <tr key={ath.id} className="bg-white border-b hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedAthlete(ath)}>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><User size={14}/></div>
                        <div>
                           <div className="font-medium text-slate-900">{ath.name}</div>
                           <div className="text-xs text-slate-500">{ath.wtfId}</div>
                        </div>
                     </div>
                   </td>
                   <td className="px-6 py-4">{ath.clubName}</td>
                   <td className="px-6 py-4"><StatusBadge status={ath.belt} /></td>
                   <td className="px-6 py-4">{ath.squad ? <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-bold text-xs">{ath.squad}</span> : '-'}</td>
                   <td className="px-6 py-4">{ath.weightClass}</td>
                   <td className="px-6 py-4 font-mono">{ath.points}</td>
                   <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium" onClick={(e) => { e.stopPropagation(); setSelectedAthlete(ath); }}>View Profile</button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
           {filtered.length > 100 && (
              <div className="p-4 text-center text-slate-500 border-t border-slate-100">
                 Showing first 100 of {filtered.length} athletes. Use search to find specific records.
              </div>
           )}
        </div>
      </Card>
    </div>
  );
};
