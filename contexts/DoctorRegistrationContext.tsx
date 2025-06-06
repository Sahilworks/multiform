import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  DoctorRegistrationData,
  Clinic,
  ClinicAvailability,
  DayAvailability,
  DAYS_OF_WEEK,
} from "../types/doctor-registration";

interface DoctorRegistrationState {
  currentStep: number;
  data: DoctorRegistrationData;
}

type DoctorRegistrationAction =
  | { type: "SET_STEP"; step: number }
  | { type: "UPDATE_DATA"; stepData: Partial<DoctorRegistrationData> }
  | { type: "RESET" };

const initialData: DoctorRegistrationData = {
  // Step 1
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  languagesSpoken: [],
  mobileNumber: "",
  isMobileVerified: false,
  resume: null,
  profilePicture: null,
  bio: "",
  awards: [],

  // Step 2
  phoneNumber: "",
  email: "",
  clinics: [],

  // Step 3
  highestDegree: "",
  university: "",
  medicalLicenseNumber: "",
  issuingAuthority: "",
  medicalLicenseFile: null,
  licenseExpiryDate: "",

  // Step 4
  selectedSpecialty: "",
  services: [],

  // Step 5
  availability: [],

  // Step 6
  clinicVisitCharges: 0,
  onlineConsultationCharges: 0,
  paymentMethods: [],
};

const initialState: DoctorRegistrationState = {
  currentStep: 1,
  data: initialData,
};

function doctorRegistrationReducer(
  state: DoctorRegistrationState,
  action: DoctorRegistrationAction,
): DoctorRegistrationState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.step };

    case "UPDATE_DATA":
      let updatedData = { ...state.data, ...action.stepData };

      // Auto-fill phone number from mobile number
      if (action.stepData.mobileNumber && !state.data.phoneNumber) {
        updatedData.phoneNumber = action.stepData.mobileNumber;
      }

      // Auto-generate availability when clinics are added
      if (action.stepData.clinics && action.stepData.clinics.length > 0) {
        const existingClinicIds = state.data.availability.map(
          (a) => a.clinicId,
        );
        const newClinics = action.stepData.clinics.filter(
          (clinic) => !existingClinicIds.includes(clinic.id),
        );

        const newAvailability: ClinicAvailability[] = newClinics.map(
          (clinic) => ({
            clinicId: clinic.id,
            schedule: DAYS_OF_WEEK.map((day) => ({
              day,
              isAvailable: false,
              workHours: { startTime: "09:00", endTime: "17:00" },
              breakTime: { startTime: "13:00", endTime: "14:00" },
              onlineConsultHours: { startTime: "18:00", endTime: "20:00" },
            })),
          }),
        );

        updatedData.availability = [
          ...state.data.availability,
          ...newAvailability,
        ];
      }

      return { ...state, data: updatedData };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

interface DoctorRegistrationContextType {
  state: DoctorRegistrationState;
  setStep: (step: number) => void;
  updateData: (stepData: Partial<DoctorRegistrationData>) => void;
  reset: () => void;
  canProceedToStep: (step: number) => boolean;
}

const DoctorRegistrationContext = createContext<
  DoctorRegistrationContextType | undefined
>(undefined);

export function DoctorRegistrationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(doctorRegistrationReducer, initialState);

  const setStep = (step: number) => {
    dispatch({ type: "SET_STEP", step });
  };

  const updateData = (stepData: Partial<DoctorRegistrationData>) => {
    dispatch({ type: "UPDATE_DATA", stepData });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const canProceedToStep = (step: number) => {
    const { data } = state;

    switch (step) {
      case 1:
        return true;
      case 2:
        return !!(
          data.firstName &&
          data.lastName &&
          data.mobileNumber &&
          data.isMobileVerified
        );
      case 3:
        return !!(data.email && data.clinics.length > 0);
      case 4:
        return !!(
          data.highestDegree &&
          data.university &&
          data.medicalLicenseNumber
        );
      case 5:
        return !!(data.selectedSpecialty && data.services.length > 0);
      case 6:
        return data.availability.some((clinic) =>
          clinic.schedule.some((day) => day.isAvailable),
        );
      case 7:
        return !!(
          data.clinicVisitCharges > 0 &&
          data.onlineConsultationCharges > 0 &&
          data.paymentMethods.length > 0
        );
      default:
        return false;
    }
  };

  return (
    <DoctorRegistrationContext.Provider
      value={{ state, setStep, updateData, reset, canProceedToStep }}
    >
      {children}
    </DoctorRegistrationContext.Provider>
  );
}

export function useDoctorRegistration() {
  const context = useContext(DoctorRegistrationContext);
  if (context === undefined) {
    throw new Error(
      "useDoctorRegistration must be used within a DoctorRegistrationProvider",
    );
  }
  return context;
}
