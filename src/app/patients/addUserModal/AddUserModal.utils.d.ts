import { TFunction } from "i18next";
import { OrganizationUserDetails } from "@/api/employee/employee.types";
import { GenderType } from "@/api/user/user.types";
import { FormType } from "./AddUserModal.types";
export declare const AddUserSchema: (translate: TFunction<"translation", undefined>) => <TFieldValues extends import("react-hook-form").FieldValues, TContext>(values: TFieldValues, context: TContext | undefined, options: import("react-hook-form").ResolverOptions<TFieldValues>) => Promise<import("react-hook-form").ResolverResult<TFieldValues>>;
export declare const getConfirmButtonText: (formType: FormType) => string;
export declare const getIsConfirmButtonHide: (formType: FormType) => boolean;
export declare const getCancelButtonText: (formType: FormType) => string;
export declare const getModalTitle: (formType: FormType, data: OrganizationUserDetails | null) => string;
export declare const getIsDisabledFormItem: (formType: FormType, name: "name" | "mobile_no" | "email" | "gender" | "parent_org_id" | "full_name" | "bank_name" | "bank_branch" | "bank_account_no" | "reEnterBankAccountNo") => boolean;
export declare const getUserGenderOptions: () => {
    label: string;
    value: GenderType;
}[];
export declare const getFieldsAreNotEmpty: (fields: string[]) => boolean;
