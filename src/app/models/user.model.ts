export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  role: string; // backend requires this field but ignores it; always registers as ROLE_USER
}

export interface AuthResponse {
  token: string;
  username: string;
  roles: { authority: string }[];
}
