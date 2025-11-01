import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Container } from "@chakra-ui/react/container";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { VStack, HStack } from "@chakra-ui/react/stack";
import { SimpleGrid } from "@chakra-ui/react/simple-grid";
import { Link } from "react-router-dom";

function ServiceIntroduce() {
  const features = [
    {
      icon: "🔍",
      title: "자연어 검색",
      description:
        "찾고 싶은 사람을 텍스트로 설명하세요. AI가 유사도 벡터를 기반으로 가장 적합한 사람을 찾아드립니다.",
    },
    {
      icon: "🌐",
      title: "인적 네트워킹",
      description:
        "같은 커뮤니티 내에서 공통 관심사를 가진 사람과 쉽게 연결되어 네트워킹 기회를 확대하세요.",
    },
    {
      icon: "🤝",
      title: "팀원 매칭",
      description:
        "경력, 프로젝트, 관심사를 기반으로 자유롭게 검색하여 커뮤니티 내에서 내가 찾고 싶은 팀원을 찾아보세요.",
    },
    {
      icon: "✉️",
      title: "연락",
      description:
        "주저하지 말고 먼저 연락하세요! 용기를 내는 자가 인재를 잡습니다.",
    },
  ];

  return (
    <Box bg="#0d0d0d" minH="100vh">
      {/* Hero Section */}
      <Box
        bg="linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%)"
        color="white"
        py={{ base: "100px", md: "140px" }}
        position="relative"
        overflow="hidden"
      >
        {/* Background gradient effect */}
        <Box
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          width="800px"
          height="800px"
          bg="radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)"
          filter="blur(80px)"
          pointerEvents="none"
        />
        <Container
          maxW="1080px"
          px={{ base: "24px", md: "32px" }}
          position="relative"
          zIndex={1}
        >
          <VStack
            align="center"
            gap={{ base: "24px", md: "32px" }}
            textAlign="center"
          >
            <Heading
              fontSize={{ base: "48px", md: "72px" }}
              fontWeight="800"
              lineHeight="1.1"
              fontFamily="'SUITE Variable', 'Inter', sans-serif"
              letterSpacing="-0.03em"
              color="white"
              style={{
                background: "linear-gradient(to right, white, #9ca3af)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              당신이 찾는 사람,
              <br />
              자연어로 간편하게
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              maxW="600px"
              color="gray.400"
              lineHeight="1.6"
            >
              AI 기반 자연어 검색으로 대학 커뮤니티 내 최적의 인재를 빠르게
              찾아보세요
            </Text>

            <HStack gap={4} mt={8}>
              <Link to="/">
                <Button
                  size="lg"
                  bg="white"
                  color="black"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontWeight="600"
                  borderRadius="lg"
                  _hover={{
                    bg: "gray.200",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                >
                  지금 시작하기
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="1080px" px={{ base: "24px", md: "32px" }} py="100px">
        <VStack gap="80px" align="stretch">
          <VStack gap={4} textAlign="center">
            <Heading
              fontSize={{ base: "36px", md: "48px" }}
              fontWeight="700"
              color="white"
              fontFamily="'SUITE Variable', 'Inter', sans-serif"
              letterSpacing="-0.02em"
            >
              왜 Talent Pool인가요?
            </Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {features.map((feature, index) => (
              <Box
                key={index}
                p={8}
                bg="rgba(255, 255, 255, 0.03)"
                borderRadius="xl"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(10px)"
                transition="all 0.3s"
                _hover={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  bg: "rgba(255, 255, 255, 0.05)",
                  transform: "translateY(-4px)",
                }}
              >
                <VStack align="start" gap={4}>
                  <Box fontSize="40px">{feature.icon}</Box>
                  <Heading
                    fontSize="xl"
                    fontWeight="600"
                    color="white"
                    fontFamily="'SUITE Variable', 'Inter', sans-serif"
                  >
                    {feature.title}
                  </Heading>
                  <Text fontSize="md" color="gray.400" lineHeight="1.7">
                    {feature.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* How It Works Section */}
      <Box
        bg="rgba(255, 255, 255, 0.02)"
        py="100px"
        borderTop="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <Container maxW="1080px" px={{ base: "24px", md: "32px" }}>
          <VStack gap="80px" align="stretch">
            <VStack gap={4} textAlign="center">
              <Text
                fontSize="sm"
                fontWeight="600"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                사용 방법
              </Text>
              <Heading
                fontSize={{ base: "36px", md: "48px" }}
                fontWeight="700"
                color="white"
                fontFamily="'SUITE Variable', 'Inter', sans-serif"
                letterSpacing="-0.02em"
              >
                3단계로 간편하게
              </Heading>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={12}>
              {[
                {
                  step: "1",
                  title: "검색어 입력",
                  description:
                    "찾고 싶은 사람의 특징을 자연어로 설명하세요. 어떤 형태든 좋아요.",
                },
                {
                  step: "2",
                  title: "매칭 확인",
                  description:
                    "AI가 유사도 기반으로 판단한 최적의 후보자 리스트를 확인하세요! ",
                },
                {
                  step: "3",
                  title: "연락하기",
                  description: "마음에 드는 인재에게 바로 메일을 보내세요",
                },
              ].map((item, index) => (
                <VStack
                  key={index}
                  gap={6}
                  textAlign="center"
                  wordBreak={"break-all"}
                >
                  <Box
                    w="56px"
                    h="56px"
                    bg="rgba(255, 255, 255, 0.1)"
                    color="white"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="20px"
                    fontWeight="700"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.2)"
                  >
                    {item.step}
                  </Box>
                  <Heading
                    fontSize="lg"
                    fontWeight="600"
                    color="white"
                    fontFamily="'SUITE Variable', 'Inter', sans-serif"
                  >
                    {item.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                    {item.description}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py="100px">
        <Container maxW="800px" px={{ base: "24px", md: "32px" }}>
          <VStack
            gap={8}
            p={{ base: 10, md: 14 }}
            bg="rgba(255, 255, 255, 0.05)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
            borderRadius="2xl"
            textAlign="center"
            backdropFilter="blur(10px)"
          >
            <Heading
              fontSize={{ base: "32px", md: "40px" }}
              fontWeight="700"
              color="white"
              fontFamily="'SUITE Variable', 'Inter', sans-serif"
              letterSpacing="-0.02em"
            >
              지금 바로 시작해보세요
            </Heading>
            <Text fontSize="lg" color="gray.400" maxW="500px" lineHeight="1.7">
              대학 내 숨은 인재를 발굴하고, 완벽한 팀을 구성하세요
            </Text>
            <Link to="/">
              <Button
                size="lg"
                bg="white"
                color="black"
                px={10}
                py={6}
                fontSize="md"
                fontWeight="600"
                borderRadius="lg"
                _hover={{
                  bg: "gray.200",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
              >
                무료로 시작하기
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        bg="rgba(0, 0, 0, 0.3)"
        color="gray.500"
        py={8}
        borderTop="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <Container maxW="1080px" px={{ base: "24px", md: "32px" }}>
          <VStack gap={2}>
            <Text fontSize="sm">© 2025 Talent Pool. All rights reserved.</Text>
            <Text fontSize="xs">
              AI-powered talent matching for university communities
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

export default ServiceIntroduce;
