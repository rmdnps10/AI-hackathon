import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  initializeAuth,
} from "../api";
import type { SignInRequest, SignUpRequest } from "../api/types";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

/**
 * 현재 로그인한 사용자 정보 조회
 */
export const useCurrentUser = () => {
  const queryClient = useQueryClient();

  // 인증 상태 변경 이벤트 리스너
  useEffect(() => {
    const handleAuthChange = () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    };

    window.addEventListener("auth-state-changed", handleAuthChange);
    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

/**
 * 로그인 여부 확인
 */
export const useIsAuthenticated = () => {
  const { data, isLoading } = useCurrentUser();
  return {
    isAuthenticated: !!data,
    isLoading,
    user: data,
  };
};

/**
 * 로그인 mutation
 */
export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInRequest) => signIn(data),
    onSuccess: (response) => {
      // 사용자 정보를 캐시에 즉시 설정
      queryClient.setQueryData(authKeys.user(), response.user);
      // 인증 상태 변경 이벤트 발생
      window.dispatchEvent(new Event("auth-state-changed"));
    },
  });
};

/**
 * 회원가입 mutation
 */
export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
  });
};

/**
 * 로그아웃 mutation
 */
export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // 인증 관련 캐시 모두 제거
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();
      // 인증 상태 변경 이벤트 발생
      window.dispatchEvent(new Event("auth-state-changed"));
    },
  });
};

/**
 * 앱 초기화 시 토큰 복원
 */
export const useInitializeAuth = () => {
  const queryClient = useQueryClient();

  return () => {
    initializeAuth();
    // 토큰이 있으면 사용자 정보 다시 fetch
    const token = localStorage.getItem("access_token");
    if (token) {
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    }
  };
};
