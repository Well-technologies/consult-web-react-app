import { BaseSyntheticEvent } from "react";
import { UseFormReturn, FormState } from "react-hook-form";

import { Schema } from "@/types";

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type LoginProps = {
  register: UseFormReturn<LoginFormInputs>["register"];
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  errors: FormState<LoginFormInputs>["errors"];
  isPending: boolean;
};

export type FormSchema = Schema<LoginFormInputs>;
