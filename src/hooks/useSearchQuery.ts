import { useQuery } from "@tanstack/react-query";
import { search } from "../api/search";
import type { SearchRequest } from "../api/types";

/**
 * 인재 검색 query (캐시 유지용)
 * - queryKey: ['search', q, org]
 * - staleTime을 길게 설정하여 뒤로가기 시 재요청 방지
 */
export const useSearchQuery = (
  params: Pick<SearchRequest, "query_text" | "org_context">
) => {
  const { query_text, org_context } = params;
  return useQuery({
    queryKey: ["search", query_text ?? "", org_context ?? null],
    queryFn: () => search({ query_text, org_context }),
    enabled: Boolean(query_text && query_text.trim().length > 0),
    staleTime: 5 * 60 * 1000, // 5 minutes: 뒤로가기 시 재요청 방지
    gcTime: 10 * 60 * 1000, // 캐시 보존 시간
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
