import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Text } from "@chakra-ui/react/text";
import { Link } from "@chakra-ui/react/link";

type ResourceCardProps = {
  name: string;
  description?: string;
  onRemove?: () => void;
  href?: string;
};

function ResourceCard({ name, description, onRemove, href }: ResourceCardProps) {
  return (
    <Box
      border="1px solid"
      borderColor="#e4e4e7"
      borderRadius="12px"
      p="16px"
      bg="white"
      display="flex"
      flexDirection="column"
      gap="12px"
      position="relative"
    >
      {onRemove ? (
        <Button
          aria-label="자료 삭제"
          size="xs"
          variant="ghost"
          color="gray.500"
          position="absolute"
          top="8px"
          right="8px"
          onClick={onRemove}
          px="4px"
          fontSize="12px"
        >
          ×
        </Button>
      ) : null}
      <Text fontWeight="600" color="gray.900" fontSize="sm" pr="24px">
        {href ? (
          <Link href={href} target="_blank" rel="noopener noreferrer">
            {name}
          </Link>
        ) : (
          name
        )}
      </Text>
      {description ? (
        <Text fontSize="xs" color="gray.600" lineHeight="18px">
          {description}
        </Text>
      ) : null}
    </Box>
  );
}

export default ResourceCard;
