
import React from 'react';
import { 
  Users, DollarSign, Calendar, UserCheck, Trophy, Briefcase, Activity, AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area, Cell
} from 'recharts';
import { Card, StatWidget, PieChartWidget, StatusBadge } from '../components/CoreComponents';
import { MOCK_ATHLETES, MOCK_CLUBS, MOCK_EVENTS, MOCK_TRANSACTIONS, MOCK_ACHIEVEMENTS, MOCK_REQUESTS, MOCK_PROJECTS } from '../mockData';

export const DashboardView: React.FC = () => {
  // --- Data Aggregation ---
  const totalAthletes = MOCK_ATHLETES.length;
  const activeClubs = MOCK_CLUBS.filter(c => c.status === 'Active').length;
  const pendingRequests = MOCK_REQUESTS.filter(r => r.status === 'Pending').length;
  const activeProjects = MOCK_PROJECTS.filter(p => p.status === 'In Progress').length;

  // Filter only National Squad Athletes
  const squadAthletes = MOCK_ATHLETES.filter(a => a.squad !== null && a.squad !== undefined);

  // Financial Trend Data (Mocking monthly accumulation)
  const financialData = [
    { name: 'Oct', Income: 4000, Expenses: 2400 },
    { name: 'Nov', Income: 3000, Expenses: 1398 },
    { name: 'Dec', Income: 9000, Expenses: 9800 },
    { name: 'Jan', Income: 18000, Expenses: 6500 }, // High due to grants
    { name: 'Feb', Income: 5500, Expenses: 4800 },
    { name: 'Mar', Income: 2000, Expenses: 800 },
  ];

  // 1. Squad Distribution (Only Squad Members)
  const squadCounts = {
    Senior: squadAthletes.filter(a => a.squad === 'Senior').length,
    Junior: squadAthletes.filter(a => a.squad === 'Junior').length,
    Cadet: squadAthletes.filter(a => a.squad === 'Cadet').length,
  };
  const squadData = Object.keys(squadCounts).map(k => ({ name: k, value: squadCounts[k as keyof typeof squadCounts] }));

  // 2. Gender Breakdown (Squads Only)
  const genderCounts = {
    Male: squadAthletes.filter(a => a.gender === 'Male').length,
    Female: squadAthletes.filter(a => a.gender === 'Female').length
  };
  const genderData = Object.keys(genderCounts).map(k => ({ name: k, value: genderCounts[k as keyof typeof genderCounts] }));

  // 3. Weight Class Distribution (Top 5 populated in squads)
  const weightCounts: Record<string, number> = {};
  squadAthletes.forEach(a => {
     weightCounts[a.weightClass] = (weightCounts[a.weightClass] || 0) + 1;
  });
  const weightData = Object.keys(weightCounts)
    .map(k => ({ name: k, value: weightCounts[k] }))
    .sort((a,b) => b.value - a.value)
    .slice(0, 8); // Top 8 categories

  // Recent Medals Data (Current Year)
  const currentYearMedals = MOCK_ACHIEVEMENTS.filter(a => a.year === 2024).reduce((acc, curr) => ({
    gold: acc.gold + curr.gold,
    silver: acc.silver + curr.silver,
    bronze: acc.bronze + curr.bronze
  }), { gold: 0, silver: 0, bronze: 0 });
  const medalChartData = [
    { name: 'Gold', value: currentYearMedals.gold, color: '#eab308' },
    { name: 'Silver', value: currentYearMedals.silver, color: '#94a3b8' },
    { name: 'Bronze', value: currentYearMedals.bronze, color: '#f97316' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="mb-4">
         <h2 className="text-2xl font-bold text-slate-900">Executive Dashboard</h2>
         <p className="text-slate-500">Comprehensive overview of federation performance, financials, and operational metrics.</p>
      </div>
      
      {/* 1. Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget title="Total Athletes" value={totalAthletes} icon={Users} trend="+12%" trendDirection="up" subtext="Across all clubs"/>
        <StatWidget title="National Squads" value={squadAthletes.length} icon={Trophy} trend="Elite" trendDirection="up" subtext="Selected Athletes"/>
        <StatWidget title="Pending Requests" value={pendingRequests} icon={AlertCircle} subtext="Requires attention" trendDirection={pendingRequests > 5 ? 'down' : 'up'} trend={pendingRequests > 5 ? 'High Load' : 'Normal'}/>
        
        {/* Achievements Widget */}
        <Card className="p-6 flex items-start justify-between hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
           <div>
              <p className="text-sm font-medium text-slate-300 mb-1">2024 Medal Tally</p>
              <h3 className="text-3xl font-bold tracking-tight flex items-baseline gap-2">
                 {currentYearMedals.gold + currentYearMedals.silver + currentYearMedals.bronze}
                 <span className="text-sm font-normal text-slate-400">Total</span>
              </h3>
              <div className="flex gap-3 mt-3 text-xs font-bold">
                 <span className="text-yellow-400 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div>{currentYearMedals.gold}</span>
                 <span className="text-slate-300 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div>{currentYearMedals.silver}</span>
                 <span className="text-orange-400 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400"></div>{currentYearMedals.bronze}</span>
              </div>
           </div>
           <div className="p-3 bg-white/10 rounded-xl text-white">
              <Trophy size={24} />
           </div>
        </Card>
      </div>

      {/* 2. Main Financial & Operational Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
             <div>
                <h3 className="font-bold text-lg text-slate-900">Financial Performance</h3>
                <p className="text-sm text-slate-500">Revenue vs Expenses (Last 6 Months)</p>
             </div>
             <div className="flex gap-2 text-sm">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-900 rounded-full"></div> Income</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Expenses</span>
             </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Area type="monotone" dataKey="Income" stroke="#0f172a" fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="Expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Medal Distribution Chart */}
        <Card className="p-6">
           <h3 className="font-bold text-slate-900 mb-6">Medal Distribution</h3>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={medalChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={60} />
                    <RechartsTooltip />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                       {medalChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>
      </div>

      {/* 3. Squads Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <PieChartWidget title="Squad Composition" data={squadData} colors={['#1e40af', '#3b82f6', '#93c5fd']} />
         <PieChartWidget title="Gender (Squads)" data={genderData} colors={['#0ea5e9', '#ec4899']} />
         
         <Card className="p-6">
            <h3 className="font-bold text-lg text-slate-900 mb-6">Top Weight Classes</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={weightData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={60} style={{fontSize: '11px'}} />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#64748b" radius={[0, 4, 4, 0]} barSize={15} />
                 </BarChart>
              </ResponsiveContainer>
            </div>
         </Card>
      </div>

      {/* 4. Recent Activity Table */}
      <Card className="overflow-hidden">
         <div className="p-6 border-b border-slate-200">
            <h3 className="font-bold text-slate-900">Recent Service Requests</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                  <tr>
                     <th className="px-6 py-3">Type</th>
                     <th className="px-6 py-3">Requester</th>
                     <th className="px-6 py-3">Date</th>
                     <th className="px-6 py-3">Priority</th>
                     <th className="px-6 py-3">Status</th>
                  </tr>
               </thead>
               <tbody>
                  {MOCK_REQUESTS.slice(0, 5).map(req => (
                     <tr key={req.id} className="border-b hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium">{req.type}</td>
                        <td className="px-6 py-4">{req.requesterName}</td>
                        <td className="px-6 py-4">{req.date}</td>
                        <td className="px-6 py-4"><StatusBadge status={req.priority} /></td>
                        <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
};
