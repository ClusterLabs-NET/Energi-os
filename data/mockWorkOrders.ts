
import { WorkOrder } from '../types';

export const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'WO-1042',
    title: 'High Pressure Calibration',
    assetId: 'ST-001',
    assetName: 'Main Compression Station - Amman',
    priority: 'EMERGENCY',
    status: 'IN_PROGRESS',
    assignedTo: 'Ahmed S.',
    createdAt: '2025-05-10T08:00:00Z',
    slaDeadline: '2025-05-10T12:00:00Z',
    type: 'EMERGENCY',
    description: 'System triggered alarm for pressure differential exceeding 15%. Urgent calibration required.'
  },
  {
    id: 'WO-1045',
    title: 'Bi-Annual PRMS Inspection',
    assetId: 'PRMS-001',
    assetName: 'North PRMS Hub',
    priority: 'HIGH',
    status: 'OPEN',
    assignedTo: 'Sarah L.',
    createdAt: '2025-05-09T14:30:00Z',
    slaDeadline: '2025-05-11T14:30:00Z',
    type: 'INSPECTION',
    description: 'Standard regulatory inspection of valve seals and flow totalizers.'
  },
  {
    id: 'WO-1048',
    title: 'Sensor Replacement T12',
    assetId: 'TRK-012',
    assetName: 'Fleet Truck - T12',
    priority: 'MEDIUM',
    status: 'OPEN',
    assignedTo: 'Unassigned',
    createdAt: '2025-05-10T11:20:00Z',
    slaDeadline: '2025-05-12T11:20:00Z',
    type: 'REPAIR',
    description: 'Telemetry unit reporting intermittent GPS failure. Requires new external antenna module.'
  },
  {
    id: 'WO-1030',
    title: 'Customer Site A Site Survey',
    assetId: 'SITE-A',
    assetName: 'Industrial Customer A',
    priority: 'LOW',
    status: 'RESOLVED',
    assignedTo: 'John D.',
    createdAt: '2025-05-01T10:00:00Z',
    slaDeadline: '2025-05-05T10:00:00Z',
    type: 'MAINTENANCE',
    description: 'Routine site check to verify meter readability for end-of-month billing.'
  }
];
