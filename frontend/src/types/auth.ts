export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  userId: string;
  userRole: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string | null;
  } | null;
} 