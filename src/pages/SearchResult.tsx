import { Box } from "@chakra-ui/react/box";
import { Container } from "@chakra-ui/react/container";
import { Heading } from "@chakra-ui/react/heading";
import { SimpleGrid } from "@chakra-ui/react/simple-grid";
import { HStack, VStack } from "@chakra-ui/react/stack";
import StyledSelect from "../components/common/StyledSelect";
import { Image } from "@chakra-ui/react/image";
import searchIcon from "../assets/search.svg";
import SearchResultCard from "../components/SearchResult/SearchResultCard";
import { useNavigate } from "react-router";

//
//
//

const suggestedOrganizations = [
  { value: "sogang", label: "서강대학교" },
  { value: "yonsei", label: "연세대학교" },
  { value: "korea", label: "고려대학교" },
];

const mockResults = [
  {
    id: 1,
    name: "천예준",
    subtitle: "경영학과 22학번",
    tags: ["UI 디자인", "커피 애호가", "백엔드 엔지니어", "스타트업 인턴 경험"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere eleifend faucibus.",
    matchPercentage: 80,
  },
  {
    id: 2,
    name: "천예준",
    subtitle: "경영학과 22학번",
    tags: [
      "UI 디자인",
      "커피 애호가",
      "백엔드 엔지니어",
      "컴퓨터과학 복수전공",
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere eleifend faucibus.",
    matchPercentage: 65,
  },
  {
    id: 3,
    name: "천예준",
    subtitle: "경영학과 22학번",
    tags: ["UI 디자인", "커피 애호가", "백엔드 엔지니어", "스타트업 인턴 경험"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere eleifend faucibus.",
    matchPercentage: 92,
  },
  {
    id: 4,
    name: "천예준",
    subtitle: "경영학과 22학번",
    tags: [
      "UI 디자인",
      "커피 애호가",
      "백엔드 엔지니어",
      "컴퓨터과학 복수전공",
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere eleifend faucibus.",
    matchPercentage: 72,
  },
  {
    id: 5,
    name: "천예준",
    subtitle: "경영학과 22학번",
    tags: ["UI 디자인", "커피 애호가", "백엔드 엔지니어", "스타트업 인턴 경험"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere eleifend faucibus.",
    matchPercentage: 83,
  },
  {
    id: 6,
    name: "천예준",
    subtitle: "경영학과 22학번",
    tags: [
      "UI 디자인",
      "커피 애호가",
      "백엔드 엔지니어",
      "컴퓨터과학 복수전공",
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere eleifend faucibus.",
    matchPercentage: 58,
  },
];

function SearchResult() {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/search-detail");
  };
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
              코딩이랑 디자인을 같이 할 줄 아는 사람
            </Heading>
          </HStack>

          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 3 }}
            gap={{ base: "16px", md: "20px", xl: "24px" }}
          >
            {mockResults.map((result) => (
              <SearchResultCard
                onClick={handleCardClick}
                key={result.id}
                name={result.name}
                subtitle={result.subtitle}
                tags={result.tags}
                description={result.description}
                matchPercentage={result.matchPercentage}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

export default SearchResult;
