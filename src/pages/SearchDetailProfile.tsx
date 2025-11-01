import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Container } from "@chakra-ui/react/container";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { VStack } from "@chakra-ui/react/stack";
import StyledSelect from "../components/common/StyledSelect";
import { Flex } from "@chakra-ui/react/flex";
import { Image } from "@chakra-ui/react/image";
import { Badge } from "@chakra-ui/react/badge";
import DynamicProfileSection from "../components/SearchDetailProfile/DynamicProfileSection";
import { useLocation, useNavigate } from "react-router-dom";
import type { Candidate } from "../api/types";
import type { ProfileDataItem } from "../util/mockDetail";

import profileIcon from "../assets/profile.svg";
import mail from "../assets/mail.svg";

const organizations = [
  { value: "sogang", label: "서강대학교" },
  { value: "yonsei", label: "연세대학교" },
  { value: "korea", label: "고려대학교" },
];

// CandidateCard를 ProfileDataItem으로 변환
const convertToProfileDataItem = (
  card: Candidate["cards"][0]
): ProfileDataItem => {
  if (card.type === "text") {
    return {
      type: "text",
      name: card.name,
      data: card.data as string,
    };
  } else {
    // table type - CardDataRow[]를 TableRow[]로 변환
    return {
      type: "table",
      name: card.name,
      data: Array.isArray(card.data) ? card.data : [],
    };
  }
};

function SearchDetailProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  // SearchResult에서 전달받은 후보자 데이터
  const { candidate } = (location.state || {}) as {
    candidate?: Candidate;
  };

  // 후보자 데이터가 없으면 홈으로 리다이렉트
  if (!candidate) {
    navigate("/");
    return null;
  }

  const handleSendEmail = () => {
    window.location.href = `mailto:${candidate.email}`;
  };

  return (
    <Box bg="white" minH="100vh" py={{ base: "64px", md: "96px" }}>
      <Container maxW="1080px" px={{ base: "24px", md: "32px" }}>
        <VStack align="stretch" gap={{ base: "24px", md: "32px" }}>
          <Box maxW={{ base: "100%", md: "265px" }}>
            <StyledSelect defaultValue="sogang">
              {organizations.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </StyledSelect>
          </Box>

          <Flex justify="space-between" align="center">
            <Box display="flex" alignItems="center" gap="12px">
              <Image src={profileIcon} />
              <Box>
                <Heading
                  fontSize={{ base: "28px", md: "32px" }}
                  fontWeight="700"
                  color="gray.900"
                  fontFamily="'SUITE Variable', 'Inter', sans-serif"
                >
                  {candidate.name}
                </Heading>
              </Box>
              <Text fontSize="sm" color="gray.600">
                {candidate.description}
              </Text>
            </Box>
            <Button
              alignSelf={{ base: "flex-start", md: "center" }}
              height="40px"
              px="16px"
              borderRadius="md"
              bg="gray.900"
              color="white"
              fontSize="sm"
              display="flex"
              alignItems="center"
              gap="8px"
              _hover={{ bg: "gray.800" }}
              onClick={handleSendEmail}
            >
              <Image src={mail} alt="메일 보내기" />
              메일 보내기
            </Button>
          </Flex>

          {/* 키워드 배지 */}
          <Box>
            <Text
              fontSize="md"
              fontWeight="600"
              color="gray.900"
              mb={3}
              fontFamily="'SUITE Variable', 'Inter', sans-serif"
            >
              키워드
            </Text>
            <Flex gap={2} flexWrap="wrap">
              {(candidate.keywords ?? []).map((keyword, index) => (
                <Badge
                  key={index}
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  bg="purple.100"
                  color="purple.700"
                >
                  {keyword}
                </Badge>
              ))}
            </Flex>
          </Box>

          {/* 스킬 배지 */}
          <Box>
            <Text
              fontSize="md"
              fontWeight="600"
              color="gray.900"
              mb={3}
              fontFamily="'SUITE Variable', 'Inter', sans-serif"
            >
              스킬
            </Text>
            <Flex gap={2} flexWrap="wrap">
              {(candidate.skills ?? []).map((skill, index) => (
                <Badge
                  key={index}
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  bg="blue.100"
                  color="blue.700"
                >
                  {skill}
                </Badge>
              ))}
            </Flex>
          </Box>

          {/* 동적 데이터 렌더링 (cards) */}
          {(candidate.cards ?? []).map((card, index) => (
            <DynamicProfileSection
              key={index}
              item={convertToProfileDataItem(card)}
            />
          ))}
        </VStack>
      </Container>
    </Box>
  );
}

export default SearchDetailProfile;
