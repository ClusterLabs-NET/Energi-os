export enum UserRole {
  OPS = 'OPERATIONS',
  ENGINEERING = 'ENGINEERING',
  MANAGEMENT = 'MANAGEMENT',
  FINANCE = 'FINANCE'
}

export type AssetType = 'MOTHER_STATION' | 'PRMS' | 'CGM' | 'TRUCK' | 'CUSTOMER_SITE' | 'COMPRESSOR' | 'DISPENSER' | 'STATION';
export type AssetStatus = 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'OFFLINE' | 'ON' | 'OFF' | 'FILLING' | 'DECANTING' | 'IN_TRANSIT';

export interface Telemetry {
  pressure: number;
  flow: number;
  temperature: number;
  totalizer: number;
  timestamp: string;
  inletPressure?: number;
  outletPressure?: number;
  outletTemperature?: number;
  firstStagePressure?: number;
  fuelGasPressure?: number;
  firstStageTemperature?: number;
  activeBoiler?: string;
  activeLine?: string;
  dailyConsumption?: number;
  monthlyConsumption?: number;
  dewPoint?: number;
}

export interface MaintenanceRecord {
  date: string;
  type: string;
  description: string;
  technician: string;
}

export interface TripLogEntry {
  id: string;
  date: string;
  route: string;
  volumeDecanted: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'FAILED';
  duration: string;
}

export interface TruckAsset {
  id: string;
  plateNumber: string;
  model: string;
  year: number;
  status: AssetStatus;
  currentLocation: string;
  driver: {
    name: string;
    id: string;
    phone: string;
    rating: number;
    hoursLogged: number;
  };
  mechanical: {
    engineHealth: number;
    mileageToday: number;
    totalMileage: number;
    fuelLevel: number;
    tirePressure: 'Optimal' | 'Low' | 'Check';
  };
  gasSpecs: {
    maxCapacity: number;
    currentLoad: number;
    pressure: number;
    temperature: number;
    totalFills: number;
  };
  maintenance: {
    lastService: string;
    nextService: string;
    history: MaintenanceRecord[];
  };
  trips?: TripLogEntry[];
}

export interface GasAsset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  parentId?: string;
  telemetry: Telemetry;
  location: { lat: number; lng: number };
  serialNumber?: string;
  color?: string;
  lastMaintenance?: string;
  runningHours?: number;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  location: string;
  coordinates: string;
  zone: string;
  commissioningDate: string;
  gatePass: 'Yes' | 'No';
  cgmType: string;
  deployedCGMs: number;
  totalDeployedCapacity: number;
  contractedQty: number;
  mgoQty: number;
  currentRate: number;
  status: 'ONLINE' | 'OFFLINE';
  prmsStatus: 'ON' | 'OFF';
  telemetry: Telemetry;
  utilization: {
    generalRate: number;
    operationalRate: number;
    changeoversPerDay: number;
    avgChangeoverStartPressure: number;
    avgChangeoverEndPressure: number;
    avgChangeoverDuration: string;
    totalFillingTrips: number;
    totalFilledQty: number;
    totalDecantedQty: number;
    decantingDiff: number;
    decantingDiffPercent: number;
    gasMeterAccuracy: number;
  };
  consumption: {
    daily: number;
    avgDaily: number;
    peakDaily: number;
    monthly: number;
    avgMonthly: number;
    peakMonthly: number;
    ytd: number;
    total: number;
  };
  prsDetails: {
    model: string;
    serialNo: string;
    designFlowRate: number;
    currentFlowRate: number;
    avgFlowRate30Days: number;
    maxFlowRate30Days: number;
    flowExceedanceCount: number;
  };
  financials: {
    totalInvoiced: number;
    pendingAmount: number;
    unbilledConsumption: number;
    lastPaymentDate?: string;
  };
}

export interface WorkOrder {
  id: string;
  title: string;
  assetId: string;
  assetName: string;
  priority: 'EMERGENCY' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  assignedTo: string;
  createdAt: string;
  slaDeadline: string;
  type: 'EMERGENCY' | 'INSPECTION' | 'REPAIR' | 'MAINTENANCE';
  description: string;
}

export interface Invoice {
  id: string;
  customerName: string;
  consumption: number;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  date?: string;
}

// --- Taekwondo Federation Types (Added to fix missing exported member errors) ---

// Fix: Added Role enum for mockUsers.ts
export enum Role { 
  ADMIN = 'ADMIN', 
  CLUB_OWNER = 'CLUB_OWNER' 
}

// Fix: Added User interface for mockUsers.ts
export interface User { 
  id: string; 
  name: string; 
  email: string; 
  role: Role; 
  clubId?: string; 
}

// Fix: Added Referee interface for views/RefereesView.tsx and mock data
export interface Referee { 
  id: string; 
  name: string; 
  rank: string; 
  status: string; 
  licenseExpiry: string; 
  eventsOfficiated: number;
  email?: string;
  phone?: string;
  history?: { date: string; eventName: string; role: string }[];
}

// Fix: Added Staff interface for views/HRView.tsx and mock data
export interface Staff {
  id: string; 
  name: string; 
  position: string; 
  department: string; 
  email: string; 
  phone: string; 
  status: string;
  joinDate: string; 
  salary: number; 
  employmentType: string; 
  attendanceRate: number; 
  performanceRating: number;
  schedule: string; 
  activeTasks: number; 
  projectsAssigned: number;
}

// Fix: Added TeamMember interface for project tracking
export interface TeamMember { 
  id: string; 
  name: string; 
  role: string; 
}

// Fix: Added Club interface for views/ClubsView.tsx and mock data
export interface Club {
  id: string;
  name: string;
  ownerId: string;
  city: string;
  licenseNumber: string;
  activeAthletes: number;
  status: string;
  renewalDate: string;
  coordinates?: { lat: number; lng: number };
  headCoach: string;
  email: string;
  phone: string;
}

// Fix: Added Belt enum for mockAthletes.ts
export enum Belt {
  WHITE = 'White',
  YELLOW = 'Yellow',
  GREEN = 'Green',
  BLUE = 'Blue',
  RED = 'Red',
  BLACK_1DAN = 'Black (1st Dan)',
  BLACK_2DAN = 'Black (2nd Dan)',
  BLACK_3DAN = 'Black (3rd Dan)',
}

// Fix: Added AthleteResult interface
export interface AthleteResult {
  id: string;
  tournamentName: string;
  date: string;
  medal: 'Gold' | 'Silver' | 'Bronze' | 'None';
  category: string;
}

// Fix: Added Athlete interface for directory and squad views
export interface Athlete {
  id: string;
  name: string;
  dob: string;
  gender: 'Male' | 'Female';
  belt: Belt;
  clubId: string;
  clubName: string;
  wtfId: string;
  points: number;
  squad: 'Senior' | 'Junior' | 'Cadet' | null;
  weightClass: string;
  results: AthleteResult[];
}

// Fix: Added EventType and FederationEvent for views/EventsView.tsx
export type EventType = 'Tournament' | 'Promotion Test' | 'Workshop' | 'Selection';

export interface FederationEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  type: EventType;
  status: string;
  participants: number;
  organizer: string;
  capacity?: number;
  fee?: number;
  supervisors?: string[];
  registeredCount?: number;
  description: string;
}

// Fix: Added Transaction interface for finance views
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: string;
  reference: string;
}

// Fix: Added EquipmentAsset interface for inventory tracking
export interface EquipmentAsset {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  purchaseDate: string;
  condition: string;
  location: string;
  value: number;
  assignedTo?: string;
}

// Fix: Added RequestStatus and ServiceRequest for operations tracking
export enum RequestStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface ServiceRequest {
  id: string;
  type: string;
  requesterName: string;
  clubName: string;
  date: string;
  status: RequestStatus;
  priority: 'Urgent' | 'Normal';
  description: string;
}

// Fix: Added Project and Task interfaces for views/ProjectsView.tsx
export interface ProjectAutomationRule {
  id: string;
  trigger: string;
  action: string;
  status: string;
  iconType: 'Mail' | 'Document' | 'Finance' | 'Notification' | 'Default';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  progress: number;
  leader: string;
  team: TeamMember[];
  automationRules?: ProjectAutomationRule[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  assignee: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

// Fix: Added Achievement and roster types for views/AchievementsView.tsx
export interface AchievementRoster {
  name: string;
  role: string;
  category?: string;
  result?: string;
}

export interface Achievement {
  id: string;
  year: number;
  tournamentName: string;
  location?: string;
  date?: string;
  gold: number;
  silver: number;
  bronze: number;
  rank: number;
  isArchive?: boolean;
  delegationStats?: {
    totalAthletes: number;
    totalStaff: number;
    totalMedics: number;
  };
  roster?: AchievementRoster[];
}

// Fix: Added communication types for views/CommunicationsView.tsx
export type RecipientGroup = 'All Members' | 'Club Owners' | 'National Squads' | 'Referees' | 'Coaches' | 'Federation Staff' | 'Committee Chairs' | 'Committee Members';
export type CommunicationChannel = 'Portal Notification' | 'Email' | 'SMS / WhatsApp';

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  sender: string;
  recipients: RecipientGroup | string;
  channels: CommunicationChannel[];
  status: string;
}

// Fix: Added committee types for views/CommitteesView.tsx
export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface CommitteeMeeting {
  id: string;
  date: string;
  title: string;
  summary: string;
  status: 'Completed' | 'Scheduled';
  documentUrl?: string;
}

export interface Committee {
  id: string;
  name: string;
  description: string;
  members: CommitteeMember[];
  meetings: CommitteeMeeting[];
  nextMeeting?: string;
}

// Fix: Added FederationDocument interface for views/DocumentsView.tsx
export interface FederationDocument {
  id: string;
  title: string;
  category: string;
  uploadDate: string;
  size: string;
  type: string;
  author: string;
}