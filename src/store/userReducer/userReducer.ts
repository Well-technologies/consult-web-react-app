import { createSlice } from "@reduxjs/toolkit";

import { UserRoles } from "@/api/user/user.types";

import { UserState } from "./userReducer.types";

export const userInitialState: UserState = {
  userDetails: {
    id: 0,
    name: "",
    email: "",
    mobile: "",
    role: UserRoles.Reviewer,
    profilePictureUrl: "",
    gender: "",
  },
  companyDetails: {
    id: 0,
    companyName: "",
    companyLogo: "",
    brNumber: "",
    note: "",
    packageId: 0,
    subCompanies: [],
  },
};

export const user = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    onUserDetailsFetch: (state, { payload }) => {
      state.userDetails = payload.userDetails;
      state.companyDetails = payload.companyDetails;
    },
    onRemoveUserDetails: (state) => {
      state.companyDetails = userInitialState.companyDetails;
      state.userDetails = userInitialState.userDetails;
    },
  },
});

export const { onUserDetailsFetch, onRemoveUserDetails } = user.actions;

export default user.reducer;
