
import React from 'react';
import { LucideIcon, MapPin } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Card Component ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);

// --- Stat Widget ---
interface StatWidgetProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subtext?: string;
}

export const StatWidget: React.FC<StatWidgetProps> = ({ title, value, icon: Icon, trend, trendDirection, subtext }) => (
  <Card className="p-6 flex items-start justify-between hover:shadow-md transition-shadow duration-200">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
      {(trend || subtext) && (
        <div className="flex items-center mt-2 text-sm">
          {trend && (
            <span className={`font-medium ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'} mr-2`}>
              {trend}
            </span>
          )}
          {subtext && <span className="text-slate-400">{subtext}</span>}
        </div>
      )}
    </div>
    <div className="p-3 bg-slate-50 rounded-xl text-slate-600">
      <Icon size={24} />
    </div>
  </Card>
);

// --- Pie Chart Widget ---
interface PieChartWidgetProps {
  title: string;
  data: { name: string; value: number }[];
  colors?: string[];
}

export const PieChartWidget: React.FC<PieChartWidgetProps> = ({ title, data, colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'] }) => (
  <Card className="p-6 flex flex-col h-full">
    <h3 className="font-bold text-slate-900 mb-4">{title}</h3>
    <div className="flex-1 min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <RechartsTooltip />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900 shadow-sm hover:shadow",
    secondary: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-sm hover:shadow", // JTF Red
    outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
    danger: "bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500",
    ghost: "text-slate-600 hover:bg-slate-100"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// --- Badge ---
export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let styles = "bg-slate-100 text-slate-800";
  
  switch (status.toLowerCase()) {
    case 'active':
    case 'approved':
    case 'completed':
    case 'done':
    case 'good':
    case 'new':
      styles = "bg-green-100 text-green-700 border border-green-200";
      break;
    case 'pending':
    case 'in progress':
    case 'planning':
      styles = "bg-blue-100 text-blue-700 border border-blue-200";
      break;
    case 'to do':
    case 'on hold':
    case 'probationary':
    case 'fair':
      styles = "bg-amber-100 text-amber-700 border border-amber-200";
      break;
    case 'rejected':
    case 'suspended':
    case 'inactive':
    case 'on leave':
    case 'poor':
    case 'retired':
      styles = "bg-red-100 text-red-700 border border-red-200";
      break;
    case 'urgent':
    case 'high':
      styles = "bg-red-50 text-red-700 border border-red-200 font-bold";
      break;
    case 'medium':
      styles = "bg-orange-50 text-orange-700 border border-orange-200";
      break;
    case 'international':
    case 'pss (electronic)':
      styles = "bg-purple-100 text-purple-700 border border-purple-200";
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles} whitespace-nowrap`}>
      {status}
    </span>
  );
};

// --- Segmented Control (iOS Style Tabs) ---
interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange, className = '' }) => {
  return (
    <div className={`flex bg-slate-100 p-1 rounded-xl w-full md:w-auto ${className}`}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`
            flex-1 px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
            ${value === option 
              ? 'bg-white text-slate-900 shadow-sm scale-[1.02]' 
              : 'text-slate-500 hover:text-slate-700'
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

// --- Progress Bar ---
export const ProgressBar: React.FC<{ progress: number; className?: string; colorClass?: string }> = ({ progress, className = '', colorClass = 'bg-slate-900' }) => (
  <div className={`w-full bg-slate-100 rounded-full h-2 ${className}`}>
    <div 
      className={`${colorClass} h-2 rounded-full transition-all duration-500 ease-out`} 
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    ></div>
  </div>
);

// --- Map Placeholder ---
export const MapPlaceholder: React.FC<{ markers: {x: number, y: number, label: string}[] }> = ({ markers }) => {
  return (
    <div className="w-full aspect-[16/9] bg-slate-100 rounded-2xl relative overflow-hidden border border-slate-200">
      {/* Abstract Map Shape of Jordan (Simulated) */}
      <div className="absolute inset-0 opacity-10">
         <svg viewBox="0 0 100 100" className="w-full h-full text-slate-400 fill-current">
            <path d="M20,10 L80,10 L90,30 L85,80 L30,90 L10,60 Z" />
         </svg>
      </div>
      
      {/* Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-0 opacity-5 pointer-events-none">
        {Array.from({ length: 72 }).map((_, i) => (
          <div key={i} className="border border-slate-900/10"></div>
        ))}
      </div>

      {/* Markers */}
      {markers.map((m, i) => (
        <div 
          key={i}
          className="absolute group cursor-pointer"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-md z-10 relative group-hover:scale-125 transition-transform"></div>
            <div className="w-4 h-4 bg-red-600 rounded-full animate-ping absolute top-0 left-0 opacity-75"></div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
              {m.label}
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs text-slate-500 border border-slate-200">
        Interactive Map View
      </div>
    </div>
  );
};
