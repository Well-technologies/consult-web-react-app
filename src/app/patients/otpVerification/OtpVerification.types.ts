import { AddPatientModalProps } from "../addPatientModal/AddPatientModal.types"

export type OtpVerificationProps = {
    mobileNo: string, disabled: boolean, isOtpVerified: boolean, setIsOtpVerified: (value: boolean) => void
} & Pick<AddPatientModalProps, 'mutateOnCreatePatient'>