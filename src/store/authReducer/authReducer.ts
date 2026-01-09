import { createSlice } from "@reduxjs/toolkit";

import { AuthState } from "./authReducer.types";

export const authInitialState: AuthState = {
  token: "",
  isAuthorized: false,
};

export const auth = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    onLoginSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.isAuthorized = payload.isAuthorized;
    },
    onLogOutAction: (state) => {
      state.token = authInitialState.token;
      state.isAuthorized = false;
    },
  },
});

export const { onLoginSuccess, onLogOutAction } =
  auth.actions;

export default auth.reducer;
