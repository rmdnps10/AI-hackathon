import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Heading } from "@chakra-ui/react/heading";
import { VStack } from "@chakra-ui/react/stack";
import { Text } from "@chakra-ui/react/text";
import { Image } from "@chakra-ui/react/image";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useSignIn } from "../../hooks/useAuth";
import { isAxiosError } from "axios";

import mailIcon from "../../assets/mail.svg";

type LoginModalProps = {
  isOpen: boolean;
  onOpenSignUp: () => void;
};

function LoginModal({ isOpen, onOpenSignUp }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInMutation = useSignIn();
  const navigate = useNavigate();

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (isAxiosError(error)) {
      const data = error.response?.data as { message?: string } | undefined;
      if (data?.message) return data.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return fallback;
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInMutation.mutate({ email, password });
  };

  // Google 로그인 버튼 제거

  const headingText = "로그인";
  const descriptionText = "Gandalf 이용을 위해서 계정에 로그인해주세요.";
  const primaryButtonText = "이메일로 로그인하기";
  // 소셜 로그인 제거

  const primaryErrorMessage = signInMutation.isError
    ? getErrorMessage(
        signInMutation.error,
        "로그인에 실패했습니다. 다시 시도해주세요."
      )
    : null;

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      inset="0"
      bg="rgba(15, 23, 42, 0.65)"
      backdropFilter="blur(6px)"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: "16px", md: "0" }}
    >
      <Box
        w="100%"
        maxW="420px"
        bg="white"
        borderRadius="24px"
        p={{ base: "24px", md: "32px" }}
        boxShadow="0 24px 80px rgba(15, 23, 42, 0.15)"
      >
        <Heading
          as="h2"
          fontSize={{ base: "22px", md: "24px" }}
          fontWeight="700"
          color="gray.900"
          fontFamily="'SUITE Variable', 'Inter', sans-serif"
          mb="20px"
        >
          {headingText}
        </Heading>
        <VStack align="stretch" gap="20px">
          <Text fontSize="sm" color="gray.600">
            {descriptionText}
          </Text>

          <form onSubmit={handleLoginSubmit} style={{ width: "100%" }}>
            <VStack gap="12px" align="stretch">
              <VStack align="start" gap="3px">
                <Label htmlFor="login-email">이메일</Label>
                <InputField
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </VStack>

              <VStack align="start" gap="3px">
                <Label htmlFor="login-password">비밀번호</Label>
                <InputField
                  id="login-password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </VStack>

              {primaryErrorMessage && (
                <Text fontSize="sm" color="red.500">
                  {primaryErrorMessage}
                </Text>
              )}

              <Button
                type="submit"
                height="44px"
                borderRadius="md"
                bg="#111827"
                color="#ffffff"
                fontSize="sm"
                fontWeight="600"
                _hover={{ bg: "#1f2937" }}
                loading={signInMutation.isPending}
                loadingText="로그인 중"
                spinnerPlacement="end"
                gap="8px"
                mt="10px"
              >
                <Image src={mailIcon} alt="이메일 로그인" boxSize="18px" />
                {primaryButtonText}
              </Button>

              <Button
                type="button"
                height="40px"
                bg="#f3f4f6"
                color="#374151"
                fontSize="sm"
                fontWeight="500"
                borderRadius="md"
                onClick={onOpenSignUp}
                _hover={{ bg: "#e5e7eb" }}
              >
                회원가입
              </Button>
            </VStack>
          </form>

          {/* 소셜 로그인 옵션 제거됨 */}

          <Box textAlign="center" pt="8px">
            <Text fontSize="xs" color="gray.500" mb="8px">
              Gandalf가 처음이신가요?
            </Text>
            <Button
              type="button"
              variant="ghost"
              bg="transparent"
              fontSize="sm"
              color="#6366f1"
              fontWeight="600"
              onClick={() => navigate("/introduce")}
              _hover={{ bg: "#f5f3ff", color: "#4f46e5" }}
            >
              서비스 소개 보기 →
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

const InputField = styled.input`
  width: 100%;
  padding: 10px 12px;
  background-color: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: black;
  transition: all 0.2s;

  &:hover {
    border-color: #ddd6fe;
  }

  &:focus {
    outline: none;
    border-color: #c4b5fd;
    box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.3);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
`;

export default LoginModal;
