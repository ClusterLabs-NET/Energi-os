
import React, { useState } from 'react';
import { X, Activity, Clock, Settings, AlertTriangle, TrendingUp, ShieldCheck, Plus, FileText, ClipboardList } from 'lucide-react';
import { GasAsset } from '../types';
import { Card, StatusBadge, Button } from './CoreUI';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid, XAxis, Tooltip } from 'recharts';

interface AssetDetailPanelProps {
  asset: GasAsset;
  onClose: () => void;
  onCreateWorkOrder?: (asset: GasAsset) => void;
}

const MOCK_CHART_DATA = [
  { time: '14:00', val: 190 }, { time: '15:00', val: 195 },
  { time: '16:00', val: 210 }, { time: '17:00', val: 205 },
  { time: '18:00', val: 215 }, { time: '19:00', val: 220 },
  { time: '20:00', val: 218 },
];

export const AssetDetailPanel: React.FC<AssetDetailPanelProps> = ({ asset, onClose, onCreateWorkOrder }) => {
  const [activeTab, setActiveTab] = useState<'DATA' | 'ALARMS' | 'WO'>('DATA');

  return (
    <div className="absolute top-4 right-4 bottom-4 w-[420px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-[32px] border border-slate-200 z-[1000] flex flex-col overflow-hidden animate-in slide-in-from-right duration-500 ring-1 ring-black/5">
      {/* Panel Header */}
      <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{asset.type?.replace('_', ' ')}</span>
            <StatusBadge status={asset.status} />
          </div>
          <h2 className="text-xl font-black text-slate-900 leading-tight tracking-tight">{asset.name}</h2>
        </div>
        <button onClick={onClose} className="p-2.5 hover:bg-slate-200 rounded-full text-slate-400 transition-colors bg-white shadow-sm border border-slate-100">
          <X size={20} />
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex px-8 py-4 bg-white gap-2">
        {[
          { id: 'DATA', label: 'Telemetry', icon: Activity },
          { id: 'ALARMS', label: 'Alarms', icon: AlertTriangle },
          { id: 'WO', label: 'Work Orders', icon: ClipboardList }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
        {activeTab === 'DATA' && (
          <>
            {/* Real-time Telemetry Hud */}
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Operating Pressure', val: asset.telemetry.pressure, unit: 'Bar', icon: TrendingUp, color: 'blue' },
                { label: 'Gas Flow Rate', val: asset.telemetry.flow, unit: 'Sm³/Hr', icon: Activity, color: 'emerald' },
                { label: 'Ambient Temp', val: asset.telemetry.temperature, unit: '°C', icon: ShieldCheck, color: 'orange' },
              ].map((t, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${t.color}-50 text-${t.color}-600 rounded-xl group-hover:scale-110 transition-transform`}>
                      <t.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{t.label}</p>
                      <p className="text-lg font-black text-slate-900">{t.val.toLocaleString()} <span className="text-xs text-slate-400 font-bold uppercase">{t.unit}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Historical Trend Chart */}
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Historical Pressure Gradient</h3>
              <div className="h-44 w-full bg-slate-50 rounded-3xl p-4 border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_CHART_DATA}>
                    <defs>
                      <linearGradient id="panelColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} fill="url(#panelColor)" dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          </>
        )}

        {activeTab === 'ALARMS' && (
           <div className="space-y-4">
              <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl">
                 <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle size={18} className="text-rose-600" />
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">High Pressure Alarm</span>
                 </div>
                 <p className="text-xs font-bold text-rose-900 leading-snug">Sensor reported differential exceeding 15% threshold at 20:07 PM.</p>
                 <div className="mt-4 flex gap-2">
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white">Acknowledge</Button>
                    <Button size="sm" variant="outline" className="border-rose-200 text-rose-600">Mute 1h</Button>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'WO' && (
           <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Maintenance</h4>
                 <Button variant="outline" size="sm" className="h-8 px-2 text-[9px]"><Plus size={12}/> NEW WO</Button>
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase">#WO-1048</span>
                    <StatusBadge status="IN_PROGRESS" />
                 </div>
                 <p className="text-xs font-bold text-slate-900">Calibration of Primary Outlet Valve</p>
                 <div className="mt-3 flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase">
                    <Clock size={12} /> Deadline: 12 Sep 2025
                 </div>
              </div>
           </div>
        )}
      </div>

      <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
        <Button 
          onClick={() => onCreateWorkOrder?.(asset)}
          className="flex-1 h-12 shadow-blue-500/20 shadow-lg"
        >
          GENERATE WORK ORDER
        </Button>
        <button className="h-12 w-12 flex items-center justify-center border border-slate-200 bg-white rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};
