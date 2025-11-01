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
    <Box>
      <Heading
        fontSize={{ base: "20px", md: "22px" }}
        fontWeight="600"
        color="gray.900"
        fontFamily="'SUITE Variable', 'Inter', sans-serif"
      >
        {title}
      </Heading>
      {description ? (
        <Text mt="8px" fontSize="sm" color="gray.600">
          {description}
        </Text>
      ) : null}
      <Box mt={{ base: "16px", md: "20px" }}>{children}</Box>
    </Box>
  );
}

export default ProfileSection;
