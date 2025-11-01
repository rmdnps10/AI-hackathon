import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react/box";
import { Container } from "@chakra-ui/react/container";
import { Heading } from "@chakra-ui/react/heading";
import { SimpleGrid } from "@chakra-ui/react/simple-grid";
import { HStack, VStack } from "@chakra-ui/react/stack";
import { Text } from "@chakra-ui/react/text";
import { Skeleton } from "@chakra-ui/react/skeleton";
import StyledSelect from "../components/common/StyledSelect";
import { Image } from "@chakra-ui/react/image";
import searchIcon from "../assets/search.svg";
import SearchResultCard from "../components/SearchResult/SearchResultCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchQuery } from "../hooks/useSearchQuery";

//
//
//

const suggestedOrganizations = [
  { value: "sogang", label: "서강대학교" },
  { value: "yonsei", label: "연세대학교" },
  { value: "korea", label: "고려대학교" },
];

// 유머러스한 팁 목록
const loadingTips = [
  "안 되네…? 어 되네…?",
  "git push --force 하니까 다 해결되던데요",
];

function SearchResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentTip, setCurrentTip] = useState("");
  const [typedTip, setTypedTip] = useState("");

  // URL 쿼리 파라미터에서 검색어 가져오기
  const searchQuery = searchParams.get("q");

  // Query 기반 검색 (캐시 유지)
  const {
    data: searchResult,
    isLoading,
    isError,
  } = useSearchQuery({ query_text: searchQuery ?? "", org_context: null });

  // 컴포넌트 마운트 시 랜덤 팁 선택
  useEffect(() => {
    if (!searchQuery) return;
    const randomTip =
      loadingTips[Math.floor(Math.random() * loadingTips.length)];
    setCurrentTip(randomTip);
  }, [searchQuery]);

  // 로딩 팁 타이핑 효과 (천천히 + 중간 끊김 방지)
  useEffect(() => {
    if (!currentTip) {
      setTypedTip("");
      return;
    }
    // 로딩이 끝나면 타이핑을 멈추고 전체 문구를 보여줘 끊김 방지
    if (!isLoading) {
      setTypedTip(currentTip);
      return;
    }

    const chars = Array.from(currentTip);
    let i = 0;
    let cancelled = false;
    setTypedTip("");

    const next = () => {
      if (cancelled) return;
      if (i >= chars.length) return;
      const ch = chars[i++];
      setTypedTip((prev) => prev + ch);
      // 공백/문장부호에 약간의 지연을 줘서 더 자연스럽게
      const delay = ch === " " ? 60 : /[,.!?…]/.test(ch) ? 260 : 95;
      timer = window.setTimeout(next, delay);
    };

    let timer = window.setTimeout(next, 150);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [currentTip, isLoading]);

  // 검색어가 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (!searchQuery) {
      navigate("/");
    }
  }, [searchQuery, navigate]);

  const handleCardClick = (candidateId: number) => {
    // 선택한 후보자 데이터 찾기
    const selectedCandidate = searchResult?.candidates_top4.find(
      (c) => c.id === candidateId
    );

    navigate("/search-detail", {
      state: { candidate: selectedCandidate },
    });
  };

  // isLoading은 최초 로딩, isFetching은 배경 리패치 상태

  // 에러 처리
  if (isError) {
    return (
      <Box bg="white" minH="100vh" py={{ base: "64px", md: "96px" }}>
        <Container maxW="1080px" px={{ base: "24px", md: "32px" }}>
          <VStack align="center" gap="24px" py="80px">
            <Text fontSize="xl" fontWeight="600" color="red.500">
              검색 중 오류가 발생했습니다
            </Text>
            <Text fontSize="sm" color="gray.600">
              다시 시도해주세요
            </Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg="white" minH="100vh" py={{ base: "64px", md: "96px" }}>
      <Container maxW="1080px" px={{ base: "24px", md: "32px" }}>
        <VStack align="stretch" gap={{ base: "24px", md: "32px" }}>
          <Box maxW={{ base: "100%", md: "265px" }}>
            <StyledSelect defaultValue="sogang">
              {suggestedOrganizations.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </StyledSelect>
          </Box>

          <HStack gap={2} alignItems={"center"}>
            <Image alt="Search Icon" src={searchIcon} />
            <Heading
              fontSize={{ base: "24px", md: "32px" }}
              fontWeight="700"
              color="gray.900"
              fontFamily="'SUITE Variable', 'Inter', sans-serif"
            >
              {searchQuery}
            </Heading>
          </HStack>

          {/* 로딩 중일 때 팁 표시 */}
          {isLoading && (
            <Box
              p="20px"
              bg="gradient-to-r from-purple-50 to-blue-50"
              borderRadius="12px"
              border="1px solid"
              borderColor="purple.100"
            >
              <Text
                fontSize="md"
                color="gray.700"
                fontWeight="500"
                textAlign="center"
                aria-live="polite"
              >
                {typedTip}
              </Text>
            </Box>
          )}

          {/* 로딩 중일 때 스켈레톤 */}
          {isLoading ? (
            <>
              <Skeleton height="20px" width="200px" borderRadius="md" />
              <SimpleGrid
                columns={{ base: 1, md: 2, xl: 3 }}
                gap={{ base: "16px", md: "20px", xl: "24px" }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Box
                    key={i}
                    border="1px solid"
                    borderColor="#e4e4e7"
                    borderRadius="16px"
                    p="24px"
                    display="flex"
                    flexDirection="column"
                    gap="24px"
                  >
                    <Box display="flex" alignItems="center" gap="12px">
                      <Skeleton
                        boxSize="64px"
                        borderRadius="32px"
                        flexShrink={0}
                      />
                      <Box flex="1">
                        <Skeleton height="20px" mb="8px" borderRadius="md" />
                        <Skeleton height="16px" width="80%" borderRadius="md" />
                      </Box>
                    </Box>
                    <Box display="flex" flexWrap="wrap" gap="6px">
                      <Skeleton height="24px" width="60px" borderRadius="md" />
                      <Skeleton height="24px" width="80px" borderRadius="md" />
                      <Skeleton height="24px" width="70px" borderRadius="md" />
                    </Box>
                    <Skeleton height="60px" borderRadius="md" />
                    <Skeleton height="32px" width="150px" borderRadius="md" />
                  </Box>
                ))}
              </SimpleGrid>
            </>
          ) : (
            <>
              {/* 검색 결과 안내 */}
              <Text fontSize="sm" color="gray.600">
                총 {searchResult?.candidates_top4.length || 0}명의 후보자를
                찾았습니다.
              </Text>

              <SimpleGrid
                columns={{ base: 1, md: 2, xl: 3 }}
                gap={{ base: "16px", md: "20px", xl: "24px" }}
              >
                {searchResult?.candidates_top4.map((candidate) => (
                  <SearchResultCard
                    onClick={() => handleCardClick(candidate.id)}
                    key={candidate.id}
                    name={candidate.name}
                    subtitle={candidate.description}
                    tags={[...candidate.keywords.slice(0, 4)]}
                    description={candidate.skills.slice(0, 3).join(" · ")}
                    matchPercentage={(() => {
                      const s = candidate.fit_score;
                      if (s == null || Number.isNaN(s as number)) return 0;
                      // 백엔드가 0~1 또는 0~100 스케일을 보낼 수 있어 양쪽을 지원
                      const pct = s <= 1 ? s * 100 : s;
                      // 안전한 반올림 + 클램프
                      const rounded = Math.round(pct);
                      return Math.max(0, Math.min(100, rounded));
                    })()}
                  />
                ))}
              </SimpleGrid>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default SearchResult;
