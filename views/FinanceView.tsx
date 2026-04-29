
import React from 'react';
import { Card, StatusBadge, Button, StatWidget, PieChartWidget } from '../components/CoreComponents';
import { MOCK_TRANSACTIONS } from '../mockData';
import { DollarSign, Download, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

export const FinanceView: React.FC = () => {
   const income = MOCK_TRANSACTIONS.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0);
   const expense = MOCK_TRANSACTIONS.filter(t => t.amount < 0).reduce((a, b) => a + b.amount, 0);

   // Prepare chart data
   const categoryDataMap: Record<string, number> = {};
   MOCK_TRANSACTIONS.filter(t => t.amount < 0).forEach(t => {
      const cat = t.category;
      categoryDataMap[cat] = (categoryDataMap[cat] || 0) + Math.abs(t.amount);
   });
   const pieData = Object.keys(categoryDataMap).map(k => ({ name: k, value: categoryDataMap[k] }));

   const monthlyData = [
      { name: 'Jan', Income: 18000, Expenses: 6500 },
      { name: 'Feb', Income: 5500, Expenses: 4800 },
   ];

   return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Financial Overview</h2>
          <div className="flex gap-2">
             <Button>New Transaction</Button>
             <Button variant="outline"><Download size={16} className="mr-2"/> Export</Button>
          </div>
       </div>

       {/* KPIs */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatWidget title="Total Income (YTD)" value={`+${income.toLocaleString()} AED`} icon={TrendingUp} trendDirection="up" trend="Good" />
          <StatWidget title="Total Expenses (YTD)" value={`${expense.toLocaleString()} AED`} icon={TrendingDown} />
          <StatWidget title="Net Balance" value={`${(income + expense).toLocaleString()} AED`} icon={DollarSign} />
          <StatWidget title="Pending Payments" value="3,200 AED" icon={CreditCard} subtext="1 Invoice" />
       </div>

       {/* Charts Row */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
             <h3 className="font-bold text-slate-900 mb-6">Cash Flow Analysis</h3>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={monthlyData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="name" />
                   <YAxis />
                   <RechartsTooltip />
                   <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                   <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </Card>
          <PieChartWidget title="Expense Breakdown" data={pieData} colors={['#ef4444', '#f97316', '#f59e0b', '#84cc16']} />
       </div>

       <Card>
          <div className="p-6 border-b border-slate-200">
             <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          </div>
          <table className="w-full text-sm text-left">
             <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                <tr>
                   <th className="px-6 py-3">Date</th>
                   <th className="px-6 py-3">Description</th>
                   <th className="px-6 py-3">Reference</th>
                   <th className="px-6 py-3">Category</th>
                   <th className="px-6 py-3 text-right">Amount (AED)</th>
                   <th className="px-6 py-3 text-right">Status</th>
                </tr>
             </thead>
             <tbody>
                {MOCK_TRANSACTIONS.map(tx => (
                   <tr key={tx.id} className="border-b hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{tx.description}</td>
                      <td className="px-6 py-4 font-mono text-xs">{tx.reference}</td>
                      <td className="px-6 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{tx.category}</span></td>
                      <td className={`px-6 py-4 text-right font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                         {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right"><StatusBadge status={tx.status} /></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </Card>
    </div>
   );
};
