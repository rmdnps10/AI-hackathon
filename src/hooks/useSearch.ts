import { useMutation } from "@tanstack/react-query";
import { search } from "../api/search";
import type { SearchRequest } from "../api/types";

/**
 * 인재 검색 mutation
 */
export const useSearch = () => {
  return useMutation({
    mutationFn: (data: SearchRequest) => search(data),
  });
};
