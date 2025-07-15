import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        name
        profilePic
        role
        provider
        isValidUser
      }
    }
  }
`;

export const GOOGLE_LOGIN_USER = gql`
  mutation GoogleLogin($input: GoogleLoginInput!) {
    googleLogin(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        name
        profilePic
        role
        provider
        isValidUser
      }
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($input: OtpInput!) {
    verifyOtp(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        name
        provider
        role
        otp
        profilePic
        isValidUser
        createdAt
        updatedAt
      }
    }
  }
`;


export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
      refreshToken
      user {
        id
        name
        email
        profilePic
        role
        provider
        isValidUser
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logout
  }
`;

export const SIGNUP_USER = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: updateInput!) {
    updateUser(input: $input) {
      message
      success
      role
    }
  }
`;




