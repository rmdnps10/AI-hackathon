import { useMemo } from "react";
import { Box } from "@chakra-ui/react/box";
import { Flex } from "@chakra-ui/react/flex";
import { Image } from "@chakra-ui/react/image";
import { Text } from "@chakra-ui/react/text";

const DEFAULT_AVATAR = "https://picsum.photos/200"; // base path; add query to vary by seed

type SearchResultCardProps = {
  name: string;
  subtitle: string;
  tags: string[];
  description: string;
  reason?: string;
  matchPercentage: number;
  avatarUrl?: string;
  onClick: () => void;
};

const clampPercentage = (value: number) => Math.min(100, Math.max(0, value));

function SearchResultCard({
  name,
  subtitle,
  tags,
  description,
  reason,
  matchPercentage,
  avatarUrl,
  onClick,
}: SearchResultCardProps) {
  const safePercentage = clampPercentage(matchPercentage);
  // 동일한 베이스 경로라도 쿼리값으로 리소스를 달리 인식시키기 위한 기본 아바타 URL
  const defaultAvatarUrl = useMemo(() => {
    const seed = encodeURIComponent(name || "anon");
    return `${DEFAULT_AVATAR}?random=${seed}`;
  }, [name]);
  const matchGradient = useMemo(() => {
    const angle = (safePercentage / 100) * 360;
    return `conic-gradient(#2563eb 0deg ${angle}deg, #e4e4e7 ${angle}deg 360deg)`;
  }, [safePercentage]);

  return (
    <Box
      border="1px solid"
      borderColor="#e4e4e7"
      borderRadius="16px"
      p="24px"
      display="flex"
      flexDirection="column"
      gap="24px"
      bg="white"
      height="100%"
      onClick={onClick}
    >
      <Box display="flex" alignItems="center" gap="12px">
        <Image
          src={avatarUrl ?? defaultAvatarUrl}
          alt={name}
          borderRadius="32px"
          boxSize="64px"
          objectFit="cover"
          flexShrink={0}
          border="1px solid"
          borderColor="#f4f4f5"
        />
        <Box flex="1" minWidth="0">
          <Text fontWeight="600" fontSize="18px" color="gray.900">
            {name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {subtitle}
          </Text>
        </Box>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        gap="6px"
        data-testid="search-result-tags"
        borderBottom="1px solid"
        pb={3}
        borderBottomColor="gray.200"
      >
        {tags.map((tag) => (
          <Box
            key={tag}
            px="10px"
            py="4px"
            borderRadius="md"
            fontSize="12px"
            fontWeight="500"
            bg="#f4f4f5"
            color="gray.700"
            whiteSpace="nowrap"
          >
            {tag}
          </Box>
        ))}
      </Box>

      {reason && (
        <Text fontSize="sm" color="gray.700" lineHeight="22px">
          {reason}
        </Text>
      )}

      <Text fontSize="sm" color="gray.600" lineHeight="22px">
        {description}
      </Text>

      <Flex align="center" gap="12px" mt="auto">
        <Box position="relative" w="32px" h="32px">
          <Box
            position="absolute"
            inset="0"
            borderRadius="full"
            background={matchGradient}
          />
          <Box
            position="absolute"
            inset="5px"
            borderRadius="full"
            bg="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="10px"
            fontWeight="600"
            color="gray.800"
          ></Box>
        </Box>
        <Text fontSize="sm" color="gray.700" fontWeight="500">
          {safePercentage}% 일치하는 인재
        </Text>
      </Flex>
    </Box>
  );
}

export default SearchResultCard;
