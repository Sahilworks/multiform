import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDoctorRegistration } from "@/contexts/DoctorRegistrationContext";
import { cn } from "@/lib/utils";
import {
  User,
  Phone,
  Mail,
  Building2,
  GraduationCap,
  Stethoscope,
  Calendar,
  CreditCard,
  CheckCircle2,
  FileText,
  Award,
  Clock,
  IndianRupee,
  Verified,
} from "lucide-react";

export function Step7Review() {
  const { state, setStep, reset } = useDoctorRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // In a real app, you would redirect to a success page or dashboard
    setTimeout(() => {
      alert(
        "Registration submitted successfully! You will receive a confirmation email shortly.",
      );
      reset();
    }, 1500);
  };

  const getProfileImageUrl = (file: File | null) => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return "/placeholder.svg";
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-doc-text mb-4">
            Registration Submitted!
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Thank you for registering. Your application has been submitted
            successfully and is now under review.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-doc-text mb-2">
          Review Your Information
        </h2>
        <p className="text-gray-600">
          Please review all details before submitting your registration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Doctor Profile Card */}
        <div className="bg-gradient-to-br from-doc-primary to-doc-secondary text-white rounded-xl p-6">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white/20">
              <img
                src={getProfileImageUrl(state.data.profilePicture)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">
              Dr. {state.data.firstName} {state.data.lastName}
            </h3>
            <p className="text-white/80 text-sm mb-2">
              {state.data.selectedSpecialty}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Verified className="w-4 h-4" />
              <span>Mobile Verified</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-doc-primary" />
              <h4 className="text-lg font-semibold text-doc-text">
                Personal Information
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Full Name:</span>
                <p className="font-medium text-doc-text">
                  {state.data.firstName} {state.data.lastName}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Date of Birth:</span>
                <p className="font-medium text-doc-text">
                  {state.data.dateOfBirth || "Not provided"}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Mobile Number:</span>
                <p className="font-medium text-doc-text flex items-center gap-2">
                  {state.data.mobileNumber}
                  <Verified className="w-4 h-4 text-green-500" />
                </p>
              </div>
              <div>
                <span className="text-gray-600">Languages:</span>
                <p className="font-medium text-doc-text">
                  {state.data.languagesSpoken.join(", ") || "Not provided"}
                </p>
              </div>
            </div>
            {state.data.bio && (
              <div className="mt-4">
                <span className="text-gray-600">Bio:</span>
                <p className="font-medium text-doc-text mt-1">
                  {state.data.bio}
                </p>
              </div>
            )}
            {state.data.awards.length > 0 && (
              <div className="mt-4">
                <span className="text-gray-600">Awards:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {state.data.awards.map((award, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-doc-accent/10 text-doc-accent text-xs rounded"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-doc-primary" />
              <h4 className="text-lg font-semibold text-doc-text">
                Contact & Clinic Information
              </h4>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium text-doc-text">
                    {state.data.email}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="font-medium text-doc-text">
                    {state.data.phoneNumber}
                  </p>
                </div>
              </div>
              <div>
                <span className="text-gray-600">
                  Clinics ({state.data.clinics.length}):
                </span>
                <div className="mt-2 space-y-2">
                  {state.data.clinics.map((clinic) => (
                    <div
                      key={clinic.id}
                      className="p-3 bg-gray-50 rounded border-l-4 border-doc-primary"
                    >
                      <p className="font-medium text-doc-text">{clinic.name}</p>
                      <p className="text-sm text-gray-600">{clinic.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-doc-primary" />
              <h4 className="text-lg font-semibold text-doc-text">
                Education & Qualifications
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Highest Degree:</span>
                <p className="font-medium text-doc-text">
                  {state.data.highestDegree}
                </p>
              </div>
              <div>
                <span className="text-gray-600">University:</span>
                <p className="font-medium text-doc-text">
                  {state.data.university}
                </p>
              </div>
              <div>
                <span className="text-gray-600">License Number:</span>
                <p className="font-medium text-doc-text">
                  {state.data.medicalLicenseNumber}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Issuing Authority:</span>
                <p className="font-medium text-doc-text">
                  {state.data.issuingAuthority}
                </p>
              </div>
              {state.data.licenseExpiryDate && (
                <div>
                  <span className="text-gray-600">License Expiry:</span>
                  <p className="font-medium text-doc-text">
                    {state.data.licenseExpiryDate}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Specialization */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="w-5 h-5 text-doc-primary" />
              <h4 className="text-lg font-semibold text-doc-text">
                Specialization
              </h4>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Primary Specialty:</span>
                <p className="font-medium text-doc-text">
                  {state.data.selectedSpecialty}
                </p>
              </div>
              <div>
                <span className="text-gray-600">
                  Services ({state.data.services.length}):
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {state.data.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-doc-primary/10 text-doc-primary text-xs rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Charges */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <IndianRupee className="w-5 h-5 text-doc-primary" />
              <h4 className="text-lg font-semibold text-doc-text">
                Charges & Payment
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Clinic Visit:</span>
                <p className="font-medium text-doc-text">
                  ₹{state.data.clinicVisitCharges}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Online Consultation:</span>
                <p className="font-medium text-doc-text">
                  ₹{state.data.onlineConsultationCharges}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Payment Methods:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {state.data.paymentMethods.map((method, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-doc-accent/10 text-doc-accent text-xs rounded-full"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={() => setStep(6)}
          variant="outline"
          className="border-doc-primary text-doc-primary hover:bg-doc-primary/5"
          disabled={isSubmitting}
        >
          Previous Step
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-doc-primary hover:bg-doc-primary/90 px-8 py-3"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </div>
          ) : (
            "Submit Registration"
          )}
        </Button>
      </div>
    </div>
  );
}
