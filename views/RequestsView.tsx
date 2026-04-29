
import React from 'react';
import { Card, StatusBadge, Button } from '../components/CoreComponents';
import { MOCK_REQUESTS } from '../mockData';
import { Check, X, FileText } from 'lucide-react';

export const RequestsView: React.FC = () => {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold">Service Requests Center</h2>
       
       <div className="space-y-4">
          {MOCK_REQUESTS.map(req => (
             <Card key={req.id} className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                   <FileText size={24} />
                </div>
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-slate-900">{req.type}</h3>
                      {req.priority === 'Urgent' && <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded font-bold">URGENT</span>}
                   </div>
                   <p className="text-slate-500 text-sm mb-2">{req.description}</p>
                   <div className="text-xs text-slate-400">
                      Requested by <span className="font-medium text-slate-600">{req.requesterName}</span> • {req.date}
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <StatusBadge status={req.status} />
                   {req.status === 'Pending' && (
                      <div className="flex gap-2 border-l border-slate-200 pl-4">
                         <Button size="sm" className="bg-green-600 hover:bg-green-700"><Check size={14}/></Button>
                         <Button size="sm" variant="danger"><X size={14}/></Button>
                      </div>
                   )}
                </div>
             </Card>
          ))}
       </div>
    </div>
  );
};
