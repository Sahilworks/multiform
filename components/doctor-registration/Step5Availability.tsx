import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDoctorRegistration } from "@/contexts/DoctorRegistrationContext";
import {
  DAYS_OF_WEEK,
  DayAvailability,
  ClinicAvailability,
} from "@/types/doctor-registration";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Building2 } from "lucide-react";

export function Step5Availability() {
  const { state, updateData, setStep } = useDoctorRegistration();
  const [selectedClinicId, setSelectedClinicId] = useState(
    state.data.clinics.length > 0 ? state.data.clinics[0].id : "",
  );

  const selectedClinic = state.data.clinics.find(
    (clinic) => clinic.id === selectedClinicId,
  );
  const clinicAvailability = state.data.availability.find(
    (avail) => avail.clinicId === selectedClinicId,
  );

  const updateDayAvailability = (
    day: string,
    updates: Partial<DayAvailability>,
  ) => {
    if (!selectedClinicId) return;

    const updatedAvailability = state.data.availability.map((clinicAvail) => {
      if (clinicAvail.clinicId === selectedClinicId) {
        return {
          ...clinicAvail,
          schedule: clinicAvail.schedule.map((dayAvail) => {
            if (dayAvail.day === day) {
              return { ...dayAvail, ...updates };
            }
            return dayAvail;
          }),
        };
      }
      return clinicAvail;
    });

    updateData({ availability: updatedAvailability });
  };

  const hasAnyAvailability = state.data.availability.some((clinic) =>
    clinic.schedule.some((day) => day.isAvailable),
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-doc-text mb-2">Availability</h2>
        <p className="text-gray-600">
          Set your working hours and availability for each clinic
        </p>
      </div>

      {/* Clinic Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-6 h-6 text-doc-primary" />
          <h3 className="text-xl font-semibold text-doc-text">Select Clinic</h3>
        </div>

        <Select value={selectedClinicId} onValueChange={setSelectedClinicId}>
          <SelectTrigger className="w-full max-w-md border-gray-300 focus:border-doc-primary">
            <SelectValue placeholder="Choose a clinic to set availability" />
          </SelectTrigger>
          <SelectContent>
            {state.data.clinics.map((clinic) => (
              <SelectItem key={clinic.id} value={clinic.id}>
                <div>
                  <div className="font-medium">{clinic.name}</div>
                  <div className="text-sm text-gray-500">{clinic.address}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedClinic && clinicAvailability && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-doc-accent" />
            <h3 className="text-xl font-semibold text-doc-text">
              Schedule for {selectedClinic.name}
            </h3>
          </div>

          <div className="grid gap-6">
            {DAYS_OF_WEEK.map((day) => {
              const dayAvail = clinicAvailability.schedule.find(
                (d) => d.day === day,
              );
              if (!dayAvail) return null;

              return (
                <div
                  key={day}
                  className={cn(
                    "p-6 rounded-lg border transition-all duration-200",
                    dayAvail.isAvailable
                      ? "border-doc-primary bg-doc-primary/5"
                      : "border-gray-200 bg-gray-50",
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`${day}-available`}
                        checked={dayAvail.isAvailable}
                        onCheckedChange={(checked) =>
                          updateDayAvailability(day, {
                            isAvailable: checked as boolean,
                          })
                        }
                        className="data-[state=checked]:bg-doc-primary data-[state=checked]:border-doc-primary"
                      />
                      <Label
                        htmlFor={`${day}-available`}
                        className="text-lg font-medium text-doc-text cursor-pointer"
                      >
                        {day}
                      </Label>
                    </div>
                  </div>

                  {dayAvail.isAvailable && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      {/* Work Hours */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-doc-primary" />
                          <Label className="font-medium text-doc-text">
                            Work Hours
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm text-gray-600 w-12">
                              From:
                            </Label>
                            <Input
                              type="time"
                              value={dayAvail.workHours.startTime}
                              onChange={(e) =>
                                updateDayAvailability(day, {
                                  workHours: {
                                    ...dayAvail.workHours,
                                    startTime: e.target.value,
                                  },
                                })
                              }
                              className="border-gray-300 focus:border-doc-primary"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm text-gray-600 w-12">
                              To:
                            </Label>
                            <Input
                              type="time"
                              value={dayAvail.workHours.endTime}
                              onChange={(e) =>
                                updateDayAvailability(day, {
                                  workHours: {
                                    ...dayAvail.workHours,
                                    endTime: e.target.value,
                                  },
                                })
                              }
                              className="border-gray-300 focus:border-doc-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Break Time */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-doc-accent" />
                          <Label className="font-medium text-doc-text">
                            Break Time
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm text-gray-600 w-12">
                              From:
                            </Label>
                            <Input
                              type="time"
                              value={dayAvail.breakTime.startTime}
                              onChange={(e) =>
                                updateDayAvailability(day, {
                                  breakTime: {
                                    ...dayAvail.breakTime,
                                    startTime: e.target.value,
                                  },
                                })
                              }
                              className="border-gray-300 focus:border-doc-primary"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm text-gray-600 w-12">
                              To:
                            </Label>
                            <Input
                              type="time"
                              value={dayAvail.breakTime.endTime}
                              onChange={(e) =>
                                updateDayAvailability(day, {
                                  breakTime: {
                                    ...dayAvail.breakTime,
                                    endTime: e.target.value,
                                  },
                                })
                              }
                              className="border-gray-300 focus:border-doc-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Online Consultation Hours */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-doc-info" />
                          <Label className="font-medium text-doc-text">
                            Online Consult
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm text-gray-600 w-12">
                              From:
                            </Label>
                            <Input
                              type="time"
                              value={dayAvail.onlineConsultHours.startTime}
                              onChange={(e) =>
                                updateDayAvailability(day, {
                                  onlineConsultHours: {
                                    ...dayAvail.onlineConsultHours,
                                    startTime: e.target.value,
                                  },
                                })
                              }
                              className="border-gray-300 focus:border-doc-primary"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm text-gray-600 w-12">
                              To:
                            </Label>
                            <Input
                              type="time"
                              value={dayAvail.onlineConsultHours.endTime}
                              onChange={(e) =>
                                updateDayAvailability(day, {
                                  onlineConsultHours: {
                                    ...dayAvail.onlineConsultHours,
                                    endTime: e.target.value,
                                  },
                                })
                              }
                              className="border-gray-300 focus:border-doc-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={() => {
                DAYS_OF_WEEK.forEach((day) => {
                  updateDayAvailability(day, { isAvailable: true });
                });
              }}
              variant="outline"
              className="border-doc-accent text-doc-accent hover:bg-doc-accent/5"
            >
              Enable All Days
            </Button>
            <Button
              onClick={() => {
                DAYS_OF_WEEK.forEach((day) => {
                  updateDayAvailability(day, { isAvailable: false });
                });
              }}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Disable All Days
            </Button>
          </div>
        </div>
      )}

      {state.data.clinics.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No clinics available. Please add clinics in the previous step.</p>
        </div>
      )}

      {/* Summary */}
      {hasAnyAvailability && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">
            Availability Summary
          </h4>
          <div className="space-y-2">
            {state.data.availability.map((clinicAvail) => {
              const clinic = state.data.clinics.find(
                (c) => c.id === clinicAvail.clinicId,
              );
              const availableDays = clinicAvail.schedule.filter(
                (day) => day.isAvailable,
              );

              if (availableDays.length === 0) return null;

              return (
                <div
                  key={clinicAvail.clinicId}
                  className="text-sm text-green-800"
                >
                  <span className="font-medium">{clinic?.name}:</span>{" "}
                  {availableDays.map((day) => day.day).join(", ")}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={() => setStep(4)}
          variant="outline"
          className="border-doc-primary text-doc-primary hover:bg-doc-primary/5"
        >
          Previous Step
        </Button>
        <Button
          onClick={() => setStep(6)}
          disabled={!hasAnyAvailability}
          className="bg-doc-primary hover:bg-doc-primary/90 px-8 py-3"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
