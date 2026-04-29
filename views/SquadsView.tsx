
import React, { useState } from 'react';
import { Card, SegmentedControl, StatusBadge, Button, StatWidget } from '../components/CoreComponents';
import { MOCK_ATHLETES } from '../mockData';
import { Athlete } from '../types';
import { Medal, User, ArrowLeft, Trophy, Calendar, MapPin, Activity, Zap, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, BarChart, Bar, Cell, YAxis } from 'recharts';

export const SquadsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  
  const filteredAthletes = activeTab === 'All' 
    ? MOCK_ATHLETES.filter(a => a.squad) 
    : MOCK_ATHLETES.filter(a => a.squad === activeTab);
  
  // Squad Stats
  const totalSquadAthletes = filteredAthletes.length;
  const totalSquadPoints = filteredAthletes.reduce((acc, curr) => acc + curr.points, 0);
  const avgPoints = totalSquadAthletes > 0 ? Math.round(totalSquadPoints / totalSquadAthletes) : 0;
  
  // Calculate Medal Efficiency (Total Medals / Total Athletes) - Simulated
  const totalMedals = filteredAthletes.reduce((acc, a) => {
     // Simulate having medals based on points for mock data richness
     return acc + (a.points > 800 ? 1 : 0) + (a.results ? a.results.filter(r => r.medal !== 'None').length : 0);
  }, 0);
  const medalEfficiency = totalSquadAthletes > 0 ? (totalMedals / totalSquadAthletes * 100).toFixed(1) : '0';

  // Chart Data: Points Comparison
  const pointsBySquad = [
    { name: 'Cadet', points: MOCK_ATHLETES.filter(a => a.squad === 'Cadet').reduce((acc, a) => acc + a.points, 0) },
    { name: 'Junior', points: MOCK_ATHLETES.filter(a => a.squad === 'Junior').reduce((acc, a) => acc + a.points, 0) },
    { name: 'Senior', points: MOCK_ATHLETES.filter(a => a.squad === 'Senior').reduce((acc, a) => acc + a.points, 0) },
  ];

  // Chart Data: Performance Trend (Simulated)
  const trendData = [
    { month: 'Sep', Performance: 75 },
    { month: 'Oct', Performance: 78 },
    { month: 'Nov', Performance: 76 },
    { month: 'Dec', Performance: 82 },
    { month: 'Jan', Performance: 88 },
    { month: 'Feb', Performance: 91 },
  ];

  // --- Detailed Athlete View ---
  if (selectedAthlete) {
    const goldCount = selectedAthlete.results.filter(r => r.medal === 'Gold').length;
    const silverCount = selectedAthlete.results.filter(r => r.medal === 'Silver').length;
    const bronzeCount = selectedAthlete.results.filter(r => r.medal === 'Bronze').length;

    // Mock performance data for chart
    const performanceData = [
       { event: 'Jan', points: selectedAthlete.points - 150 },
       { event: 'Mar', points: selectedAthlete.points - 100 },
       { event: 'May', points: selectedAthlete.points - 20 },
       { event: 'Jul', points: selectedAthlete.points + 50 },
       { event: 'Sep', points: selectedAthlete.points + 120 },
       { event: 'Nov', points: selectedAthlete.points },
    ];

    return (
      <div className="space-y-6 animate-in slide-in-from-right-4">
         <button 
            onClick={() => setSelectedAthlete(null)} 
            className="flex items-center text-slate-500 hover:text-slate-900 transition-colors font-medium"
         >
            <ArrowLeft className="mr-2" size={18} /> Back to Squads
         </button>

         {/* Header Profile Section */}
         <Card className="p-8 border-l-4 border-l-blue-600">
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
                           • {selectedAthlete.squad} National Team
                        </p>
                     </div>
                     <div className="text-left md:text-right mt-2 md:mt-0">
                        <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">World Rank Points</div>
                        <div className="text-4xl font-bold text-blue-600">{selectedAthlete.points}</div>
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
                     <Trophy size={18} className="text-yellow-500"/> Medal Tally
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
                     <Activity size={18} className="text-blue-500"/> Performance Trend
                  </h3>
                  <div className="h-48">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                           <defs>
                              <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} />
                           <XAxis dataKey="event" tick={{fontSize: 12}} />
                           <RechartsTooltip />
                           <Area type="monotone" dataKey="points" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorPoints)" />
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
                        <Calendar size={18} className="text-slate-500"/> Tournament History
                     </h3>
                     <Button size="sm" variant="outline">Download Record</Button>
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
                           <p>No tournament records found for this season.</p>
                        </div>
                     )}
                  </div>
               </Card>
            </div>
         </div>
      </div>
    );
  }

  // --- Main List View ---
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">National Squads</h2>
           <p className="text-slate-500">Manage and monitor national team athletes.</p>
        </div>
        <SegmentedControl 
          options={['All', 'Cadet', 'Junior', 'Senior']} 
          value={activeTab} 
          onChange={setActiveTab} 
        />
      </div>

      {/* Squad Advanced Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <StatWidget title="Squad Athletes" value={totalSquadAthletes} icon={User} />
         <StatWidget title="Total Ranking Points" value={totalSquadPoints.toLocaleString()} icon={Zap} trend={avgPoints + ' avg'} trendDirection="up" />
         <StatWidget title="Medal Efficiency" value={medalEfficiency + '%'} icon={Trophy} subtext="Medals per Athlete" trendDirection="up" trend="High" />
         <StatWidget title="Performance Score" value="92/100" icon={Activity} subtext="Team Aggregate" />
      </div>

      {/* Squad Performance Charts */}
      {activeTab === 'All' && (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
               <h3 className="font-bold text-slate-900 mb-6">Total Points by Squad</h3>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={pointsBySquad}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Bar dataKey="points" radius={[4, 4, 0, 0]}>
                           {pointsBySquad.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? '#60a5fa' : index === 1 ? '#3b82f6' : '#1e40af'} />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </Card>
            <Card className="p-6">
               <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><TrendingUp size={18}/> Performance Trend (6 Months)</h3>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={trendData}>
                        <defs>
                           <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[60, 100]} />
                        <RechartsTooltip />
                        <Area type="monotone" dataKey="Performance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPerf)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </Card>
         </div>
      )}

      {/* Athlete Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAthletes.map(athlete => (
           <AthleteProfileCard 
             key={athlete.id} 
             athlete={athlete} 
             onClick={() => setSelectedAthlete(athlete)}
           />
        ))}
      </div>
      
      {filteredAthletes.length === 0 && (
         <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 border-dashed">
            <User size={48} className="mx-auto mb-4 opacity-50" />
            <p>No athletes currently assigned to the {activeTab} squad.</p>
         </div>
      )}
    </div>
  );
};

// Updated Profile Card - Removed grey banner, refined layout
const AthleteProfileCard: React.FC<{ athlete: Athlete; onClick: () => void }> = ({ athlete, onClick }) => {
   const bestResult = athlete.results.find(r => r.medal === 'Gold' || r.medal === 'Silver') || athlete.results[0];

   return (
      <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1">
         <div className="p-6" onClick={onClick}>
            <div className="flex justify-between items-start mb-6">
               <div className="w-16 h-16 rounded-2xl bg-slate-100 group-hover:bg-blue-50 transition-colors flex items-center justify-center text-slate-400 group-hover:text-blue-600">
                  <User size={32} />
               </div>
               <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase font-semibold">Rank Points</div>
                  <div className="text-xl font-bold text-blue-600">{athlete.points}</div>
               </div>
            </div>
            
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">{athlete.name}</h3>
                    <p className="text-slate-500 text-sm">{athlete.weightClass} • {athlete.clubName}</p>
                </div>
                <StatusBadge status={athlete.belt} />
            </div>
            
            <div className="space-y-3 mt-6 pt-6 border-t border-slate-50">
               <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Recent Achievement</p>
                  {bestResult ? (
                     <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${bestResult.medal === 'Gold' ? 'bg-yellow-100 text-yellow-600' : bestResult.medal === 'Silver' ? 'bg-slate-200 text-slate-600' : 'bg-orange-100 text-orange-600'}`}>
                           <Medal size={16} />
                        </div>
                        <div className="overflow-hidden">
                           <p className="text-sm font-bold text-slate-900 leading-tight truncate">{bestResult.tournamentName}</p>
                           <p className="text-xs text-slate-500">{bestResult.date}</p>
                        </div>
                     </div>
                  ) : (
                     <p className="text-sm text-slate-400 italic">No recent international results.</p>
                  )}
               </div>
               
               <div className="grid grid-cols-2 gap-2 text-sm">
                   <div className="bg-slate-50 p-2 rounded">
                      <span className="text-slate-400 text-xs block">WTF ID</span>
                      <span className="font-mono font-medium text-slate-700">{athlete.wtfId}</span>
                   </div>
                   <div className="bg-slate-50 p-2 rounded">
                      <span className="text-slate-400 text-xs block">DOB</span>
                      <span className="font-medium text-slate-700">{athlete.dob}</span>
                   </div>
               </div>
            </div>
         </div>
      </Card>
   );
}
