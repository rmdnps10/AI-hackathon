import { api } from "./axiosInstance";
import type {
  SignUpRequest,
  SignUpResponse,
  SignInRequest,
  SignInResponse,
  UserResponse,
  OAuthInitRequest,
  OAuthInitResponse,
} from "./types";

/**
 * 회원가입
 */
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await api.post<SignUpResponse>("/v1/auth/signup", data);
  return response.data;
};

/**
 * 로그인
 */
export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await api.post<SignInResponse>("/v1/auth/signin", data);
  // 토큰을 localStorage에 저장
  if (response.data.access_token) {
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    // axios instance에 토큰 설정
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.access_token}`;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth-token-change"));
    }
  }
  return response.data;
};

/**
 * 현재 로그인한 사용자 정보 조회
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>("/v1/auth/me");
  return response.data;
};

/**
 * 로그아웃
 */
export const signOut = async (): Promise<void> => {
  await api.post("/v1/auth/signout");
  // 토큰 제거
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  delete api.defaults.headers.common["Authorization"];
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth-token-change"));
  }
};

/**
 * OAuth 로그인 초기화
 */
export const initOAuth = async (
  data: OAuthInitRequest
): Promise<OAuthInitResponse> => {
  const response = await api.post<OAuthInitResponse>(
    "/v1/auth/oauth/init",
    data
  );
  return response.data;
};

/**
 * Google OAuth 로그인 URL 가져오기
 */
export const getGoogleOAuthUrl = (redirect_to?: string): string => {
  const params = redirect_to ? `?redirect_to=${redirect_to}` : "";
  return `${api.defaults.baseURL}/v1/auth/oauth/google${params}`;
};

/**
 * LinkedIn OAuth 로그인 URL 가져오기
 */
export const getLinkedInOAuthUrl = (redirect_to?: string): string => {
  const params = redirect_to ? `?redirect_to=${redirect_to}` : "";
  return `${api.defaults.baseURL}/v1/auth/oauth/linkedin${params}`;
};

/**
 * 초기화 시 토큰 설정
 */
export const initializeAuth = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};
