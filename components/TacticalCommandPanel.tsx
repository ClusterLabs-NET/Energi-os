
import React from 'react';
import { 
  Activity, Zap, AlertCircle, TrendingUp, ShieldCheck, 
  X, Crosshair, Cpu, Wind, Thermometer, Radio, 
  FileText, ClipboardList, ShieldAlert, ChevronRight, Gauge
} from 'lucide-react';
import { GasAsset } from '../types';
import { Card, StatusBadge, Button } from './CoreUI';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid, XAxis, Tooltip } from 'recharts';

interface TacticalCommandPanelProps {
  selectedAsset: GasAsset | null;
  onDeselect: () => void;
}

const MOCK_HISTORICAL = [
  { time: '18:00', v: 180 }, { time: '18:30', v: 195 },
  { time: '19:00', v: 210 }, { time: '19:30', v: 205 },
  { time: '20:00', v: 218 },
];

export const TacticalCommandPanel: React.FC<TacticalCommandPanelProps> = ({ selectedAsset, onDeselect }) => {
  return (
    <Card className="flex-1 bg-slate-950 border-white/10 rounded-[32px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/5">
      {/* Tactical Header */}
      <div className="p-6 bg-slate-900 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${selectedAsset ? 'bg-cyan-600 shadow-[0_0_15px_#0891b2]' : 'bg-slate-800'}`}>
            {selectedAsset ? <Crosshair size={20} className="text-white" /> : <Cpu size={20} className="text-cyan-400" />}
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">
              {selectedAsset ? 'Unit Intelligence' : 'Command Center'}
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Feed: Secure Link</span>
            </div>
          </div>
        </div>
        {selectedAsset && (
          <button onClick={onDeselect} className="p-2 hover:bg-white/5 rounded-full text-slate-500 transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-6">
        
        {/* SELECTION MODE: Asset Details */}
        {selectedAsset ? (
          <>
            {/* Unit Identity Block */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1">Asset ID: {selectedAsset.id}</p>
                    <h3 className="text-xl font-black text-white tracking-tight">{selectedAsset.name}</h3>
                  </div>
                  <StatusBadge status={selectedAsset.status} />
               </div>
               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Type</p>
                    <p className="text-xs font-bold text-slate-200">{selectedAsset.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Uptime</p>
                    <p className="text-xs font-bold text-emerald-400">99.98%</p>
                  </div>
               </div>
            </div>

            {/* Tactical Gauges Grid */}
            <div className="grid grid-cols-2 gap-3">
               <TacticalGauge label="Inlet Pressure" val={selectedAsset.telemetry.inletPressure || 0} unit="BAR" color="cyan" />
               <TacticalGauge label="Operating Flow" val={selectedAsset.telemetry.flow} unit="SCM/H" color="amber" />
               <TacticalGauge label="Ambient Temp" val={selectedAsset.telemetry.temperature} unit="°C" color="slate" />
               <TacticalGauge label="Dew Point" val={selectedAsset.telemetry.dewPoint || 0} unit="°C" color="slate" />
            </div>

            {/* Live Waveform Chart */}
            <section className="space-y-3">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <Activity size={12} className="text-cyan-400" /> Historical Trend Analysis
               </h4>
               <div className="h-36 bg-slate-900/50 rounded-2xl border border-white/5 p-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={MOCK_HISTORICAL}>
                     <defs>
                       <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <Area type="monotone" dataKey="v" stroke="#06b6d4" strokeWidth={2} fill="url(#chartGlow)" />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px' }}
                        itemStyle={{ color: '#22d3ee' }}
                     />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </section>

            {/* Unit Alerts */}
            {selectedAsset.status !== 'HEALTHY' && (
               <div className="p-4 bg-rose-950/30 border border-rose-500/20 rounded-2xl">
                 <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert size={16} className="text-rose-500" />
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Active Alarm System</span>
                 </div>
                 <p className="text-[11px] text-rose-200 font-medium leading-relaxed">
                   Threshold Breach Detected: Current pressure 218 Bar exceeds safety limit for this sector.
                 </p>
               </div>
            )}
          </>
        ) : (
          /* GLOBAL HUB MODE: System Summary */
          <>
            {/* Global Network Health HUD */}
            <div className="grid grid-cols-2 gap-4">
              <StatBlock label="Active Sites" val="24" unit="Units" icon={ShieldCheck} color="cyan" />
              <StatBlock label="System Load" val="74" unit="%" icon={Zap} color="amber" />
            </div>

            {/* Priority Operational Insights - Restored & Extended */}
            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <Radio size={12} className="text-cyan-400" /> High-Priority Intelligence
               </h4>
               <div className="space-y-3">
                  {[
                    { title: 'PRESSURE BREACH: T12', desc: 'Logistics unit T12 reports 250 Bar (Critical). Sector 4 exposure.', status: 'CRITICAL' },
                    { title: 'SUPPLY LAG: EDIBLE OIL', desc: 'Partner EDIL reporting 2% meter drift. Potential revenue leak.', status: 'WARNING' },
                    { title: 'FLEET LOG: T15', desc: 'En-route to Dubai South. ETA synchronized with terminal capacity.', status: 'HEALTHY' },
                    { title: 'KEZAD STATION', desc: 'Compressor 4 maintenance cycle approaching (90% hours).', status: 'HEALTHY' }
                  ].map((insight, i) => (
                    <div key={i} className="p-4 bg-white/5 border border-white/5 hover:bg-white/10 rounded-2xl transition-all cursor-pointer group">
                       <div className="flex justify-between items-center mb-1">
                          <span className={`text-[10px] font-black tracking-widest ${
                            insight.status === 'CRITICAL' ? 'text-rose-500' : 
                            insight.status === 'WARNING' ? 'text-amber-500' : 'text-cyan-400'
                          }`}>
                            {insight.title}
                          </span>
                          <ChevronRight size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-all" />
                       </div>
                       <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{insight.desc}</p>
                    </div>
                  ))}
               </div>
            </section>

            {/* Global Scada Summary */}
            <section className="p-5 bg-slate-900 border border-white/5 rounded-2xl">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Network Wide Consumption</h4>
               <div className="space-y-4">
                  <SystemBar label="Abu Dhabi Sector" val={82} color="bg-cyan-500" />
                  <SystemBar label="Dubai Logistics" val={45} color="bg-amber-500" />
                  <SystemBar label="Kezad Industrial" val={91} color="bg-rose-500" />
               </div>
            </section>
          </>
        )}
      </div>

      {/* Footer Tactical Actions */}
      <div className="p-6 bg-slate-900 border-t border-white/10 space-y-3">
        {selectedAsset ? (
           <>
             <Button className="w-full h-12 bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.3)]">GENERATE UNIT WO</Button>
             <button className="w-full py-3 text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] border border-rose-500/20 rounded-xl hover:bg-rose-500/10 transition-all">
                EMERGENCY SHUTDOWN (ESD)
             </button>
           </>
        ) : (
           <Button className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/20 uppercase tracking-[0.2em]">
             INITIATE SYSTEM AUDIT
           </Button>
        )}
      </div>
    </Card>
  );
};

const TacticalGauge = ({ label, val, unit, color }: any) => (
  <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className={`text-lg font-black tracking-tight ${color === 'cyan' ? 'text-cyan-400' : color === 'amber' ? 'text-amber-500' : 'text-slate-200'}`}>
        {val.toLocaleString()}
      </span>
      <span className="text-[9px] font-black text-slate-600 uppercase">{unit}</span>
    </div>
  </div>
);

const StatBlock = ({ label, val, unit, icon: Icon, color }: any) => (
  <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-between group cursor-default">
    <div>
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-black ${color === 'cyan' ? 'text-cyan-400' : 'text-amber-500'}`}>{val}</span>
        <span className="text-[10px] font-black text-slate-600 uppercase">{unit}</span>
      </div>
    </div>
    <Icon size={24} className={`${color === 'cyan' ? 'text-cyan-600' : 'text-amber-600'} opacity-30 group-hover:opacity-100 transition-opacity`} />
  </div>
);

const SystemBar = ({ label, val, color }: any) => (
  <div className="space-y-1.5">
     <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-tighter">
        <span>{label}</span>
        <span className="text-slate-200">{val}%</span>
     </div>
     <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000 shadow-[0_0_8px_currentColor]`} style={{ width: `${val}%` }} />
     </div>
  </div>
);
