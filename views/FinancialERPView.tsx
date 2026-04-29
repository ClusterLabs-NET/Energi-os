
import React from 'react';
import { DollarSign, FileText, CreditCard, PieChart, TrendingUp, AlertTriangle, ArrowRight, CheckCircle, Download, FilePlus } from 'lucide-react';
import { Card, StatBox, StatusBadge, Button } from '../components/CoreUI';
import { MOCK_INVOICES } from '../data/mockGasNetwork';

export const FinancialERPView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
       <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enterprise Financial Center</h1>
          <p className="text-slate-500 text-sm">Centralized billing, revenue protection, and commercial audits.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="gap-2"><Download size={14} /> EXPORT YTD</Button>
           <Button className="gap-2 shadow-lg shadow-blue-500/20"><FilePlus size={14} /> BULK INVOICING</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox label="Total AR (Pending)" value="AED 142k" icon={DollarSign} change={-12} />
        <StatBox label="Revenue Leakage Alert" value="AED 5,400" icon={AlertTriangle} />
        <StatBox label="Billing Efficiency" value="98.2" unit="%" icon={CheckCircle} change={2} />
        <StatBox label="Active Contracts" value="45" icon={FileText} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Invoice Registry */}
         <Card className="lg:col-span-2 overflow-hidden border-none shadow-xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
               <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Monthly Invoicing Stream</h3>
               <div className="flex gap-2">
                 <button className="text-[10px] font-black text-slate-400 uppercase px-2 py-1 bg-slate-50 rounded">All</button>
                 <button className="text-[10px] font-black text-rose-600 uppercase px-2 py-1 bg-rose-50 rounded">Overdue</button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead>
                     <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="px-6 py-4">Invoice #</th>
                        <th className="px-6 py-4">Partner</th>
                        <th className="px-6 py-4">Consumption (SCM)</th>
                        <th className="px-6 py-4">Amount (AED)</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {MOCK_INVOICES.map(inv => (
                        <tr key={inv.id} className="hover:bg-slate-50 group transition-colors">
                           <td className="px-6 py-5 font-mono text-slate-400">{inv.id}</td>
                           <td className="px-6 py-5 font-bold text-slate-900">{inv.customerName}</td>
                           <td className="px-6 py-5 font-mono text-xs">{inv.consumption.toLocaleString()}</td>
                           <td className="px-6 py-5 font-black text-slate-900">AED {inv.amount.toLocaleString()}</td>
                           <td className="px-6 py-5"><StatusBadge status={inv.status} /></td>
                           <td className="px-6 py-5 text-right">
                              <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 group-hover:text-blue-600 transition-all">
                                 <ArrowRight size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         {/* Leakage & Audit Tool */}
         <div className="space-y-6">
            <Card className="p-6 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-2 bg-rose-500 rounded-lg shadow-lg shadow-rose-500/30">
                        <AlertTriangle size={20} />
                     </div>
                     <div>
                        <h3 className="text-sm font-black uppercase tracking-widest">Revenue Leakage</h3>
                        <p className="text-[10px] font-bold text-rose-300">SYSTEM DETECTED ANOMALY</p>
                     </div>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3 mb-6">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Asset: Station 04</span>
                        <span className="text-[10px] font-bold text-rose-400 uppercase">Meter Lag</span>
                     </div>
                     <p className="text-sm font-bold">Zarqa Industrial Belt reported a 4.2% discrepancy between filled vs decanted quantity.</p>
                     <div className="flex justify-between items-center pt-2">
                        <span className="text-[10px] text-slate-400">Est. Impact</span>
                        <span className="text-lg font-black text-rose-400">AED 5,400</span>
                     </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-xs font-black py-4 uppercase tracking-widest">Launch Commercial Audit</Button>
               </div>
               <PieChart size={200} className="absolute -bottom-20 -right-20 text-white/5" />
            </Card>

            <Card className="p-6">
               <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <TrendingUp size={14} className="text-blue-600" /> Revenue Health Check
               </h3>
               <div className="space-y-6">
                  <HealthBar label="Invoice Collection (30d)" val={92} color="bg-emerald-500" />
                  <HealthBar label="Cost of Logistics Efficiency" val={74} color="bg-blue-500" />
                  <HealthBar label="Customer Retention Index" val={98} color="bg-indigo-500" />
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};

const HealthBar = ({ label, val, color }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
        <span>{label}</span>
        <span>{val}%</span>
     </div>
     <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${val}%` }} />
     </div>
  </div>
);
