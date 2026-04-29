
import { Transaction, EquipmentAsset as Asset } from '../types';

// --- Transactions ---
export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tr_1', description: 'Club Licensing Fees - Amman Tigers', amount: 500, date: '2025-02-28', category: 'Membership Fees', status: 'Completed', reference: 'INV-2025-001' },
  { id: 'tr_2', description: 'Tournament Venue Deposit', amount: -1500, date: '2025-02-25', category: 'Tournament Fees', status: 'Completed', reference: 'EXP-2025-089' },
  { id: 'tr_3', description: 'Sponsorship - Zain Jordan', amount: 5000, date: '2025-02-20', category: 'Sponsorship', status: 'Completed', reference: 'INC-2025-044' },
  { id: 'tr_4', description: 'Staff Salaries (Feb)', amount: -3200, date: '2025-02-28', category: 'Salaries', status: 'Pending', reference: 'PAY-2025-02' },
  { id: 'tr_5', description: 'New Electronic Body Protectors', amount: -8000, date: '2025-01-15', category: 'Equipment', status: 'Completed', reference: 'AST-2025-01' },
  { id: 'tr_6', description: 'Club Licensing Fees - Irbid Warriors', amount: 500, date: '2025-01-10', category: 'Membership Fees', status: 'Completed', reference: 'INV-2025-002' },
  { id: 'tr_7', description: 'Government Grant Q1', amount: 15000, date: '2025-01-05', category: 'Sponsorship', status: 'Completed', reference: 'GOV-2025-01' },
  { id: 'tr_8', description: 'Staff Salaries (Jan)', amount: -3200, date: '2025-01-31', category: 'Salaries', status: 'Completed', reference: 'PAY-2025-01' },
  { id: 'tr_9', description: 'Office Rent Q1', amount: -2500, date: '2025-01-02', category: 'Licensing', status: 'Completed', reference: 'RENT-2025-01' },
  { id: 'tr_10', description: 'National Team Flight Tickets', amount: -4500, date: '2024-12-15', category: 'Tournament Fees', status: 'Completed', reference: 'TRV-2024-12' },
  { id: 'tr_11', description: 'Annual Gala Dinner', amount: -1200, date: '2024-12-20', category: 'Licensing', status: 'Completed', reference: 'EVT-2024-12' },
];

// --- Assets ---
export const MOCK_ASSETS: Asset[] = [
  { id: 'ast_1', name: 'Daedo Gen2 PSS Set (Body + Head)', category: 'PSS (Electronic)', serialNumber: 'DD-2024-001', purchaseDate: '2024-01-15', condition: 'Good', location: 'Main Warehouse', value: 2500, assignedTo: 'National Team' },
  { id: 'ast_2', name: 'Daedo Gen2 PSS Set (Body + Head)', category: 'PSS (Electronic)', serialNumber: 'DD-2024-002', purchaseDate: '2024-01-15', condition: 'Good', location: 'Main Warehouse', value: 2500, assignedTo: 'National Team' },
  { id: 'ast_3', name: 'Competition Mats (Octagonal)', category: 'Mats', serialNumber: 'MT-2023-500', purchaseDate: '2023-05-20', condition: 'Fair', location: 'Prince Hamzah Hall', value: 8000 },
  { id: 'ast_4', name: 'Referee IVR System', category: 'IT Equipment', serialNumber: 'IVR-2024-01', purchaseDate: '2024-06-10', condition: 'New', location: 'Tech Room', value: 4500 },
  { id: 'ast_5', name: 'Training Paddles (Box of 50)', category: 'Training Gear', serialNumber: 'TP-2025-01', purchaseDate: '2025-01-05', condition: 'New', location: 'Training Center', value: 800 },
  { id: 'ast_6', name: 'Office Laptops (Dell XPS)', category: 'IT Equipment', serialNumber: 'DL-5520-X', purchaseDate: '2023-01-10', condition: 'Good', location: 'HQ Offices', value: 3000, assignedTo: 'Admin Staff' },
  { id: 'ast_7', name: 'Conference Table', category: 'Furniture', serialNumber: 'FR-2022-88', purchaseDate: '2022-03-15', condition: 'Good', location: 'Meeting Room', value: 1200 },
];