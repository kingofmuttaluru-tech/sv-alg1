
import React from 'react';
import { TestPackage, BookingStatus } from './types';
import { 
  ClipboardList, 
  UserCheck, 
  Beaker, 
  FlaskConical, 
  CheckCircle2, 
  FileText,
  Truck
} from 'lucide-react';

export const TEST_PACKAGES: TestPackage[] = [
  // --- BIOCHEMISTRY ---
  { id: 'sugar-1', category: 'Biochemistry', name: 'FBS (Fasting Blood Sugar)', price: 60, description: 'Glucose level after 8-12 hours of fasting.', parameters: ['Glucose (Fasting)'] },
  { id: 'sugar-2', category: 'Biochemistry', name: 'PPBS (Post Prandial)', price: 100, description: 'Glucose level 2 hours after a meal.', parameters: ['Glucose (PP)'] },
  { id: 'sugar-3', category: 'Biochemistry', name: 'RBS (Random Blood Sugar)', price: 60, description: 'Glucose level at any time of the day.', parameters: ['Glucose (Random)'] },
  { id: 'sugar-4', category: 'Biochemistry', name: 'HbA1c (Glycosylated Hb)', price: 450, description: '3-month average blood sugar levels.', parameters: ['HbA1c %'] },
  
  { id: 'rft-1', category: 'Biochemistry', name: 'Renal Function Test (RFT)', price: 400, description: 'Kidney function evaluation including electrolytes.', parameters: ['Urea', 'Creatinine', 'Uric Acid', 'Sodium', 'Potassium', 'Chloride'] },
  
  { id: 'lft-1', category: 'Biochemistry', name: 'Liver Function Test (LFT)', price: 550, description: 'Comprehensive liver enzyme and protein profile.', parameters: ['Total Bilirubin', 'Direct Bilirubin', 'SGOT (AST)', 'SGPT (ALT)', 'ALP', 'Total Protein', 'Albumin'] },
  
  { id: 'lipid-1', category: 'Biochemistry', name: 'Lipid Profile', price: 450, description: 'Cholesterol and cardiovascular risk assessment.', parameters: ['Total Cholesterol', 'Triglycerides', 'HDL', 'LDL', 'VLDL'] },
  
  { id: 'thyroid-1', category: 'Biochemistry', name: 'Thyroid Profile', price: 400, description: 'Thyroid hormone level detection (T3, T4, TSH).', parameters: ['T3', 'T4', 'TSH'] },
  
  { id: 'cardiac-1', category: 'Biochemistry', name: 'Cardiac Markers', price: 1500, description: 'Critical heart enzymes for emergency assessment.', parameters: ['Troponin-I', 'CK-MB', 'LDH'] },

  { id: 'vit-1', category: 'Biochemistry', name: 'Vitamin D (25-OH)', price: 1200, description: 'Bone health and immunity marker.', parameters: ['Vitamin D'] },
  { id: 'vit-2', category: 'Biochemistry', name: 'Vitamin B12', price: 850, description: 'Nerve health and energy marker.', parameters: ['Vitamin B12'] },
  { id: 'min-1', category: 'Biochemistry', name: 'Calcium', price: 200, description: 'Bone mineral levels.', parameters: ['Calcium'] },
  { id: 'min-2', category: 'Biochemistry', name: 'Iron Profile', price: 250, description: 'Iron deficiency markers.', parameters: ['Iron'] },

  // --- MICROBIOLOGY ---
  { id: 'urine-1', category: 'Microbiology', name: 'Urine Routine & Microscopy', price: 100, description: 'Physical and chemical analysis of urine.', parameters: ['Colour', 'pH', 'Protein', 'Sugar', 'Pus Cells', 'RBC'] },
  { id: 'stool-1', category: 'Microbiology', name: 'Stool Examination', price: 150, description: 'Parasite and occult blood detection.', parameters: ['Occult Blood', 'Ova/Cyst', 'Parasites'] },
  { id: 'culture-1', category: 'Microbiology', name: 'Urine Culture', price: 600, description: 'Bacterial growth identification.', parameters: ['Urine Culture'] },
  { id: 'culture-2', category: 'Microbiology', name: 'Blood Culture', price: 1200, description: 'Detecting infection in blood.', parameters: ['Blood Culture'] },
  
  { id: 'sero-1', category: 'Microbiology', name: 'Widal Test', price: 200, description: 'Typhoid fever detection.', parameters: ['Widal-O', 'Widal-H'] },
  { id: 'sero-2', category: 'Microbiology', name: 'CRP', price: 400, description: 'Infection/Inflammation marker.', parameters: ['CRP Value'] },
  { id: 'sero-3', category: 'Microbiology', name: 'Dengue NS1 Antigen', price: 600, description: 'Early detection of Dengue virus.', parameters: ['Dengue NS1'] },
  { id: 'sero-4', category: 'Microbiology', name: 'HIV 1 & 2', price: 350, description: 'Screening for HIV infection.', parameters: ['HIV Result'] },

  // --- CLINICAL PATHOLOGY ---
  { id: 'cbp-1', category: 'Clinical Pathology', name: 'Complete Blood Picture (CBP)', price: 200, description: 'Full analysis of red cells, white cells, and platelets.', parameters: ['Hemoglobin', 'RBC', 'WBC', 'Platelets', 'Neutrophils', 'Lymphocytes', 'ESR'] },
  { id: 'coag-1', category: 'Clinical Pathology', name: 'Coagulation Profile', price: 400, description: 'Blood clotting and INR monitoring.', parameters: ['PT', 'INR', 'APTT'] },
  { id: 'semen-1', category: 'Clinical Pathology', name: 'Semen Analysis', price: 500, description: 'Fertility assessment.', parameters: ['Volume', 'Count', 'Motility', 'Morphology'] }
];

export const STATUS_FLOW = [
  { status: BookingStatus.BOOKED, label: 'Booked', icon: <ClipboardList className="w-5 h-5" /> },
  { status: BookingStatus.COLLECTOR_ASSIGNED, label: 'Assigned', icon: <UserCheck className="w-5 h-5" /> },
  { status: BookingStatus.SAMPLE_COLLECTED, label: 'Collected', icon: <Truck className="w-5 h-5" /> },
  { status: BookingStatus.SAMPLE_RECEIVED, label: 'At Lab', icon: <FlaskConical className="w-5 h-5" /> },
  { status: BookingStatus.TESTING_IN_PROGRESS, label: 'Testing', icon: <Beaker className="w-5 h-5" /> },
  { status: BookingStatus.VERIFIED, label: 'Doctor Verified', icon: <CheckCircle2 className="w-5 h-5" /> },
  { status: BookingStatus.REPORT_DELIVERED, label: 'Delivered', icon: <FileText className="w-5 h-5" /> },
];

export const MOCK_BOOKINGS_INITIAL = [
  {
    id: 'BK-7721',
    patientName: 'John Doe',
    patientPhone: '+91 9876543210',
    testName: 'Lipid Profile',
    testPrice: 450,
    address: 'Flat 101, SV Towers, Ameerpet, Hyderabad',
    type: 'HOME' as const,
    paymentMethod: 'UPI' as const,
    paymentStatus: 'COMPLETED' as const,
    status: BookingStatus.BOOKED,
    timestamp: new Date().toISOString(),
    barcode: 'SV-99120'
  }
];

export const NORMAL_RANGES: Record<string, { range: string, unit: string }> = {
  'Glucose (Fasting)': { range: '70–99', unit: 'mg/dL' },
  'Glucose (PP)': { range: '<140', unit: 'mg/dL' },
  'Glucose (Random)': { range: '70–140', unit: 'mg/dL' },
  'HbA1c %': { range: '4.0–5.6', unit: '%' },
  'Urea': { range: '15–40', unit: 'mg/dL' },
  'Creatinine': { range: '0.6–1.3', unit: 'mg/dL' },
  'Uric Acid': { range: '3.4–7.0', unit: 'mg/dL' },
  'Sodium': { range: '135–145', unit: 'mmol/L' },
  'Potassium': { range: '3.5–5.1', unit: 'mmol/L' },
  'Chloride': { range: '98–107', unit: 'mmol/L' },
  'Total Bilirubin': { range: '0.3–1.2', unit: 'mg/dL' },
  'Direct Bilirubin': { range: '0.0–0.3', unit: 'mg/dL' },
  'SGOT (AST)': { range: '<40', unit: 'U/L' },
  'SGPT (ALT)': { range: '<41', unit: 'U/L' },
  'ALP': { range: '44–147', unit: 'U/L' },
  'Total Protein': { range: '6.0–8.3', unit: 'g/dL' },
  'Albumin': { range: '3.5–5.0', unit: 'g/dL' },
  'Total Cholesterol': { range: '<200', unit: 'mg/dL' },
  'Triglycerides': { range: '<150', unit: 'mg/dL' },
  'HDL': { range: '>40', unit: 'mg/dL' },
  'LDL': { range: '<100', unit: 'mg/dL' },
  'VLDL': { range: '5–40', unit: 'mg/dL' },
  'T3': { range: '80–200', unit: 'ng/dL' },
  'T4': { range: '5.1–14.1', unit: 'µg/dL' },
  'TSH': { range: '0.4–4.0', unit: 'µIU/mL' },
  'Hemoglobin': { range: '13–17', unit: 'g/dL' },
  'RBC': { range: '4.5–5.9', unit: 'million' },
  'WBC': { range: '4000–11000', unit: '/µL' },
  'Platelets': { range: '1.5–4.5', unit: 'lakh' },
  'CRP Value': { range: '<6', unit: 'mg/L' },
  'Vitamin D': { range: '30–100', unit: 'ng/mL' },
  'Vitamin B12': { range: '200–900', unit: 'pg/mL' },
  'Troponin-I': { range: '<0.04', unit: 'ng/mL' },
  'CK-MB': { range: '<25', unit: 'U/L' },
  'LDH': { range: '140–280', unit: 'U/L' },
  'Calcium': { range: '8.5–10.5', unit: 'mg/dL' },
  'Iron': { range: '60–170', unit: 'µg/dL' },
  'Colour': { range: 'Pale Yellow', unit: '' },
  'pH': { range: '4.5–8.0', unit: '' },
  'Protein': { range: 'Negative', unit: '' },
  'Sugar': { range: 'Negative', unit: '' },
  'Pus Cells': { range: '0–5', unit: '/HPF' },
  'RBC (Urine)': { range: '0–2', unit: '/HPF' },
  'Occult Blood': { range: 'Negative', unit: '' },
  'Ova/Cyst': { range: 'Absent', unit: '' },
  'Parasites': { range: 'Absent', unit: '' },
  'Widal-O': { range: 'Negative', unit: '' },
  'Widal-H': { range: 'Negative', unit: '' },
  'HIV Result': { range: 'Non-Reactive', unit: '' },
  'Dengue NS1': { range: 'Negative', unit: '' },
  'Neutrophils': { range: '40–70', unit: '%' },
  'Lymphocytes': { range: '20–40', unit: '%' },
  'ESR': { range: 'M: <15 / F: <20', unit: 'mm/hr' },
  'PT': { range: '11–13.5', unit: 'sec' },
  'INR': { range: '0.8–1.2', unit: '' },
  'APTT': { range: '25–35', unit: 'sec' },
  'Volume': { range: '≥1.5', unit: 'mL' },
  'Count': { range: '≥15', unit: 'million/mL' },
  'Motility': { range: '≥40', unit: '%' },
  'Morphology': { range: '≥4', unit: '%' }
};
