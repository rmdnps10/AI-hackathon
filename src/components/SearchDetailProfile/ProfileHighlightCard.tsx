import { Box } from "@chakra-ui/react/box";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";

type HighlightItem = {
  title: string;
  description: string;
};

type ProfileHighlightCardProps = {
  items: HighlightItem[];
};

function ProfileHighlightCard({ items }: ProfileHighlightCardProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: `repeat(${items.length}, 1fr)` }}
      gap="8px"
      borderRadius="16px"
      border="1px solid"
      borderColor="#e4e4e7"
      overflow="hidden"
      bg="white"
    >
      {items.map((item, index) => (
        <Box
          key={item.title}
          p={{ base: "16px", md: "20px" }}
          bg="#f4f4f5"
          borderRightWidth={{
            base: "0",
            md: index === items.length - 1 ? "0" : "1px",
          }}
          borderRightStyle="solid"
          borderRightColor={{
            base: "transparent",
            md: index === items.length - 1 ? "transparent" : "#e4e4e7",
          }}
        >
          <Heading
            fontSize="sm"
            fontWeight="600"
            color="gray.800"
            mb="8px"
            textTransform="uppercase"
            letterSpacing="0.6px"
          >
            {item.title}
          </Heading>
          <Text fontSize="sm" color="gray.700" lineHeight="22px">
            {item.description}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

export default ProfileHighlightCard;
