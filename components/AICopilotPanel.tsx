
import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, TrendingUp, AlertCircle, ChevronRight, Zap, RefreshCcw } from 'lucide-react';
import { Card } from './CoreUI';
import { geminiService } from '../services/geminiService';

interface AICopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICopilotPanel: React.FC<AICopilotPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Operational context synchronized. I am ready to assist with network oversight. What is our focus?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      geminiService.startChat();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await geminiService.sendMessage(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-slate-900 shadow-2xl z-[2000] flex flex-col border-l border-white/10 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Ops Copilot</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Active Insight</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide" ref={scrollRef}>
        {/* Daily Summary Card */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={12} /> Morning Briefing
            </h3>
            <RefreshCcw size={12} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
          </div>
          <Card className="bg-slate-800 border-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Network Health</span>
              <span className="text-xs font-bold text-amber-500 uppercase">Caution</span>
            </div>
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[74%]"></div>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed italic">
              "System pressure in Zarqa is approaching nominal limits. Fleet truck T12 requires sensor inspection."
            </p>
          </Card>
        </section>

        {/* Chat Feed */}
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none'
              }`}>
                {m.text.split('\n').map((line, idx) => (
                  <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Suggested Actions */}
        <section className="pt-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Recommended Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'Escalate T12 Incident', icon: AlertCircle, color: 'text-rose-400' },
              { label: 'Draft Zarqa Briefing', icon: Zap, color: 'text-amber-400' },
            ].map((action, i) => (
              <button 
                key={i}
                className="w-full flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 border border-white/5 rounded-xl text-[10px] font-bold text-slate-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <action.icon size={14} className={action.color} />
                  <span>{action.label}</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-900 border-t border-white/5">
        <div className="relative">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Ask Copilot about assets, risks or summaries..."
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none h-20"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute bottom-3 right-3 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg shadow-lg transition-all"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-slate-500 mt-3 text-center">
          Powered by Gemini 3 • Context: Dubai Network
        </p>
      </div>
    </div>
  );
};
