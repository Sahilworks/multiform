import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDoctorRegistration } from "@/contexts/DoctorRegistrationContext";
import { PAYMENT_METHODS } from "@/types/doctor-registration";
import { cn } from "@/lib/utils";
import { CreditCard, IndianRupee, Smartphone } from "lucide-react";

export function Step6Charges() {
  const { state, updateData, setStep } = useDoctorRegistration();

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    const currentMethods = state.data.paymentMethods;
    if (checked) {
      updateData({ paymentMethods: [...currentMethods, method] });
    } else {
      updateData({
        paymentMethods: currentMethods.filter((m) => m !== method),
      });
    }
  };

  const canProceed =
    state.data.clinicVisitCharges > 0 &&
    state.data.onlineConsultationCharges > 0 &&
    state.data.paymentMethods.length > 0;

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "GPay":
      case "Paytm":
      case "PhonePe":
      case "UPI":
        return <Smartphone className="w-5 h-5" />;
      case "Net Banking":
        return <CreditCard className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-doc-text mb-2">
          Charges & Payment Information
        </h2>
        <p className="text-gray-600">
          Set your consultation fees and preferred payment methods
        </p>
      </div>

      {/* Consultation Charges */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <IndianRupee className="w-6 h-6 text-doc-primary" />
          <h3 className="text-xl font-semibold text-doc-text">
            Consultation Charges
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Clinic Visit Charges */}
          <div className="space-y-2">
            <Label
              htmlFor="clinicVisitCharges"
              className="text-doc-text font-medium"
            >
              Clinic Visit Charges (₹) *
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="clinicVisitCharges"
                type="number"
                min="0"
                value={state.data.clinicVisitCharges || ""}
                onChange={(e) =>
                  updateData({ clinicVisitCharges: Number(e.target.value) })
                }
                placeholder="Enter clinic visit charges"
                className="pl-10 border-gray-300 focus:border-doc-primary"
              />
            </div>
            <p className="text-xs text-gray-500">
              Amount charged for in-person clinic consultations
            </p>
          </div>

          {/* Online Consultation Charges */}
          <div className="space-y-2">
            <Label
              htmlFor="onlineConsultationCharges"
              className="text-doc-text font-medium"
            >
              Online Consultation Charges (₹) *
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="onlineConsultationCharges"
                type="number"
                min="0"
                value={state.data.onlineConsultationCharges || ""}
                onChange={(e) =>
                  updateData({
                    onlineConsultationCharges: Number(e.target.value),
                  })
                }
                placeholder="Enter online consultation charges"
                className="pl-10 border-gray-300 focus:border-doc-primary"
              />
            </div>
            <p className="text-xs text-gray-500">
              Amount charged for virtual consultations
            </p>
          </div>
        </div>

        {/* Charges Preview */}
        {(state.data.clinicVisitCharges > 0 ||
          state.data.onlineConsultationCharges > 0) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Charges Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              {state.data.clinicVisitCharges > 0 && (
                <div className="flex justify-between">
                  <span>Clinic Visit:</span>
                  <span className="font-medium">
                    ₹{state.data.clinicVisitCharges}
                  </span>
                </div>
              )}
              {state.data.onlineConsultationCharges > 0 && (
                <div className="flex justify-between">
                  <span>Online Consultation:</span>
                  <span className="font-medium">
                    ₹{state.data.onlineConsultationCharges}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-6 h-6 text-doc-primary" />
          <h3 className="text-xl font-semibold text-doc-text">
            Payment Methods Accepted
          </h3>
        </div>

        <p className="text-gray-600 mb-4">
          Select the payment methods you accept for consultations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method}
              className={cn(
                "flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md",
                state.data.paymentMethods.includes(method)
                  ? "border-doc-primary bg-doc-primary/5"
                  : "border-gray-200 hover:border-doc-primary/50",
              )}
              onClick={() =>
                handlePaymentMethodChange(
                  method,
                  !state.data.paymentMethods.includes(method),
                )
              }
            >
              <Checkbox
                id={method}
                checked={state.data.paymentMethods.includes(method)}
                onCheckedChange={(checked) =>
                  handlePaymentMethodChange(method, checked as boolean)
                }
                className="data-[state=checked]:bg-doc-primary data-[state=checked]:border-doc-primary"
              />
              <div className="flex items-center gap-3 flex-1">
                <div className="text-doc-primary">
                  {getPaymentMethodIcon(method)}
                </div>
                <Label
                  htmlFor={method}
                  className="text-doc-text font-medium cursor-pointer flex-1"
                >
                  {method}
                </Label>
              </div>
            </div>
          ))}
        </div>

        {state.data.paymentMethods.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">
              Selected Payment Methods ({state.data.paymentMethods.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {state.data.paymentMethods.map((method) => (
                <span
                  key={method}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2"
                >
                  {getPaymentMethodIcon(method)}
                  {method}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-yellow-600 text-sm font-semibold">!</span>
          </div>
          <div>
            <h4 className="font-medium text-yellow-900 mb-1">
              Payment Information
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• All charges are in Indian Rupees (₹)</li>
              <li>• You can update your charges later from your profile</li>
              <li>
                • Payment processing fees may apply based on the method used
              </li>
              <li>
                • Ensure you comply with local regulations for medical payments
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={() => setStep(5)}
          variant="outline"
          className="border-doc-primary text-doc-primary hover:bg-doc-primary/5"
        >
          Previous Step
        </Button>
        <Button
          onClick={() => setStep(7)}
          disabled={!canProceed}
          className="bg-doc-primary hover:bg-doc-primary/90 px-8 py-3"
        >
          Review & Submit
        </Button>
      </div>
    </div>
  );
}
