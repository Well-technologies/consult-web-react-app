import { Tokens } from "@/api/index.types";

export type AuthState = {
  tokens: Tokens;
  isAuthorized: boolean;
  isFetchingUserDetails: boolean;
};
