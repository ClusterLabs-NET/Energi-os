
import React from 'react';
import { Package, Monitor, Shield, Box, Plus, Filter, AlertTriangle } from 'lucide-react';
import { Card, StatWidget, Button, StatusBadge, PieChartWidget } from '../components/CoreComponents';
import { MOCK_ASSETS } from '../mockData';

export const InventoryView: React.FC = () => {
   const totalValue = MOCK_ASSETS.reduce((acc, curr) => acc + curr.value, 0);
   const totalItems = MOCK_ASSETS.length;
   
   // Chart Data
   const categoryCount: Record<string, number> = {};
   MOCK_ASSETS.forEach(a => categoryCount[a.category] = (categoryCount[a.category] || 0) + 1);
   const categoryData = Object.keys(categoryCount).map(k => ({ name: k, value: categoryCount[k] }));

   const conditionCount: Record<string, number> = {};
   MOCK_ASSETS.forEach(a => conditionCount[a.condition] = (conditionCount[a.condition] || 0) + 1);
   const conditionData = Object.keys(conditionCount).map(k => ({ name: k, value: conditionCount[k] }));

   return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Inventory & Assets</h2>
          <Button><Plus size={16} className="mr-2"/> Add Asset</Button>
       </div>

       {/* KPIs */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatWidget title="Total Asset Value" value={`AED ${totalValue.toLocaleString()}`} icon={Shield} />
          <StatWidget title="Total Items" value={totalItems} icon={Package} />
          <StatWidget title="IT Equipment" value={categoryCount['IT Equipment'] || 0} icon={Monitor} />
          <StatWidget title="Maintenance Needed" value={conditionCount['Fair'] || 0} icon={AlertTriangle} subtext="Condition: Fair/Poor" />
       </div>

       {/* Charts */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChartWidget title="Assets by Category" data={categoryData} />
          <PieChartWidget title="Condition Report" data={conditionData} colors={['#10b981', '#fbbf24', '#f59e0b', '#ef4444']} />
       </div>

       <Card>
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
             <h3 className="font-bold text-slate-900">Asset Registry</h3>
             <Button variant="outline" size="sm"><Filter size={14} className="mr-2"/> Filter</Button>
          </div>
          <table className="w-full text-sm text-left">
             <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                <tr>
                   <th className="px-6 py-3">Asset Name</th>
                   <th className="px-6 py-3">Category</th>
                   <th className="px-6 py-3">Serial / ID</th>
                   <th className="px-6 py-3">Location</th>
                   <th className="px-6 py-3">Value (AED)</th>
                   <th className="px-6 py-3">Condition</th>
                   <th className="px-6 py-3">Assignment</th>
                </tr>
             </thead>
             <tbody>
                {MOCK_ASSETS.map(asset => (
                   <tr key={asset.id} className="border-b hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{asset.name}</td>
                      <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{asset.category}</span></td>
                      <td className="px-6 py-4 font-mono text-xs">{asset.serialNumber}</td>
                      <td className="px-6 py-4">{asset.location}</td>
                      <td className="px-6 py-4 font-bold">{asset.value.toLocaleString()}</td>
                      <td className="px-6 py-4"><StatusBadge status={asset.condition} /></td>
                      <td className="px-6 py-4 text-slate-500">{asset.assignedTo || '-'}</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </Card>
    </div>
   );
};
