import { joiResolver } from "@hookform/resolvers/joi";

import { TFunction } from "i18next";
import Joi from "joi";

import { EmailLoginFormSchema, PhoneLoginFormSchema } from "./Login.types";

const schema = ({ email, password }: EmailLoginFormSchema) =>
  Joi.object<EmailLoginFormSchema>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages(email),
    password: Joi.string().required().messages(password),
  });

export const EmailLoginSchema = (translate: TFunction<"translation", undefined>) =>
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

const phoneSchema = ({ mobile }: PhoneLoginFormSchema) =>
  Joi.object<PhoneLoginFormSchema>({
    mobile: Joi.string().required().messages(mobile),
  });

export const PhoneLoginSchema = (translate: TFunction<"translation", undefined>) =>
  joiResolver(
    phoneSchema({
      mobile: {
        "string.empty": translate("global.errors.required"),
        "any.required": translate("global.errors.required"),
      },
    })
  );
