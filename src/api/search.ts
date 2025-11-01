import { api } from "./axiosInstance";
import type { SearchRequest, PersonaResponse } from "./types";

/**
 * 자연어 기반 인재 검색
 * AI가 검색 쿼리를 분석하여 Persona 객체를 생성합니다.
 */
export const search = async (data: SearchRequest): Promise<PersonaResponse> => {
  const response = await api.post<PersonaResponse>("/v1/search", data);
  return response.data;
};
