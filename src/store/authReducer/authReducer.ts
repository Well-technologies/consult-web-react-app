import { createSlice } from "@reduxjs/toolkit";

import { AuthState } from "./authReducer.types";

export const authInitialState: AuthState = {
  tokens: {
    accessToken: "",
    refreshToken: "",
  },
  isAuthorized: false,
  isFetchingUserDetails: false,
};

export const auth = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    onLoginSuccess: (state, { payload }) => {
      state.tokens = payload.tokens;
      state.isAuthorized = payload.isAuthorized;
    },
    setFetchingUserDetails: (state, { payload }) => {
      state.isFetchingUserDetails = payload;
    },
    onLogOutAction: (state) => {
      state.tokens = authInitialState.tokens;
      state.isAuthorized = false;
      state.isFetchingUserDetails = false;
    },
  },
});

export const { onLoginSuccess, setFetchingUserDetails, onLogOutAction } =
  auth.actions;

export default auth.reducer;
