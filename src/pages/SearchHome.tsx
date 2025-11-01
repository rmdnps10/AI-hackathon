import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Container } from "@chakra-ui/react/container";
import { Heading } from "@chakra-ui/react/heading";
import { VStack } from "@chakra-ui/react/stack";
import { Text } from "@chakra-ui/react/text";
import { Textarea } from "@chakra-ui/react/textarea";
import { Wrap, WrapItem } from "@chakra-ui/react/wrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import StyledSelect from "../components/common/StyledSelect";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { useIsAuthenticated } from "../hooks/useAuth";
import LoginModal from "../components/modal/LoginModal";
import SignUpModal from "../components/modal/SignUpModal";

import scanSearchIcon from "../assets/scan-search.svg";
import userIcon from "../assets/user.svg";
import { Image } from "@chakra-ui/react/image";

//
//
//

const suggestedSearches = [
  "Spring을 통한 백엔드 개발에 능숙한 사람",
  "코딩없이 디자인을 깊이 다룰 줄 아는 사람",
  "개인 맞춤형 치약 스타트업을 만들고 싶은데, 같이 할만한 사람",
  "스타트업에 관심이 많은 사람",
  "딥러닝에 전문성이 있는 사람",
  "React/Next.js로 빠르게 프로토타입을 만드는 사람",
  "UI/UX 리서치와 사용자 경험 설계에 강한 사람",
  "하드웨어·IoT 아이디어를 함께 구현해볼 사람",
];

//
//
//

function SearchHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isAuthenticated, isLoading } = useIsAuthenticated();

  const { displayedText } = useTypingEffect({
    text: "어떤 사람을 찾아볼까요?",
    speed: 80,
    delay: 300,
  });

  const organizationOptions = [
    { value: "sogang", label: "서강대학교" },
    { value: "yonsei", label: "연세대학교" },
    { value: "korea", label: "고려대학교" },
  ];

  const handleSearch = () => {
    if (!isAuthenticated || !searchQuery.trim()) return;

    // 쿼리 파라미터로 검색어를 전달하면서 페이지 이동
    navigate(`/search-result?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSuggestedSearchClick = (searchText: string) => {
    setSearchQuery(searchText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSearch();
    }
  };

  useEffect(() => {
    if (isAuthenticated && isSignUpOpen) {
      setIsSignUpOpen(false);
    }
  }, [isAuthenticated, isSignUpOpen]);

  // Textarea 자동 포커스
  useEffect(() => {
    if (isAuthenticated && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Box bg="white" mx="auto" minH="100vh" py={{ base: "64px", md: "96px" }}>
        <Container maxW="1080px" px={{ base: "24px", md: "32px" }}>
          <VStack align="stretch" gap={{ base: "24px", md: "32px" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box maxW={{ base: "265px", md: "265px" }} width="100%">
                <StyledSelect defaultValue="sogang">
                  {organizationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </StyledSelect>
              </Box>
              <Button
                variant="ghost"
                p="8px"
                minW="auto"
                h="auto"
                onClick={() => navigate("/my-page")}
                _hover={{ bg: "gray.100" }}
                borderRadius="md"
                background={"none"}
                disabled={!isAuthenticated}
              >
                <Image src={userIcon} alt="마이페이지" boxSize="24px" />
              </Button>
            </Box>

            <Heading
              fontSize={{ base: "28px", md: "36px" }}
              fontWeight="700"
              lineHeight={{ base: "short", md: "shorter" }}
              color="gray.900"
              fontFamily="'SUITE Variable', 'Inter', sans-serif"
              minH={{ base: "42px", md: "54px" }}
            >
              {displayedText}
              <Box
                as="span"
                display="inline-block"
                w="2px"
                h="0.8em"
                bg="gray.900"
                ml="2px"
                style={{ animation: "blink 1s infinite" }}
              />
            </Heading>

            <Box>
              <Textarea
                ref={textareaRef}
                placeholder="Hello, World!"
                bg="#fafafa"
                border="1px solid"
                padding={"14px 20px"}
                borderColor="gray.200"
                borderRadius="8px"
                width="100%"
                minH={{ base: "160px", md: "136px" }}
                resize="none"
                fontSize="16px"
                color="black"
                boxShadow="0 6px 18px rgba(15, 23, 42, 0.06)"
                transition="box-shadow 200ms, border-color 200ms"
                _hover={{ boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)" }}
                _focusVisible={{
                  borderColor: "purple.200",
                  boxShadow: "0 10px 30px rgba(99,102,241,0.12)",
                }}
                _placeholder={{ color: "gray.400" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!isAuthenticated}
              />

              {/* 검색 */}

              <Box
                width="100%"
                display="flex"
                justifyContent="flex-end"
                mt={{ base: "8px", md: "12px" }}
              >
                <Button
                  type="button"
                  height={{ base: "36px", md: "32px" }}
                  px={{ base: "12px", md: "16px" }}
                  borderRadius="md"
                  bg="gray.900"
                  color="white"
                  fontSize={{ base: "sm", md: "sm" }}
                  _hover={{
                    bg: "gray.800",
                    boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)",
                  }}
                  onClick={handleSearch}
                  disabled={!isAuthenticated || !searchQuery.trim()}
                >
                  검색
                  <Image src={scanSearchIcon} alt="검색" ml="8px" />
                </Button>
              </Box>
            </Box>

            {/* 이런 검색어는 어떄요? */}

            <Box>
              <Text fontSize={{ base: "sm", md: "sm" }} color="gray.500" mb="2">
                이런 검색어는 어때요?
              </Text>
              <Wrap
                display="flex"
                flexWrap="wrap"
                gap={{ base: "6px", md: "8px" }}
              >
                {suggestedSearches.map((label) => (
                  <WrapItem key={label}>
                    <Button
                      variant="ghost"
                      size="sm"
                      borderRadius="md"
                      bg="#f4f4f5"
                      color="gray.700"
                      fontSize={{ base: "xs", md: "sm" }}
                      _hover={{ bg: "#e4e4e7" }}
                      onClick={() => handleSuggestedSearchClick(label)}
                      disabled={!isAuthenticated}
                    >
                      {label}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </VStack>
        </Container>
      </Box>

      <LoginModal
        isOpen={!isLoading && !isAuthenticated && !isSignUpOpen}
        onOpenSignUp={() => setIsSignUpOpen(true)}
      />
      <SignUpModal
        isOpen={!isLoading && !isAuthenticated && isSignUpOpen}
        onBackToLogin={() => setIsSignUpOpen(false)}
      />
    </>
  );
}

export default SearchHome;
