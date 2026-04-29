
import React from 'react';
import { Plus, UserCircle } from 'lucide-react';
import { Button, Card, StatusBadge } from '../components/CoreComponents';
import { MOCK_STAFF } from '../mockData';

export const StaffView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Federation Staff</h2>
        <Button><Plus size={16} className="mr-2"/> New Hire</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_STAFF.map(staff => (
          <Card key={staff.id} className="p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <UserCircle size={48} />
            </div>
            <h3 className="font-bold text-slate-900">{staff.name}</h3>
            <p className="text-blue-600 text-sm font-medium mb-1">{staff.position}</p>
            <p className="text-slate-500 text-sm mb-4">{staff.department}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 w-full flex justify-between items-center">
              <StatusBadge status={staff.status} />
              <button className="text-sm text-slate-500 hover:text-slate-900">Profile</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
