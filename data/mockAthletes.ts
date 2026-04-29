
import { Athlete, Belt } from '../types';
import { MOCK_CLUBS } from './mockClubs';

// --- Static Hero Athletes (National Squad Members) ---
const HERO_ATHLETES: Athlete[] = [
  // Senior Squad
  { 
    id: 'ath_1', name: 'Omar Ahmad', dob: '2005-05-12', gender: 'Male', belt: Belt.BLACK_2DAN, clubId: 'club_1', clubName: 'Golden Star Taekwondo Center', wtfId: 'JOR-1001', points: 1250, squad: 'Senior', weightClass: '-68kg',
    results: [
      { id: 'r1', tournamentName: 'Grand Prix Paris 2024', date: '2024-09-01', medal: 'Bronze', category: '-68kg' },
      { id: 'r2', tournamentName: 'Asian Championship 2024', date: '2024-05-15', medal: 'Gold', category: '-68kg' }
    ]
  },
  { 
    id: 'ath_5', name: 'Yousef Rami', dob: '2004-03-10', gender: 'Male', belt: Belt.BLACK_3DAN, clubId: 'club_1', clubName: 'Golden Star Taekwondo Center', wtfId: 'JOR-0992', points: 1540, squad: 'Senior', weightClass: '-80kg',
    results: [
      { id: 'r3', tournamentName: 'Olympics 2024', date: '2024-08-10', medal: 'Silver', category: '-80kg' },
      { id: 'r4', tournamentName: 'Fujairah Open 2025', date: '2025-02-12', medal: 'Gold', category: '-80kg' }
    ]
  },
  { 
    id: 'ath_6', name: 'Nadia Karim', dob: '2003-11-22', gender: 'Female', belt: Belt.BLACK_2DAN, clubId: 'club_3', clubName: 'Al-Istiqlal Taekwondo Center', wtfId: 'JOR-1055', points: 1100, squad: 'Senior', weightClass: '-57kg',
    results: [
      { id: 'r5', tournamentName: 'Arab Cup 2024', date: '2024-11-20', medal: 'Gold', category: '-57kg' }
    ]
  },
  
  // Junior Squad
  { 
    id: 'ath_2', name: 'Sara Mahmoud', dob: '2008-08-22', gender: 'Female', belt: Belt.BLACK_1DAN, clubId: 'club_1', clubName: 'Golden Star Taekwondo Center', wtfId: 'JOR-1002', points: 980, squad: 'Junior', weightClass: '-55kg',
    results: [
      { id: 'r6', tournamentName: 'Junior Worlds 2024', date: '2024-10-05', medal: 'Silver', category: '-55kg' }
    ]
  },
  { 
    id: 'ath_7', name: 'Kareem Salameh', dob: '2008-01-15', gender: 'Male', belt: Belt.RED, clubId: 'club_2', clubName: 'Sahwat Al-Jawad Taekwondo Center', wtfId: 'JOR-2001', points: 600, squad: 'Junior', weightClass: '-63kg',
    results: []
  },

  // Cadet Squad
  { 
    id: 'ath_3', name: 'Khalid Ali', dob: '2011-02-14', gender: 'Male', belt: Belt.RED, clubId: 'club_2', clubName: 'Sahwat Al-Jawad Taekwondo Center', wtfId: 'JOR-1045', points: 450, squad: 'Cadet', weightClass: '-45kg',
    results: [
      { id: 'r7', tournamentName: 'National Cadet Championship 2024', date: '2024-06-20', medal: 'Bronze', category: '-45kg' }
    ]
  }
];

// --- Data Generator Helpers ---
const FIRST_NAMES_MALE = ['Mohammad', 'Ahmad', 'Omar', 'Yousef', 'Zaid', 'Abdallah', 'Khaled', 'Rami', 'Sami', 'Faris', 'Hamza', 'Mahmoud', 'Ibrahim', 'Ali'];
const FIRST_NAMES_FEMALE = ['Sara', 'Leen', 'Nour', 'Salma', 'Rania', 'Lina', 'Hana', 'Maya', 'Dana', 'Jana', 'Tala', 'Zeina', 'Aya', 'Farah'];
const LAST_NAMES = ['Al-Masri', 'Al-Zoubi', 'Obeidat', 'Haddad', 'Khasawneh', 'Jaber', 'Abu-Zaid', 'Salman', 'Awad', 'Dajani', 'Touqan', 'Shalabi', 'Qasem'];

const BELTS = [Belt.WHITE, Belt.YELLOW, Belt.GREEN, Belt.BLUE, Belt.RED, Belt.BLACK_1DAN];
const WEIGHTS_MALE = ['-33kg', '-37kg', '-41kg', '-45kg', '-49kg', '-53kg', '-57kg', '-61kg', '-65kg', '+65kg', '-54kg', '-58kg', '-63kg', '-68kg', '-74kg', '-80kg', '+87kg'];
const WEIGHTS_FEMALE = ['-29kg', '-33kg', '-37kg', '-41kg', '-44kg', '-47kg', '-51kg', '-55kg', '-59kg', '+59kg', '-46kg', '-49kg', '-53kg', '-57kg', '-62kg', '-67kg', '+73kg'];

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateAthletesForClub = (clubId: string, clubName: string, startIndex: number): Athlete[] => {
  const count = 5 + Math.floor(Math.random() * 4); // Generate 5 to 8 athletes per club
  const athletes: Athlete[] = [];

  for (let i = 0; i < count; i++) {
    const isMale = Math.random() > 0.4; // 60% Male, 40% Female roughly
    const firstName = isMale ? getRandomItem(FIRST_NAMES_MALE) : getRandomItem(FIRST_NAMES_FEMALE);
    const lastName = getRandomItem(LAST_NAMES);
    
    // Random Age between 7 (2018) and 25 (2000)
    const birthYear = 2000 + Math.floor(Math.random() * 19); 
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

    // Weight relative to age (very rough approx)
    const weightClass = isMale ? getRandomItem(WEIGHTS_MALE) : getRandomItem(WEIGHTS_FEMALE);
    
    // Belt logic: Younger kids usually lower belts
    let belt = getRandomItem(BELTS);
    if (birthYear > 2016) belt = Math.random() > 0.5 ? Belt.WHITE : Belt.YELLOW; // Under 9s
    if (birthYear < 2005) belt = Belt.BLACK_1DAN; // Adults likely Black Belts

    athletes.push({
      id: `gen_${startIndex + i}`,
      name: `${firstName} ${lastName}`,
      dob: `${birthYear}-${month}-${day}`,
      gender: isMale ? 'Male' : 'Female',
      belt: belt,
      clubId: clubId,
      clubName: clubName,
      wtfId: `JOR-${10000 + startIndex + i}`,
      points: belt === Belt.WHITE ? 0 : Math.floor(Math.random() * 200),
      squad: null, // Generated athletes aren't in squad by default
      weightClass: weightClass,
      results: []
    });
  }
  return athletes;
};

// --- Main Generation Loop ---
let GENERATED_ATHLETES: Athlete[] = [...HERO_ATHLETES];
let globalIndex = 100;

// Loop through ALL clubs in the registry and populate them
MOCK_CLUBS.forEach(club => {
  // Check if club already has a Hero athlete (to avoid overwriting key figures)
  const hasHero = HERO_ATHLETES.some(a => a.clubId === club.id);
  
  // Even if they have a hero, add more to hit the "5 min" requirement
  const newAthletes = generateAthletesForClub(club.id, club.name, globalIndex);
  GENERATED_ATHLETES = [...GENERATED_ATHLETES, ...newAthletes];
  globalIndex += newAthletes.length;
});

export const MOCK_ATHLETES = GENERATED_ATHLETES;
