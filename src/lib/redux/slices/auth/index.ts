import { createSlice } from "@reduxjs/toolkit";

import { AuthState } from "@/utils/types";

import {
  loginUser,
  googleLoginUser,
  refreshUserToken,
  logoutUser,
  signupUser,
} from "../../actions/auth";

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  googleLoading: false,
  googleUser: null,
  googleError: null,
  currentUser: null,
  currentUserError: null,
  currentUserLoading: false,
  userLogOutError: null,
  userLogOutLoading: false,
  userLogOutSuccess: false,
  signUpError: null,
  signUpLoading: false,
  signUpUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    //signup
      .addCase(signupUser.pending, (state) => {
        state.signUpLoading = true;
        state.signUpError = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signUpLoading = false;
        state.signUpUser = action.payload;
        state.signUpError = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signUpLoading = false;
        state.signUpUser = null;
        state.signUpError = action.payload || "Login failed";
      })

      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "Login failed";
      })

      //google login

      .addCase(googleLoginUser.pending, (state) => {
        state.googleLoading = true;
        state.googleError = null;
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.googleLoading = false;
        state.user = action.payload;
        state.googleError = null;
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.googleLoading = false;
        state.googleUser = null;
        state.googleError = action.payload || "Google login failed";
      })

      //refersh token

      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.currentUserError = null;
        state.currentUserLoading = false;
      })

      .addCase(refreshUserToken.pending, (state) => {
        state.currentUser = null;
        state.currentUserError = null;
        state.currentUserLoading = true;
      })

      .addCase(refreshUserToken.rejected, (state, action) => {
        state.currentUser = null;
        state.currentUserError =
          action.payload || "faild to fetch user detials";
        state.currentUserLoading = false;
      })

      //logout

      .addCase(logoutUser.pending, (state) => {
        state.userLogOutLoading = true;
        state.userLogOutError = null;
        state.userLogOutSuccess = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.googleUser = null;
        state.currentUser = null;

        state.userLogOutLoading = false;
        state.userLogOutSuccess = true;
        state.userLogOutError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.userLogOutLoading = false;
        state.userLogOutSuccess = false;
        state.userLogOutError = action.payload || "Logout failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
