import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Container } from "@chakra-ui/react/container";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { VStack } from "@chakra-ui/react/stack";
import StyledSelect from "../components/common/StyledSelect";
import { Flex } from "@chakra-ui/react/flex";
import { Image } from "@chakra-ui/react/image";
import DynamicProfileSection from "../components/SearchDetailProfile/DynamicProfileSection";
import { mockDetail } from "../util/mockDetail";

import profileIcon from "../assets/profile.svg";
import mail from "../assets/mail.svg";

const organizations = [
  { value: "sogang", label: "서강대학교" },
  { value: "yonsei", label: "연세대학교" },
  { value: "korea", label: "고려대학교" },
];

// Mock 프로필 기본 정보
const mockProfileInfo = {
  name: "임인성 교수",
  subtitle: "컴퓨터공학과",
};

function SearchDetailProfile() {
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
                  {mockProfileInfo.name}
                </Heading>
              </Box>
              <Text fontSize="sm" color="gray.600">
                {mockProfileInfo.subtitle}
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
            >
              <Image src={mail} alt="메일 보내기" />
              메일 보내기
            </Button>
          </Flex>

          {/* 동적 데이터 렌더링 */}
          {mockDetail.map((item, index) => (
            <DynamicProfileSection key={index} item={item} />
          ))}
        </VStack>
      </Container>
    </Box>
  );
}

export default SearchDetailProfile;
