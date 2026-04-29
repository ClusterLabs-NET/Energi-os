
export const REVENUE_TREND = [
  { month: 'Jan', revenue: 1100000, target: 1000000 },
  { month: 'Feb', revenue: 1250000, target: 1000000 },
  { month: 'Mar', revenue: 980000, target: 1100000 },
  { month: 'Apr', revenue: 1400000, target: 1100000 },
  { month: 'May', revenue: 1550000, target: 1200000 },
];

export const REGIONAL_CONSUMPTION = [
  { region: 'Amman North', consumption: 45000, revenue: 675000, leakage: 1200 },
  { region: 'Zarqa Industrial', consumption: 82000, revenue: 1230000, leakage: 5400 },
  { region: 'Aqaba Logistics', consumption: 31000, revenue: 465000, leakage: 800 },
  { region: 'Irbid Residential', consumption: 22000, revenue: 330000, leakage: 2100 },
];

export const BILLING_STATUS = [
  { id: 'INV-9901', client: 'Industrial A', amount: 45000, status: 'PAID', dueDate: '2025-05-01' },
  { id: 'INV-9902', client: 'Hospitality B', amount: 12000, status: 'PENDING', dueDate: '2025-05-15' },
  { id: 'INV-9903', client: 'Zarqa Plant', amount: 88000, status: 'OVERDUE', dueDate: '2025-04-20' },
  { id: 'INV-9904', client: 'North Hub', amount: 34000, status: 'PAID', dueDate: '2025-05-05' },
];

export const REVENUE_LEAKAGE_ALERTS = [
  { id: 'LK-01', asset: 'Station 04', estimatedLoss: 4200, confidence: 'HIGH', reason: 'Meter Discrepancy' },
  { id: 'LK-02', asset: 'Truck T12', estimatedLoss: 1150, confidence: 'MEDIUM', reason: 'Unaccounted Volume' },
];
