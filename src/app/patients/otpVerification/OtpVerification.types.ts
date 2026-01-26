import { AddPatientModalProps, AddUserFormInputs } from "../addPatientModal/AddPatientModal.types"
import { UseFormTrigger } from "react-hook-form"

export type OtpVerificationProps = {
    mobileNo: string, 
    disabled: boolean, 
    isOtpVerified: boolean, 
    setIsOtpVerified: (value: boolean) => void,
    isRegisteredPatient: boolean | undefined,
    // setIsRegisteredPatient: (value: boolean) => void,
    formData: AddUserFormInputs,
    onAppointmentIdSet?: (appointmentId: number) => void,
    trigger?: UseFormTrigger<AddUserFormInputs>
} & Pick<AddPatientModalProps, 'mutateOnCreatePatient' | 'setIsRegisteredPatient' | 'setIsMyPatient'>