import { BaseSyntheticEvent } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { CreateEmployeeBody, OrganizationUserDetails } from "@/api/employee/employee.types";
import { Schema } from "@/types";
import { ModalProps } from "@/ui/molecules/modal/Modal.types";
export type AddUserModalContainerProps = Pick<ModalProps, "onClose" | "open"> & {
    refetch: () => void;
    data: OrganizationUserDetails | null;
    formType: FormType;
};
export type AddUserModalProps = Omit<AddUserModalContainerProps, "refetch"> & {
    register: UseFormRegister<AddUserFormInputs>;
    control: Control<AddUserFormInputs, unknown>;
    errors: FieldErrors<AddUserFormInputs>;
    isLoading: boolean;
    watch: UseFormWatch<AddUserFormInputs>;
    onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
    setValue: UseFormSetValue<AddUserFormInputs>;
};
export declare enum FormType {
    Edit = "Edit",
    Add = "Add",
    View = "View"
}
export type AddUserFormInputs = CreateEmployeeBody & {
    reEnterBankAccountNo: string;
    hasBankDetails: boolean;
};
export type FormSchema = Schema<AddUserFormInputs>;
