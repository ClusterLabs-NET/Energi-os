
import React, { useState } from 'react';
import { 
  Truck, User, Activity, Gauge, MapPin, 
  Calendar, Wrench, ShieldCheck, ChevronRight, 
  ArrowLeft, Fuel, Info, TrendingUp, Droplets,
  AlertTriangle, Phone, Search, Filter, Settings,
  ClipboardList, Clock, Navigation
} from 'lucide-react';
import { Card, Button, StatusBadge } from '../components/CoreUI';
import { TruckAsset } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MOCK_TRUCKS: TruckAsset[] = [
  {
    id: 'T-102',
    plateNumber: 'AD-44921',
    model: 'Volvo FH16',
    year: 2023,
    status: 'IN_TRANSIT',
    currentLocation: 'Sheikh Zayed Rd, AD',
    driver: { name: 'Ahmad Salem', id: 'D-901', phone: '+971 50 123 4567', rating: 4.8, hoursLogged: 6.5 },
    mechanical: { engineHealth: 98, mileageToday: 245, totalMileage: 45200, fuelLevel: 75, tirePressure: 'Optimal' },
    gasSpecs: { maxCapacity: 4500, currentLoad: 3200, pressure: 215, temperature: 28, totalFills: 1240 },
    maintenance: {
      lastService: '2025-01-12',
      nextService: '2025-06-12',
      history: [{ date: '2025-01-12', type: 'Routine', description: 'Oil filter and gas seal check', technician: 'M. Ibrahim' }]
    },
    trips: [
      { id: 'TRP-101', date: '2025-05-12', route: 'KEZAD → Al Foah', volumeDecanted: 2100, status: 'COMPLETED', duration: '1h 45m' },
      { id: 'TRP-102', date: '2025-05-12', route: 'KEZAD → Edible Oil', volumeDecanted: 1800, status: 'COMPLETED', duration: '2h 10m' },
      { id: 'TRP-103', date: '2025-05-13', route: 'KEZAD → Dubai South', volumeDecanted: 0, status: 'IN_PROGRESS', duration: '--' }
    ]
  },
  {
    id: 'T-105',
    plateNumber: 'DB-88120',
    model: 'Mercedes-Benz Actros',
    year: 2024,
    status: 'FILLING',
    currentLocation: 'KEZAD Mother Station',
    driver: { name: 'Sami Jaber', id: 'D-882', phone: '+971 50 888 1122', rating: 4.9, hoursLogged: 2.0 },
    mechanical: { engineHealth: 99, mileageToday: 45, totalMileage: 12400, fuelLevel: 92, tirePressure: 'Optimal' },
    gasSpecs: { maxCapacity: 5000, currentLoad: 4800, pressure: 245, temperature: 32, totalFills: 850 },
    maintenance: {
      lastService: '2025-03-01',
      nextService: '2025-09-01',
      history: []
    },
    trips: [
      { id: 'TRP-201', date: '2025-05-12', route: 'Dubai Hub → Jebel Ali', volumeDecanted: 4200, status: 'COMPLETED', duration: '3h 20m' }
    ]
  },
  {
    id: 'T-112',
    plateNumber: 'AD-22901',
    model: 'Volvo FH16',
    year: 2022,
    status: 'CRITICAL',
    currentLocation: 'Industrial Area 4, Zarqa',
    driver: { name: 'Omar Khaled', id: 'D-115', phone: '+971 50 555 9900', rating: 4.2, hoursLogged: 8.5 },
    mechanical: { engineHealth: 65, mileageToday: 310, totalMileage: 88500, fuelLevel: 15, tirePressure: 'Check' },
    gasSpecs: { maxCapacity: 4500, currentLoad: 1200, pressure: 255, temperature: 48, totalFills: 2100 },
    maintenance: {
      lastService: '2024-11-20',
      nextService: '2025-02-15',
      history: [{ date: '2024-11-20', type: 'Repair', description: 'Radiator pressure leak fix', technician: 'A. Zaid' }]
    }
  },
  {
    id: 'T-108',
    plateNumber: 'JR-55001',
    model: 'Scania R500',
    year: 2023,
    status: 'HEALTHY',
    currentLocation: 'Warehouse Hub',
    driver: { name: 'Zaid Rami', id: 'D-441', phone: '+971 50 333 4455', rating: 4.7, hoursLogged: 0 },
    mechanical: { engineHealth: 95, mileageToday: 0, totalMileage: 32000, fuelLevel: 100, tirePressure: 'Optimal' },
    gasSpecs: { maxCapacity: 4800, currentLoad: 0, pressure: 0, temperature: 24, totalFills: 920 },
    maintenance: {
      lastService: '2025-02-10',
      nextService: '2025-08-10',
      history: []
    }
  }
];

export const FleetView: React.FC = () => {
  const [selectedTruck, setSelectedTruck] = useState<TruckAsset | null>(null);

  if (selectedTruck) {
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20">
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-0 z-[50]">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSelectedTruck(null)} 
              className="p-2.5 hover:bg-slate-100 rounded-full transition-colors text-slate-600 border border-slate-100"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-900">{selectedTruck.id} | {selectedTruck.plateNumber}</h1>
                <StatusBadge status={selectedTruck.status} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                <Truck size={12} /> {selectedTruck.model} • {selectedTruck.year} Model
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Settings size={14} /> CONFIGURE</Button>
            <Button className="gap-2 shadow-lg shadow-blue-500/20"><ClipboardList size={14} /> SCHEDULE SERVICE</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Specs Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gas Intelligence */}
            <Card className="p-0 overflow-hidden border-none shadow-xl">
              <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Droplets size={16} className="text-blue-400" /> Gas Telemetry Intelligence
                </h3>
                <span className="text-[9px] font-bold text-slate-400">SYNC: LIVE</span>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white">
                <DataPoint label="Current Load" val={selectedTruck.gasSpecs.currentLoad} unit="SCM" />
                <DataPoint label="Load Percentage" val={Math.round((selectedTruck.gasSpecs.currentLoad / selectedTruck.gasSpecs.maxCapacity) * 100)} unit="%" />
                <DataPoint label="Unit Pressure" val={selectedTruck.gasSpecs.pressure} unit="Bar" color="text-blue-600" />
                <DataPoint label="Gas Temp" val={selectedTruck.gasSpecs.temperature} unit="°C" />
              </div>
              <div className="px-6 pb-6 bg-white">
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${selectedTruck.gasSpecs.pressure > 240 ? 'bg-rose-500' : 'bg-blue-500'}`} 
                      style={{ width: `${(selectedTruck.gasSpecs.currentLoad / selectedTruck.gasSpecs.maxCapacity) * 100}%` }} 
                    />
                 </div>
              </div>
            </Card>

            {/* NEW: Live Trip & Mission Log */}
            <Card className="p-0 overflow-hidden border-none shadow-xl">
              <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Navigation size={16} className="text-white" /> Live Trip & Mission Log
                </h3>
                <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-7 px-3 py-0">REFRESH LOG</Button>
              </div>
              <div className="overflow-x-auto bg-white">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      <th className="px-6 py-4">Trip ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Mission Route</th>
                      <th className="px-6 py-4 text-right">Volume (SCM)</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {selectedTruck.trips?.map(trip => (
                      <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-slate-400">{trip.id}</td>
                        <td className="px-6 py-4 font-medium text-slate-600">{trip.date}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">{trip.route}</td>
                        <td className="px-6 py-4 text-right font-mono font-bold">{trip.volumeDecanted.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${trip.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`} />
                            <span className={`text-[10px] font-black uppercase tracking-tighter ${trip.status === 'COMPLETED' ? 'text-emerald-600' : 'text-blue-600'}`}>
                              {trip.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )) || (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">No trip logs synchronized for this unit.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Mechanical Health */}
            <Card className="p-0 overflow-hidden border-none shadow-xl">
              <div className="bg-slate-800 text-white p-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Wrench size={16} className="text-amber-400" /> Mechanical Vitality
                </h3>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white">
                <DataPoint label="Engine Health" val={selectedTruck.mechanical.engineHealth} unit="%" />
                <DataPoint label="Fuel Level" val={selectedTruck.mechanical.fuelLevel} unit="%" color={selectedTruck.mechanical.fuelLevel < 20 ? 'text-rose-600' : 'text-slate-900'} />
                <DataPoint label="Mileage Today" val={selectedTruck.mechanical.mileageToday} unit="KM" />
                <DataPoint label="Tire Pressure" val={selectedTruck.mechanical.tirePressure} unit="" />
              </div>
            </Card>
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6">
            {/* Driver Profile */}
            <Card className="p-6 border-none shadow-xl bg-slate-900 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 text-slate-400">Driver Information</h3>
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 bg-blue-600/20 rounded-2xl border border-blue-500/30 flex items-center justify-center">
                        <User size={32} className="text-blue-400" />
                     </div>
                     <div>
                        <h4 className="text-lg font-black">{selectedTruck.driver.name}</h4>
                        <div className="flex items-center gap-1.5 mt-1">
                           <ShieldCheck size={12} className="text-emerald-400" />
                           <span className="text-[10px] font-bold uppercase text-slate-400">ID: {selectedTruck.driver.id}</span>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Contact</span>
                        <span className="font-bold">{selectedTruck.driver.phone}</span>
                     </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Shift Hours</span>
                        <span className="font-bold">{selectedTruck.driver.hoursLogged}h logged</span>
                     </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Safety Rating</span>
                        <span className="text-amber-400 font-bold">{selectedTruck.driver.rating} / 5.0</span>
                     </div>
                  </div>
                  <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                     CONTACT DRIVER
                  </button>
               </div>
               <User size={150} className="absolute -bottom-10 -right-10 text-white/5" />
            </Card>

            {/* Logistics Stats */}
            <Card className="p-6 border-none shadow-xl space-y-6">
               <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Operational Stats</h3>
               <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Lifecycle Fills</p>
                     <p className="text-2xl font-black text-slate-900">{selectedTruck.gasSpecs.totalFills.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Distance</p>
                     <p className="text-2xl font-black text-slate-900">{selectedTruck.mechanical.totalMileage.toLocaleString()} KM</p>
                  </div>
               </div>
               <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                     <Clock size={16} className="text-slate-400" />
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Next Scheduled Service</p>
                        <p className="text-xs font-black text-slate-800">{selectedTruck.maintenance.nextService}</p>
                     </div>
                  </div>
               </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Virtual Pipeline OS</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Global fleet telemetry, logistics coordination and mechanical oversight.</p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Locate Truck ID..." className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm" />
           </div>
           <Button variant="outline" className="gap-2"><Filter size={14} /> FILTER FLEET</Button>
        </div>
      </header>

      {/* Fleet Dashboard Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard label="Total Fleet" val="16" unit="Units" icon={Truck} sub="All assets" />
        <SummaryCard label="In Transit" val="12" unit="Active" icon={Activity} sub="75% Utilization" color="text-blue-600" />
        <SummaryCard label="Daily Flow" val="820" unit="Sm³" icon={Droplets} sub="Fleet aggregate" />
        <SummaryCard label="Fleet Risk" val="02" unit="Alerts" icon={AlertTriangle} sub="Attention needed" color="text-rose-600" />
      </section>

      {/* Fleet Flashcards Grid */}
      <section>
        <div className="flex items-center gap-2 mb-6">
           <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Strategic Units</h2>
           <div className="h-0.5 flex-1 bg-slate-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_TRUCKS.map(truck => (
            <Card 
              key={truck.id} 
              className="p-0 overflow-hidden border-slate-200/80 shadow-lg group hover:border-blue-400 transition-all cursor-pointer"
              onClick={() => setSelectedTruck(truck)}
            >
              <div className="bg-slate-900 text-white p-4 flex justify-between items-center group-hover:bg-slate-950 transition-colors">
                 <div>
                    <h3 className="text-sm font-black uppercase tracking-widest">{truck.id}</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{truck.plateNumber}</p>
                 </div>
                 <StatusBadge status={truck.status} />
              </div>
              <div className="p-5 space-y-4 bg-white">
                 <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-50">
                    <div>
                       <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Current Load</span>
                       <span className="text-sm font-black text-slate-800">{truck.gasSpecs.currentLoad.toLocaleString()} <span className="text-[9px] text-slate-400 font-bold uppercase">SCM</span></span>
                    </div>
                    <div>
                       <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Pressure</span>
                       <span className={`text-sm font-black ${truck.gasSpecs.pressure > 240 ? 'text-rose-600' : 'text-slate-800'}`}>{truck.gasSpecs.pressure} <span className="text-[9px] text-slate-400 font-bold uppercase">Bar</span></span>
                    </div>
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
                       <span className="flex items-center gap-1.5"><User size={12} /> {truck.driver.name}</span>
                       <span className="flex items-center gap-1.5"><MapPin size={12} /> {truck.currentLocation.split(',')[1] || 'Main Hub'}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                       <div 
                        className={`h-full transition-all duration-1000 ${truck.mechanical.fuelLevel < 25 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${truck.mechanical.fuelLevel}%` }} 
                       />
                    </div>
                    <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       <span>Fuel Reserve</span>
                       <span>{truck.mechanical.fuelLevel}%</span>
                    </div>
                 </div>

                 <div className="pt-3 flex justify-between items-center border-t border-slate-50 group-hover:border-blue-100 transition-colors">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       <Gauge size={12} /> {truck.mechanical.mileageToday} KM Today
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all">
                       <ChevronRight size={16} />
                    </div>
                 </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

const SummaryCard = ({ label, val, unit, icon: Icon, sub, color }: any) => (
  <Card className="p-6 flex items-start justify-between group hover:border-blue-400 transition-all cursor-default">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <h3 className={`text-3xl font-black tracking-tight ${color || 'text-slate-900'}`}>{val}</h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>
      </div>
      <p className="text-[9px] font-bold text-slate-400 uppercase mt-2">{sub}</p>
    </div>
    <div className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
      <Icon size={24} />
    </div>
  </Card>
);

const DataPoint = ({ label, val, unit, color }: any) => (
  <div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className={`text-lg font-black ${color || 'text-slate-900'}`}>{val.toLocaleString()}</span>
      {unit && <span className="text-[9px] font-black text-slate-400 uppercase">{unit}</span>}
    </div>
  </div>
);
