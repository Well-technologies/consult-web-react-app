import { createSlice } from "@reduxjs/toolkit";

import { GenderType } from "@/api/user/user.types";

import { UserState } from "./userReducer.types";

export const userInitialState: UserState = {
  userDetails: {
    lead_id: "",
    user_type: "",
    country_code: "",
    registration_credit: false,
    registration_credit_amount: 0,
    leads_status: 0,
    token: "",
  },
  profile: {
    address_id: null,
    bank_account_no: "",
    bank_branch: "",
    bank_name: "",
    comments: "",
    created_at: "",
    date_of_birth: "",
    email: "",
    formatted_id: "",
    full_name: "",
    gender: GenderType.Other,
    healthcondition: [],
    healthtopic: [],
    id: 0,
    is_aia_downgraded: false,
    lead_owner_id: 0,
    lead_type: "",
    leads_status: 0,
    mobile_no: "",
    name: "",
    name_title: "",
    nic_no: "",
    offer_notification: null,
    organization_id: 0,
    phone: null,
    preferred_language: null,
    product_code: "",
    profile_picture_url:"",
    request_quote_notification: null,
    role: "",
    show_on_leadboard: 0,
    show_to_doner: 0,
    source: 1,
    store_id: "",
    trial_used: "",
    updated_at:"",
    userDetail: "",
  },
};

export const user = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    onUserDetailsFetch: (state, { payload }) => {
      state.userDetails = payload.userDetails;
    },    
    onProfileFetch: (state, { payload }) => {
      console.log("payload.profile", payload.profile);
      state.profile = payload.profile;
    },
    onRemoveUserDetails: (state) => {
      state.userDetails = userInitialState.userDetails;
      state.userDetails = userInitialState.userDetails;
    },
  },
});

export const { onUserDetailsFetch, onRemoveUserDetails, onProfileFetch } = user.actions;

export default user.reducer;
