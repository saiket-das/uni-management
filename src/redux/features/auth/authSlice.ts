import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type AuthStateProps = {
  user: null | object;
  token: null | string;
  iat: null | Date;
  exp: null | Date;
};

const initialState: AuthStateProps = {
  user: null,
  token: null,
  iat: null,
  exp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user at local storage after login
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    // Logout user
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
