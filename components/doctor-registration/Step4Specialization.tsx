import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDoctorRegistration } from "@/contexts/DoctorRegistrationContext";
import { SPECIALTIES, SPECIALTY_SERVICES } from "@/types/doctor-registration";
import { cn } from "@/lib/utils";
import { Stethoscope, CheckCircle2, Circle } from "lucide-react";

export function Step4Specialization() {
  const { state, updateData, setStep } = useDoctorRegistration();

  const handleSpecialtyChange = (specialty: string) => {
    updateData({
      selectedSpecialty: specialty,
      services: [], // Reset services when specialty changes
    });
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    const currentServices = state.data.services;
    if (checked) {
      updateData({ services: [...currentServices, service] });
    } else {
      updateData({ services: currentServices.filter((s) => s !== service) });
    }
  };

  const availableServices = state.data.selectedSpecialty
    ? SPECIALTY_SERVICES[state.data.selectedSpecialty] || []
    : [];

  const canProceed =
    state.data.selectedSpecialty && state.data.services.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-doc-text mb-2">
          Specialization
        </h2>
        <p className="text-gray-600">
          Select your medical specialty and the services you provide
        </p>
      </div>

      {/* Specialty Selection */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="w-6 h-6 text-doc-primary" />
          <h3 className="text-xl font-semibold text-doc-text">
            Medical Specialty
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPECIALTIES.map((specialty) => (
            <div
              key={specialty}
              className={cn(
                "relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                state.data.selectedSpecialty === specialty
                  ? "border-doc-primary bg-doc-primary/5 shadow-md"
                  : "border-gray-200 hover:border-doc-primary/50",
              )}
              onClick={() => handleSpecialtyChange(specialty)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-doc-text">{specialty}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {SPECIALTY_SERVICES[specialty]?.length || 0} services
                    available
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {state.data.selectedSpecialty === specialty ? (
                    <CheckCircle2 className="w-6 h-6 text-doc-primary" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Note about Single Selection */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-yellow-600 text-sm font-semibold">!</span>
            </div>
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">
                Single Specialty Selection
              </h4>
              <p className="text-sm text-yellow-800">
                You can only select one primary specialty. This helps patients
                find the right doctor for their specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Selection */}
      {state.data.selectedSpecialty && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-doc-accent" />
            <h3 className="text-xl font-semibold text-doc-text">
              Services for {state.data.selectedSpecialty}
            </h3>
          </div>

          <p className="text-gray-600 mb-4">
            Select the specific services you provide in your specialty area:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableServices.map((service) => (
              <div
                key={service}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Checkbox
                  id={service}
                  checked={state.data.services.includes(service)}
                  onCheckedChange={(checked) =>
                    handleServiceChange(service, checked as boolean)
                  }
                  className="data-[state=checked]:bg-doc-primary data-[state=checked]:border-doc-primary"
                />
                <Label
                  htmlFor={service}
                  className="text-sm text-doc-text cursor-pointer flex-1"
                >
                  {service}
                </Label>
              </div>
            ))}
          </div>

          {state.data.services.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">
                Selected Services ({state.data.services.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {state.data.services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!state.data.selectedSpecialty && (
        <div className="text-center py-12 text-gray-500">
          <Stethoscope className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>Please select a specialty to view available services</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={() => setStep(3)}
          variant="outline"
          className="border-doc-primary text-doc-primary hover:bg-doc-primary/5"
        >
          Previous Step
        </Button>
        <Button
          onClick={() => setStep(5)}
          disabled={!canProceed}
          className="bg-doc-primary hover:bg-doc-primary/90 px-8 py-3"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
