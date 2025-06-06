import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDoctorRegistration } from "@/contexts/DoctorRegistrationContext";
import { Clinic } from "@/types/doctor-registration";
import { Plus, X, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Step2ContactInfo() {
  const { state, updateData, setStep } = useDoctorRegistration();
  const [newClinic, setNewClinic] = useState({ name: "", address: "" });

  const addClinic = () => {
    if (newClinic.name.trim() && newClinic.address.trim()) {
      const clinic: Clinic = {
        id: Date.now().toString(),
        name: newClinic.name.trim(),
        address: newClinic.address.trim(),
      };

      updateData({ clinics: [...state.data.clinics, clinic] });
      setNewClinic({ name: "", address: "" });
    }
  };

  const removeClinic = (clinicId: string) => {
    const updatedClinics = state.data.clinics.filter(
      (clinic) => clinic.id !== clinicId,
    );
    const updatedAvailability = state.data.availability.filter(
      (avail) => avail.clinicId !== clinicId,
    );
    updateData({
      clinics: updatedClinics,
      availability: updatedAvailability,
    });
  };

  const canProceed = state.data.email && state.data.clinics.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-doc-text mb-2">
          Contact Information
        </h2>
        <p className="text-gray-600">
          Provide your contact details and clinic information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Number (Auto-filled) */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-doc-text font-medium">
            Phone Number *
          </Label>
          <Input
            id="phoneNumber"
            value={state.data.phoneNumber}
            onChange={(e) => updateData({ phoneNumber: e.target.value })}
            placeholder="Phone number"
            className="border-gray-300 focus:border-doc-primary bg-gray-50"
            readOnly
          />
          <p className="text-xs text-gray-500">
            Auto-filled from mobile number
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-doc-text font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={state.data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="Enter your email address"
            className="border-gray-300 focus:border-doc-primary"
          />
        </div>
      </div>

      {/* Clinic Information */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-6 h-6 text-doc-primary" />
          <h3 className="text-xl font-semibold text-doc-text">
            Clinic Information
          </h3>
        </div>

        {/* Add New Clinic */}
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-doc-text">Add Clinic</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinicName" className="text-doc-text font-medium">
                Clinic Name *
              </Label>
              <Input
                id="clinicName"
                value={newClinic.name}
                onChange={(e) =>
                  setNewClinic({ ...newClinic, name: e.target.value })
                }
                placeholder="Enter clinic name"
                className="border-gray-300 focus:border-doc-primary"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="clinicAddress"
                className="text-doc-text font-medium"
              >
                Clinic Address *
              </Label>
              <Input
                id="clinicAddress"
                value={newClinic.address}
                onChange={(e) =>
                  setNewClinic({ ...newClinic, address: e.target.value })
                }
                placeholder="Enter clinic address"
                className="border-gray-300 focus:border-doc-primary"
              />
            </div>
          </div>
          <Button
            onClick={addClinic}
            disabled={!newClinic.name.trim() || !newClinic.address.trim()}
            className="bg-doc-accent hover:bg-doc-accent/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Clinic
          </Button>
        </div>

        {/* Existing Clinics */}
        {state.data.clinics.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-doc-text">
              Your Clinics ({state.data.clinics.length})
            </h4>
            <div className="grid gap-4">
              {state.data.clinics.map((clinic, index) => (
                <div
                  key={clinic.id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-doc-primary/10 rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-doc-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-doc-text">
                        {clinic.name}
                      </h5>
                      <p className="text-sm text-gray-600">{clinic.address}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeClinic(clinic.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {state.data.clinics.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>
              No clinics added yet. Please add at least one clinic to continue.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={() => setStep(1)}
          variant="outline"
          className="border-doc-primary text-doc-primary hover:bg-doc-primary/5"
        >
          Previous Step
        </Button>
        <Button
          onClick={() => setStep(3)}
          disabled={!canProceed}
          className="bg-doc-primary hover:bg-doc-primary/90 px-8 py-3"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
