
import React from 'react';
import { 
  Server, Activity, ShieldCheck, Zap, 
  Thermometer, Droplets, Wind, Settings, 
  Menu, Bell, Power, AlertTriangle
} from 'lucide-react';
import { Card } from '../components/CoreUI';
import { 
  MOCK_STATIONS, 
  MOCK_COMPRESSORS, 
  MOCK_DISPENSERS, 
  MOCK_HEAT_EXCHANGERS 
} from '../data/mockGasNetwork';

const formatNum = (val: number | undefined) => val !== undefined ? val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : '---';

export const StationCommandView: React.FC = () => {
  const station = MOCK_STATIONS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 -mt-2">
      {/* SCADA Top Bar Header */}
      <header className="flex justify-between items-center bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-200/60">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
               <Server size={24} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase leading-none">{station.name}</h1>
               <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Updated: September 11, 2025 at 08:07 PM</span>
               </div>
            </div>
         </div>
         <div className="flex gap-4">
            <div className="text-right">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Operator Session</p>
               <p className="text-sm font-black text-slate-900">Khalid A. (Senior Ops)</p>
            </div>
            <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-all text-slate-400">
               <Settings size={20} />
            </button>
         </div>
      </header>

      {/* Main Station HUD - Based on Screenshot 9 */}
      <section>
         <div className="bg-slate-700/10 p-1 rounded-2xl mb-4 text-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Station Summary</span>
         </div>
         
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Summary (Red Header) */}
            <Card className="p-0 overflow-hidden border-none shadow-xl col-span-1">
               <div className="bg-rose-700 text-white p-4 text-center">
                  <h3 className="text-sm font-black uppercase tracking-widest">System Summary</h3>
               </div>
               <div className="p-6 space-y-4 bg-white">
                  <SummaryRow label="Current Total Flow Rate" val={formatNum(station.telemetry.flow)} unit="Sm³/Hr" bold />
                  <SummaryRow label="Online Compressors" val="03" unit="Nos" />
                  <SummaryRow label="Online Dispensers" val="02" unit="Nos" />
                  <SummaryRow label="Daily Filling" val={formatNum(station.telemetry.dailyConsumption)} unit="Sm³" />
                  <SummaryRow label="Monthly Filling" val={formatNum(station.telemetry.totalizer)} unit="Sm³" />
               </div>
            </Card>

            {/* Station Parameters (Grey Header) */}
            <Card className="p-0 overflow-hidden border-none shadow-xl lg:col-span-2">
               <div className="bg-slate-700 text-white p-4 text-center">
                  <h3 className="text-sm font-black uppercase tracking-widest">Station Parameters</h3>
               </div>
               <div className="p-6 grid grid-cols-2 gap-x-12 gap-y-4 bg-white">
                  <div className="space-y-4">
                     <SummaryRow label="Inlet Pressure" val="7.00" unit="Bar" />
                     <SummaryRow label="Inlet Temperature" val="36.00" unit="°C" />
                     <SummaryRow label="Water Temp. HE Inlet" val="13.00" unit="°C" />
                     <SummaryRow label="Water Temp. HE Outlet" val="16.00" unit="°C" />
                  </div>
                  <div className="space-y-4">
                     <SummaryRow label="Air Pressure" val="8.00" unit="Bar" />
                     <SummaryRow label="Dewpoint" val="0.00" unit="°C" />
                     <SummaryRow label="Gas Detector - Storage 1" val="0.00" unit="%" />
                     <SummaryRow label="Gas Detector - Storage 2" val="0.00" unit="%" />
                  </div>
               </div>
            </Card>
         </div>
      </section>

      {/* Dispensers Section - Based on Screenshot 9 */}
      <section>
         <div className="bg-slate-700/10 p-1 rounded-2xl mb-4 text-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Dispensers</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {MOCK_DISPENSERS.map((disp) => (
               <Card key={disp.id} className="p-0 overflow-hidden border-none shadow-xl">
                  <div className="bg-slate-600 text-white p-3 text-center">
                     <h4 className="text-xs font-black uppercase tracking-widest">{disp.name}</h4>
                  </div>
                  <div className="p-5 space-y-4 bg-white">
                     <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compressor Status</span>
                        <div className="flex items-center gap-2">
                           <span className={`text-[10px] font-black ${disp.status === 'ON' ? 'text-emerald-500' : 'text-rose-500'}`}>{disp.status}</span>
                           <div className={`w-8 h-4 rounded-full relative p-0.5 transition-colors ${disp.status === 'ON' ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                              <div className={`w-3 h-3 bg-white rounded-full shadow transform transition-transform ${disp.status === 'ON' ? 'translate-x-4' : 'translate-x-0'}`} />
                           </div>
                        </div>
                     </div>
                     <DispenserMetric label="Flow Rate" val={formatNum(disp.telemetry.flow)} unit="Sm³/Hr" />
                     <DispenserMetric label="Filled Qty" val={formatNum(disp.telemetry.dailyConsumption)} unit="Sm³" />
                     <DispenserMetric label="Pressure" val={formatNum(disp.telemetry.pressure)} unit="Bar" />
                     <DispenserMetric label="Temperature" val={formatNum(disp.telemetry.temperature)} unit="°C" />
                     <DispenserMetric label="Totalizer" val={formatNum(disp.telemetry.totalizer)} unit="Sm³" />
                  </div>
               </Card>
            ))}
         </div>
      </section>

      {/* Split Compressors and Heat Exchangers - Based on Screenshot 10 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Compressors Fleet */}
         <section className="xl:col-span-2">
            <div className="bg-slate-700/10 p-1 rounded-2xl mb-4 text-center">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Compressors</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {MOCK_COMPRESSORS.map((comp) => (
                  <Card key={comp.id} className="p-0 overflow-hidden border-none shadow-lg">
                     <div className="bg-slate-600 text-white p-3 text-center">
                        <h4 className="text-xs font-black uppercase tracking-widest">{comp.name}</h4>
                     </div>
                     <div className="p-4 bg-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compressor Status</span>
                           <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-100 bg-slate-50">
                              <span className={`text-[9px] font-black ${comp.status === 'ON' ? 'text-emerald-500' : 'text-rose-500'}`}>{comp.status}</span>
                              <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${comp.status === 'ON' ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                                 <div className="w-1 h-1 bg-white rounded-full" />
                              </div>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-none">Running Hours</span>
                           <span className="text-sm font-black text-slate-900">{formatNum(comp.runningHours)} <span className="text-[10px] text-slate-400 uppercase">Hrs</span></span>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         </section>

         {/* Heat Exchangers fleet */}
         <section>
            <div className="bg-slate-700/10 p-1 rounded-2xl mb-4 text-center">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Heat Exchangers</span>
            </div>
            <div className="space-y-4">
               {MOCK_HEAT_EXCHANGERS.map((he) => (
                  <Card key={he.id} className="p-0 overflow-hidden border-none shadow-lg">
                     <div className="bg-slate-600 text-white p-3 text-center">
                        <h4 className="text-xs font-black uppercase tracking-widest">{he.name}</h4>
                     </div>
                     <div className="p-4 bg-white grid grid-cols-2 gap-4">
                        <div className="flex justify-between items-center">
                           <span className="text-[9px] font-black text-slate-400 uppercase">Gas Inlet Temp.</span>
                           <span className="text-xs font-black text-slate-900">{formatNum(he.inlet)} <span className="text-[10px] text-slate-400 font-medium">°C</span></span>
                        </div>
                        <div className="flex justify-between items-center pl-4 border-l border-slate-100">
                           <span className="text-[9px] font-black text-slate-400 uppercase">Gas Outlet Temp.</span>
                           <span className={`text-xs font-black ${he.outlet > 100 ? 'text-rose-600' : 'text-slate-900'}`}>{formatNum(he.outlet)} <span className="text-[10px] text-slate-400 font-medium">°C</span></span>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         </section>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, val, unit, bold }: any) => (
   <div className="flex justify-between items-center py-0.5">
      <span className="text-[11px] font-black text-slate-500 uppercase tracking-tight">{label}</span>
      <div className="flex items-baseline gap-1.5">
         <span className={`text-sm font-black ${bold ? 'text-rose-700 text-base' : 'text-slate-900'}`}>{val}</span>
         <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>
      </div>
   </div>
);

const DispenserMetric = ({ label, val, unit }: any) => (
   <div className="flex justify-between items-center">
      <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
      <div className="flex items-baseline gap-1.5">
         <span className="text-sm font-black text-slate-900">{val}</span>
         <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>
      </div>
   </div>
);
