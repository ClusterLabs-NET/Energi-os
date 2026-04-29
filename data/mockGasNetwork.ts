
import { Customer, GasAsset, Invoice, AssetStatus } from '../types';

export const MOCK_STATIONS: GasAsset[] = [
  {
    id: 'ST-KEZAD',
    name: 'KEZAD Mother Station',
    type: 'STATION',
    status: 'HEALTHY' as AssetStatus,
    location: { lat: 24.5050, lng: 54.3970 },
    telemetry: { 
      flow: 6373, 
      totalizer: 948835,
      dailyConsumption: 54815,
      pressure: 7.0,
      temperature: 36.0,
      inletPressure: 7.00,
      timestamp: '2025-09-11T20:07:00Z',
      dewPoint: 0.00,
    }
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-EO',
    code: 'EDIL',
    name: 'Edible Oil',
    location: 'Al Ain, Abu Dhabi',
    coordinates: '24.21189, 55.42545',
    zone: 'Zone 1',
    commissioningDate: '09-Nov-2017',
    gatePass: 'No',
    cgmType: '20 Ft.',
    deployedCGMs: 1.5,
    totalDeployedCapacity: 5850,
    contractedQty: 20155,
    mgoQty: 16124,
    currentRate: 11.5,
    status: 'ONLINE',
    prmsStatus: 'OFF',
    telemetry: {
      flow: 290.57,
      totalizer: 1559337,
      inletPressure: 112.95,
      outletPressure: 3.67,
      outletTemperature: 16.07,
      firstStagePressure: 58.59,
      fuelGasPressure: 24.59,
      firstStageTemperature: 18.35,
      activeBoiler: 'Boiler 1',
      activeLine: 'Line A',
      temperature: 22,
      dailyConsumption: 0,
      monthlyConsumption: 3231,
      timestamp: '2025-05-12T14:00:00Z',
      pressure: 104.50
    },
    utilization: {
      generalRate: 26.33,
      operationalRate: 29.00,
      changeoversPerDay: 0.41,
      avgChangeoverStartPressure: 192,
      avgChangeoverEndPressure: 46,
      avgChangeoverDuration: '67 Hrs 22 Mins',
      totalFillingTrips: 88,
      totalFilledQty: 318033,
      totalDecantedQty: 311484,
      decantingDiff: 6549,
      decantingDiffPercent: 2.06,
      gasMeterAccuracy: 97.94
    },
    consumption: {
      daily: 0,
      avgDaily: 1203,
      peakDaily: 4787,
      monthly: 3231,
      avgMonthly: 36254,
      peakMonthly: 84082,
      ytd: 319195,
      total: 3444121
    },
    prsDetails: {
      model: 'CEC-500',
      serialNo: 'CEC-500',
      designFlowRate: 500,
      currentFlowRate: 0,
      avgFlowRate30Days: 6,
      maxFlowRate30Days: 211,
      flowExceedanceCount: 0
    },
    financials: {
      totalInvoiced: 3444121,
      pendingAmount: 12500,
      unbilledConsumption: 1450,
      lastPaymentDate: '12-Apr-2025'
    }
  },
  {
    id: 'CUST-AF',
    code: 'ALFO',
    name: 'Al Foah',
    location: 'Al Ain, Abu Dhabi',
    coordinates: '24.21189, 55.42545',
    zone: 'Zone 1',
    commissioningDate: '09-Nov-2017',
    gatePass: 'No',
    cgmType: '20 Ft.',
    deployedCGMs: 1.5,
    totalDeployedCapacity: 5850,
    contractedQty: 20155,
    mgoQty: 16124,
    currentRate: 11.5,
    status: 'ONLINE',
    prmsStatus: 'OFF',
    telemetry: {
      flow: 290.57,
      totalizer: 1559337,
      inletPressure: 112.95,
      outletPressure: 3.67,
      outletTemperature: 16.07,
      firstStagePressure: 58.59,
      fuelGasPressure: 24.59,
      firstStageTemperature: 18.35,
      activeBoiler: 'Boiler 1',
      activeLine: 'Line A',
      temperature: 18.35,
      dailyConsumption: 0,
      monthlyConsumption: 3231,
      timestamp: '2025-05-12T14:00:00Z',
      pressure: 112.95
    },
    utilization: {
      generalRate: 26.33,
      operationalRate: 29.00,
      changeoversPerDay: 0.41,
      avgChangeoverStartPressure: 192,
      avgChangeoverEndPressure: 46,
      avgChangeoverDuration: '67 Hrs 22 Mins',
      totalFillingTrips: 88,
      totalFilledQty: 318033,
      totalDecantedQty: 311484,
      decantingDiff: 6549,
      decantingDiffPercent: 2.06,
      gasMeterAccuracy: 97.94
    },
    consumption: {
      daily: 0,
      avgDaily: 1203,
      peakDaily: 4787,
      monthly: 3231,
      avgMonthly: 36254,
      peakMonthly: 84082,
      ytd: 319195,
      total: 3444121
    },
    prsDetails: {
      model: 'CEC-500',
      serialNo: 'CEC-500',
      designFlowRate: 500,
      currentFlowRate: 0,
      avgFlowRate30Days: 6,
      maxFlowRate30Days: 211,
      flowExceedanceCount: 0
    },
    financials: {
      totalInvoiced: 3444121,
      pendingAmount: 0,
      unbilledConsumption: 1200,
      lastPaymentDate: '10-May-2025'
    }
  }
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-001', customerName: 'Edible Oil', consumption: 11570, amount: 133055, status: 'PAID' },
  { id: 'INV-002', customerName: 'ERCO', consumption: 9574, amount: 97654, status: 'PENDING' },
  { id: 'INV-003', customerName: 'NFPC', consumption: 6704, amount: 65700, status: 'OVERDUE' },
];

export const MOCK_COMPRESSORS: GasAsset[] = [
  { id: 'C1', name: 'Compressor 1', type: 'COMPRESSOR', status: 'OFF' as AssetStatus, runningHours: 9018, location: { lat: 0, lng: 0 }, telemetry: { pressure: 0, flow: 0, temperature: 0, totalizer: 0, timestamp: '' } },
  { id: 'C2', name: 'Compressor 2', type: 'COMPRESSOR', status: 'OFF' as AssetStatus, runningHours: 8252, location: { lat: 0, lng: 0 }, telemetry: { pressure: 0, flow: 0, temperature: 0, totalizer: 0, timestamp: '' } },
  { id: 'C3', name: 'Compressor 3', type: 'COMPRESSOR', status: 'OFF' as AssetStatus, runningHours: 10161, location: { lat: 0, lng: 0 }, telemetry: { pressure: 0, flow: 0, temperature: 0, totalizer: 0, timestamp: '' } },
  { id: 'C4', name: 'Compressor 4', type: 'COMPRESSOR', status: 'ON' as AssetStatus, runningHours: 4851, location: { lat: 0, lng: 0 }, telemetry: { pressure: 0, flow: 0, temperature: 0, totalizer: 0, timestamp: '' } },
  { id: 'C5', name: 'Compressor 5', type: 'COMPRESSOR', status: 'ON' as AssetStatus, runningHours: 5315, location: { lat: 0, lng: 0 }, telemetry: { pressure: 0, flow: 0, temperature: 0, totalizer: 0, timestamp: '' } },
];

export const MOCK_DISPENSERS: GasAsset[] = [
  { id: 'D1', name: 'Dispenser 1', type: 'DISPENSER', status: 'OFF' as AssetStatus, location: { lat: 0, lng: 0 }, telemetry: { flow: 0, pressure: 0.00, temperature: 28.06, totalizer: 25808798, dailyConsumption: 4100, timestamp: '' } },
  { id: 'D2', name: 'Dispenser 2', type: 'DISPENSER', status: 'ON' as AssetStatus, location: { lat: 0, lng: 0 }, telemetry: { flow: 2440, pressure: 93.00, temperature: 25.59, totalizer: 23832813, dailyConsumption: 503, timestamp: '' } },
];

export const MOCK_HEAT_EXCHANGERS = [
  { id: 'HE1', name: 'Heat Exchanger 1', inlet: 34.00, outlet: 30.00 },
  { id: 'HE2', name: 'Heat Exchanger 2', inlet: 0.00, outlet: 31.00 },
];
