import type { ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "./hooks/useAuth";
import SearchScreen from "./pages/SearchHome";
import SearchResult from "./pages/SearchResult";
import SearchDetailProfile from "./pages/SearchDetailProfile";
import ServiceIntroduce from "./pages/ServiceIntroduce";
import MyPage from "./pages/MyPage";
import OAuthCallback from "./pages/OAuthCallback";

type ProtectedRouteProps = {
  children: ReactElement;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useIsAuthenticated();

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      {/* 메인 검색 화면 */}
      <Route path="/" element={<SearchScreen />} />
      <Route path="/introduce" element={<ServiceIntroduce />} />

      {/* OAuth 콜백 (인증 불필요) */}
      <Route path="/auth/callback" element={<OAuthCallback />} />

      <Route
        path="/search-result"
        element={
          <ProtectedRoute>
            <SearchResult />
          </ProtectedRoute>
        }
      />

      {/* 검색 상세 프로필 */}
      <Route
        path="/search-detail"
        element={
          <ProtectedRoute>
            <SearchDetailProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-page"
        element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        }
      />

      {/* 404 - 메인으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
