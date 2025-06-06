import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/ui/file-upload";
import { OTPInput } from "@/components/ui/otp-input";
import { useDoctorRegistration } from "@/contexts/DoctorRegistrationContext";
import { LANGUAGES } from "@/types/doctor-registration";
import { cn } from "@/lib/utils";
import { Verified, Send, Plus, X } from "lucide-react";

export function Step1PersonalInfo() {
  const { state, updateData, setStep } = useDoctorRegistration();
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [newAward, setNewAward] = useState("");

  const handleMobileVerification = () => {
    if (state.data.mobileNumber.length === 10) {
      setIsOtpSent(true);
      // Simulate OTP sending
      console.log("OTP sent to:", state.data.mobileNumber);
    }
  };

  const handleOtpVerification = () => {
    if (otp.length === 6) {
      updateData({ isMobileVerified: true });
      setIsOtpSent(false);
      setOtp("");
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const currentLanguages = state.data.languagesSpoken;
    if (checked) {
      updateData({ languagesSpoken: [...currentLanguages, language] });
    } else {
      updateData({
        languagesSpoken: currentLanguages.filter((l) => l !== language),
      });
    }
  };

  const handleResumeUpload = async (files: File[]) => {
    if (files.length > 0) {
      updateData({ resume: files[0] });

      // Simulate auto-extraction of bio from resume
      setTimeout(() => {
        const mockBio =
          "Experienced medical professional with expertise in patient care and clinical excellence. Dedicated to providing high-quality healthcare services with a focus on compassionate care and evidence-based medicine.";
        updateData({ bio: mockBio });
      }, 1000);
    }
  };

  const addAward = () => {
    if (newAward.trim()) {
      updateData({ awards: [...state.data.awards, newAward.trim()] });
      setNewAward("");
    }
  };

  const removeAward = (index: number) => {
    const updatedAwards = state.data.awards.filter((_, i) => i !== index);
    updateData({ awards: updatedAwards });
  };

  const canProceed =
    state.data.firstName &&
    state.data.lastName &&
    state.data.mobileNumber &&
    state.data.isMobileVerified;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-doc-text mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600">Let's start with your basic information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-doc-text font-medium">
            First Name *
          </Label>
          <Input
            id="firstName"
            value={state.data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            placeholder="Enter your first name"
            className="border-gray-300 focus:border-doc-primary"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-doc-text font-medium">
            Last Name *
          </Label>
          <Input
            id="lastName"
            value={state.data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            placeholder="Enter your last name"
            className="border-gray-300 focus:border-doc-primary"
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-doc-text font-medium">
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={state.data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
            className="border-gray-300 focus:border-doc-primary"
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <Label htmlFor="mobileNumber" className="text-doc-text font-medium">
            Mobile Number *
          </Label>
          <div className="flex gap-2">
            <Input
              id="mobileNumber"
              value={state.data.mobileNumber}
              onChange={(e) => updateData({ mobileNumber: e.target.value })}
              placeholder="Enter mobile number"
              maxLength={10}
              className="border-gray-300 focus:border-doc-primary"
              disabled={state.data.isMobileVerified}
            />
            {state.data.isMobileVerified ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-md">
                <Verified className="w-4 h-4" />
                <span className="text-sm font-medium">Verified</span>
              </div>
            ) : (
              <Button
                onClick={handleMobileVerification}
                disabled={state.data.mobileNumber.length !== 10}
                className="bg-doc-primary hover:bg-doc-primary/90"
              >
                <Send className="w-4 h-4 mr-2" />
                Verify
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* OTP Verification */}
      {isOtpSent && !state.data.isMobileVerified && (
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
          <Label className="text-doc-text font-medium">
            Enter OTP sent to {state.data.mobileNumber}
          </Label>
          <OTPInput value={otp} onChange={setOtp} className="justify-center" />
          <div className="text-center">
            <Button
              onClick={handleOtpVerification}
              disabled={otp.length !== 6}
              className="bg-doc-primary hover:bg-doc-primary/90"
            >
              Verify OTP
            </Button>
          </div>
        </div>
      )}

      {/* Languages Spoken */}
      <div className="space-y-4">
        <Label className="text-doc-text font-medium">Languages Spoken</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {LANGUAGES.map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox
                id={language}
                checked={state.data.languagesSpoken.includes(language)}
                onCheckedChange={(checked) =>
                  handleLanguageChange(language, checked as boolean)
                }
              />
              <Label
                htmlFor={language}
                className="text-sm text-doc-text cursor-pointer"
              >
                {language}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Upload */}
      <div className="space-y-4">
        <Label className="text-doc-text font-medium">Resume</Label>
        <FileUpload
          accept=".pdf,.doc,.docx"
          files={state.data.resume ? [state.data.resume] : []}
          onFileChange={handleResumeUpload}
          label="Upload your resume"
          description="PDF, DOC, or DOCX files up to 10MB"
        />
      </div>

      {/* Profile Picture */}
      <div className="space-y-4">
        <Label className="text-doc-text font-medium">Profile Picture</Label>
        <FileUpload
          accept="image/*"
          files={state.data.profilePicture ? [state.data.profilePicture] : []}
          onFileChange={(files) =>
            updateData({ profilePicture: files[0] || null })
          }
          label="Upload profile picture"
          description="JPEG, PNG files up to 5MB"
          maxSize={5}
        />
      </div>

      {/* Bio/Description */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-doc-text font-medium">
          Bio/Description
        </Label>
        <Textarea
          id="bio"
          value={state.data.bio}
          onChange={(e) => updateData({ bio: e.target.value })}
          placeholder="Write a brief description about yourself..."
          className="min-h-[120px] border-gray-300 focus:border-doc-primary"
        />
      </div>

      {/* Awards */}
      <div className="space-y-4">
        <Label className="text-doc-text font-medium">
          Awards & Achievements
        </Label>

        {/* Add new award */}
        <div className="flex gap-2">
          <Input
            value={newAward}
            onChange={(e) => setNewAward(e.target.value)}
            placeholder="Add an award or achievement"
            className="border-gray-300 focus:border-doc-primary"
            onKeyPress={(e) => e.key === "Enter" && addAward()}
          />
          <Button
            onClick={addAward}
            disabled={!newAward.trim()}
            className="bg-doc-accent hover:bg-doc-accent/90"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Awards list */}
        {state.data.awards.length > 0 && (
          <div className="space-y-2">
            {state.data.awards.map((award, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-doc-text">{award}</span>
                <Button
                  onClick={() => removeAward(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={() => setStep(2)}
          disabled={!canProceed}
          className="bg-doc-primary hover:bg-doc-primary/90 px-8 py-3"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
