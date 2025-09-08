/* eslint-disable @typescript-eslint/no-explicit-any */
// import { DragAndDropProps } from "../dragAndDrop/DragAndDrop.types";
import { ReactNode } from "react";
import { DropzoneOptions } from "react-dropzone";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

export type DragAndDropUploadFormProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    setValue: UseFormSetValue<any>;
    register: UseFormRegister<any>;
    value?: string;
    helperText?: string;
    label?: ReactNode;
    error?: boolean;
    name: string;
    uploadConfig: DragAndDropUploadConfig;
    required?: boolean;
  };

export type DragAndDropUploadConfig = {
  formDataKey: string;
  endpoint: string;
  dropzoneOptions: DropzoneOptions;
};

export enum DragAndDropVariant {
  Standard = "Standard",
  Error = "Error",
}
