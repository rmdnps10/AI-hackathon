import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: 자동으로 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: 401 에러 시 자동 로그아웃
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰이 만료되었거나 유효하지 않음
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // 커스텀 이벤트 발생 (인증 상태 변경 알림)
      window.dispatchEvent(new Event("auth-state-changed"));

      // 로그인 페이지로 리다이렉트하지 않고 이벤트만 발생
      // 각 컴포넌트에서 useIsAuthenticated로 상태 감지
    }
    return Promise.reject(error);
  }
);
