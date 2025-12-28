
export enum UserRole {
  PATIENT = 'PATIENT',
  ADMIN = 'ADMIN',
  COLLECTOR = 'COLLECTOR',
  LAB_TECH = 'LAB_TECH',
  DOCTOR = 'DOCTOR'
}

export enum BookingStatus {
  BOOKED = 'BOOKED',
  COLLECTOR_ASSIGNED = 'COLLECTOR_ASSIGNED',
  SAMPLE_COLLECTED = 'SAMPLE_COLLECTED',
  SAMPLE_RECEIVED = 'SAMPLE_RECEIVED',
  TESTING_IN_PROGRESS = 'TESTING_IN_PROGRESS',
  VERIFIED = 'VERIFIED',
  REPORT_DELIVERED = 'REPORT_DELIVERED'
}

export type CollectionType = 'HOME' | 'LAB';
export type PaymentMethod = 'UPI' | 'CARD' | 'CASH';

export interface LabResult {
  parameter: string;
  value: number;
  unit: string;
  range: string;
  isAbnormal: boolean;
}

export interface Booking {
  id: string;
  patientName: string;
  patientPhone: string;
  testName: string;
  testPrice: number;
  address: string;
  type: CollectionType;
  paymentMethod: PaymentMethod;
  paymentStatus: 'PENDING' | 'COMPLETED';
  status: BookingStatus;
  collectorName?: string;
  results?: LabResult[];
  doctorComment?: string;
  timestamp: string;
  barcode: string;
  otpVerified?: boolean;
}

export interface TestPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  parameters: string[];
  category: string;
}
