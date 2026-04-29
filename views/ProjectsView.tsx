
import React, { useState } from 'react';
import { ArrowRight, Plus, Briefcase, CheckSquare, Users, Zap, Mail, FileText, DollarSign, Bell, ArrowDown } from 'lucide-react';
import { Card, Button, StatusBadge, ProgressBar } from '../components/CoreComponents';
import { MOCK_PROJECTS, MOCK_TASKS } from '../mockData';
import { Project } from '../types';

export const ProjectsView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getAutomationIcon = (type: string) => {
    switch(type) {
      case 'Mail': return <Mail size={16} />;
      case 'Document': return <FileText size={16} />;
      case 'Finance': return <DollarSign size={16} />;
      case 'Notification': return <Bell size={16} />;
      default: return <Zap size={16} />;
    }
  };

  if (selectedProject) {
    const projectTasks = MOCK_TASKS.filter(t => t.projectId === selectedProject.id);
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4">
        <button onClick={() => setSelectedProject(null)} className="flex items-center text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowRight className="rotate-180 mr-2" size={18} /> Back to All Projects
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Project Details & Automation */}
           <div className="lg:col-span-2 space-y-6">
              <Card className="p-8">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">{selectedProject.title}</h1>
                        <p className="text-slate-500">{selectedProject.description}</p>
                    </div>
                    <StatusBadge status={selectedProject.status} />
                 </div>
                 
                 <div className="space-y-2 mb-8">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Progress</span><span>{selectedProject.progress}%</span>
                    </div>
                    <ProgressBar progress={selectedProject.progress} />
                 </div>

                 {/* New: Structured Automation Blocks */}
                 <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
                       <Zap size={20} className="text-amber-500" /> Operational Automation
                    </h3>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                       <p className="text-xs text-slate-500 mb-4">
                          These tasks run automatically based on the project timeline, ensuring continuity without manual input.
                       </p>
                       <div className="space-y-3">
                          {selectedProject.automationRules && selectedProject.automationRules.length > 0 ? (
                             selectedProject.automationRules.map((rule, idx) => (
                                <div key={rule.id} className="relative">
                                   <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm z-10 relative">
                                      <div className="p-2 bg-slate-100 text-slate-600 rounded-md font-mono text-xs font-bold uppercase min-w-[120px] text-center">
                                         {rule.trigger}
                                      </div>
                                      <ArrowRight size={16} className="text-slate-300" />
                                      <div className="flex-1 flex items-center gap-2 font-medium text-slate-800 text-sm">
                                         <span className="p-1 bg-blue-50 text-blue-600 rounded">{getAutomationIcon(rule.iconType)}</span>
                                         {rule.action}
                                      </div>
                                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
                                   </div>
                                   {/* Connector Line for visual flow */}
                                   {idx < (selectedProject.automationRules?.length || 0) - 1 && (
                                      <div className="absolute left-[60px] top-10 h-6 w-0.5 bg-slate-200 -z-0"></div>
                                   )}
                                </div>
                             ))
                          ) : (
                             <div className="text-center py-6 text-slate-400 italic">No automation rules configured.</div>
                          )}
                          
                          <Button variant="outline" size="sm" className="w-full border-dashed mt-2">
                             <Plus size={14} className="mr-2"/> Add Automation Block
                          </Button>
                       </div>
                    </div>
                 </div>

                 <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-lg">Manual Tasks</h3>
                     <Button size="sm" variant="outline"><Plus size={14} className="mr-1"/> Add Task</Button>
                 </div>
                 
                 <div className="space-y-3">
                    {projectTasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${task.status === 'Done' ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300'}`}>
                                {task.status === 'Done' && <CheckSquare size={12} />}
                            </div>
                            <div className="flex-1">
                                <div className={`text-sm font-medium ${task.status === 'Done' ? 'line-through text-slate-400' : 'text-slate-700'}`}>{task.title}</div>
                                <div className="text-xs text-slate-400">Assignee: {task.assignee}</div>
                            </div>
                            <StatusBadge status={task.priority} />
                        </div>
                    ))}
                    {projectTasks.length === 0 && <p className="text-slate-400 text-sm italic">No tasks assigned yet.</p>}
                 </div>
              </Card>
           </div>

           {/* Team Sidebar */}
           <div className="space-y-6">
              <Card className="p-6">
                 <h3 className="font-bold text-slate-900 mb-4">Project Team</h3>
                 <div className="space-y-4">
                    {selectedProject.team.map(member => (
                       <div key={member.id} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                             <Users size={20} />
                          </div>
                          <div>
                             <div className="font-medium text-sm text-slate-900">{member.name}</div>
                             <div className="text-xs text-slate-500">{member.role}</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </Card>

              <Card className="p-6">
                 <h3 className="font-bold text-slate-900 mb-2">Project Info</h3>
                 <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                       <span className="text-slate-500">Leader</span>
                       <span className="font-medium">{selectedProject.leader}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                       <span className="text-slate-500">Due Date</span>
                       <span className="font-medium">{selectedProject.dueDate}</span>
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Projects & Workflows</h2>
           <p className="text-slate-500">Manage initiatives and automate recurring operational tasks.</p>
        </div>
        <Button variant="primary" size="sm" className="gap-2"><Plus size={16} /> New Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {MOCK_PROJECTS.map(p => (
            <Card key={p.id} className="p-6 cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-slate-900 group" >
               <div onClick={() => setSelectedProject(p)}>
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-slate-100 text-slate-700 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <Briefcase size={24} />
                     </div>
                     <StatusBadge status={p.status} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900">{p.title}</h3>
                  <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                      <span>Due {p.dueDate}</span>
                      <span>•</span>
                      <span>{p.team.length} Members</span>
                  </div>
                  
                  {/* Automation Indicator Badge on Card */}
                  {p.automationRules && p.automationRules.length > 0 && (
                     <div className="mb-4 inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-semibold border border-amber-100">
                        <Zap size={12} fill="currentColor" /> {p.automationRules.length} Auto-Workflows Active
                     </div>
                  )}

                  <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-600">
                          <span>Progress</span>
                          <span>{p.progress}%</span>
                      </div>
                      <ProgressBar progress={p.progress} />
                  </div>
               </div>
            </Card>
         ))}
      </div>
    </div>
  );
};
