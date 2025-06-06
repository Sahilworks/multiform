import React from "react";
import { cn } from "@/lib/utils";
import { useDoctorRegistration } from "@/contexts/DoctorRegistrationContext";
import {
  User,
  Phone,
  GraduationCap,
  Stethoscope,
  Calendar,
  CreditCard,
  CheckCircle2,
  Circle,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Personal Information",
    description: "Basic details and profile",
    icon: User,
  },
  {
    id: 2,
    title: "Contact Information",
    description: "Contact and clinic details",
    icon: Phone,
  },
  {
    id: 3,
    title: "Education & Qualifications",
    description: "Academic and licensing info",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Specialization",
    description: "Specialty and services",
    icon: Stethoscope,
  },
  {
    id: 5,
    title: "Availability",
    description: "Schedule and time slots",
    icon: Calendar,
  },
  {
    id: 6,
    title: "Charges & Payment",
    description: "Pricing and payment methods",
    icon: CreditCard,
  },
  {
    id: 7,
    title: "Review & Submit",
    description: "Final review and submission",
    icon: CheckCircle2,
  },
];

export function ProgressSidebar() {
  const { state, setStep, canProceedToStep } = useDoctorRegistration();

  const handleStepClick = (stepId: number) => {
    if (stepId <= state.currentStep || canProceedToStep(stepId)) {
      setStep(stepId);
    }
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < state.currentStep) return "completed";
    if (stepId === state.currentStep) return "current";
    if (canProceedToStep(stepId)) return "available";
    return "locked";
  };

  return (
    <div className="w-80 bg-gradient-to-b from-doc-primary to-doc-secondary min-h-screen p-6 text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Doctor Registration
        </h1>
        <p className="text-doc-primary-foreground/80 text-sm">
          Complete all steps to register
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          const isClickable = status !== "locked";

          return (
            <div
              key={step.id}
              className={cn(
                "relative cursor-pointer transition-all duration-200",
                isClickable
                  ? "hover:scale-105"
                  : "cursor-not-allowed opacity-50",
              )}
              onClick={() => isClickable && handleStepClick(step.id)}
            >
              <div
                className={cn(
                  "flex items-center p-4 rounded-lg transition-all duration-200",
                  status === "current" &&
                    "bg-white/20 border-2 border-white/30 shadow-lg",
                  status === "completed" &&
                    "bg-white/10 border border-white/20",
                  status === "available" &&
                    "bg-white/5 border border-white/10 hover:bg-white/10",
                  status === "locked" && "bg-transparent",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full mr-4 transition-colors",
                    status === "completed" && "bg-doc-accent text-white",
                    status === "current" && "bg-white text-doc-primary",
                    status === "available" && "bg-white/20 text-white",
                    status === "locked" && "bg-white/10 text-white/50",
                  )}
                >
                  {status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1">
                  <h3
                    className={cn(
                      "font-medium text-sm transition-colors",
                      status === "current" && "text-white font-semibold",
                      status === "completed" && "text-white/90",
                      status === "available" && "text-white/80",
                      status === "locked" && "text-white/50",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs mt-1 transition-colors",
                      status === "current" && "text-white/90",
                      status === "completed" && "text-white/70",
                      status === "available" && "text-white/60",
                      status === "locked" && "text-white/40",
                    )}
                  >
                    {step.description}
                  </p>
                </div>

                {status === "current" && (
                  <ChevronRight className="w-5 h-5 text-white ml-2" />
                )}
              </div>

              {/* Progress connector */}
              {index < steps.length - 1 && (
                <div className="absolute left-9 top-16 w-0.5 h-4 bg-white/20"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-white/10 rounded-lg">
        <h4 className="font-medium text-white mb-2">Progress</h4>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-doc-accent h-2 rounded-full transition-all duration-500"
            style={{
              width: `${((state.currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-xs text-white/70 mt-2">
          Step {state.currentStep} of {steps.length}
        </p>
      </div>
    </div>
  );
}
