import { Button } from "@chakra-ui/react/button";
import { Textarea } from "@chakra-ui/react/textarea";
import { VStack, HStack } from "@chakra-ui/react/stack";
import styled from "@emotion/styled";

type QuestionAnswerProps = {
  value: string;
  onChange: (value: string) => void;
  onSave?: () => void;
  onTempSave?: () => void;
};

function QuestionAnswer({
  value,
  onChange,
  onSave,
  onTempSave,
}: QuestionAnswerProps) {
  return (
    <VStack align="stretch" gap="12px">
      <StyledTextArea
        value={value}
        placeholder="답변을 입력해주세요."
        onChange={(e) => onChange(e.target.value)}
        _focusVisible={{ borderColor: "gray.500", boxShadow: "none" }}
      />
      <HStack gap="12px" justify="flex-end">
        <Button
          variant="solid"
          onClick={onTempSave}
          bg={"#E4E4E7"}
          color={"black"}
        >
          다른 질문 보기
        </Button>
        <Button variant="solid" bg="black" onClick={onSave}>
          저장
        </Button>
      </HStack>
    </VStack>
  );
}

const StyledTextArea = styled(Textarea)`
  border-radius: 10px;
  border: 1px solid #e4e4e7;
  background: #ffffff;
  min-height: 8rem;
  padding: 1.2rem 1.6rem;
  font-size: 16px;
`;

export default QuestionAnswer;
