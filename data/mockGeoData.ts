
import { GasAsset, AssetStatus } from '../types';
import { MOCK_CUSTOMERS, MOCK_STATIONS } from './mockGasNetwork';

// Mapping Customers and Trucks to Geo-points for the Digital Twin
export const CLOUD_ENERGI_ASSETS: GasAsset[] = [
  // Mother Station
  ...MOCK_STATIONS.map(s => ({ 
    ...s, 
    parentId: 'UAE-NET' 
  })),
  
  // All Customer Sites
  ...MOCK_CUSTOMERS.map(c => ({
    id: c.id,
    name: c.name,
    type: 'CUSTOMER_SITE' as any,
    status: (c.status === 'ONLINE' ? 'HEALTHY' : 'OFFLINE') as AssetStatus,
    location: { 
      lat: parseFloat(c.coordinates.split(',')[0]), 
      lng: parseFloat(c.coordinates.split(',')[1]) 
    },
    telemetry: c.telemetry,
    parentId: 'UAE-NET'
  })),
  
  // Virtual Pipeline Fleet
  {
    id: 'T-102',
    name: 'Truck AD-44921',
    type: 'TRUCK',
    status: 'IN_TRANSIT' as AssetStatus,
    location: { lat: 24.6500, lng: 54.8000 },
    telemetry: { pressure: 215, flow: 0, temperature: 28, totalizer: 45200, timestamp: new Date().toISOString() },
  },
  {
    id: 'T-105',
    name: 'Truck DB-88120',
    type: 'TRUCK',
    status: 'FILLING' as AssetStatus,
    location: { lat: 24.5100, lng: 54.4000 },
    telemetry: { pressure: 245, flow: 0, temperature: 32, totalizer: 12400, timestamp: new Date().toISOString() },
  },
  {
    id: 'T-112',
    name: 'Truck AD-22901',
    type: 'TRUCK',
    status: 'CRITICAL' as AssetStatus,
    location: { lat: 24.6800, lng: 54.7500 },
    telemetry: { pressure: 255, flow: 0, temperature: 48, totalizer: 88500, timestamp: new Date().toISOString() },
  },
  {
    id: 'T-108',
    name: 'Truck JR-55001',
    type: 'TRUCK',
    status: 'HEALTHY' as AssetStatus,
    location: { lat: 24.3000, lng: 54.4500 },
    telemetry: { pressure: 10, flow: 0, temperature: 24, totalizer: 32000, timestamp: new Date().toISOString() },
  }
];

export const MAP_LAYERS = [
  { id: 'STATION', label: 'Mother Stations', active: true },
  { id: 'CUSTOMER_SITE', label: 'Industrial Sites', active: true },
  { id: 'TRUCK', label: 'Virtual Pipeline Fleet', active: true }
];
