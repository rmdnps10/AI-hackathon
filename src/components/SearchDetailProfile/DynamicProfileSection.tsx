import { Box } from "@chakra-ui/react/box";
import { Text } from "@chakra-ui/react/text";
import { Link } from "@chakra-ui/react/link";
import { Badge } from "@chakra-ui/react/badge";
import { HStack, VStack } from "@chakra-ui/react/stack";
import type { ProfileDataItem } from "../../util/mockDetail";
import ProfileDataTable from "./ProfileDataTable";

interface DynamicProfileSectionProps {
  item: ProfileDataItem;
}

export default function DynamicProfileSection({
  item,
}: DynamicProfileSectionProps) {
  // Text 타입
  if (item.type === "text") {
    return (
      <Box>
        <Text
          fontSize="md"
          fontWeight="600"
          color="gray.900"
          mb={3}
          fontFamily="'SUITE Variable', 'Inter', sans-serif"
        >
          {item.name}
        </Text>
        <Text fontSize="sm" color="gray.700" lineHeight="24px">
          {item.data ?? ""}
        </Text>
      </Box>
    );
  }

  // Table 타입
  if (item.type === "table") {
    // 테이블 헤더를 API의 cells.name에서 유도
    const firstCells = item.data?.[0]?.cells ?? [];
    const headerPeriod = firstCells[0]?.name ?? "기간";
    const headerOrganization = firstCells[1]?.name ?? "소속";
    const headerContent = firstCells[2]?.name ?? "내용";

    // ProfileDataTable 형식으로 변환 (안전 가드 포함)
    const rows = (item.data ?? []).map((row) => {
      const cells = row?.cells ?? [];
      const period = cells[0]?.value ?? "";
      const organization = cells[1]?.value ?? "";
      const content = cells
        .slice(2)
        .map((c) => {
          const n = c?.name ?? "";
          const v = c?.value ?? "";
          return n && v ? `${n}: ${v}` : v || n;
        })
        .filter((s) => (s ?? "").toString().trim().length > 0)
        .join("\n");

      return { period, organization, content };
    });

    return (
      <Box>
        <Text
          fontSize="md"
          fontWeight="600"
          color="gray.900"
          mb={3}
          fontFamily="'SUITE Variable', 'Inter', sans-serif"
        >
          {item.name}
        </Text>
        <ProfileDataTable
          rows={rows}
          headers={{
            period: headerPeriod,
            organization: headerOrganization,
            content: headerContent,
          }}
        />
      </Box>
    );
  }

  // BadgeList 타입
  if (item.type === "badgeList" || item.type === "badge list") {
    return (
      <Box>
        <Text
          fontSize="md"
          fontWeight="600"
          color="gray.900"
          mb={3}
          fontFamily="'SUITE Variable', 'Inter', sans-serif"
        >
          {item.name}
        </Text>
        <HStack gap={2} flexWrap="wrap">
          {(item.data ?? []).map((badge, index) => (
            <Link
              key={index}
              href={badge?.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ textDecoration: "none" }}
            >
              <Badge
                colorScheme="blue"
                px={3}
                py={1}
                borderRadius="md"
                fontSize="sm"
                cursor="pointer"
                _hover={{ bg: "blue.600" }}
              >
                {badge?.name ?? ""}
              </Badge>
            </Link>
          ))}
        </HStack>
      </Box>
    );
  }

  // Links 타입
  if (item.type === "links") {
    return (
      <Box>
        <Text
          fontSize="md"
          fontWeight="600"
          color="gray.900"
          mb={3}
          fontFamily="'SUITE Variable', 'Inter', sans-serif"
        >
          {item.name}
        </Text>
        <VStack align="stretch" gap={2}>
          {(item.data ?? []).map((link, index) => (
            <Link
              key={index}
              href={link?.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              fontSize="sm"
              color="blue.600"
              _hover={{ color: "blue.700", textDecoration: "underline" }}
            >
              🔗 {link?.name ?? ""}
            </Link>
          ))}
        </VStack>
      </Box>
    );
  }

  return null;
}
