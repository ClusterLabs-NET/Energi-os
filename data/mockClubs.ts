
import { Club } from '../types';

// Helper to generate coordinates with jitter around a city center
const getCoords = (lat: number, lng: number) => ({
  lat: lat + (Math.random() - 0.5) * 0.05,
  lng: lng + (Math.random() - 0.5) * 0.05
});

const AMMAN_CENTRAL = { lat: 31.9539, lng: 35.9106 };
const AMMAN_NORTH = { lat: 32.02, lng: 35.89 };
const AMMAN_SOUTH = { lat: 31.85, lng: 35.85 };
const AMMAN_EAST = { lat: 31.94, lng: 35.99 };
const AMMAN_WEST = { lat: 31.96, lng: 35.87 };
const IRBID = { lat: 32.5568, lng: 35.8469 };
const ZARQA = { lat: 32.0643, lng: 36.0942 };
const BALQA = { lat: 32.0392, lng: 35.7272 };
const MAFRAQ = { lat: 32.34, lng: 36.20 };
const AQABA = { lat: 29.5319, lng: 35.0061 };
const MADABA = { lat: 31.71, lng: 35.79 };
const JERASH = { lat: 32.27, lng: 35.89 };
const AJLOUN = { lat: 32.33, lng: 35.75 };

const rawClubs = [
  // Central Amman
  { name: "Golden Star Taekwondo Center", region: AMMAN_CENTRAL },
  { name: "Sahwat Al-Jawad Taekwondo Center", region: AMMAN_CENTRAL },
  { name: "Al-Istiqlal Taekwondo Center", region: AMMAN_CENTRAL },
  { name: "Al-Sadiq Taekwondo Academy", region: AMMAN_CENTRAL },
  { name: "Stars Center", region: AMMAN_CENTRAL },
  { name: "Great Morals Taekwondo Center", region: AMMAN_CENTRAL },
  { name: "Side Kick Club", region: AMMAN_CENTRAL },
  { name: "Jordan Tigers", region: AMMAN_CENTRAL },
  { name: "Jerusalem Gate Center", region: AMMAN_CENTRAL },
  { name: "Al-Hussein Youth City", region: AMMAN_CENTRAL },
  { name: "Capital Champions Center", region: AMMAN_CENTRAL },
  { name: "Professionals Academy", region: AMMAN_CENTRAL },
  { name: "Lions Taekwondo Center", region: AMMAN_CENTRAL },
  { name: "Jawa Black Lions Center", region: AMMAN_CENTRAL },
  { name: "Al-Hashmi Black Lions", region: AMMAN_CENTRAL },
  { name: "Asia Center", region: AMMAN_CENTRAL },
  { name: "Sons of Jordan International", region: AMMAN_CENTRAL },
  { name: "Al-Abadi International", region: AMMAN_CENTRAL },
  { name: "Al-Nahda Center", region: AMMAN_CENTRAL },
  { name: "Asian Taekwondo Center", region: AMMAN_CENTRAL },
  
  // North Amman
  { name: "International Stars Academy", region: AMMAN_NORTH },
  { name: "Golden Noble Fighter", region: AMMAN_NORTH },
  { name: "World Stars", region: AMMAN_NORTH },
  { name: "Arab Homeland Champions", region: AMMAN_NORTH },
  { name: "Al-Assaf & Hamed Academy", region: AMMAN_NORTH },
  { name: "Amer Abdul Rabbo Center", region: AMMAN_NORTH },
  { name: "Challenge Mountains Academy", region: AMMAN_NORTH },
  { name: "Jordan Stars Center", region: AMMAN_NORTH },
  { name: "Little Warriors Martial Arts", region: AMMAN_NORTH },
  { name: "Shafa Badran Champions", region: AMMAN_NORTH },
  { name: "Al-Assaf Center", region: AMMAN_NORTH },
  { name: "Elite Global Fighter", region: AMMAN_NORTH },
  { name: "Al-Shujaa Academy - Shafa Badran", region: AMMAN_NORTH },
  { name: "Al-Shujaa Academy - Abu Nseir", region: AMMAN_NORTH },
  { name: "The Scream Academy", region: AMMAN_NORTH },
  { name: "Talents Center", region: AMMAN_NORTH },
  { name: "Swailih Champions", region: AMMAN_NORTH },
  { name: "The Summit Center", region: AMMAN_NORTH },
  { name: "Champions Center", region: AMMAN_NORTH },
  { name: "Al-Ghazi Center", region: AMMAN_NORTH },
  { name: "University Champions", region: AMMAN_NORTH },

  // South Amman
  { name: "Champions Stars Academy", region: AMMAN_SOUTH },
  { name: "Al-Tomouh Sports Center", region: AMMAN_SOUTH },
  { name: "Naour Center", region: AMMAN_SOUTH },
  { name: "The Power Taekwondo", region: AMMAN_SOUTH },
  { name: "Professional Champions", region: AMMAN_SOUTH },

  // East Amman
  { name: "Al-Jihad Center", region: AMMAN_EAST },
  { name: "Rabah Academy", region: AMMAN_EAST },
  { name: "Al-Aamer Center", region: AMMAN_EAST },
  { name: "Dahiat Al-Hajj Hassan", region: AMMAN_EAST },
  { name: "Arab Cubs Center", region: AMMAN_EAST },
  { name: "Al-Haybah Center", region: AMMAN_EAST },
  { name: "Korean Strike Center", region: AMMAN_EAST },
  { name: "Sports World Center", region: AMMAN_EAST },
  { name: "Osayd & Maher", region: AMMAN_EAST },
  { name: "Saqr Al-Arab Academy", region: AMMAN_EAST },
  { name: "Falcons Academy", region: AMMAN_EAST },
  { name: "Al-Wisam International - Nuzha", region: AMMAN_EAST },
  { name: "Al-Hashmi Center", region: AMMAN_EAST },
  { name: "Marka Black Lions", region: AMMAN_EAST },
  { name: "Mohammad Abu Zaid Center", region: AMMAN_EAST },
  { name: "Al-Shahm Academy", region: AMMAN_EAST },
  { name: "Areen Sahab Center", region: AMMAN_EAST },
  { name: "Palestine Sports Center", region: AMMAN_EAST },

  // West Amman
  { name: "Acadia Academy", region: AMMAN_WEST },
  { name: "Elite Center", region: AMMAN_WEST },
  { name: "Khalil Aqil Center", region: AMMAN_WEST },
  { name: "Golden Academy", region: AMMAN_WEST },
  { name: "Kingdom Pioneers Center", region: AMMAN_WEST },
  { name: "Waleed Al-Hurr (Seoul)", region: AMMAN_WEST },
  { name: "Threads of Dawn", region: AMMAN_WEST },
  { name: "Dabouq Center", region: AMMAN_WEST },
  { name: "Elite Center - Al-Salam", region: AMMAN_WEST },
  { name: "Khalda Center", region: AMMAN_WEST },
  { name: "Mostafa Kamal Center", region: AMMAN_WEST },
  { name: "JO DOJO", region: AMMAN_WEST },
  { name: "Fadi Mostafa Al-Shamleti", region: AMMAN_WEST },
  { name: "Seoul Mountains", region: AMMAN_WEST },
  { name: "Achievement Center", region: AMMAN_WEST },
  { name: "Tayseer Abu Labda Center", region: AMMAN_WEST },
  { name: "Alia Center", region: AMMAN_WEST },
  { name: "Olympiad Center", region: AMMAN_WEST },
  { name: "Mohammad Abu Labda Academy", region: AMMAN_WEST },
  { name: "Abdoun Warriors", region: AMMAN_WEST },

  // Irbid
  { name: "Kiwan Center - Irbid", region: IRBID },
  { name: "Hourani Training Center", region: IRBID },
  { name: "Al-Nuaimat Center", region: IRBID },
  { name: "Rising Stars International", region: IRBID },
  { name: "Malka Center", region: IRBID },
  { name: "Al-Buhairi Academy", region: IRBID },
  { name: "Al-Subeihi Center", region: IRBID },
  { name: "Lion Cubs", region: IRBID },
  { name: "The Noble Fighter", region: IRBID },
  { name: "Al-Zubaidi Academy", region: IRBID },
  { name: "Black Tiger Center", region: IRBID },
  { name: "Al-Basht Center", region: IRBID },
  { name: "Al-Shalloul 1", region: IRBID },
  { name: "Al-Aws Center", region: IRBID },
  { name: "Black Eagle 1", region: IRBID },
  { name: "Black Eagle 2", region: IRBID },
  { name: "Ramtha Center", region: IRBID },
  { name: "Knights of the North", region: IRBID },
  { name: "Falcon Center", region: IRBID },
  { name: "Al-Shalloul 2", region: IRBID },
  { name: "Northern Cubs 1", region: IRBID },
  { name: "Northern Cubs 2", region: IRBID },

  // Zarqa
  { name: "Birin Stars", region: ZARQA },
  { name: "Al-Ahed Academy", region: ZARQA },
  { name: "Thunder Training Center", region: ZARQA },
  { name: "Lightning", region: ZARQA },
  { name: "Amjad Jordan Center", region: ZARQA },
  { name: "Al-Hussam Center", region: ZARQA },
  { name: "The Goal", region: ZARQA },
  { name: "Asfour Center", region: ZARQA },
  { name: "Ayham Asfour", region: ZARQA },
  { name: "Salama Al-Zawahreh / Tornado", region: ZARQA },
  { name: "Al-Laith Center", region: ZARQA },
  { name: "Thunderbolt Center", region: ZARQA },
  { name: "Al-Sharq Center", region: ZARQA },
  { name: "Ziad Al-Faqih Center", region: ZARQA },
  { name: "Champions of Al-Azraq", region: ZARQA },
  { name: "Union Boys Center", region: ZARQA },
  { name: "Union Center 2", region: ZARQA },

  // Balqa
  { name: "Salt Champions Center", region: BALQA },
  { name: "Ain Al-Basha Stars", region: BALQA },
  { name: "Horse Cubs Center", region: BALQA },
  { name: "Mahis Center", region: BALQA },
  { name: "Salt Black Lions", region: BALQA },
  { name: "Fuheis Center", region: BALQA },
  { name: "Al-Awda Center", region: BALQA },

  // Mafraq
  { name: "Mafraq Eagles Center", region: MAFRAQ },
  { name: "Rihab Falcons Center", region: MAFRAQ },
  { name: "Mafraq Thunder Center", region: MAFRAQ },
  { name: "Desert Stars Center", region: MAFRAQ },
  { name: "Badia Knights Academy", region: MAFRAQ },

  // Others
  { name: "Madaba Center", region: MADABA },
  { name: "Golden Skill Academy", region: MADABA },
  { name: "Mohammad Abu Sbeitan", region: MADABA },
  { name: "Ayla Champions Academy", region: AQABA },
  { name: "Jerash Falcons", region: JERASH },
  { name: "Ajloun Academy", region: AJLOUN }
];

export const MOCK_CLUBS: Club[] = rawClubs.map((c, i) => ({
  id: `club_${i + 1}`,
  name: c.name,
  ownerId: `owner_${i + 1}`,
  city: 'Jordan',
  licenseNumber: `JTF-${100 + i}`,
  activeAthletes: Math.floor(Math.random() * 150) + 20,
  status: Math.random() > 0.8 ? 'Pending Renewal' : 'Active',
  renewalDate: '2025-12-31',
  coordinates: getCoords(c.region.lat, c.region.lng),
  headCoach: 'Head Coach',
  email: `info@${c.name.toLowerCase().replace(/\s/g, '').replace(/[^\w]/g, '')}.com`,
  phone: '+962 7 9000 0000'
}));
