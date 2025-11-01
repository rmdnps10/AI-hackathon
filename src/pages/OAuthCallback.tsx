import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react/box";
import { Text } from "@chakra-ui/react/text";
import { Spinner } from "@chakra-ui/react/spinner";
import { api } from "../api/axiosInstance";

/**
 * OAuth 콜백 처리 페이지
 * Google/LinkedIn OAuth 로그인 후 리다이렉트되는 페이지
 *
 * 백엔드로부터 code를 받아서 세션을 확인하거나,
 * 또는 이미 백엔드에서 세션을 설정한 경우 토큰을 가져옴
 */
function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const hash = window.location.hash.substring(1);
        const hashParams = new URLSearchParams(hash);

        const error = searchParams.get("error") || hashParams.get("error");
        const errorDescription =
          searchParams.get("error_description") ||
          hashParams.get("error_description");

        console.log("=== OAuth Callback 디버깅 ===");
        console.log("URL:", window.location.href);
        console.log("error:", error);

        if (error) {
          console.error("OAuth error:", error, errorDescription);
          alert(`로그인 실패: ${errorDescription || error}`);
          navigate("/");
          return;
        }

        // URL에 토큰이 직접 있는지 확인 (Supabase PKCE 방식)
        const accessToken =
          hashParams.get("access_token") || searchParams.get("access_token");
        const refreshToken =
          hashParams.get("refresh_token") || searchParams.get("refresh_token");

        if (accessToken) {
          console.log("URL에서 토큰 발견! 저장 중...");

          // 토큰 저장
          localStorage.setItem("access_token", accessToken);
          if (refreshToken) {
            localStorage.setItem("refresh_token", refreshToken);
          }

          // axios 헤더 설정
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          // 인증 상태 변경 이벤트 발생
          window.dispatchEvent(new Event("auth-state-changed"));

          console.log("토큰 저장 완료! 메인 페이지로 이동");
          navigate("/");
          return;
        }

        // 토큰이 URL에 없으면, 백엔드 세션 기반으로 동작
        console.log("OAuth 콜백 처리 중... 세션 확인");

        // 백엔드가 세션을 설정할 시간을 줌 (짧게 조정)
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
          console.log("GET /v1/auth/me 호출 중...");
          const response = await api.get("/v1/auth/me");

          console.log("응답 성공:", response.data);

          if (response.data) {
            console.log("OAuth 로그인 성공! 사용자:", response.data);

            // 인증 상태 변경 이벤트 발생
            window.dispatchEvent(new Event("auth-state-changed"));

            // 메인 페이지로 이동
            navigate("/");
            return;
          }
        } catch (error: unknown) {
          console.error("=== /v1/auth/me 호출 실패 ===");
          console.error("에러 객체:", error);

          const axiosError = error as {
            response?: {
              status?: number;
              data?: { detail?: string };
              headers?: Record<string, string>;
            };
          };

          console.error("응답 상태:", axiosError.response?.status);
          console.error("응답 데이터:", axiosError.response?.data);
          console.error("응답 헤더:", axiosError.response?.headers);

          const errorMsg =
            axiosError.response?.data?.detail ||
            `인증 실패 (${axiosError.response?.status || "알 수 없음"})`;

          alert(
            `OAuth 로그인 실패: ${errorMsg}\n\n` +
              `백엔드에서 세션을 설정하지 못했습니다.\n` +
              `백엔드가 Supabase 토큰을 URL에 포함하거나, 쿠키에 세션을 설정해야 합니다.`
          );
          navigate("/");
        }
      } catch (error) {
        console.error("OAuth callback 처리 오류:", error);
        alert("로그인 처리 중 오류가 발생했습니다.");
        navigate("/");
      }
    };

    handleOAuthCallback();
  }, [navigate]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="white"
    >
      <Spinner size="xl" color="purple.500" mb="4" />
      <Text fontSize="lg" color="gray.600">
        로그인 처리 중...
      </Text>
    </Box>
  );
}

export default OAuthCallback;
