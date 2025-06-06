import React from "react";
import {
  DoctorRegistrationProvider,
  useDoctorRegistration,
} from "@/contexts/DoctorRegistrationContext";
import { ProgressSidebar } from "@/components/doctor-registration/ProgressSidebar";
import { Step1PersonalInfo } from "@/components/doctor-registration/Step1PersonalInfo";
import { Step2ContactInfo } from "@/components/doctor-registration/Step2ContactInfo";
import { Step3Education } from "@/components/doctor-registration/Step3Education";
import { Step4Specialization } from "@/components/doctor-registration/Step4Specialization";
import { Step5Availability } from "@/components/doctor-registration/Step5Availability";
import { Step6Charges } from "@/components/doctor-registration/Step6Charges";
import { Step7Review } from "@/components/doctor-registration/Step7Review";

function DoctorRegistrationContent() {
  const { state } = useDoctorRegistration();

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1PersonalInfo />;
      case 2:
        return <Step2ContactInfo />;
      case 3:
        return <Step3Education />;
      case 4:
        return <Step4Specialization />;
      case 5:
        return <Step5Availability />;
      case 6:
        return <Step6Charges />;
      case 7:
        return <Step7Review />;
      default:
        return <Step1PersonalInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ProgressSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-8">{renderCurrentStep()}</div>
      </div>
    </div>
  );
}

export default function DoctorRegistration() {
  return (
    <DoctorRegistrationProvider>
      <DoctorRegistrationContent />
    </DoctorRegistrationProvider>
  );
}
