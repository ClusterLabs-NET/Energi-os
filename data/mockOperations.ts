
import { ServiceRequest, RequestStatus, Project, Task } from '../types';
import { MOCK_TEAM } from './mockUsers';

// --- Service Requests ---
export const MOCK_REQUESTS: ServiceRequest[] = [
  { id: 'req_1', type: 'Tournament Registration', requesterName: 'Amman Tigers', clubName: 'Amman Tigers', date: '2025-02-24', status: RequestStatus.PENDING, priority: 'Urgent', description: 'Registration for 12 athletes for National Open.' },
  { id: 'req_2', type: 'Belt Promotion', requesterName: 'Irbid Warriors', clubName: 'Irbid Warriors', date: '2025-02-20', status: RequestStatus.APPROVED, priority: 'Normal', description: 'Kukkiwon certification for 5 Black Belts.' },
  { id: 'req_3', type: 'Coach Certification', requesterName: 'Rami Yasin', clubName: 'Aqaba Falcons', date: '2025-02-18', status: RequestStatus.PENDING, priority: 'Normal', description: 'Level 2 Coaching Course application.' },
  { id: 'req_4', type: 'New Club License', requesterName: 'Tariq Jameel', clubName: 'Mafraq Eagles', date: '2025-02-15', status: RequestStatus.REJECTED, priority: 'Urgent', description: 'Missing safety inspection documents.' },
  { id: 'req_5', type: 'Facility Inspection', requesterName: 'Zarqa Champions', clubName: 'Zarqa Champions', date: '2025-02-10', status: RequestStatus.PENDING, priority: 'Normal', description: 'Annual venue inspection request.' },
  { id: 'req_6', type: 'Belt Promotion', requesterName: 'Salt Knights', clubName: 'Salt Knights', date: '2025-01-28', status: RequestStatus.APPROVED, priority: 'Normal', description: 'Color belt promotion entries.' },
];

// --- Projects ---
export const MOCK_PROJECTS: Project[] = [
  { 
    id: 'p1', 
    title: 'National Championship 2025', 
    description: 'Logistics and venue setup for the annual cup including broadcasting rights and VIP coordination.', 
    status: 'In Progress', 
    dueDate: '2025-05-15', 
    progress: 65, 
    leader: 'Zaid A.', 
    team: MOCK_TEAM,
    automationRules: [
      { id: 'auto_1', trigger: '30 Days Before Event', action: 'Send Invitation Email to All Clubs', status: 'Active', iconType: 'Mail' },
      { id: 'auto_2', trigger: '14 Days Before Event', action: 'Generate Referee Assignments', status: 'Active', iconType: 'Document' },
      { id: 'auto_3', trigger: 'Upon Registration', action: 'Issue Invoice to Club Account', status: 'Active', iconType: 'Finance' },
      { id: 'auto_4', trigger: 'Event Completed', action: 'Publish Results to Portal', status: 'Active', iconType: 'Notification' }
    ]
  },
  { 
    id: 'p2', 
    title: 'New Scoring System Rollout', 
    description: 'Implementing the new digital scoring for referees.', 
    status: 'Planning', 
    dueDate: '2025-06-01', 
    progress: 15, 
    leader: 'Sarah M.', 
    team: [MOCK_TEAM[1]],
    automationRules: [
       { id: 'auto_5', trigger: 'Weekly on Sunday', action: 'Send Progress Report to Tech Committee', status: 'Active', iconType: 'Mail' }
    ]
  },
  { id: 'p3', title: 'Summer Training Camp', description: 'Coordination for the national team camp in Aqaba.', status: 'On Hold', dueDate: '2025-07-20', progress: 30, leader: 'Omar K.', team: [MOCK_TEAM[2]] },
  { id: 'p4', title: 'Schools Outreach Program', description: 'Taekwondo introduction in 50 public schools.', status: 'In Progress', dueDate: '2025-09-01', progress: 45, leader: 'Lina Q.', team: [MOCK_TEAM[0]] },
];

// --- Tasks ---
export const MOCK_TASKS: Task[] = [
  { id: 't1', projectId: 'p1', title: 'Book Prince Hamzah Hall', assignee: 'Zaid A.', status: 'Done', priority: 'High', dueDate: '2025-02-01' },
  { id: 't2', projectId: 'p1', title: 'Send invitations to clubs', assignee: 'Rana K.', status: 'In Progress', priority: 'High', dueDate: '2025-03-15' },
  { id: 't3', projectId: 'p1', title: 'Order medals and trophies', assignee: 'Zaid A.', status: 'To Do', priority: 'Medium', dueDate: '2025-04-01' },
];
