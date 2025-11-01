import { HStack } from "@chakra-ui/react/stack";
import { Image } from "@chakra-ui/react/image";
import { Text } from "@chakra-ui/react/text";
import styled from "@emotion/styled";

type TabButtonProps = {
  label: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
};

const StyledButton = styled.button<{ isSelected: boolean }>`
  background: transparent;
  border: none;
  border-bottom: ${(props) =>
    props.isSelected ? "1px solid #18181B" : "1px solid lightgray"};
  border-radius: 0;
  padding: 8px 12px;
  color: black;
  font-size: 0.875rem;
  cursor: pointer;
  outline: none;
  box-shadow: none;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  &:active {
    background: rgba(0, 0, 0, 0.06);
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`;

function TabButton({ label, icon, isSelected, onClick }: TabButtonProps) {
  return (
    <StyledButton isSelected={isSelected} onClick={onClick}>
      <HStack gap="6px">
        <Image src={icon} alt={label} boxSize="16px" />
        <Text>{label}</Text>
      </HStack>
    </StyledButton>
  );
}

export default TabButton;
