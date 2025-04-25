import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: {
    email: string;
    role: string;
  } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ email: string; token: string; role: string }>
    ) {
      state.isLoggedIn = true;
      state.user = {
        email: action.payload.email,
        role: action.payload.role,
      };
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
