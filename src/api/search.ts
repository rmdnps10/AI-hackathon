import { api } from "./axiosInstance";
import type { SearchRequest, SearchResultResponse } from "./types";

/**
 * 자연어 기반 인재 검색
 * AI가 검색 쿼리를 분석하여 Persona 객체를 생성하고, 매칭되는 후보자를 반환합니다.
 */
export const search = async (
  data: SearchRequest
): Promise<SearchResultResponse> => {
  const response = await api.post<SearchResultResponse>("/v1/search", data);
  return response.data;
};
