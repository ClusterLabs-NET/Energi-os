import React from 'react';
import { 
  Activity, Zap, AlertCircle, TrendingUp, ShieldCheck, 
  X, Crosshair, Cpu, Wind, Thermometer, Radio, 
  FileText, ClipboardList, ShieldAlert, ChevronRight, Gauge, 
  History, Settings, Clock
} from 'lucide-react';
import { GasAsset } from '../types';
import { Card, StatusBadge, Button } from './CoreUI';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid, XAxis, Tooltip } from 'recharts';

interface DigitalTwinSidebarProps {
  selectedAsset: GasAsset | null;
  onDeselect: () => void;
}

const MOCK_FLOW = [
  { t: '18:00', v: 450 }, { t: '19:00', v: 480 }, { t: '20:00', v: 465 }, 
  { t: '21:00', v: 510 }, { t: '22:00', v: 495 }
];

export const DigitalTwinSidebar: React.FC<DigitalTwinSidebarProps> = ({ selectedAsset, onDeselect }) => {
  return (
    <Card className="h-full border-slate-200/60 rounded-[32px] shadow-2xl flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl ${selectedAsset ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
            {selectedAsset ? <Crosshair size={22} /> : <Activity size={22} />}
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.1em]">
              {selectedAsset ? 'Asset Intelligence' : 'Network Intelligence'}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {selectedAsset ? 'Unit Level Analysis' : 'Aggregated SCADA Hub'}
            </p>
          </div>
        </div>
        {selectedAsset && (
          <button onClick={onDeselect} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
        {selectedAsset ? (
          <>
            {/* ASSET CONTEXT */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                   <div>
                     <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 block">ID: {selectedAsset.id}</span>
                     <h3 className="text-2xl font-black text-slate-900 tracking-tight">{selectedAsset.name}</h3>
                   </div>
                   <StatusBadge status={selectedAsset.status} />
                </div>
                <p className="text-xs text-slate-500 font-medium">Infrastructure Hub • UAE Regional Network</p>
              </div>

              {/* TELEMETRY BLOCKS */}
              <div className="grid grid-cols-2 gap-3">
                <DataTile label="Current Flow" val={selectedAsset.telemetry.flow} unit="Sm³/Hr" />
                <DataTile label="Operating Pressure" val={selectedAsset.telemetry.pressure} unit="Bar" />
                <DataTile label="Ambient Temp" val={selectedAsset.telemetry.temperature} unit="°C" />
                <DataTile label="First Stage" val={selectedAsset.telemetry.firstStagePressure || 7.0} unit="Bar" />
              </div>

              {/* TREND CHART */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <History size={14} className="text-blue-500" /> Historical Performance
                  </h4>
                  <span className="text-[9px] font-bold text-slate-300">LAST 6 HOURS</span>
                </div>
                <div className="h-40 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_FLOW}>
                      <defs>
                        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={3} fill="url(#chartColor)" />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* ACTIVE WORK ORDERS */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Maintenance</h4>
                <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-3">
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-slate-900 uppercase">WO-1048</span>
                     <StatusBadge status="WARNING" />
                   </div>
                   <p className="text-xs font-bold text-slate-700">Scheduled: Calibration of Inlet Meter</p>
                   <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase">
                     <Clock size={12} /> Target: 12 Sep 2025
                   </div>
                </div>
              </section>
            </div>
          </>
        ) : (
          /* GLOBAL HUB MODE */
          <>
            <div className="grid grid-cols-2 gap-4">
               <SummaryCard label="System Throughput" val="6.3k" unit="Sm³" status="UP" />
               <SummaryCard label="Network Uptime" val="99.9" unit="%" status="UP" />
            </div>

            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} className="text-blue-500" /> Operational Insights
                </h4>
                <span className="text-[9px] font-bold text-rose-500 animate-pulse">3 ALERTS ACTIVE</span>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'PRESSURE BREACH: T12', desc: 'Fleet unit reports critical pressure differential.', status: 'CRITICAL' },
                  { title: 'SUPPLY LAG: EDIL', desc: 'Edible Oil reporting 2.1% drop in supply volume.', status: 'WARNING' },
                  { title: 'FLEET ROUTING: T15', desc: 'T15 entering Jebel Ali corridor. ETA: 22 Mins.', status: 'HEALTHY' }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`text-[10px] font-black uppercase ${
                        item.status === 'CRITICAL' ? 'text-rose-500' : 
                        item.status === 'WARNING' ? 'text-amber-500' : 'text-emerald-500'
                      }`}>{item.title}</span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <p className="text-xs font-medium text-slate-600 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Regional Load Distribution</h4>
               <div className="space-y-5">
                  <ProgressBarRow label="Abu Dhabi South" val={84} color="bg-blue-500" />
                  <ProgressBarRow label="Dubai Logistics" val={42} color="bg-amber-500" />
                  <ProgressBarRow label="Kezad Industrial" val={91} color="bg-rose-500" />
               </div>
            </section>
          </>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <div className="flex gap-2">
          <Button className="flex-1 h-12 shadow-blue-500/20 shadow-lg">
            {selectedAsset ? 'CREATE WORK ORDER' : 'SYSTEM DIAGNOSTICS'}
          </Button>
          <button className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </Card>
  );
};

const DataTile = ({ label, val, unit }: any) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-black text-slate-900">{val.toLocaleString()}</span>
      <span className="text-[9px] font-black text-slate-400 uppercase">{unit}</span>
    </div>
  </div>
);

const SummaryCard = ({ label, val, unit, status }: any) => (
  <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm group">
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-black text-slate-900">{val}</span>
      <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>
    </div>
    <div className={`mt-2 text-[9px] font-black uppercase ${status === 'UP' ? 'text-emerald-500' : 'text-rose-500'}`}>
      {status === 'UP' ? '↑ Increasing' : '↓ Decreasing'}
    </div>
  </div>
);

const ProgressBarRow = ({ label, val, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
      <span>{label}</span>
      <span className="text-slate-900">{val}%</span>
    </div>
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-1000 shadow-sm`} style={{ width: `${val}%` }} />
    </div>
  </div>
);