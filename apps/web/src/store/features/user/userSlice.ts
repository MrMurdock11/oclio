import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

interface UserState {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    email: string | null;
  } | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; email: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;

export default userSlice.reducer;
