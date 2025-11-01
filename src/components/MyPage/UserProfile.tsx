import { HStack } from "@chakra-ui/react/stack";
import { Image } from "@chakra-ui/react/image";
import { Text } from "@chakra-ui/react/text";
import profileIcon from "../../assets/profile.svg";

type UserProfileProps = {
  name: string;
};

function UserProfile({ name }: UserProfileProps) {
  return (
    <HStack gap="8px" color="gray.600">
      <Image src={profileIcon} alt="프로필" boxSize="24px" />
      <Text fontSize="sm" fontWeight="500">
        {name}
      </Text>
    </HStack>
  );
}

export default UserProfile;
