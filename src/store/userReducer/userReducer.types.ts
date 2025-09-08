import { UserRoles } from "@/api/user/user.types";

export type UserState = {
  userDetails: StateUserDetails;
  companyDetails: StateCompanyDetails;
};

export type StateUserDetails = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  role: UserRoles;
  profilePictureUrl: string | null;
  gender: string; // Should be Enum
};

export type StateCompanyDetails = {
  id: number;
  companyName: string;
  note: string | null;
  brNumber: string | null;
  packageId: number;
  companyLogo: string;
  subCompanies: Omit<StateCompanyDetails, "subCompanies">[]; // Should add Type
};
