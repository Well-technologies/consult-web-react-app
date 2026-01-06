import { CommonSuccessResponse } from "../index.types";
import { B2BUserDetails } from "../user/user.types";

export type LoginSuccessResponse = CommonSuccessResponse<LoginResponseData>;

export type LoginResponseData = Pick<
  B2BUserDetails,
  "id" | "name" | "role" | "country_code" | "refresh_token"
> & {
  token: string;
};

export type PhoneLoginBody = {
  mobile: string;
};

export type EmailLoginBody = {
  email: string;
  password: string;
};
