import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Map as MapIcon, Zap, Activity, Users, 
  DollarSign, Settings, Bell, Menu, Bot, ChevronRight, 
  ClipboardList, Cpu, Truck
} from 'lucide-react';
import { UserRole } from './types';
import { OverviewView } from './views/OverviewView';
import { DigitalTwinView } from './views/DigitalTwinView';
import { StationCommandView } from './views/StationCommandView';
import { CustomerCRMView } from './views/CustomerCRMView';
import { FinancialERPView } from './views/FinancialERPView';
import { WorkOrdersView } from './views/WorkOrdersView';
import { OperationsView } from './views/OperationsView';
import { FleetView } from './views/FleetView';
import { AICopilotPanel } from './components/AICopilotPanel';

const NAV_ITEMS = [
  { id: 'OVERVIEW', label: 'Command Center', icon: LayoutDashboard },
  { id: 'OPERATIONS', label: 'Operations Hub', icon: Activity },
  { id: 'TWIN', label: 'Digital Twin', icon: MapIcon },
  { id: 'FLEET', label: 'Virtual Pipeline', icon: Truck },
  { id: 'STATION_COMMAND', label: 'Infrastructure', icon: Cpu },
  { id: 'CRM', label: 'Partners & CRM', icon: Users },
  { id: 'FINANCE_ERP', label: 'Commercial ERP', icon: DollarSign },
  { id: 'WORK_ORDERS', label: 'Work Orders', icon: ClipboardList },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('OVERVIEW');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>(UserRole.OPS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [focusAssetId, setFocusAssetId] = useState<string | null>(null);
  
  const mainContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView, selectedCustomerId]);

  const navigateToCustomer = (id: string) => {
    setSelectedCustomerId(id);
    setCurrentView('CUSTOMER_PROFILE');
  };

  const onViewOnMap = (id: string) => {
    setFocusAssetId(id);
    setCurrentView('TWIN');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'OVERVIEW': return <OverviewView />;
      case 'OPERATIONS': return <OperationsView onSelectCustomer={navigateToCustomer} />;
      case 'CUSTOMER_PROFILE': 
        return <CustomerCRMView 
          customerId={selectedCustomerId} 
          onBack={() => setCurrentView('OPERATIONS')} 
          onViewOnMap={onViewOnMap}
        />;
      case 'TWIN': 
        return <DigitalTwinView 
          initialFocusAssetId={focusAssetId || undefined} 
          onClearFocus={() => setFocusAssetId(null)}
        />;
      case 'FLEET': return <FleetView />;
      case 'STATION_COMMAND': return <StationCommandView />;
      case 'CRM': 
        return <CustomerCRMView 
          onBack={() => setCurrentView('OVERVIEW')} 
          onViewOnMap={onViewOnMap}
        />;
      case 'FINANCE_ERP': return <FinancialERPView />;
      case 'WORK_ORDERS': return <WorkOrdersView />;
      default: return <div className="p-20 text-center font-bold text-slate-300 uppercase tracking-widest">Module Under Sync...</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans text-slate-900 antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-blue-500/20 shadow-lg">
            <Zap className="text-white fill-current" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 tracking-tight text-lg">CloudTwin</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">Energi OS</span>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-160px)]">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentView(item.id); setSelectedCustomerId(null); setFocusAssetId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${currentView === item.id || (currentView === 'CUSTOMER_PROFILE' && item.id === 'OPERATIONS') ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <item.icon size={18} className={currentView === item.id ? 'text-blue-400' : 'text-slate-400'} /> 
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">KA</div>
            <div className="flex-1 text-left overflow-hidden">
               <p className="text-xs font-bold text-slate-900 truncate">Khalid A.</p>
               <p className="text-[10px] font-medium text-slate-500 uppercase">{role}</p>
            </div>
            <Settings size={14} className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-72' : ''} ${isCopilotOpen ? 'lg:mr-96' : ''}`}>
        <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-[1001] px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg lg:hidden text-slate-600"><Menu size={20}/></button>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-400 font-medium">Network Hub</span>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-900 font-semibold">{NAV_ITEMS.find(n => n.id === currentView)?.label || 'Partner Profile'}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 px-4 py-1.5 bg-slate-100/50 rounded-full border border-slate-200/50">
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Network Live</span>
               </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all group">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="bg-transparent border-none text-[10px] font-bold text-slate-600 uppercase tracking-widest outline-none cursor-pointer hover:text-blue-600 transition-all"
              >
                <option value={UserRole.OPS}>Ops Manager</option>
                <option value={UserRole.ENGINEERING}>Engineer</option>
                <option value={UserRole.FINANCE}>Financial Analyst</option>
              </select>
            </div>
          </div>
        </header>

        <main ref={mainContentRef} className="flex-1 p-8 overflow-y-auto scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {renderContent()}
          </div>
        </main>

        {!isCopilotOpen && (
          <button 
            onClick={() => setIsCopilotOpen(true)}
            className="fixed bottom-10 right-10 bg-slate-900 text-white p-4 pl-5 rounded-full shadow-2xl hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group z-[1002] border border-white/10"
          >
            <Bot size={24} className="group-hover:animate-bounce" />
            <span className="font-semibold text-xs tracking-wider uppercase pr-2">Ops Copilot</span>
          </button>
        )}
      </div>

      <AICopilotPanel isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
    </div>
  );
};

export default App;