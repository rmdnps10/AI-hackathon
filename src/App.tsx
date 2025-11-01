import { Routes, Route, Navigate } from "react-router-dom";
import SearchScreen from "./pages/SearchHome";
import SearchResult from "./pages/SearchResult";
import SearchDetailProfile from "./pages/SearchDetailProfile";

function App() {
  return (
    <Routes>
      {/* 메인 검색 화면 */}
      <Route path="/" element={<SearchScreen />} />

      <Route path="/search-result" element={<SearchResult />} />

      {/* 검색 상세 프로필 */}
      <Route path="/search-detail" element={<SearchDetailProfile />} />

      {/* 404 - 메인으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
