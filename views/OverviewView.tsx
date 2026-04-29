
import React from 'react';
import { Activity, Truck, AlertCircle, Droplets, Zap, TrendingUp, Clock, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, StatBox, StatusBadge } from '../components/CoreUI';

const FLOW_DATA = [
  { time: '00:00', flow: 1240 }, { time: '04:00', flow: 1100 },
  { time: '08:00', flow: 2450 }, { time: '12:00', flow: 2100 },
  { time: '16:00', flow: 2800 }, { time: '20:00', flow: 1900 },
  { time: '23:59', flow: 1400 },
];

export const OverviewView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Executive Briefing</h1>
          <p className="text-slate-500 text-sm mt-1">Holistic operational health of the U.A.E Gas Network.</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-2">
              <Calendar size={14} /> MAY 12 - MAY 18, 2025
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox label="Daily Throughput" value="2.8k" unit="SCM" icon={Droplets} change={8} />
        <StatBox label="Active Logistics" value="16" unit="Trucks" icon={Truck} change={2} />
        <StatBox label="Revenue Protection" value="94.2" unit="%" icon={TrendingUp} change={1.2} />
        <StatBox label="Network Uptime" value="99.98" unit="%" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Activity size={18} className="text-blue-500" /> Network Flow Dynamics
            </h3>
            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-100">Live Scada Link</span>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FLOW_DATA}>
                <defs>
                  <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="flow" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorFlow)" dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <AlertCircle size={18} className="text-rose-500" /> Priority Intelligence
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Refill Advice', desc: 'Customer Al Foah reaching low pressure threshold.', status: 'CRITICAL', icon: Zap },
              { label: 'Revenue Leakage', desc: 'Station 04 reporting 4.2% meter discrepancy.', status: 'WARNING', icon: TrendingUp },
              { label: 'Logistics', desc: 'Truck T12 delayed on route to Zarqa Industrial.', status: 'WARNING', icon: Clock },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all rounded-2xl border border-slate-100 cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-xs font-semibold text-slate-700 leading-snug group-hover:text-blue-700">{item.desc}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all">LAUNCH ACTION CENTER</button>
        </Card>
      </div>
    </div>
  );
};
