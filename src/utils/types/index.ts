export interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  role: "AGENT" | "ADMIN" | "USER";
  provider: "local" | "google" | "facebook";
  isValidUser: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
}

export interface AuthState {
  signUpLoading: boolean;
  signUpError: string | null;
  signUpUser: SignUpResponse | null;
  loading: boolean;
  error: string | null;
  user: AuthResponse | null;
  googleLoading: boolean;
  googleError: string | null;
  googleUser: AuthResponse | null;
  currentUserLoading: boolean;
  currentUserError: string | null;
  currentUser: AuthResponse | null;
  userLogOutSuccess: boolean;
  userLogOutLoading: boolean;
  userLogOutError: string | null;
}
