import { createSlice } from "@reduxjs/toolkit";

type AuthStateProps = {
  user: null | object;
  token: null | string;
};

const initialState: AuthStateProps = {
  user: null,
  token: null,
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

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
