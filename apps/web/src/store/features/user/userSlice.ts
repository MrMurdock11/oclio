import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { User } from "@/shared/types";
import { authApi } from "@/store/api/authApi";
import { usersApi } from "@/store/api/usersApi";

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload.user || null;
      },
    );
    builder.addMatcher(
      authApi.endpoints.checkAuth.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = payload.isAuthenticated;
        state.user = payload.user || null;
      },
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addMatcher(
      usersApi.endpoints.updatePreferences.matchFulfilled,
      (state, { payload }) => {
        if (state.user) {
          state.user.preferences = payload;
        }
      },
    );
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const selectTheme = (state: RootState) =>
  state.user.user?.preferences.theme;

export default userSlice.reducer;
