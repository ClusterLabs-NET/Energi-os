
import React, { useState } from 'react';
import { Plus, UserCircle, Users, DollarSign, Calendar, Clock, Activity, Mail, Phone, Briefcase, Star, CheckCircle } from 'lucide-react';
import { Button, Card, StatusBadge, StatWidget, PieChartWidget, ProgressBar } from '../components/CoreComponents';
import { MOCK_STAFF } from '../mockData';
import { Staff } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

export const HRView: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // HR Metrics
  const totalStaff = MOCK_STAFF.length;
  const activeStaff = MOCK_STAFF.filter(s => s.status === 'Active').length;
  const totalPayroll = MOCK_STAFF.reduce((acc, curr) => acc + curr.salary, 0);
  const avgAttendance = Math.round(MOCK_STAFF.reduce((acc, curr) => acc + curr.attendanceRate, 0) / totalStaff);

  // Department Distribution Data
  const deptCount: Record<string, number> = {};
  MOCK_STAFF.forEach(s => deptCount[s.department] = (deptCount[s.department] || 0) + 1);
  const deptData = Object.keys(deptCount).map(k => ({ name: k, value: deptCount[k] }));

  // Performance Data (Mock distribution)
  const performanceData = [
     { name: 'Excellent (5)', value: MOCK_STAFF.filter(s => s.performanceRating >= 4.8).length },
     { name: 'Good (4-4.7)', value: MOCK_STAFF.filter(s => s.performanceRating >= 4.0 && s.performanceRating < 4.8).length },
     { name: 'Average (3-3.9)', value: MOCK_STAFF.filter(s => s.performanceRating >= 3.0 && s.performanceRating < 4.0).length },
     { name: 'Needs Imp.', value: MOCK_STAFF.filter(s => s.performanceRating < 3.0).length },
  ];

  // --- Detail View (Modal/Overlay Style) ---
  if (selectedStaff) {
     return (
        <div className="space-y-6 animate-in slide-in-from-right-4">
           <button onClick={() => setSelectedStaff(null)} className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium">
              ← Back to Directory
           </button>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="space-y-6">
                 <Card className="p-8 text-center border-t-4 border-t-slate-900">
                    <div className="w-32 h-32 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6 border-4 border-white shadow-lg">
                       <UserCircle size={64} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedStaff.name}</h2>
                    <p className="text-blue-600 font-medium text-lg">{selectedStaff.position}</p>
                    <div className="flex justify-center mt-2 mb-6">
                       <StatusBadge status={selectedStaff.status} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-left border-t border-slate-100 pt-6">
                       <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider">Department</p>
                          <p className="font-semibold text-slate-700">{selectedStaff.department}</p>
                       </div>
                       <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider">Join Date</p>
                          <p className="font-semibold text-slate-700">{selectedStaff.joinDate}</p>
                       </div>
                       <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider">Type</p>
                          <p className="font-semibold text-slate-700">{selectedStaff.employmentType}</p>
                       </div>
                       <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider">ID</p>
                          <p className="font-mono text-slate-500 text-sm">EMP-{selectedStaff.id.toUpperCase()}</p>
                       </div>
                    </div>
                 </Card>

                 <Card className="p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <Mail className="text-slate-400" size={18}/>
                          <div className="flex-1 overflow-hidden">
                             <p className="text-xs text-slate-400">Email Address</p>
                             <p className="text-sm font-medium text-slate-900 truncate">{selectedStaff.email}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <Phone className="text-slate-400" size={18}/>
                          <div>
                             <p className="text-xs text-slate-400">Phone Number</p>
                             <p className="text-sm font-medium text-slate-900">{selectedStaff.phone}</p>
                          </div>
                       </div>
                    </div>
                 </Card>
              </div>

              {/* Performance & Metrics */}
              <div className="lg:col-span-2 space-y-6">
                 {/* KPI Row */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-5 flex items-center justify-between">
                       <div>
                          <p className="text-sm text-slate-500 mb-1">Performance Rating</p>
                          <div className="flex items-baseline gap-1">
                             <span className="text-2xl font-bold text-slate-900">{selectedStaff.performanceRating}</span>
                             <span className="text-sm text-slate-400">/ 5.0</span>
                          </div>
                          <div className="flex mt-1">
                             {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className={i < Math.floor(selectedStaff.performanceRating) ? "text-yellow-400 fill-current" : "text-slate-200"} />
                             ))}
                          </div>
                       </div>
                       <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full"><Star size={20}/></div>
                    </Card>

                    <Card className="p-5 flex items-center justify-between">
                       <div>
                          <p className="text-sm text-slate-500 mb-1">Attendance Rate</p>
                          <span className="text-2xl font-bold text-slate-900">{selectedStaff.attendanceRate}%</span>
                          <p className="text-xs text-green-600 font-medium mt-1">Excellent</p>
                       </div>
                       <div className="p-3 bg-green-50 text-green-600 rounded-full"><CheckCircle size={20}/></div>
                    </Card>

                    <Card className="p-5 flex items-center justify-between">
                       <div>
                          <p className="text-sm text-slate-500 mb-1">Monthly Salary</p>
                          <span className="text-2xl font-bold text-slate-900">{selectedStaff.salary.toLocaleString()} AED</span>
                          <p className="text-xs text-slate-400 mt-1">Basic + Allowances</p>
                       </div>
                       <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><DollarSign size={20}/></div>
                    </Card>
                 </div>

                 {/* Work Overview */}
                 <Card className="p-6">
                    <h3 className="font-bold text-slate-900 mb-6">Work Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Clock size={16}/> Standard Schedule</h4>
                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                             <p className="font-medium text-slate-900">{selectedStaff.schedule}</p>
                             <p className="text-xs text-slate-500 mt-1">Total 40 hours / week</p>
                          </div>
                          
                          <div className="space-y-2 mt-4">
                             <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Active Tasks</span>
                                <span className="font-bold">{selectedStaff.activeTasks}</span>
                             </div>
                             <ProgressBar progress={(selectedStaff.activeTasks / 20) * 100} colorClass="bg-blue-600" />
                          </div>
                       </div>

                       <div className="space-y-4">
                           <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Briefcase size={16}/> Current Focus</h4>
                           <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                                 <span className="text-sm font-medium">Assigned Projects</span>
                                 <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold">{selectedStaff.projectsAssigned}</span>
                              </div>
                              {selectedStaff.position.includes('Coach') && (
                                 <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                                    <span className="text-sm font-medium">Squad Sessions</span>
                                    <span className="text-xs text-slate-500">Daily 16:00 - 19:00</span>
                                 </div>
                              )}
                              {selectedStaff.position.includes('Driver') && (
                                 <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                                    <span className="text-sm font-medium">Vehicle Assigned</span>
                                    <span className="text-xs text-slate-500">Toyota Coaster (Bus-01)</span>
                                 </div>
                              )}
                           </div>
                       </div>
                    </div>
                 </Card>
              </div>
           </div>
        </div>
     );
  }

  // --- Main Directory View ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Human Resources</h2>
           <p className="text-slate-500">Manage federation staff, payroll, and performance.</p>
        </div>
        <Button><Plus size={16} className="mr-2"/> Add Staff Member</Button>
      </div>

      {/* HR Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget title="Total Staff" value={totalStaff} icon={Users} trend="+2 New" trendDirection="up"/>
        <StatWidget title="Monthly Payroll" value={`AED ${totalPayroll.toLocaleString()}`} icon={DollarSign} />
        <StatWidget title="Avg. Attendance" value={`${avgAttendance}%`} icon={Clock} trend="Excellent" trendDirection="up" />
        <StatWidget title="Active Workforce" value={activeStaff} icon={Activity} subtext={`${totalStaff - activeStaff} on Leave`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Charts */}
         <div className="lg:col-span-1 flex flex-col gap-6">
            <PieChartWidget title="Department Distribution" data={deptData} />
         </div>

         {/* Staff Directory Grid */}
         <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {MOCK_STAFF.map(staff => (
                  <Card key={staff.id} className="group hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-600">
                     <div onClick={() => setSelectedStaff(staff)} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                           <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                 <UserCircle size={32} />
                              </div>
                              <div>
                                 <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{staff.name}</h3>
                                 <p className="text-sm font-medium text-slate-500">{staff.position}</p>
                              </div>
                           </div>
                           <StatusBadge status={staff.status} />
                        </div>
                        
                        <div className="space-y-2 mb-4">
                           <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Briefcase size={14} className="text-slate-400"/> {staff.department} Dept.
                           </div>
                           <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Mail size={14} className="text-slate-400"/> {staff.email}
                           </div>
                        </div>

                        <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-sm">
                           <div className="flex flex-col">
                              <span className="text-xs text-slate-400">Attendance</span>
                              <span className={`font-bold ${staff.attendanceRate > 95 ? 'text-green-600' : 'text-slate-700'}`}>{staff.attendanceRate}%</span>
                           </div>
                           <div className="flex flex-col text-right">
                              <span className="text-xs text-slate-400">Rating</span>
                              <div className="flex items-center gap-1 font-bold text-slate-700">
                                 <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                 {staff.performanceRating}
                              </div>
                           </div>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
