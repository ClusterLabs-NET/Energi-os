
import React, { useState } from 'react';
import { Send, Bell, Mail, MessageSquare, Clock, CheckCircle, Users } from 'lucide-react';
import { Card, Button, StatusBadge } from '../components/CoreComponents';
import { MOCK_ANNOUNCEMENTS } from '../mockData';
import { Announcement, RecipientGroup, CommunicationChannel } from '../types';

export const CommunicationsView: React.FC = () => {
  // Form State
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<RecipientGroup>('All Members');
  const [selectedChannels, setSelectedChannels] = useState<CommunicationChannel[]>(['Portal Notification']);
  
  // Local state for list to simulate adding new messages
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);

  const recipientGroups: RecipientGroup[] = ['All Members', 'Club Owners', 'National Squads', 'Referees', 'Coaches', 'Federation Staff', 'Committee Chairs', 'Committee Members'];
  const channels: CommunicationChannel[] = ['Portal Notification', 'Email', 'SMS / WhatsApp'];

  const toggleChannel = (channel: CommunicationChannel) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const handleSend = () => {
    if (!title || !message) return;

    const newAnnouncement: Announcement = {
      id: `new_${Date.now()}`,
      title,
      message,
      date: new Date().toISOString().split('T')[0],
      sender: 'Admin Console',
      recipients: selectedGroup,
      channels: selectedChannels,
      status: 'Sent'
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    // Reset Form
    setTitle('');
    setMessage('');
    setSelectedChannels(['Portal Notification']);
    alert('Message Sent Successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Communications Center</h2>
           <p className="text-slate-500">Broadcast updates to federation members via multiple channels.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Composer */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border-t-4 border-t-blue-600">
            <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
              <Send size={20} className="text-blue-600"/> New Broadcast
            </h3>
            
            <div className="space-y-4">
              {/* Recipient Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Recipient Group</label>
                <div className="relative">
                  <select 
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value as RecipientGroup)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
                  >
                    {recipientGroups.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <Users size={16} className="absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>

              {/* Channel Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Channels</label>
                <div className="space-y-2">
                  {channels.map(channel => (
                    <label key={channel} className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={selectedChannels.includes(channel)}
                        onChange={() => toggleChannel(channel)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm font-medium text-slate-700 flex items-center gap-2">
                        {channel === 'Portal Notification' && <Bell size={14} />}
                        {channel === 'Email' && <Mail size={14} />}
                        {channel === 'SMS / WhatsApp' && <MessageSquare size={14} />}
                        {channel}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Important Rule Change"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message Body</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Type your announcement here..."
                ></textarea>
                <p className="text-xs text-slate-400 mt-1 text-right">{message.length} chars</p>
              </div>

              <Button onClick={handleSend} disabled={!title || !message || selectedChannels.length === 0} className="w-full py-2.5">
                Send Broadcast
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
              <Clock size={20} className="text-slate-500"/> Broadcast History
            </h3>
            
            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900">{ann.title}</h4>
                      <StatusBadge status={ann.status} />
                    </div>
                    <span className="text-xs text-slate-400">{ann.date}</span>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{ann.message}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      <Users size={12} /> {ann.recipients}
                    </div>
                    <div className="flex items-center gap-2">
                       {ann.channels.map((c, idx) => (
                         <span key={idx} className="flex items-center gap-1 text-slate-400" title={c}>
                            {c.includes('Portal') && <Bell size={12}/>}
                            {c.includes('Email') && <Mail size={12}/>}
                            {c.includes('SMS') && <MessageSquare size={12}/>}
                         </span>
                       ))}
                    </div>
                    <div className="ml-auto text-green-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <CheckCircle size={12} /> Delivered
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
