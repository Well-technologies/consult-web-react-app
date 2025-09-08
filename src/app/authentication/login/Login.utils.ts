import { joiResolver } from "@hookform/resolvers/joi";

import { TFunction } from "i18next";
import Joi from "joi";

import { FormSchema } from "./Login.types";

const schema = ({ email, password }: FormSchema) =>
  Joi.object<FormSchema>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages(email),
    password: Joi.string().required().messages(password),
  });

export const LoginSchema = (translate: TFunction<"translation", undefined>) =>
  joiResolver(
    schema({
      email: {
        "string.empty": translate("global.errors.required"),
        "string.email": translate("global.errors.email"),
        "any.required": translate("global.errors.required"),
      },
      password: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
    })
  );
