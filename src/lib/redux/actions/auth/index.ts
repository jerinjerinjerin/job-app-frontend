import { ApolloError } from "@apollo/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

import client from "@/app/providers/graphql-provider";
import { 
  GOOGLE_LOGIN_USER, 
  LOGIN_USER, 
  LOGOUT_USER, 
  REFRESH_TOKEN, 
  SIGNUP_USER
} from "@/lib/graphql/mutation/auth";
import { SignupFormValues } from "@/utils/schema/auth";
import { AuthResponse, SignUpResponse } from "@/utils/types";

export const signupUser = createAsyncThunk<
  SignUpResponse,
  SignupFormValues,
  { rejectValue: string }
>("auth/signup", async (input, { rejectWithValue }) => {
  try {
    const { confirmPassword, profilePic, ...sanitizedInput } = input;


    const fileToUpload = profilePic instanceof File ? profilePic : null;

    const { data } = await client.mutate({
      mutation: SIGNUP_USER,
      variables: {
        input: {
          ...sanitizedInput,
          profilePic: fileToUpload, 
        },
      },
      context: {
        hasUpload: true, 
      },
    });

    return data.signup;
  } catch (error: unknown) {
    let message = "Unknown signup error";

    if (error instanceof ApolloError) {
      message = error.graphQLErrors[0]?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    console.error("Signup Error:", message);
    return rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { input: { email, password } },
      fetchPolicy: "no-cache",
    });


    return data.login as AuthResponse;
  } catch (error: unknown) {
    let message = "";

  if (error instanceof ApolloError) {
    if (error.graphQLErrors.length > 0) {
      return rejectWithValue(""); 
    } 

     else if (error.networkError) {
      message = error.networkError.message;
    }

  } else if (error instanceof Error) {
    message = error.message;
  }

  console.error("Thunk Error:", message);
  return rejectWithValue(message); 
  }
});

export const googleLoginUser = createAsyncThunk<
  AuthResponse,
  { token: string },
  { rejectValue: string }
>("auth/googleLogin", async ({ token }, { rejectWithValue }) => {
  try {
    const { data } = await client.mutate({
      mutation: GOOGLE_LOGIN_USER,
      variables: { input: { token } },
      fetchPolicy: "no-cache",
    });

    return data.googleLogin as AuthResponse;
  } catch (error: unknown) {
    let message = "";

    if (error instanceof ApolloError) {
      if (error.graphQLErrors.length > 0) {
        message = error.graphQLErrors[0].message;
      } else if (error.networkError) {
        message = error.networkError.message;
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    console.error("Google Login Thunk Error:", message);
    return rejectWithValue(message);
  }
});

export const refreshUserToken = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN,
      fetchPolicy: "no-cache", 
    });

    return data.refreshToken as AuthResponse;
  } catch (error: unknown) {
      let message = "";

    if (error instanceof ApolloError) {
      if (error.graphQLErrors.length > 0) {
        message = error.graphQLErrors[0].message;
      } else if (error.networkError) {
        message = error.networkError.message;
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    console.error("Refersh token Error:", message);
    return rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGOUT_USER,
      fetchPolicy: "no-cache",
    });

    return data.logout;
  } catch (error: unknown) {
    let message = "Unknown logout error";

    if (error instanceof ApolloError) {
      if (error.graphQLErrors.length > 0) {
        message = error.graphQLErrors[0].message;
      } else if (error.networkError) {
        message = error.networkError.message;
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    console.error("Logout Error:", message);
    return rejectWithValue(message);
  }
});

