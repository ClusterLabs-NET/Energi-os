
import React, { useState } from 'react';
import { 
  Calendar, Truck, Users, MapPin, Search, Filter, 
  ChevronDown, X, Download, RefreshCw, BarChart, 
  Activity, Droplets, Zap, TrendingUp, ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, Cell, Legend, ComposedChart, Line } from 'recharts';
import { Card, StatusBadge } from '../components/CoreUI';
import { MOCK_CUSTOMERS } from '../data/mockGasNetwork';

const formatNum = (val: number | undefined) => val !== undefined ? val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : '---';

const SUMMARY_METRICS = [
  { label: 'Filled Quantity', value: '169,755,116', unit: 'SCM' },
  { label: 'Decanted Quantity', value: '168,361,439', unit: 'SCM' },
  { label: 'Standby Trips', value: '32', unit: 'Nos' },
  { label: 'Standby Quantity', value: '135,397', unit: 'SCM' },
  { label: 'Decanting Trips', value: '28', unit: 'Nos' },
  { label: 'Decanting Quantity', value: '104,350', unit: 'SCM' },
  { label: 'Decanting Difference', value: '1,153,930', unit: 'SCM' },
  { label: 'Decanting Accuracy %', value: '99.32', unit: '%' },
  { label: 'Decanting Difference %', value: '0.68', unit: '%' },
  { label: 'Trips', value: '40,814', unit: 'Nos' },
  { label: 'CGMs', value: '73', unit: 'Nos' },
  { label: 'Customers', value: '45', unit: 'Nos' },
  { label: 'Stations', value: '11', unit: 'Nos' },
];

const TIME_CHART_DATA = Array.from({ length: 40 }, (_, i) => ({
  time: 2018 + i * 0.2,
  val: 500000 + Math.pow(i, 1.8) * 5000 + Math.random() * 500000,
}));

const TOP_DAYS_DATA = [
  { date: '22 Aug 2025', lifted: 180000, trips: 45 },
  { date: '25 Jun 2025', lifted: 155000, trips: 41 },
  { date: '13 Mar 2025', lifted: 165000, trips: 43 },
  { date: '24 Jul 2025', lifted: 160000, trips: 39 },
  { date: '30 Apr 2025', lifted: 158000, trips: 42 },
];

export const OperationsView: React.FC<{ onSelectCustomer?: (id: string) => void }> = ({ onSelectCustomer }) => {
  const [timeFilter, setTimeFilter] = useState('Monthly');

  return (
    <div className="flex gap-6 animate-in fade-in duration-500 pb-20 -mt-4">
      {/* Left Navigation Filter Sidebar */}
      <aside className="w-64 flex flex-col gap-3 flex-shrink-0">
        <FilterBlock label="Date" icon={Calendar} />
        <FilterBlock label="Years" icon={Calendar} />
        <FilterBlock label="Half-Year" icon={Activity} />
        <FilterBlock label="Quarters" icon={BarChart} />
        <FilterBlock label="Months" icon={Calendar} />
        <FilterBlock label="CGM" icon={Truck} />
        <FilterBlock label="Customers" icon={Users} />
        <FilterBlock label="Stations" icon={Zap} />
        <FilterBlock label="Zones" icon={MapPin} />
      </aside>

      {/* Main Analysis Hub */}
      <div className="flex-1 space-y-6 overflow-hidden">
        
        {/* Horizontal Summary Strip */}
        <section>
          <div className="flex items-center gap-2 mb-3">
             <h2 className="text-xl font-black text-slate-800 tracking-tight">Summary</h2>
             <div className="h-0.5 flex-1 bg-slate-100" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
            {SUMMARY_METRICS.map((m, i) => (
              <Card key={i} className="p-4 bg-slate-50/50 border-slate-200/60 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-colors cursor-default">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{m.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black text-slate-700">{m.value}</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase">{m.unit}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Large Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <Card className="lg:col-span-3 p-6 flex flex-col">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                 <div className="flex items-center gap-2">
                    {['Daily', 'Monthly', 'Quarterly', 'Yearly'].map(t => (
                       <button 
                          key={t}
                          onClick={() => setTimeFilter(t)}
                          className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border ${timeFilter === t ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
                       >
                          {t}
                       </button>
                    ))}
                 </div>
                 <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest text-center flex-1">Total Filled Quantity</h3>
              </div>
              
              <div className="h-[360px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TIME_CHART_DATA}>
                       <defs>
                          <linearGradient id="colorFilled" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis 
                          dataKey="time" 
                          stroke="#94a3b8" 
                          fontSize={11} 
                          tickLine={false} 
                          axisLine={false} 
                          tickFormatter={(v) => Math.floor(v).toString()}
                          interval={4}
                       />
                       <YAxis 
                          stroke="#94a3b8" 
                          fontSize={11} 
                          tickLine={false} 
                          axisLine={false} 
                          tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} 
                       />
                       <Tooltip 
                          contentStyle={{ border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                          itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="val" 
                          stroke="#3b82f6" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#colorFilled)" 
                          dot={{ r: 3, fill: '#3b82f6', strokeWidth: 1, stroke: '#fff' }} 
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </Card>

           <Card className="p-6 flex flex-col">
              <div className="text-center mb-6">
                 <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Top 5 Days</h3>
                 <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                       <span className="text-[9px] font-bold text-slate-400 uppercase">Lifted Qty</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                       <span className="text-[9px] font-bold text-slate-400 uppercase">Trips</span>
                    </div>
                 </div>
              </div>
              
              <div className="flex-1">
                 <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={TOP_DAYS_DATA}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis 
                          dataKey="date" 
                          fontSize={9} 
                          angle={35} 
                          textAnchor="start" 
                          stroke="#94a3b8" 
                          tickLine={false} 
                          axisLine={false}
                          height={50}
                       />
                       <YAxis yAxisId="left" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                       <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                       <Tooltip />
                       <Bar yAxisId="left" dataKey="lifted" fill="#10b981" opacity={0.5} radius={[4, 4, 0, 0]} barSize={24} />
                       <Line yAxisId="right" type="monotone" dataKey="trips" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4, fill: '#f43f5e' }} />
                    </ComposedChart>
                 </ResponsiveContainer>
              </div>
           </Card>
        </div>

        {/* Industrial Client Cards Grid - Detailed Infrastructure Units */}
        <div className="pt-4">
           <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Active Infrastructure Units</h2>
              <div className="h-0.5 flex-1 bg-slate-100" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {MOCK_CUSTOMERS.map((cust) => (
                 <Card 
                   key={cust.id} 
                   className="p-0 overflow-hidden border-slate-200/80 shadow-lg group hover:border-blue-400 transition-all cursor-pointer" 
                   onClick={() => onSelectCustomer?.(cust.id)}
                 >
                    <div className="bg-slate-800 text-white p-3 text-center group-hover:bg-slate-900 transition-colors">
                       <h3 className="text-[11px] font-black uppercase tracking-widest">{cust.name}</h3>
                    </div>
                    <div className="p-4 space-y-2 bg-white">
                       <SmallTelemetryRow label="Flow Rate" val={cust.telemetry.flow} unit="Sm³/Hr" bold />
                       <SmallTelemetryRow label="Totalizer" val={cust.telemetry.totalizer} unit="Sm³" />
                       <SmallTelemetryRow label="Inlet Pressure" val={cust.telemetry.inletPressure} unit="Bar" bold />
                       <SmallTelemetryRow label="Outlet Pressure" val={cust.telemetry.outletPressure} unit="Bar" />
                       <SmallTelemetryRow label="Outlet Temp" val={cust.telemetry.outletTemperature} unit="°C" />
                       <SmallTelemetryRow label="First Stage Pressure" val={cust.telemetry.firstStagePressure} unit="Bar" />
                       <SmallTelemetryRow label="Fuel Gas Pressure" val={cust.telemetry.fuelGasPressure} unit="Bar" />
                       <SmallTelemetryRow label="First Stage Temp" val={cust.telemetry.firstStageTemperature} unit="°C" />
                       <SmallTelemetryRow label="Active Boiler" val={cust.telemetry.activeBoiler} />
                       <SmallTelemetryRow label="Active Line" val={cust.telemetry.activeLine} />
                       
                       <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-100">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">System Link</span>
                          <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                             <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">LIVE</span>
                          </div>
                       </div>
                    </div>
                 </Card>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const FilterBlock = ({ label, icon: Icon }: any) => (
  <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all group">
     <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-100 text-slate-400 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
           <Icon size={14} />
        </div>
        <span className="text-xs font-black text-slate-600 uppercase tracking-wider">{label}</span>
     </div>
     <div className="flex items-center gap-2">
        <ChevronDown size={14} className="text-slate-300" />
        <X size={12} className="text-slate-200 hover:text-rose-400 transition-colors" />
     </div>
  </button>
);

const SmallTelemetryRow = ({ label, val, unit, bold }: any) => (
   <div className="flex justify-between items-baseline py-0.5 border-b border-slate-50 last:border-0">
      <span className="text-[9px] font-medium text-slate-400 uppercase tracking-tight">{label}</span>
      <div className="flex items-baseline gap-1">
         <span className={`text-[10px] ${bold ? 'font-black text-slate-900' : 'font-bold text-slate-600'}`}>
            {formatNum(val)}
         </span>
         {unit && <span className="text-[8px] font-bold text-slate-400 uppercase">{unit}</span>}
      </div>
   </div>
);
