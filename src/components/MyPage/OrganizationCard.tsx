import { useState } from "react";
import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { HStack } from "@chakra-ui/react/stack";
import { Input } from "@chakra-ui/react/input";

type OrganizationCardProps = {
  title: string;
  year: string;
  placeholder: string;
  emailSuffix: string;
  onSave?: (data: { description: string; email: string }) => void;
};

function OrganizationCard({
  title,
  year,
  placeholder,
  emailSuffix,
  onSave,
}: OrganizationCardProps) {
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    if (onSave) {
      onSave({ description, email: `${email}@${emailSuffix}` });
    }
  };
  return (
    <Box
      border="1px solid #e4e4e7"
      borderRadius="16px"
      p={{ base: "16px", md: "20px" }}
      bg="white"
      display="flex"
      flexDirection="column"
      gap="16px"
    >
      <Box>
        <Heading fontSize="lg" fontWeight="600" color="gray.900">
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.500" mt="4px">
          {year}
        </Text>
      </Box>
      <Box>
        <Text fontSize="xs" color="gray.600" mb="6px" fontWeight="600">
          설명
        </Text>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={placeholder}
          fontSize="sm"
          height="40px"
          borderColor="#e4e4e7"
          _focusVisible={{ borderColor: "gray.500", boxShadow: "none" }}
        />
      </Box>
      <Box>
        <Text fontSize="xs" color="gray.600" mb="6px" fontWeight="600">
          이메일
        </Text>
        <HStack gap="8px" align="center">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example"
            fontSize="sm"
            height="40px"
            borderColor="#e4e4e7"
            _focusVisible={{ borderColor: "gray.500", boxShadow: "none" }}
          />
          <Box
            border="1px solid #e4e4e7"
            borderRadius="10px"
            px="12px"
            py="9px"
            fontSize="sm"
            color="gray.600"
            whiteSpace="nowrap"
          >
            @{emailSuffix}
          </Box>
        </HStack>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          height="40px"
          px="16px"
          onClick={handleSave}
          bg="black"
          color="white"
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}

export default OrganizationCard;
