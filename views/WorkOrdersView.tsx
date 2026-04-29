
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  User, 
  ArrowRight, 
  MoreVertical,
  AlertTriangle,
  ClipboardList
} from 'lucide-react';
import { Card, Button, StatusBadge } from '../components/CoreUI';
import { MOCK_WORK_ORDERS } from '../data/mockWorkOrders';
import { WorkOrder } from '../types';

export const WorkOrdersView: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredOrders = MOCK_WORK_ORDERS.filter(wo => {
    const matchesFilter = filter === 'ALL' || wo.status === filter;
    const matchesSearch = wo.title.toLowerCase().includes(search.toLowerCase()) || 
                          wo.id.toLowerCase().includes(search.toLowerCase()) ||
                          wo.assetName?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Work Management</h1>
          <p className="text-slate-500 text-sm">Create, assign, and track all operational work orders.</p>
        </div>
        <Button className="flex items-center gap-2 py-2.5 px-6 shadow-lg shadow-slate-900/10">
          <Plus size={18} /> NEW WORK ORDER
        </Button>
      </header>

      {/* Filters HUD */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, Title or Asset..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${filter === f ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <Filter size={16} /> ADVANCED FILTERS
        </Button>
      </div>

      <Card className="overflow-hidden border-none shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Status & Priority</th>
                <th className="px-6 py-4">Work Order Details</th>
                <th className="px-6 py-4">Asset Information</th>
                <th className="px-6 py-4">SLA Deadline</th>
                <th className="px-6 py-4">Assignee</th>
                <th className="px-6 py-4 text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map(wo => {
                const isOverdue = new Date(wo.slaDeadline) < new Date();
                return (
                  <tr key={wo.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col gap-2">
                        <StatusBadge status={wo.status} />
                        <div className={`text-[10px] font-bold flex items-center gap-1 ${
                          wo.priority === 'EMERGENCY' ? 'text-rose-600' : 'text-slate-400'
                        }`}>
                          <AlertTriangle size={10} /> {wo.priority}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 min-w-[200px]">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{wo.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1 uppercase">{wo.id} • {wo.type}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-slate-700 font-medium">{wo.assetName}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase tracking-tighter">REF: {wo.assetId}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className={`flex items-center gap-2 text-xs font-bold ${isOverdue ? 'text-rose-600' : 'text-slate-600'}`}>
                        <Clock size={14} /> {new Date(wo.slaDeadline).toLocaleDateString()}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Time remaining: {isOverdue ? 'OVERDUE' : '2h 14m'}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold uppercase">
                          {wo.assignedTo === 'Unassigned' ? '?' : wo.assignedTo?.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-medium text-slate-700">{wo.assignedTo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right pr-8">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                        <ArrowRight size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-16 text-center">
              <ClipboardList size={48} className="mx-auto text-slate-200 mb-4" />
              <h3 className="text-slate-900 font-bold">No Work Orders Found</h3>
              <p className="text-slate-400 text-sm">Adjust your filters or search terms to find what you're looking for.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
