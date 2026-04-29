import React from 'react';
import { LucideIcon } from 'lucide-react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; style?: React.CSSProperties }> = ({ children, className = '', onClick, style }) => (
  <div 
    onClick={onClick}
    style={style}
    className={`bg-white rounded-[24px] border border-slate-200/60 shadow-sm ${onClick ? 'cursor-pointer hover:border-blue-400 hover:shadow-xl transition-all duration-300' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}> = ({ 
  children, variant = 'primary', size = 'md', className = '', ...props 
}) => {
  const styles = {
    primary: 'bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-slate-900/10',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20',
    outline: 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-6 py-2.5 text-xs',
    lg: 'px-8 py-3 text-sm'
  };

  return (
    <button 
      className={`${sizes[size]} rounded-xl font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    HEALTHY: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    WARNING: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    CRITICAL: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    OFFLINE: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
    ON: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    OFF: 'bg-slate-800 text-slate-500 border-white/5',
    EMERGENCY: 'bg-rose-600 text-white border-rose-400 animate-pulse shadow-[0_0_15px_#e11d48]',
    PAID: 'bg-emerald-500/10 text-emerald-500',
    PENDING: 'bg-amber-500/10 text-amber-500',
    OVERDUE: 'bg-rose-500/10 text-rose-500'
  };

  return (
    <span className={`px-2.5 py-1 rounded text-[8px] font-black uppercase border tracking-[0.1em] ${colors[status] || 'bg-slate-100 text-slate-500'}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

export const StatBox: React.FC<{ label: string; value: string | number; unit?: string; icon: LucideIcon; change?: number }> = ({ label, value, unit, icon: Icon, change }) => (
  <Card className="p-6 flex items-center justify-between group">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        {unit && <span className="text-xs font-semibold text-slate-400 uppercase">{unit}</span>}
      </div>
      {change !== undefined && (
        <p className={`text-[10px] mt-2 font-bold flex items-center gap-1 ${change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% <span className="text-slate-400 font-medium uppercase">vs prev week</span>
        </p>
      )}
    </div>
    <div className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
      <Icon size={24} strokeWidth={1.5} />
    </div>
  </Card>
);