import { Box } from "@chakra-ui/react/box";
import { Image } from "@chakra-ui/react/image";
import { Text } from "@chakra-ui/react/text";

type AccountLinkButtonProps = {
  iconSrc: string;
  label: string;
  onClick?: () => void;
  isConnected?: boolean;
};

function AccountLinkButton({
  iconSrc,
  label,
  onClick,
  isConnected = false,
}: AccountLinkButtonProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      border="1px solid"
      borderColor="#e4e4e7"
      borderRadius="12px"
      px="16px"
      py="20px"
      gap="16px"
      w="full"
      bg="white"
    >
      <Box display="flex" alignItems="center" gap="12px">
        <Box boxSize="24px">
          <Image src={iconSrc} alt={label} boxSize="24px" objectFit="contain" />
        </Box>
        <Text fontWeight="500" color="gray.800" fontSize="sm">
          {label}
        </Text>
      </Box>
      <Text
        cursor={"pointer"}
        color={isConnected ? "gray.500" : "blue.600"}
        onClick={onClick}
        fontSize="sm"
        fontWeight="500"
      >
        {isConnected ? "연동됨" : "연동하기"}
      </Text>
    </Box>
  );
}

export default AccountLinkButton;
