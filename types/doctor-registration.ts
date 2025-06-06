export interface DoctorRegistrationData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  languagesSpoken: string[];
  mobileNumber: string;
  isMobileVerified: boolean;
  resume: File | null;
  profilePicture: File | null;
  bio: string;
  awards: string[];

  // Step 2: Contact Information
  phoneNumber: string;
  email: string;
  clinics: Clinic[];

  // Step 3: Education and Qualifications
  highestDegree: string;
  university: string;
  medicalLicenseNumber: string;
  issuingAuthority: string;
  medicalLicenseFile: File | null;
  licenseExpiryDate: string;

  // Step 4: Specialization
  selectedSpecialty: string;
  services: string[];

  // Step 5: Availability
  availability: ClinicAvailability[];

  // Step 6: Charges and Payment
  clinicVisitCharges: number;
  onlineConsultationCharges: number;
  paymentMethods: string[];
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface DayAvailability {
  day: string;
  isAvailable: boolean;
  workHours: TimeSlot;
  breakTime: TimeSlot;
  onlineConsultHours: TimeSlot;
}

export interface ClinicAvailability {
  clinicId: string;
  schedule: DayAvailability[];
}

export const LANGUAGES = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Gujarati",
  "Urdu",
  "Kannada",
  "Odia",
  "Malayalam",
  "Punjabi",
  "Assamese",
  "Sanskrit",
];

export const SPECIALTIES = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "General Medicine",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Surgery",
];

export const SPECIALTY_SERVICES: Record<string, string[]> = {
  Cardiology: [
    "ECG/EKG",
    "Echocardiogram",
    "Stress Testing",
    "Cardiac Catheterization",
    "Angioplasty",
    "Pacemaker Insertion",
    "Heart Surgery Consultation",
  ],
  Dermatology: [
    "Skin Cancer Screening",
    "Acne Treatment",
    "Eczema Treatment",
    "Psoriasis Treatment",
    "Cosmetic Procedures",
    "Mole Removal",
    "Chemical Peels",
  ],
  Endocrinology: [
    "Diabetes Management",
    "Thyroid Disorders",
    "Hormone Therapy",
    "Osteoporosis Treatment",
    "Adrenal Disorders",
    "Metabolic Disorders",
  ],
  Gastroenterology: [
    "Endoscopy",
    "Colonoscopy",
    "IBS Treatment",
    "Liver Disease Management",
    "Acid Reflux Treatment",
    "Inflammatory Bowel Disease",
    "Hepatitis Treatment",
  ],
  "General Medicine": [
    "General Checkup",
    "Vaccination",
    "Health Screening",
    "Chronic Disease Management",
    "Preventive Care",
    "Minor Surgery",
    "Health Counseling",
  ],
  Neurology: [
    "EEG",
    "MRI Interpretation",
    "Stroke Treatment",
    "Epilepsy Management",
    "Headache Treatment",
    "Parkinson's Disease",
    "Multiple Sclerosis",
  ],
  Oncology: [
    "Cancer Screening",
    "Chemotherapy",
    "Radiation Therapy Consultation",
    "Tumor Biopsy",
    "Cancer Surgery Consultation",
    "Palliative Care",
  ],
  Orthopedics: [
    "Joint Replacement",
    "Fracture Treatment",
    "Sports Injury",
    "Arthritis Treatment",
    "Spine Surgery",
    "Physical Therapy",
    "Bone Surgery",
  ],
  Pediatrics: [
    "Child Health Checkup",
    "Vaccination",
    "Growth Monitoring",
    "Developmental Assessment",
    "Pediatric Surgery Consultation",
    "Allergy Testing",
    "Behavioral Assessment",
  ],
  Psychiatry: [
    "Mental Health Assessment",
    "Therapy Sessions",
    "Medication Management",
    "Addiction Treatment",
    "Anxiety Treatment",
    "Depression Treatment",
    "PTSD Treatment",
  ],
  Pulmonology: [
    "Pulmonary Function Test",
    "Bronchoscopy",
    "Asthma Treatment",
    "COPD Management",
    "Sleep Study",
    "Lung Cancer Screening",
    "Respiratory Therapy",
  ],
  Radiology: [
    "X-Ray",
    "CT Scan",
    "MRI",
    "Ultrasound",
    "Mammography",
    "PET Scan",
    "Image Interpretation",
  ],
  Surgery: [
    "General Surgery",
    "Laparoscopic Surgery",
    "Emergency Surgery",
    "Surgical Consultation",
    "Pre-operative Assessment",
    "Post-operative Care",
    "Minimally Invasive Surgery",
  ],
};

export const PAYMENT_METHODS = [
  "GPay",
  "Paytm",
  "PhonePe",
  "Net Banking",
  "UPI",
];

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
