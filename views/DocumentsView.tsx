

import React, { useState } from 'react';
import { Card, Button, SegmentedControl } from '../components/CoreComponents';
import { MOCK_DOCUMENTS } from '../mockData';
import { FileText, Download, Upload, Search, Filter } from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const filteredDocs = categoryFilter === 'All' 
     ? MOCK_DOCUMENTS 
     : MOCK_DOCUMENTS.filter(doc => doc.category === categoryFilter);

  const getFileIcon = (type: string) => {
     // Simplified icon logic
     return <FileText size={24} className={type === 'PDF' ? 'text-red-500' : type === 'XLSX' ? 'text-green-600' : 'text-blue-600'} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold text-slate-900">Document Repository</h2>
            <p className="text-slate-500">Centralized file storage for federation operations.</p>
         </div>
         <Button><Upload size={16} className="mr-2"/> Upload Document</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
         <div className="flex-1 w-full md:w-auto">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input type="text" placeholder="Search files..." className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
         </div>
         <SegmentedControl 
            options={['All', 'Legal', 'Technical', 'Financial', 'Event', 'Medical']} 
            value={categoryFilter} 
            onChange={setCategoryFilter} 
         />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredDocs.map(doc => (
            <Card key={doc.id} className="p-5 hover:shadow-md transition-shadow group cursor-pointer border border-slate-200">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition-colors">
                     {getFileIcon(doc.type)}
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                     {doc.category}
                  </span>
               </div>
               <h3 className="font-bold text-slate-900 line-clamp-1 mb-1">{doc.title}</h3>
               <p className="text-xs text-slate-400 mb-4">
                  Uploaded by {doc.author} • {doc.uploadDate}
               </p>
               <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="text-xs text-slate-500 font-mono">{doc.size}</span>
                  <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-full transition-colors">
                     <Download size={18} />
                  </button>
               </div>
            </Card>
         ))}
      </div>
    </div>
  );
};