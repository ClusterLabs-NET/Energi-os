
import { User, Role, Referee, Staff, TeamMember } from '../types';

// --- Users ---
export const MOCK_ADMIN: User = { id: 'a1', name: 'HRH. Zeina Rashid', email: 'admin@jordantaekwondo.org', role: Role.ADMIN };
export const MOCK_CLUB_OWNER: User = { id: 'c1', name: 'Rana Khalil', email: 'rana.khalil@jordantaekwondo.org', role: Role.CLUB_OWNER, clubId: 'club_01' };

// --- Referees ---
export const MOCK_REFEREES: Referee[] = [
  { 
    id: 'ref_1', 
    name: 'Hassan Al-Zoubi', 
    rank: 'International', 
    status: 'Active', 
    licenseExpiry: '2025-12-31', 
    eventsOfficiated: 124,
    email: 'hassan.z@jordantaekwondo.org',
    phone: '+962 79 555 1234',
    history: [
       { date: '2024-12-15', eventName: 'World Grand Prix Final', role: 'Center Referee' },
       { date: '2024-10-10', eventName: 'National Championship', role: 'Review Jury' },
       { date: '2024-05-20', eventName: 'WT Referee Seminar - Seoul', role: 'Certification' },
       { date: '2024-03-01', eventName: 'El Hassan Cup', role: 'Corner Judge' }
    ]
  },
  { 
    id: 'ref_2', 
    name: 'Muna Salem', 
    rank: 'International', 
    status: 'Active', 
    licenseExpiry: '2025-06-30', 
    eventsOfficiated: 98,
    email: 'muna.salem@jordantaekwondo.org',
    phone: '+962 79 666 4321',
    history: [
       { date: '2024-11-20', eventName: 'Arab Cup', role: 'Center Referee' },
       { date: '2024-08-05', eventName: 'Olympic Games - Paris', role: 'Corner Judge' },
       { date: '2024-02-15', eventName: 'Fujairah Open', role: 'Center Referee' }
    ]
  },
  { 
    id: 'ref_3', 
    name: 'Kareem Jaber', 
    rank: 'National 1st Class', 
    status: 'Active', 
    licenseExpiry: '2025-12-31', 
    eventsOfficiated: 45,
    email: 'kareem.j@jordantaekwondo.org',
    phone: '+962 77 111 2222',
    history: [
       { date: '2024-10-10', eventName: 'National Championship', role: 'Center Referee' },
       { date: '2024-06-15', eventName: 'Cadet Selection', role: 'Corner Judge' }
    ]
  },
  { 
    id: 'ref_4', 
    name: 'Salma Taha', 
    rank: 'National 2nd Class', 
    status: 'Inactive', 
    licenseExpiry: '2024-11-01', 
    eventsOfficiated: 12,
    email: 'salma.t@jordantaekwondo.org',
    phone: '+962 78 999 0000',
    history: [
       { date: '2023-12-05', eventName: 'Local Club Tournament', role: 'Corner Judge' }
    ]
  },
  { 
    id: 'ref_5', 
    name: 'Omar Farouk', 
    rank: 'Probationary', 
    status: 'Active', 
    licenseExpiry: '2025-03-15', 
    eventsOfficiated: 5,
    email: 'omar.f@jordantaekwondo.org',
    phone: '+962 79 000 1111',
    history: [
       { date: '2025-01-20', eventName: 'Rookie Referee Course', role: 'Certification' },
       { date: '2025-02-10', eventName: 'Amman Open', role: 'Corner Judge' }
    ]
  },
];

// --- Staff (HR) ---
export const MOCK_STAFF: Staff[] = [
  // Executive
  { 
    id: 'st_1', name: 'Eng. Faisal Abdallah', position: 'Secretary General', department: 'Executive', 
    email: 'sec.gen@jordantaekwondo.org', phone: '+962 79 000 0000', status: 'Active',
    joinDate: '2018-01-01', salary: 2500, employmentType: 'Full-Time', attendanceRate: 98, performanceRating: 4.9,
    schedule: 'Sun-Thu 9:00 - 17:00', activeTasks: 5, projectsAssigned: 3
  },
  // Finance
  { 
    id: 'st_2', name: 'Maha Obeid', position: 'Finance Director', department: 'Finance', 
    email: 'finance@jordantaekwondo.org', phone: '+962 79 111 1111', status: 'Active',
    joinDate: '2019-03-15', salary: 1800, employmentType: 'Full-Time', attendanceRate: 99, performanceRating: 4.8,
    schedule: 'Sun-Thu 8:30 - 16:30', activeTasks: 8, projectsAssigned: 2
  },
  { 
    id: 'st_8', name: 'Yazan Halabi', position: 'Accountant', department: 'Finance', 
    email: 'yazan.h@jordantaekwondo.org', phone: '+962 79 888 7777', status: 'Active',
    joinDate: '2022-06-01', salary: 850, employmentType: 'Full-Time', attendanceRate: 95, performanceRating: 4.2,
    schedule: 'Sun-Thu 9:00 - 17:00', activeTasks: 12, projectsAssigned: 1
  },
  // Technical / Coaching
  { 
    id: 'st_5', name: 'Faris Al-Assaf', position: 'Head Coach', department: 'Technical', 
    email: 'head.coach@jordantaekwondo.org', phone: '+962 79 444 4444', status: 'Active',
    joinDate: '2015-02-10', salary: 2200, employmentType: 'Contract', attendanceRate: 96, performanceRating: 5.0,
    schedule: 'Flexible / Camp Based', activeTasks: 4, projectsAssigned: 4
  },
  { 
    id: 'st_6', name: 'Layla Nabil', position: 'Junior Squad Coach', department: 'Technical', 
    email: 'layla.n@jordantaekwondo.org', phone: '+962 79 555 5555', status: 'Active',
    joinDate: '2020-01-01', salary: 1200, employmentType: 'Full-Time', attendanceRate: 92, performanceRating: 4.5,
    schedule: 'Sun-Thu 14:00 - 20:00', activeTasks: 3, projectsAssigned: 2
  },
  // Medical
  { 
    id: 'st_7', name: 'Dr. Sameer Qasem', position: 'Head Physiotherapist', department: 'Medical', 
    email: 'physio@jordantaekwondo.org', phone: '+962 79 666 6666', status: 'Active',
    joinDate: '2021-08-01', salary: 1500, employmentType: 'Part-Time', attendanceRate: 88, performanceRating: 4.7,
    schedule: 'Sun/Tue/Thu 16:00 - 20:00', activeTasks: 6, projectsAssigned: 1
  },
  // Operations / Logistics
  { 
    id: 'st_3', name: 'Sami Nader', position: 'IT Manager', department: 'Operations', 
    email: 'it@jordantaekwondo.org', phone: '+962 79 222 2222', status: 'Active',
    joinDate: '2020-11-20', salary: 1100, employmentType: 'Full-Time', attendanceRate: 97, performanceRating: 4.4,
    schedule: 'Sun-Thu 9:00 - 17:00', activeTasks: 15, projectsAssigned: 5
  },
  { 
    id: 'st_9', name: 'Mahmoud Abbas', position: 'Senior Driver', department: 'Logistics', 
    email: 'transport@jordantaekwondo.org', phone: '+962 79 999 0000', status: 'Active',
    joinDate: '2017-05-15', salary: 600, employmentType: 'Full-Time', attendanceRate: 100, performanceRating: 4.6,
    schedule: 'Shift A (7:00 - 15:00)', activeTasks: 2, projectsAssigned: 0
  },
  { 
    id: 'st_4', name: 'Lina Qasem', position: 'PR Officer', department: 'Marketing', 
    email: 'pr@jordantaekwondo.org', phone: '+962 79 333 3333', status: 'On Leave',
    joinDate: '2023-01-10', salary: 950, employmentType: 'Full-Time', attendanceRate: 85, performanceRating: 3.8,
    schedule: 'Sun-Thu 9:00 - 17:00', activeTasks: 0, projectsAssigned: 0
  },
];

// --- Team Members (Projects) ---
export const MOCK_TEAM: TeamMember[] = [
  { id: 'tm_1', name: 'Zaid A.', role: 'Project Lead' },
  { id: 'tm_2', name: 'Sarah M.', role: 'Coordinator' },
  { id: 'tm_3', name: 'Omar K.', role: 'Logistics' },
];