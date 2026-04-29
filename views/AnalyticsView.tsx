
import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  AlertCircle, 
  PieChart as PieIcon, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert,
  Zap,
  Globe,
  FileSpreadsheet
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie 
} from 'recharts';
import { Card, StatBox, StatusBadge } from '../components/CoreUI';
import { REVENUE_TREND, REGIONAL_CONSUMPTION, BILLING_STATUS, REVENUE_LEAKAGE_ALERTS } from '../data/mockCommercial';

export const AnalyticsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'EXECUTIVE' | 'COMMERCIAL'>('EXECUTIVE');

  const ExecutiveDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatBox label="YTD Revenue" value="AED 6.2M" icon={DollarSign} change={14} />
        <StatBox label="Avg. Utilization" value="72.4" unit="%" icon={Target} change={3} />
        <StatBox label="Active Risk Exposure" value="High" icon={ShieldAlert} />
        <StatBox label="Operational Margin" value="28.5" unit="%" icon={TrendingUp} change={1.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue vs. Performance Targets</h3>
              <p className="text-sm text-slate-500">Board-level financial trajectory for 2025.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition-all">
              <FileSpreadsheet size={14} /> EXPORT BOARD SLIDES
            </button>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_TREND}>
                <defs>
                  <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `AED ${v/1000}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#0f172a" strokeWidth={3} fillOpacity={1} fill="url(#revenueColor)" />
                <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Asset Utilization vs. Risk</h3>
          <div className="space-y-6">
            {[
              { label: 'Compression Stations', val: 88, risk: 'Low' },
              { label: 'Virtual Pipeline Fleet', val: 94, risk: 'High' },
              { label: 'Customer Metering', val: 62, risk: 'Medium' },
              { label: 'Regional PRMS Hubs', val: 45, risk: 'Low' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600 uppercase tracking-tight">{item.label}</span>
                  <span className={item.risk === 'High' ? 'text-rose-600' : 'text-slate-400'}>RISK: {item.risk}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${item.val > 90 ? 'bg-rose-500' : 'bg-slate-900'}`} 
                    style={{ width: `${item.val}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>CAPACITY UTILIZATION</span>
                  <span>{item.val}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100">
             <div className="flex items-center gap-3 p-4 bg-rose-50 rounded-2xl border border-rose-100">
                <ShieldAlert size={20} className="text-rose-600 shrink-0" />
                <p className="text-xs text-rose-900 font-medium leading-tight">
                  Critical Alert: Logistics risk is currently exceeding board-approved thresholds due to fleet saturation.
                </p>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const CommercialDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-8">
           <h3 className="text-lg font-bold text-slate-900 mb-8">Regional Consumption Trends (SCM)</h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={REGIONAL_CONSUMPTION}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="region" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip cursor={{fill: '#f8fafc'}} />
                 <Bar dataKey="consumption" radius={[6, 6, 0, 0]} barSize={48}>
                   {REGIONAL_CONSUMPTION.map((entry, index) => (
                     <Cell key={index} fill={entry.consumption > 80000 ? '#2563eb' : '#94a3b8'} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </Card>

        <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
             <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
               <Zap size={20} className="text-blue-400" /> Revenue Leakage Detection
             </h3>
             <div className="space-y-4">
                {REVENUE_LEAKAGE_ALERTS.map(alert => (
                  <div key={alert.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{alert.reason}</span>
                      <StatusBadge status="CRITICAL" />
                    </div>
                    <div className="text-sm font-bold">{alert.asset}</div>
                    <div className="flex justify-between items-end mt-3">
                      <span className="text-xs text-white/60">Estimated Leakage</span>
                      <span className="text-lg font-bold text-rose-400">AED {alert.estimatedLoss.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition-all">
                INITIATE AUDIT WORKFLOW
             </button>
           </div>
           <Globe size={200} className="absolute -bottom-12 -right-12 text-white/5" />
        </Card>
      </div>

      <Card className="p-8">
        <div className="flex justify-between items-center mb-8">
           <h3 className="text-lg font-bold text-slate-900">Commercial Billing & Invoicing</h3>
           <div className="flex gap-2">
             <StatusBadge status="ACTIVE" />
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest py-1 px-2 bg-slate-50 rounded-lg border border-slate-100">Cycle: Monthly</span>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="pb-4">Invoice ID</th>
                <th className="pb-4">Client / Site</th>
                <th className="pb-4">Amount (AED)</th>
                <th className="pb-4">Due Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {BILLING_STATUS.map(inv => (
                <tr key={inv.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-5 font-mono font-bold text-slate-400">{inv.id}</td>
                  <td className="py-5 font-bold text-slate-900">{inv.client}</td>
                  <td className="py-5 font-bold">AED {inv.amount.toLocaleString()}</td>
                  <td className="py-5 text-slate-500">{inv.dueDate}</td>
                  <td className="py-5"><StatusBadge status={inv.status} /></td>
                  <td className="py-5 text-right">
                    <button className="text-blue-600 text-xs font-bold hover:underline">View Invoice</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commercial Intelligence</h1>
          <p className="text-slate-500 text-sm">Strategic financial and consumption insights for leadership.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('EXECUTIVE')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'EXECUTIVE' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <TrendingUp size={16} /> EXECUTIVE
          </button>
          <button 
            onClick={() => setActiveTab('COMMERCIAL')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'COMMERCIAL' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <DollarSign size={16} /> COMMERCIAL
          </button>
        </div>
      </header>

      {activeTab === 'EXECUTIVE' ? <ExecutiveDashboard /> : <CommercialDashboard />}
    </div>
  );
};
