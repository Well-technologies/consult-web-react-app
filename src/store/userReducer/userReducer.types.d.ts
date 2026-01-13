import { Profile, UserRoles } from "@/api/user/user.types";
export type UserState = {
    userDetails: StateUserDetails;
    profile: Profile;
};
export type StateUserDetails = {
    lead_id: string;
    user_type: UserRoles | "";
    country_code: string;
    registration_credit: boolean;
    registration_credit_amount: number;
    leads_status: number;
    token: string;
};
