import { Box } from "@chakra-ui/react/box";

type InfoChipListProps = {
  items: string[];
};

function InfoChipList({ items }: InfoChipListProps) {
  return (
    <Box display="flex" flexWrap="wrap" gap="8px">
      {items.map((item) => (
        <Box
          key={item}
          px="12px"
          py="6px"
          borderRadius="md"
          bg="#f4f4f5"
          color="gray.700"
          fontSize="sm"
          fontWeight="500"
          whiteSpace="nowrap"
        >
          {item}
        </Box>
      ))}
    </Box>
  );
}

export default InfoChipList;
