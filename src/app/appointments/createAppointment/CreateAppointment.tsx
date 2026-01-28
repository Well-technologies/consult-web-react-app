import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useClient } from "@/hooks/useClient/useClient";
import { ServiceConfigType } from "@/api/index.types";
import { allReducerStates } from "@/store/store.utils";
import { StoreReducerStateTypes } from "@/store/store.types";
import { FormDatePicker } from "@/ui/molecules/formDatePicker/FormDatePicker";
import { FormSelect } from "@/ui/molecules/formSelect/FormSelect";
import { FormInput } from "@/ui/molecules/formInput/FormInput";
import { DatePickerType } from "@/ui/atoms/datePicker/DatePicker.types";
import { useGetAdviserScheduleDetails, useCreateAdviceBooking } from "@/api/consult/consult";
import { AddPatientModalContainer } from "@/app/patients/addPatientModal/AddPatientModalContainer";
import { FormType } from "@/types";
import { Button } from "@/ui/atoms/button/Button";

import { CreateAppointmentProps, AppointmentFormInputs } from "./CreateAppointment.types";
import { AppointmentType } from "@/app/patients/addPatientModal/AddPatientModal.types";

export const CreateAppointment = ({
    setIsCreatingAppointment,
    refetch,
}: CreateAppointmentProps) => {
    const { t } = useTranslation();
    const client = useClient({ serviceConfigType: ServiceConfigType.Core });
    const { user } = useSelector((rootState) =>
        allReducerStates(rootState as StoreReducerStateTypes)
    );

    const [step, setStep] = useState(1);
    const [patientId, setPatientId] = useState<number | null>(null);

    const { register, handleSubmit, control, watch, setValue } = useForm<AppointmentFormInputs>({
        defaultValues: {
            appointment_date: new Date().toISOString().split('T')[0],
            appointment_time: "",
            appointment_type: "BOOKING",
            is_custom_time: false,
        },
    });

    const appointmentDate = watch("appointment_date");
    const isCustomTime = watch("is_custom_time");

    const { data: scheduleData, isLoading: isLoadingSchedule } = useGetAdviserScheduleDetails({
        client: client,
        adviserId: 0,
        params: {
            appointment_date: appointmentDate,
            is_flash_point: 0,
            speciality_id: 1,
        },
    });

    const { mutate: createAppointment, isPending: isCreating } = useCreateAdviceBooking({
        onSuccess: (res: any) => {
            if (res.success) {
                toast.success(res.message || t("appointment.alert.create.success"));
                setIsCreatingAppointment(false);
                refetch();
            } else {
                toast.error(res.message || "Failed to create appointment");
            }
        },
        onError: () => {
            toast.error(t("global.alert.common.error"));
        }
    });

    const onPatientConfirmed = (id?: number ) => {

        console.log('creating appointment', id)
        if (id) {
            setPatientId(id)
            setStep(2);
        }
    };

    const onSubmit = (data: AppointmentFormInputs) => {
        if (!patientId) return;

        const body = {
            doctor_id: Number(user?.profile.userDetail.id) || 0,
            appointment_datetime: `${data.appointment_date} ${data.appointment_time}`,
            patient_id: Number(patientId),
            duration: "30",
            call_method: 1,
            address_id: 1,
            language: "en",
            is_joined: 1,
            is_flash_point: 0,
            speciality_id: 1, // Default
            doctor_prefix: "Dr.", // Default
            is_claimable: false,
            total_claim_credits: 0,
            medical_assessment: null,
            package_id: null,
            is_chargble: 0,
            card_detail_id: 0,
            consultation_mode_id: 4
        };

        createAppointment({ client: client, body: body as any });
    };

    const timeSlotOptions = useMemo(() => {
        return (scheduleData as any)?.data?.doctor_schedule?.timeslots
            ?.filter((slot: any) => !slot.is_booked && !slot.is_disabled)
            ?.map((slot: any) => ({
                label: `${slot.slot_start_time} - ${slot.slot_end_time}`,
                value: slot.slot_start_time,
            })) || [];
    }, [scheduleData]);

    if (step === 1) {
        return (
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">{t("patient.modal.add.title")}</h2>
                    <Button variant="outline" onClick={() => setIsCreatingAppointment(false)}>
                        {t("global.modal.cancel")}
                    </Button>
                </div>
                <AddPatientModalContainer
                    open={true}
                    onClose={() => setIsCreatingAppointment(false)}
                    formType={FormType.Add}
                    onConfirm={onPatientConfirmed}
                    data={null}
                    appointmentType={AppointmentType.Appointment}
                    refetch={() => {}}
                    confirmButtonText={t("global.modal.submit")}
                    cancelButtonText={t("global.modal.cancel")}
                />
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-100 max-w-4xl mx-auto my-10">
                <div className="mb-8 flex justify-between items-center border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{t("appointment.form.title") || "Appointment Details"}</h2>
                    <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep(1)}>
                        {t("global.text.back") || "Back"}
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreatingAppointment(false)}>
                        {t("global.modal.cancel")}
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <FormDatePicker
                            id="appointment_date"
                            startedDateName="appointment_date"
                            endedDateName=""
                            register={register}
                            label={t("consultation.table.consultation_date.header")}
                            setValue={setValue}
                            value={appointmentDate}
                            type={DatePickerType.SingleDate}
                            futureOnly={true}
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <FormSelect
                            label={t("consultation.table.appointment_type.header")}
                            name="appointment_type"
                            control={control}
                            options={[
                                { label: "Booking", value: "BOOKING" },
                            ]}
                            required
                        />
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <input
                            type="checkbox"
                            id="is_custom_time"
                            {...register("is_custom_time")}
                            className="w-5 h-5 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                        />
                        <label htmlFor="is_custom_time" className="text-base font-semibold text-gray-700 cursor-pointer">
                            {t("appointment.form.custom_time") || "Set a custom time instead of predefined schedule"}
                        </label>
                    </div>

                    <div className="mt-4">
                        {isCustomTime ? (
                            <div className="space-y-2 max-w-md">
                                <FormInput
                                    label={t("appointment.form.time.label") || "Time (HH:mm:ss)"}
                                    name="appointment_time"
                                    register={register}
                                    placeholder="e.g. 10:30:00"
                                    required
                                />
                                <p className="text-xs text-gray-500">Please enter time in 24-hour format (HH:mm:ss)</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <FormSelect
                                    label={t("appointment.form.schedule.label") || "Available Time Slots"}
                                    name="appointment_time"
                                    control={control}
                                    options={timeSlotOptions}
                                    placeholder={isLoadingSchedule ? "Loading schedules..." : (timeSlotOptions.length > 0 ? "Select a time slot" : "No available slots for this date")}
                                    required
                                    isDisabled={isLoadingSchedule || timeSlotOptions.length === 0}
                                />
                                {!isLoadingSchedule && timeSlotOptions.length === 0 && (
                                    <p className="text-sm text-amber-600 font-medium">No predefined schedules found for this date. Try a custom time.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-6 border-t flex justify-end">
                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="px-8 py-3 text-lg"
                        disabled={isCreating}
                    >
                        {isCreating ? "Creating..." : (t("appointment.form.button") || "Create Appointment")}
                    </Button>
                </div>
            </form>
        </div>
    );
};
};
