import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { useDoctorRegistration } from "@/contexts/DoctorRegistrationContext";
import { GraduationCap, Award, FileText } from "lucide-react";

export function Step3Education() {
  const { state, updateData, setStep } = useDoctorRegistration();

  const canProceed =
    state.data.highestDegree &&
    state.data.university &&
    state.data.medicalLicenseNumber &&
    state.data.issuingAuthority;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-doc-text mb-2">
          Education & Qualifications
        </h2>
        <p className="text-gray-600">
          Share your educational background and medical licensing information
        </p>
      </div>

      {/* Education Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-6 h-6 text-doc-primary" />
          <h3 className="text-xl font-semibold text-doc-text">
            Educational Background
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Highest Degree */}
          <div className="space-y-2">
            <Label
              htmlFor="highestDegree"
              className="text-doc-text font-medium"
            >
              Highest Degree *
            </Label>
            <Input
              id="highestDegree"
              value={state.data.highestDegree}
              onChange={(e) => updateData({ highestDegree: e.target.value })}
              placeholder="e.g., MBBS, MD, DM, MS"
              className="border-gray-300 focus:border-doc-primary"
            />
          </div>

          {/* University/Institute */}
          <div className="space-y-2">
            <Label htmlFor="university" className="text-doc-text font-medium">
              University/Institute *
            </Label>
            <Input
              id="university"
              value={state.data.university}
              onChange={(e) => updateData({ university: e.target.value })}
              placeholder="Enter university or institute name"
              className="border-gray-300 focus:border-doc-primary"
            />
          </div>
        </div>
      </div>

      {/* Medical License Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-6 h-6 text-doc-primary" />
          <h3 className="text-xl font-semibold text-doc-text">
            Medical License Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Medical License Number */}
          <div className="space-y-2">
            <Label
              htmlFor="medicalLicenseNumber"
              className="text-doc-text font-medium"
            >
              Medical License Number *
            </Label>
            <Input
              id="medicalLicenseNumber"
              value={state.data.medicalLicenseNumber}
              onChange={(e) =>
                updateData({ medicalLicenseNumber: e.target.value })
              }
              placeholder="Enter license number"
              className="border-gray-300 focus:border-doc-primary"
            />
          </div>

          {/* Issuing Authority */}
          <div className="space-y-2">
            <Label
              htmlFor="issuingAuthority"
              className="text-doc-text font-medium"
            >
              Issuing Authority *
            </Label>
            <Input
              id="issuingAuthority"
              value={state.data.issuingAuthority}
              onChange={(e) => updateData({ issuingAuthority: e.target.value })}
              placeholder="e.g., Medical Council of India"
              className="border-gray-300 focus:border-doc-primary"
            />
          </div>

          {/* License Expiry Date */}
          <div className="space-y-2">
            <Label
              htmlFor="licenseExpiryDate"
              className="text-doc-text font-medium"
            >
              License Expiry Date
            </Label>
            <Input
              id="licenseExpiryDate"
              type="date"
              value={state.data.licenseExpiryDate}
              onChange={(e) =>
                updateData({ licenseExpiryDate: e.target.value })
              }
              className="border-gray-300 focus:border-doc-primary"
            />
          </div>
        </div>

        {/* Medical License Upload */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-doc-primary" />
            <Label className="text-doc-text font-medium">
              Medical License Document
            </Label>
          </div>
          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            files={
              state.data.medicalLicenseFile
                ? [state.data.medicalLicenseFile]
                : []
            }
            onFileChange={(files) =>
              updateData({ medicalLicenseFile: files[0] || null })
            }
            label="Upload medical license"
            description="PDF, JPEG, or PNG files up to 10MB"
          />
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-600 text-sm font-semibold">!</span>
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              Important Information
            </h4>
            <p className="text-sm text-blue-800">
              Please ensure all information is accurate and matches your
              official documents. Any discrepancies may delay the verification
              process.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={() => setStep(2)}
          variant="outline"
          className="border-doc-primary text-doc-primary hover:bg-doc-primary/5"
        >
          Previous Step
        </Button>
        <Button
          onClick={() => setStep(4)}
          disabled={!canProceed}
          className="bg-doc-primary hover:bg-doc-primary/90 px-8 py-3"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
