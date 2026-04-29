
import { FederationEvent } from '../types';

export const MOCK_EVENTS: FederationEvent[] = [
  { 
    id: 'ev_1', 
    title: 'National Championship 2025', 
    date: '2025-05-15', 
    endDate: '2025-05-17', 
    location: 'Prince Hamzah Hall, Amman', 
    type: 'Tournament', 
    status: 'Open for Registration', 
    participants: 450,
    organizer: 'Federation',
    capacity: 500,
    fee: 25,
    supervisors: ['Grandmaster Ali', 'Referee Chair Hassan'],
    registeredCount: 320,
    description: 'The primary national ranking tournament for Cadet, Junior, and Senior divisions.'
  },
  { 
    id: 'ev_2', 
    title: 'Amman Bears Open', 
    date: '2025-04-10', 
    location: 'Amman Arena', 
    type: 'Tournament', 
    status: 'Upcoming', 
    participants: 150,
    organizer: 'Amman Bears Club',
    capacity: 200,
    fee: 15,
    supervisors: ['Club Master Ziad'],
    registeredCount: 45,
    description: 'Local club tournament open to all color belts.'
  },
  { 
    id: 'ev_3', 
    title: 'National Black Belt Grading (1st-3rd Dan)', 
    date: '2025-03-20', 
    location: 'JTF Headquarters', 
    type: 'Promotion Test', 
    status: 'Open for Registration', 
    participants: 80,
    organizer: 'Federation',
    capacity: 100,
    fee: 50,
    supervisors: ['Technical Committee', 'GM Chen'],
    registeredCount: 65,
    description: 'Quarterly promotion test for candidates aiming for 1st, 2nd, and 3rd Dan.'
  },
  { 
    id: 'ev_4', 
    title: 'Referee Refresher Course', 
    date: '2025-03-05', 
    location: 'JTF HQ - Seminar Room', 
    type: 'Workshop', 
    status: 'Upcoming', 
    participants: 40,
    organizer: 'Referees Committee',
    capacity: 50,
    fee: 10,
    supervisors: ['Int. Ref Hassan Al-Zoubi'],
    registeredCount: 38,
    description: 'Mandatory update on new WTF scoring rules for all national referees.'
  },
  { 
    id: 'ev_5', 
    title: 'National Team Selection (Cadet)', 
    date: '2025-03-10', 
    location: 'Amman Arena', 
    type: 'Selection', 
    status: 'Upcoming', 
    participants: 120,
    organizer: 'Federation',
    capacity: 150,
    registeredCount: 110,
    description: 'Selection trials for the upcoming Cadet World Championship.'
  }
];
