

import { Achievement, Announcement, Committee, FederationDocument } from '../types';

// --- Achievements ---
export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { 
    id: 'ach_1', year: 2024, tournamentName: 'Asian Games', location: 'Hangzhou, China', date: 'Sept 23 - Oct 8, 2024', gold: 1, silver: 1, bronze: 2, rank: 4,
    delegationStats: { totalAthletes: 12, totalStaff: 4, totalMedics: 2 },
    roster: [
      { name: 'Faris Al-Assaf', role: 'Coach' },
      { name: 'Dr. Sameer Qasem', role: 'Medic' },
      { name: 'Saleh El-Sharabaty', role: 'Athlete', category: '-80kg', result: 'Silver' },
      { name: 'Julyana Al-Sadeq', role: 'Athlete', category: '-67kg', result: 'Gold' },
      { name: 'Zaid Kareem', role: 'Athlete', category: '-68kg', result: 'Bronze' },
      { name: 'Rama Abu Al-Rub', role: 'Athlete', category: '-73kg', result: 'Bronze' },
      { name: 'Mahmoud Al-Taryreh', role: 'Athlete', category: '-58kg', result: 'Quarter-finals' },
      { name: 'Zaid Mustafa', role: 'Athlete', category: '-68kg', result: 'Round of 16' },
      { name: 'Anwar Al-Zoubi', role: 'Manager' },
    ]
  },
  { 
    id: 'ach_2', year: 2024, tournamentName: 'Arab Cup', location: 'Fujairah, UAE', date: 'Feb 10-14, 2024', gold: 5, silver: 3, bronze: 1, rank: 1,
    delegationStats: { totalAthletes: 16, totalStaff: 5, totalMedics: 1 },
    roster: [
      { name: 'Faris Al-Assaf', role: 'Coach' },
      { name: 'Layla Nabil', role: 'Coach' },
      { name: 'Yousef Rami', role: 'Athlete', category: '-80kg', result: 'Gold' },
      { name: 'Nadia Karim', role: 'Athlete', category: '-57kg', result: 'Gold' },
      { name: 'Omar Ahmad', role: 'Athlete', category: '-68kg', result: 'Silver' },
      { name: 'Sara Mahmoud', role: 'Athlete', category: '-55kg', result: 'Silver' },
      { name: 'Khalid Ali', role: 'Athlete', category: '-45kg', result: 'Bronze' },
      { name: 'Ahmed Walid', role: 'Athlete', category: '-54kg', result: 'Gold' },
      { name: 'Rania H.', role: 'Athlete', category: '-49kg', result: 'Gold' },
      { name: 'Muna S.', role: 'Athlete', category: '-62kg', result: 'Gold' },
    ]
  },
  { 
    id: 'ach_3', year: 2023, tournamentName: 'World Championship', location: 'Baku, Azerbaijan', date: 'May 29 - Jun 4, 2023', gold: 0, silver: 1, bronze: 0, rank: 12,
    delegationStats: { totalAthletes: 10, totalStaff: 6, totalMedics: 2 },
    roster: [
       { name: 'Faris Al-Assaf', role: 'Coach' },
       { name: 'Mohammed Al-Bakheet', role: 'Manager' },
       { name: 'Zaid Kareem', role: 'Athlete', category: '-68kg', result: 'Silver' },
       { name: 'Saleh El-Sharabaty', role: 'Athlete', category: '-80kg', result: 'Round of 16' },
       { name: 'Julyana Al-Sadeq', role: 'Athlete', category: '-67kg', result: 'Quarter-finals' }
    ]
  },
  { 
    id: 'ach_4', year: 2023, tournamentName: 'Asian Championship', location: 'Chuncheon, Korea', date: 'June 2023', gold: 2, silver: 2, bronze: 4, rank: 3,
    delegationStats: { totalAthletes: 14, totalStaff: 4, totalMedics: 2 },
    roster: [] 
  },
  { 
    id: 'ach_5', year: 2022, tournamentName: 'Islamic Solidarity Games', location: 'Konya, Turkey', date: 'August 2022', gold: 3, silver: 1, bronze: 1, rank: 2,
    delegationStats: { totalAthletes: 8, totalStaff: 3, totalMedics: 1 },
    roster: []
  },
  // Archive Data
  { 
    id: 'ach_arc_1', year: 2021, tournamentName: 'Tokyo Olympics', location: 'Tokyo, Japan', date: 'July 2021', gold: 0, silver: 1, bronze: 0, rank: 8, isArchive: true,
    delegationStats: { totalAthletes: 2, totalStaff: 3, totalMedics: 1 },
    roster: [
       { name: 'Faris Al-Assaf', role: 'Coach' },
       { name: 'Saleh El-Sharabaty', role: 'Athlete', category: '-80kg', result: 'Silver' },
       { name: 'Julyana Al-Sadeq', role: 'Athlete', category: '-67kg', result: 'Round of 16' }
    ]
  },
  { id: 'ach_arc_2', year: 2020, tournamentName: 'Asian Qualification', location: 'Amman, Jordan', date: 'May 2021', gold: 2, silver: 0, bronze: 0, rank: 1, isArchive: true, delegationStats: { totalAthletes: 4, totalStaff: 2, totalMedics: 1 }, roster: [] },
  { id: 'ach_arc_3', year: 2019, tournamentName: 'World Grand Prix', location: 'Moscow, Russia', date: 'Dec 2019', gold: 0, silver: 0, bronze: 1, rank: 15, isArchive: true, delegationStats: { totalAthletes: 5, totalStaff: 2, totalMedics: 0 }, roster: [] },
  { id: 'ach_arc_4', year: 2018, tournamentName: 'Asian Games Jakarta', location: 'Jakarta, Indonesia', date: 'Aug 2018', gold: 1, silver: 0, bronze: 3, rank: 5, isArchive: true, delegationStats: { totalAthletes: 8, totalStaff: 3, totalMedics: 1 }, roster: [] },
];

// --- Announcements ---
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'ann_1', title: 'New Refereeing Rules (Effective March 1st)', message: 'Please be advised that WTF has updated scoring rules for head kicks. Download the attached PDF from the resources section.', date: '2025-02-28', sender: 'Technical Committee', recipients: 'Referees', channels: ['Portal Notification', 'Email'], status: 'Sent' },
  { id: 'ann_2', title: 'Club License Renewal Deadline', message: 'Reminder: All club licenses must be renewed by March 15th to participate in the National Championship.', date: '2025-02-25', sender: 'Admin Office', recipients: 'Club Owners', channels: ['Email', 'SMS / WhatsApp'], status: 'Sent' },
  { id: 'ann_3', title: 'Senior Squad Training Schedule Change', message: 'Morning sessions are moved to 7:00 AM starting next week due to Ramadan timing.', date: '2025-02-20', sender: 'Head Coach', recipients: 'National Squads', channels: ['Portal Notification', 'SMS / WhatsApp'], status: 'Sent' },
  { id: 'ann_4', title: 'Annual General Assembly Meeting', message: 'Invitation to the annual general assembly to be held at the HQ.', date: '2025-02-15', sender: 'Secretary General', recipients: 'All Members', channels: ['Email'], status: 'Sent' },
];

// --- Committees ---
const COMMITTEE_NAMES = [
   "National Teams and High-Performance Committee",
   "Scientific Committee",
   "Medical Committee",
   "Disciplinary Committees",
   "Procurement Committee",
   "Higher Technical Committee",
   "Promotion Tests Committee",
   "Referees Committee",
   "Organization Committee",
   "Coaches Committee",
   "Training Centers Committee"
];

export const MOCK_COMMITTEES: Committee[] = COMMITTEE_NAMES.map((name, i) => ({
   id: `com_${i+1}`,
   name: name,
   description: `Oversees all matters related to ${name.toLowerCase().replace('committee', '')}.`,
   members: [
      { id: `cm_${i}_1`, name: 'Dr. Ahmad Saleh', role: 'Chair', email: 'ahmad.s@jordantaekwondo.org', phone: '+962 79 123 4567' },
      { id: `cm_${i}_2`, name: 'Eng. Rania Touqan', role: 'Vice Chair', email: 'rania.t@jordantaekwondo.org', phone: '+962 79 765 4321' },
      { id: `cm_${i}_3`, name: 'Capt. Zaid Al-Masri', role: 'Secretary', email: 'zaid.m@jordantaekwondo.org', phone: '+962 79 555 1212' },
   ],
   meetings: [
      { id: `mt_${i}_1`, date: '2025-02-10', title: 'Q1 Planning Meeting', summary: 'Discussed annual budget and strategic goals.', status: 'Completed', documentUrl: '#' },
      { id: `mt_${i}_2`, date: '2025-03-15', title: 'Monthly Review', summary: 'Pending agenda items.', status: 'Scheduled' }
   ],
   nextMeeting: '2025-03-15'
}));

// --- Documents ---
export const MOCK_DOCUMENTS: FederationDocument[] = [
   { id: 'doc_1', title: 'JTF Constitution 2024', category: 'Legal', uploadDate: '2024-01-01', size: '2.5 MB', type: 'PDF', author: 'Legal Dept' },
   { id: 'doc_2', title: 'National Team Selection Criteria', category: 'Technical', uploadDate: '2025-01-15', size: '1.2 MB', type: 'PDF', author: 'Technical Comm.' },
   { id: 'doc_3', title: 'Financial Report 2024', category: 'Financial', uploadDate: '2025-01-30', size: '4.5 MB', type: 'XLSX', author: 'Finance Dir.' },
   { id: 'doc_4', title: 'Anti-Doping Guidelines', category: 'Medical', uploadDate: '2024-06-10', size: '800 KB', type: 'PDF', author: 'Medical Comm.' },
   { id: 'doc_5', title: 'Referee Seminar Materials', category: 'Event', uploadDate: '2025-02-28', size: '15 MB', type: 'PDF', author: 'Referees Comm.' },
   { id: 'doc_6', title: 'Employee Handbook', category: 'Administrative', uploadDate: '2023-09-01', size: '3.0 MB', type: 'DOCX', author: 'HR' },
];