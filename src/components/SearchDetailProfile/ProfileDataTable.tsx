import { Box } from "@chakra-ui/react/box";
import { Text } from "@chakra-ui/react/text";

type ProfileDataRow = {
  period: string;
  organization: string;
  content: string;
};

type ProfileDataTableProps = {
  rows: ProfileDataRow[];
  headers?: {
    period?: string;
    organization?: string;
    content?: string;
  };
};

const defaultHeaders = {
  period: "기간",
  organization: "소속",
  content: "내용",
};

function ProfileDataTable({
  rows,
  headers = defaultHeaders,
}: ProfileDataTableProps) {
  return (
    <Box border="1px solid" borderColor="#e4e4e7" borderRadius="12px" overflow="hidden">
      <Box
        display={{ base: "none", md: "grid" }}
        gridTemplateColumns="0.9fr 1fr 1.8fr"
        bg="#f4f4f5"
        px="20px"
        py="12px"
        gap="12px"
        borderBottom="1px solid"
        borderColor="#e4e4e7"
      >
        <Text fontSize="sm" fontWeight="600" color="gray.700">
          {headers.period ?? defaultHeaders.period}
        </Text>
        <Text fontSize="sm" fontWeight="600" color="gray.700">
          {headers.organization ?? defaultHeaders.organization}
        </Text>
        <Text fontSize="sm" fontWeight="600" color="gray.700">
          {headers.content ?? defaultHeaders.content}
        </Text>
      </Box>

      {rows.map((row, index) => (
        <Box
          key={`${row.period}-${row.organization}-${index}`}
          borderBottom={
            index === rows.length - 1 ? "0" : "1px solid #e4e4e7"
          }
        >
          <Box
            display={{ base: "block", md: "grid" }}
            gridTemplateColumns={{ base: "1fr", md: "0.9fr 1fr 1.8fr" }}
            gap="12px"
            px={{ base: "16px", md: "20px" }}
            py={{ base: "16px", md: "14px" }}
          >
            <Box>
              <Text
                display={{ base: "block", md: "none" }}
                fontSize="xs"
                fontWeight="600"
                color="gray.500"
                mb="4px"
              >
                {headers.period ?? defaultHeaders.period}
              </Text>
              <Text fontSize="sm" color="gray.700">
                {row.period}
              </Text>
            </Box>
            <Box>
              <Text
                display={{ base: "block", md: "none" }}
                fontSize="xs"
                fontWeight="600"
                color="gray.500"
                mb="4px"
              >
                {headers.organization ?? defaultHeaders.organization}
              </Text>
              <Text fontSize="sm" color="gray.700">
                {row.organization}
              </Text>
            </Box>
            <Box>
              <Text
                display={{ base: "block", md: "none" }}
                fontSize="xs"
                fontWeight="600"
                color="gray.500"
                mb="4px"
              >
                {headers.content ?? defaultHeaders.content}
              </Text>
              <Text fontSize="sm" color="gray.700" lineHeight="22px">
                {row.content}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export type { ProfileDataRow };
export default ProfileDataTable;
