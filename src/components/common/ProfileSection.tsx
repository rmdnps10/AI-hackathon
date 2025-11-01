import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react/box";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";

type ProfileSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function ProfileSection({ title, description, children }: ProfileSectionProps) {
  return (
    <Box background={"#FAFAFA"} padding={"20px 20px"}>
      <Heading fontSize={{ base: "15px", md: "18px" }} fontWeight="600">
        {title}
      </Heading>
      {description ? (
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      ) : null}
      <Box mt={{ base: "16px", md: "20px" }}>{children}</Box>
    </Box>
  );
}

export default ProfileSection;
