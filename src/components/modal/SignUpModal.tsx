import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Heading } from "@chakra-ui/react/heading";
import { VStack } from "@chakra-ui/react/stack";
import { Text } from "@chakra-ui/react/text";
import { Image } from "@chakra-ui/react/image";
import { useState } from "react";
import styled from "@emotion/styled";
import { useSignIn, useSignUp } from "../../hooks/useAuth";
import { getGoogleOAuthUrl } from "../../api/auth";
import { isAxiosError } from "axios";

import googleIcon from "../../assets/google.svg";
import mailIcon from "../../assets/mail.svg";

type SignUpModalProps = {
  isOpen: boolean;
  onBackToLogin: () => void;
};

function SignUpModal({ isOpen, onBackToLogin }: SignUpModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUpMutation = useSignUp();
  const signInMutation = useSignIn();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signUpMutation.mutateAsync({ email, password });
      await signInMutation.mutateAsync({ email, password });
    } catch (error) {
      // 에러 메시지는 각각의 mutation 상태에서 렌더링됨
      if (error instanceof Error) {
        console.error("Sign-up flow failed:", error.message);
      }
    }
  };

  const handleGoogle = () => {
    if (typeof window === "undefined") return;
    window.location.href = getGoogleOAuthUrl(window.location.origin);
  };

  const signUpErrorMessage = signUpMutation.isError
    ? getErrorMessage(
        signUpMutation.error,
        "회원가입에 실패했습니다. 다시 시도해주세요."
      )
    : null;

  const signInErrorMessage = signInMutation.isError
    ? getErrorMessage(
        signInMutation.error,
        "회원가입은 완료됐지만 자동 로그인이 실패했습니다. 직접 로그인해주세요."
      )
    : null;

  const handleBackToLogin = () => {
    signUpMutation.reset();
    signInMutation.reset();
    setEmail("");
    setPassword("");
    onBackToLogin();
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      inset="0"
      bg="rgba(15, 23, 42, 0.65)"
      backdropFilter="blur(6px)"
      zIndex={1100}
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
        <VStack align="stretch" gap="20px">
          <Heading
            as="h2"
            fontSize={{ base: "22px", md: "24px" }}
            fontWeight="700"
            color="gray.900"
            fontFamily="'SUITE Variable', 'Inter', sans-serif"
          >
            회원가입
          </Heading>

          <Text fontSize="sm" color="gray.600" lineHeight="1.6">
            Gandalf 에 가입하고 커뮤니티 구성원의 프로필을 탐색해보세요. 가입
            즉시 개인화된 검색을 이용할 수 있어요.
          </Text>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack gap="12px" align="stretch">
              <VStack align="start" gap="3px">
                <FieldLabel htmlFor="signup-email">이메일</FieldLabel>
                <InputField
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                />
              </VStack>

              <VStack align="start" gap="3px">
                <FieldLabel htmlFor="signup-password">비밀번호</FieldLabel>
                <InputField
                  id="signup-password"
                  type="password"
                  placeholder="최소 8자 이상 입력해주세요"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="new-password"
                />
              </VStack>

              {(signUpErrorMessage || signInErrorMessage) && (
                <Text fontSize="sm" color="red.500">
                  {signUpErrorMessage || signInErrorMessage}
                </Text>
              )}

              <Button
                type="submit"
                height="44px"
                borderRadius="md"
                bg="gray.900"
                color="white"
                fontSize="sm"
                fontWeight="600"
                _hover={{ bg: "gray.800" }}
                loading={signUpMutation.isPending || signInMutation.isPending}
                loadingText={signInMutation.isPending ? "로그인 중" : "가입 중"}
                spinnerPlacement="end"
                gap="8px"
                mt="10px"
              >
                <Image src={mailIcon} alt="이메일 회원가입" boxSize="18px" />
                이메일로 가입하기
              </Button>
            </VStack>
          </form>

          <Box position="relative" textAlign="center" py="6px">
            <Box h="1px" w="100%" bg="gray.200" />
            <Text
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              px="8px"
              bg="white"
              fontSize="xs"
              color="gray.500"
            >
              또는 소셜 계정으로 가입하기
            </Text>
          </Box>

          <Button
            type="button"
            variant="outline"
            borderColor="gray.200"
            height="44px"
            borderRadius="md"
            _hover={{ bg: "gray.50" }}
            onClick={handleGoogle}
            gap="8px"
          >
            <Image src={googleIcon} alt="Google" boxSize="18px" />
            Google로 가입하기
          </Button>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt="8px"
          >
            <Text fontSize="xs" color="gray.500">
              이미 계정을 보유하고 계신가요?
            </Text>
            <Button
              type="button"
              variant="ghost"
              fontSize="sm"
              color="gray.700"
              onClick={handleBackToLogin}
              _hover={{ bg: "gray.100" }}
            >
              로그인 화면으로 돌아가기
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

const FieldLabel = styled.label`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
`;

export default SignUpModal;
