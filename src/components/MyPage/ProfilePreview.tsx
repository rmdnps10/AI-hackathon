import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { VStack } from "@chakra-ui/react/stack";
import { Flex } from "@chakra-ui/react/flex";
import { Image } from "@chakra-ui/react/image";
import DynamicProfileSection from "../SearchDetailProfile/DynamicProfileSection";
import { mockDetail } from "../../util/mockDetail";

import profileIcon from "../../assets/profile.svg";
import mail from "../../assets/mail.svg";

type ProfilePreviewProps = {
  name: string;
  subtitle: string;
};

function ProfilePreview({ name, subtitle }: ProfilePreviewProps) {
  // "잘 어울리는 점"과 "아쉬울 수 있는 점" 제외
  const filteredData = mockDetail.filter(
    (item) =>
      item.name !== "잘 어울리는 점" && item.name !== "아쉬울 수 있는 점"
  );

  return (
    <VStack align="stretch" gap={{ base: "24px", md: "32px" }}>
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
              {name}
            </Heading>
          </Box>
          <Text fontSize="sm" color="gray.600">
            {subtitle}
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

      {/* 동적 데이터 렌더링 (필터링된) */}
      {filteredData.map((item, index) => (
        <DynamicProfileSection key={index} item={item} />
      ))}
    </VStack>
  );
}

export default ProfilePreview;
