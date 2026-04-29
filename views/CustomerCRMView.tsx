import React, { useState } from 'react';
import { 
  Search, MapPin, TrendingUp, Filter, Gauge, 
  Zap, Activity, ShieldCheck, ArrowLeft, Download, 
  RefreshCcw, User, ChevronRight, ChevronLeft, Settings, Info,
  Database, Droplets, Thermometer, Clock, Maximize2, Camera,
  DollarSign, BarChart3, LineChart as LucideLineChart,
  Navigation, Globe, ChevronDown, Phone, Mail, UserCheck, 
  CreditCard, Calendar, Briefcase
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, LineChart, Line, ComposedChart 
} from 'recharts';
import { Card, Button } from '../components/CoreUI';
import { MOCK_CUSTOMERS } from '../data/mockGasNetwork';

// High-fidelity mock data for long-term consumption
const MOCK_LONG_TERM_CONSUMPTION = Array.from({ length: 90 }, (_, i) => ({
  name: 2018 + Math.floor(i / 12) + (i % 12) / 12,
  val: Math.floor(Math.random() * 60000) + 10000,
  isPeak: i === 22 
}));

// Real-time fluctuating telemetry mock
const MOCK_PRESSURE_FEED = Array.from({ length: 60 }, (_, i) => ({
  time: `1${Math.floor(i/10)}:0${i%10}`,
  flow: 0,
  pressure: 0.7 + (Math.random() > 0.8 ? Math.random() * 0.2 : 0.1)
}));

// Financial Forecast Data
const MOCK_FINANCIAL_FORECAST = [
  { month: 'Jan', actual: 42000, forecast: 41000 },
  { month: 'Feb', actual: 38000, forecast: 39500 },
  { month: 'Mar', actual: 45000, forecast: 43000 },
  { month: 'Apr', actual: 48000, forecast: 46000 },
  { month: 'May', actual: 41000, forecast: 42500 },
  { month: 'Jun', forecast: 44000 },
  { month: 'Jul', forecast: 46500 },
  { month: 'Aug', forecast: 49000 },
  { month: 'Sep', forecast: 47000 },
  { month: 'Oct', forecast: 45000 },
  { month: 'Nov', forecast: 48000 },
  { month: 'Dec', forecast: 52000 },
];

interface CustomerCRMViewProps {
  customerId?: string | null;
  onBack?: () => void;
  onViewOnMap?: (id: string) => void;
}

export const CustomerCRMView: React.FC<CustomerCRMViewProps> = ({ customerId, onBack, onViewOnMap }) => {
  const [localSelectedId, setLocalSelectedId] = useState<string | null>(customerId || null);
  const [granularity, setGranularity] = useState('Monthly');
  const [prmsPeriod, setPrmsPeriod] = useState('06 Hours');
  const [prmsGranularity, setPrmsGranularity] = useState('01 Minute');

  const customer = MOCK_CUSTOMERS.find(c => c.id === localSelectedId);
  const currentIndex = MOCK_CUSTOMERS.findIndex(c => c.id === localSelectedId);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % MOCK_CUSTOMERS.length;
    setLocalSelectedId(MOCK_CUSTOMERS[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + MOCK_CUSTOMERS.length) % MOCK_CUSTOMERS.length;
    setLocalSelectedId(MOCK_CUSTOMERS[prevIdx].id);
  };

  if (!customer) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Partner Hub</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Manage industrial assets and telemetry oversight.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search partners..." className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none w-64" />
            </div>
            <Button variant="outline"><Filter size={14} className="mr-2" /> Filters</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_CUSTOMERS.map(c => (
            <Card key={c.id} className="p-6 hover:shadow-xl transition-all cursor-pointer group" onClick={() => setLocalSelectedId(c.id)}>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <User size={24} />
                </div>
                <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black border border-emerald-100 uppercase">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" /> {c.status}
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{c.name}</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5"><MapPin size={12} /> {c.location}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6 py-4 border-t border-slate-50">
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Inlet Pressure</span>
                  <span className="text-sm font-black text-slate-900">{c.telemetry.inletPressure?.toFixed(2)} <span className="text-[10px] text-slate-400 font-bold uppercase">Bar</span></span>
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Daily Flow</span>
                  <span className="text-sm font-black text-slate-900">{c.telemetry.flow.toLocaleString()} <span className="text-[10px] text-slate-400 font-bold uppercase">Sm³</span></span>
                </div>
              </div>
              
              <div className="flex justify-end mt-2">
                <div className="flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  View Analysis <ChevronRight size={14} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* SIMPLIFIED TOP NAVIGATION BANNER */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 px-4 py-2.5 rounded-2xl shadow-sm flex items-center justify-between sticky top-2 z-[60]">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
            <button 
              onClick={handlePrev} 
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-slate-900 transition-all"
              title="Previous Partner"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="relative min-w-[240px]">
              <select
                value={customer.id}
                onChange={(e) => setLocalSelectedId(e.target.value)}
                className="w-full bg-transparent pl-3 pr-8 py-1 text-xs font-black text-slate-700 outline-none appearance-none cursor-pointer uppercase tracking-tight"
              >
                {MOCK_CUSTOMERS.map(c => (
                  <option key={c.id} value={c.id}>{c.name} • {c.code}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <button 
              onClick={handleNext} 
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-slate-900 transition-all"
              title="Next Partner"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <button 
             onClick={() => onViewOnMap?.(customer.id)}
             className="p-2.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all border border-transparent hover:border-blue-100" 
             title="View on Digital Twin Map"
           >
              <Globe size={18} />
           </button>
           <div className="h-6 w-px bg-slate-200 mx-1" />
           <button 
             onClick={() => { if(onBack) onBack(); setLocalSelectedId(null); }}
             className="px-4 py-2 hover:bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
           >
             Close
           </button>
        </div>
      </div>

      {/* Main Profile Content Header */}
      <header className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-900/10">
              <User size={28} />
           </div>
           <div>
              <div className="flex items-center gap-3">
                 <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{customer.name}</h1>
                 <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> TELEMETRY ONLINE
                 </div>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                 <MapPin size={12} className="text-blue-500" /> {customer.location} • {customer.zone} • Established {customer.commissioningDate.split('-')[2]}
              </p>
           </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 h-11"><Download size={14} /> EXPORT DATA</Button>
           <Button className="gap-2 h-11 shadow-lg shadow-blue-500/20"><RefreshCcw size={14} /> REFRESH HUB</Button>
        </div>
      </header>

      {/* NEW: COMMERCIAL INTELLIGENCE & CRM PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 p-0 overflow-hidden border-none shadow-xl">
            <div className="bg-slate-900 text-white p-4 px-6 flex justify-between items-center border-b border-white/5">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
                  <Briefcase size={18} className="text-blue-400" /> Commercial Profile & CRM Intelligence
               </h3>
               <span className="text-[9px] font-black text-slate-400 uppercase bg-white/5 px-2 py-1 rounded">Priority: Tier 1 Strategic</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
               {/* Contact Section */}
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <UserCheck size={14} className="text-blue-500" /> Primary Account Contact
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-sm">JS</div>
                        <div>
                           <p className="text-sm font-black text-slate-900 uppercase">James Sinclair</p>
                           <p className="text-[10px] font-bold text-slate-500 uppercase">Operations Director</p>
                        </div>
                     </div>
                     <div className="h-px bg-slate-200/50" />
                     <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                           <Phone size={14} className="text-slate-400" /> +971 50 123 4567
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                           <Mail size={14} className="text-slate-400" /> j.sinclair@industrial-partners.com
                        </div>
                     </div>
                  </div>
               </div>

               {/* Lifecycle & CRM Stats */}
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <TrendingUp size={14} className="text-emerald-500" /> Account Lifecycle
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Registration</p>
                        <p className="text-xs font-black text-slate-900">{customer.commissioningDate}</p>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Total Deliveries</p>
                        <p className="text-xs font-black text-slate-900">{customer.utilization.totalFillingTrips} Missions</p>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Support Status</p>
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded uppercase">Healthy</span>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">SLA Level</p>
                        <p className="text-xs font-black text-slate-900 uppercase">Premium 99.9%</p>
                     </div>
                  </div>
               </div>
            </div>
         </Card>

         {/* FINANCIAL STATUS MINI PANEL */}
         <Card className="p-0 overflow-hidden border-none shadow-xl bg-slate-50 flex flex-col">
            <div className="bg-slate-800 text-white p-4 px-6 border-b border-white/5">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
                  <CreditCard size={18} className="text-blue-400" /> Financial Standing
               </h3>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
               <div className="space-y-6">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Balance</p>
                     <p className="text-3xl font-black text-slate-900">AED {(customer.financials.totalInvoiced / 10).toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Credit Limit</p>
                        <p className="text-sm font-black text-slate-900">AED 500,000</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Pending Invoices</p>
                        <p className="text-sm font-black text-rose-600">AED {customer.financials.pendingAmount.toLocaleString()}</p>
                     </div>
                  </div>
               </div>
               <div className="pt-6 border-t border-slate-200 mt-auto">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-4">
                     <Calendar size={14} className="text-blue-500" /> Last Payment: {customer.financials.lastPaymentDate || 'N/A'}
                  </div>
                  <Button className="w-full h-11 text-[10px]">Open Billing History</Button>
               </div>
            </div>
         </Card>
      </div>

      {/* 1. HORIZONTAL TELEMETRY FLASHCARD */}
      <Card className="p-0 border-none shadow-xl overflow-hidden">
        <div className="bg-slate-900 text-white p-4 px-6 flex justify-between items-center border-b border-white/5">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
             <Activity size={18} className="text-blue-400" /> Real-time System Telemetry
           </h3>
           <div className="flex items-center gap-4">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded border border-white/5">SCADA LINK: SECURE</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter opacity-70">Updated: {new Date().toLocaleTimeString()}</span>
           </div>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 bg-slate-50">
           <QuadrantMetric label="Flow Rate" val={`${customer.telemetry.flow.toLocaleString()} Sm³/Hr`} />
           <QuadrantMetric label="Totalizer" val={`${customer.telemetry.totalizer.toLocaleString()} Sm³`} />
           <QuadrantMetric label="Inlet Pressure" val={`${customer.telemetry.inletPressure} Bar`} />
           <QuadrantMetric label="Outlet Pressure" val={`${customer.telemetry.outletPressure} Bar`} />
           <QuadrantMetric label="Outlet Temperature" val={`${customer.telemetry.outletTemperature} °C`} />
           <QuadrantMetric label="1st Stage Pressure" val={`${customer.telemetry.firstStagePressure} Bar`} />
           <QuadrantMetric label="Fuel Gas Pressure" val={`${customer.telemetry.fuelGasPressure} Bar`} />
           <QuadrantMetric label="1st Stage Temp" val={`${customer.telemetry.firstStageTemperature} °C`} />
           <QuadrantMetric label="Active Boiler" val={customer.telemetry.activeBoiler} />
           <QuadrantMetric label="Active Line" val={customer.telemetry.activeLine} />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2. Customer Details */}
        <Card className="p-0 border-none shadow-xl overflow-hidden">
          <div className="bg-slate-800 text-white p-4 px-6 border-b border-white/5">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
                <Info size={18} className="text-blue-400" /> Identity & Contract Specs
             </h3>
          </div>
          <div className="p-4 grid grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50">
             <QuadrantMetric label="Customer" val={customer.name} />
             <QuadrantMetric label="Customer Code" val={customer.code} />
             <QuadrantMetric label="Coordinates" val={`🗺️ ${customer.coordinates}`} />
             <QuadrantMetric label="Location" val={customer.location} />
             <QuadrantMetric label="Zone" val={customer.zone} />
             <QuadrantMetric label="Commissioning Date" val={customer.commissioningDate} />
             <QuadrantMetric label="Gate Pass" val={customer.gatePass} />
             <QuadrantMetric label="CGM Type" val={customer.cgmType} />
             <QuadrantMetric label="No of Deployed CGMs" val={`${customer.deployedCGMs} Nos`} />
             <QuadrantMetric label="Total Deployed Capacity" val={`${customer.totalDeployedCapacity.toLocaleString()} SCM`} />
             <QuadrantMetric label="Contracted Qty" val={`${customer.contractedQty.toLocaleString()} SCM`} />
             <QuadrantMetric label="MGO Qty" val={`${customer.mgoQty.toLocaleString()} SCM`} />
          </div>
        </Card>

        {/* 3. Asset Utilization */}
        <Card className="p-0 border-none shadow-xl overflow-hidden">
          <div className="bg-slate-800 text-white p-4 px-6 flex justify-between items-center border-b border-white/5">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
                <TrendingUp size={18} className="text-blue-400" /> Operational Utilization <span className="text-[9px] font-normal lowercase ml-2 opacity-50">YTD 2025</span>
             </h3>
             <button className="bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest rounded px-3 py-1 hover:bg-white/10 transition-all">Audit Logs</button>
          </div>
          <div className="p-4 grid grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50">
             <QuadrantMetric label="General Utilization Rate" val={`${customer.utilization.generalRate}%`} color="text-blue-600" />
             <QuadrantMetric label="Operational Utilization Rate" val={`${customer.utilization.operationalRate}%`} color="text-blue-600" />
             <QuadrantMetric label="No of Changeovers / Day" val={`${customer.utilization.changeoversPerDay} Nos`} />
             <QuadrantMetric label="Avg. Changeover Start Pressure" val={`${customer.utilization.avgChangeoverStartPressure} Bar`} />
             <QuadrantMetric label="Avg. Changeover End Pressure" val={`${customer.utilization.avgChangeoverEndPressure} Bar`} />
             <QuadrantMetric label="Avg. Changeover Duration" val={customer.utilization.avgChangeoverDuration} />
             <QuadrantMetric label="Total No of Filling Trips" val={`${customer.utilization.totalFillingTrips} Nos`} />
             <QuadrantMetric label="Total Filled Qty" val={`${customer.utilization.totalFilledQty.toLocaleString()} SCM`} />
             <QuadrantMetric label="Total Decanted Qty" val={`${customer.utilization.totalDecantedQty.toLocaleString()} SCM`} />
             <QuadrantMetric label="Total Decanting Diff." val={`${customer.utilization.decantingDiff.toLocaleString()} SCM`} />
             <QuadrantMetric label="Total Decanting Diff %" val={`${customer.utilization.decantingDiffPercent}%`} />
             <QuadrantMetric label="Gas Meter Accuracy %" val={`${customer.utilization.gasMeterAccuracy}%`} />
          </div>
        </Card>
      </div>

      {/* Commercial Analytics & Revenue Projections Block */}
      <section className="bg-slate-200/50 p-6 rounded-[32px] border border-slate-300/50">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-4">
             <h2 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
               <DollarSign size={24} className="text-blue-600" /> Commercial Analytics & Projections
             </h2>
             <div className="h-6 w-px bg-slate-300" />
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Currency: AED (United Arab Emirates Dirham)</span>
          </div>
          <div className="flex gap-3">
             <QuadrantMiniMetric label="EST. MONTH END REV" val="AED 42,450" color="text-blue-600" />
             <QuadrantMiniMetric label="FORECAST RELIABILITY" val="94.2%" color="text-slate-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-8 border-none shadow-xl">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Revenue Trajectory (12M Forecast)</h3>
               <div className="flex items-center gap-5 text-[9px] font-black uppercase tracking-widest">
                 <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-blue-600 rounded-sm" /> Actual Billing</div>
                 <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-slate-300 rounded-full" /> AI Projection</div>
               </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={MOCK_FINANCIAL_FORECAST}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} className="font-black uppercase" />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `AED ${v/1000}k`} className="font-bold" />
                  <Tooltip 
                    contentStyle={{ border: 'none', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', padding: '16px' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                  />
                  <Bar dataKey="actual" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={32} />
                  <Line type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={4} dot={{ r: 5, fill: '#fff', stroke: '#3b82f6', strokeWidth: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-8 border-none shadow-xl space-y-6 flex flex-col justify-center bg-slate-900 text-white">
            <div className="text-center mb-4">
               <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Predictive Commercial KPIs</h3>
               <div className="h-px w-12 bg-blue-500/30 mx-auto" />
            </div>
            <div className="space-y-4">
               <ForecastKPI dark label="Forecasted Annual Revenue" val="AED 542k" change="+8.2%" status="up" />
               <ForecastKPI dark label="Contract Utilization" val="84%" change="-2.1%" status="down" />
               <ForecastKPI dark label="Credit Risk Grade" val="AAA" change="Stable" status="stable" />
               <ForecastKPI dark label="Unbilled Accrual" val="AED 12k" change="+12%" status="up" />
               <ForecastKPI dark label="30D Consumption Est" val="42k SCM" change="+5.4%" status="up" />
            </div>
            <Button className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/20 text-[10px]">Open Billing Portal</Button>
          </Card>
        </div>
      </section>

      {/* 4. Consumption Details */}
      <Card className="p-0 border-none shadow-xl overflow-hidden">
        <div className="bg-slate-700 text-white p-4 px-6 border-b border-white/5">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
               <Droplets size={18} className="text-blue-400" /> Historic Consumption Analytics
            </h3>
        </div>
        <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50">
            <QuadrantMetric label="Daily Consumption" val={`${customer.consumption.daily.toLocaleString()} SCM`} />
            <QuadrantMetric label="Avg. Daily Consumption" val={`${customer.consumption.avgDaily.toLocaleString()} SCM`} />
            <QuadrantMetric label="Peak Daily Consumption" val={`${customer.consumption.peakDaily.toLocaleString()} SCM`} />
            <QuadrantMetric label="Monthly Consumption" val={`${customer.consumption.monthly.toLocaleString()} SCM`} />
            <QuadrantMetric label="Avg. Monthly Consumption" val={`${customer.consumption.avgMonthly.toLocaleString()} SCM`} />
            <QuadrantMetric label="Peak Monthly Consumption" val={`${customer.consumption.peakMonthly.toLocaleString()} SCM`} />
            <QuadrantMetric label="YTD Consumption" val={`${customer.consumption.ytd.toLocaleString()} SCM`} />
            <QuadrantMetric label="Total Gas Consumption" val={`${customer.consumption.total.toLocaleString()} SCM`} />
        </div>
      </Card>

      {/* 5. PRS Details */}
      <Card className="p-0 border-none shadow-xl overflow-hidden">
        <div className="bg-slate-700 text-white p-4 px-6 border-b border-white/5">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
               <Settings size={18} className="text-blue-400" /> PRMS Station Calibration
            </h3>
        </div>
        <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50">
            <QuadrantMetric label="PRS Model" val={customer.prsDetails.model} />
            <QuadrantMetric label="PRS Sl. No." val={customer.prsDetails.serialNo} />
            <QuadrantMetric label="Design Flow Rate" val={`${customer.prsDetails.designFlowRate} SCM/H`} />
            <QuadrantMetric label="Current Flow Rate" val={`${customer.prsDetails.currentFlowRate} SCM/H`} />
            <QuadrantMetric label="Avg. Flow Rate (30 days)" val={`${customer.prsDetails.avgFlowRate30Days} SCM/H`} />
            <QuadrantMetric label="Max. Flow Rate (30 days)" val={`${customer.prsDetails.maxFlowRate30Days} SCM/H`} />
            <QuadrantMetric label="Flow Exceedance Count (30 Days)" val={`${customer.prsDetails.flowExceedanceCount} Times`} />
            <QuadrantMetric label="PRMS Status" val={customer.prmsStatus} color={customer.prmsStatus === 'OFF' ? 'text-rose-600' : 'text-emerald-600'} />
        </div>
      </Card>

      {/* Gas Consumption High-Fidelity Chart Block */}
      <section className="bg-slate-100 p-6 rounded-[32px] border border-slate-200">
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-4">
             <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Consumption Volumetrics</h2>
             <div className="flex bg-white/50 p-1.5 rounded-xl gap-1 border border-slate-200">
               {['Daily', 'Monthly', 'Quarterly', 'Yearly'].map(opt => (
                 <button 
                  key={opt}
                  onClick={() => setGranularity(opt)}
                  className={`px-5 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${granularity === opt ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
                 >
                   {opt}
                 </button>
               ))}
             </div>
          </div>
        </div>

        <Card className="p-10 border-none shadow-2xl">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Volumetric Load ({granularity})</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Aggregated Network Performance Index</p>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_LONG_TERM_CONSUMPTION}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  tickFormatter={(v) => Math.floor(v).toString()}
                  interval={12} 
                  tickLine={false} 
                  axisLine={false} 
                  className="font-bold"
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  tickFormatter={(v) => `${v/1000}k`} 
                  tickLine={false} 
                  axisLine={false} 
                  className="font-bold"
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ border: 'none', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}
                />
                <Bar dataKey="val" radius={[3, 3, 0, 0]} barSize={6}>
                  {MOCK_LONG_TERM_CONSUMPTION.map((entry, index) => (
                    <Cell key={index} fill={entry.isPeak ? '#3b82f6' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* PRMS Monitoring Chart Block */}
      <section className="bg-slate-100 p-6 rounded-[32px] border border-slate-200">
        <div className="mb-8 space-y-6 px-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Live PRMS Waveform Monitoring</h2>
          <div className="flex flex-wrap items-center gap-10">
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Window:</span>
                <div className="flex bg-white/50 p-1 rounded-xl gap-1 border border-slate-200">
                  {['06 Hours', '12 Hours', '24 Hours', '07 Days'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setPrmsPeriod(opt)}
                      className={`px-4 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${prmsPeriod === opt ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
             </div>
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Granularity:</span>
                <div className="flex bg-white/50 p-1 rounded-xl gap-1 border border-slate-200">
                  {['01 Min', '15 Min', 'Hourly'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setPrmsGranularity(opt)}
                      className={`px-4 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${prmsGranularity === opt ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="p-8 border-none shadow-xl bg-white">
              <h3 className="text-lg font-black text-slate-800 text-center mb-8 uppercase tracking-widest">Gas Flow Rate Waveform</h3>
              <div className="h-[260px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_PRESSURE_FEED}>
                       <CartesianGrid strokeDasharray="1 1" stroke="#f1f5f9" />
                       <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} interval={10} axisLine={false} tickLine={false} className="font-bold" />
                       <YAxis stroke="#94a3b8" fontSize={9} domain={[-1, 1]} axisLine={false} tickLine={false} className="font-bold" />
                       <Tooltip 
                         contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                       />
                       <Line type="stepAfter" dataKey="flow" stroke="#2563eb" strokeWidth={3} dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </Card>

           <Card className="p-8 border-none shadow-xl bg-white">
              <div className="flex justify-between items-center mb-8">
                 <div className="w-10 h-10" />
                 <h3 className="text-lg font-black text-slate-800 text-center uppercase tracking-widest">Inlet Pressure Stability</h3>
                 <div className="flex gap-2 text-slate-400">
                    <Camera size={16} className="cursor-pointer hover:text-blue-600 transition-colors" />
                    <Maximize2 size={16} className="cursor-pointer hover:text-blue-600 transition-colors" />
                 </div>
              </div>
              <div className="h-[260px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_PRESSURE_FEED}>
                       <CartesianGrid strokeDasharray="1 1" stroke="#f1f5f9" />
                       <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} interval={10} axisLine={false} tickLine={false} className="font-bold" />
                       <YAxis stroke="#94a3b8" fontSize={9} domain={[0.7, 0.9]} axisLine={false} tickLine={false} className="font-bold" />
                       <Tooltip 
                          contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                       />
                       <Line type="stepAfter" dataKey="pressure" stroke="#f97316" strokeWidth={3} dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </Card>
        </div>
      </section>
    </div>
  );
};

const QuadrantMetric = ({ label, val, color }: any) => (
   <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-center min-h-[72px] hover:border-blue-200 transition-all group">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-tight group-hover:text-blue-500 transition-colors">{label}</p>
      <p className={`text-sm font-black truncate uppercase tracking-tight ${color || 'text-slate-800'}`}>{val || '---'}</p>
   </div>
);

const QuadrantMiniMetric = ({ label, val, color }: any) => (
  <div className="bg-white px-5 py-2.5 rounded-2xl border border-slate-200 flex flex-col justify-center shadow-sm hover:shadow-md transition-all">
     <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">{label}</p>
     <p className={`text-base font-black tracking-tight ${color}`}>{val}</p>
  </div>
);

const ForecastKPI = ({ label, val, change, status, dark }: any) => (
 <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-default ${
   dark 
     ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
     : 'bg-white border-slate-100 hover:shadow-lg'
 }`}>
   <div>
     <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</p>
     <p className={`text-sm font-black tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>{val}</p>
   </div>
   <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
     status === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 
     status === 'down' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-400'
   }`}>
     {change}
   </div>
 </div>
);
