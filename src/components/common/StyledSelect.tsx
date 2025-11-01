import { chakra } from "@chakra-ui/react";
import { forwardRef, type ComponentProps } from "react";

const BaseSelect = chakra("select");

type StyledSelectProps = ComponentProps<typeof BaseSelect>;

const StyledSelect = forwardRef<HTMLSelectElement, StyledSelectProps>(
  ({ children, ...props }, ref) => (
    <BaseSelect
      ref={ref}
      height="40px"
      width="100%"
      pl="12px"
      pr="32px"
      border="1px solid #e4e4e7"
      borderRadius="4px"
      fontSize="sm"
      bg="white"
      color="gray.700"
      appearance="none"
      _focusVisible={{ borderColor: "gray.500", boxShadow: "none" }}
      backgroundImage="linear-gradient(45deg, transparent 50%, #27272a 50%), linear-gradient(135deg, #27272a 50%, transparent 50%)"
      backgroundPosition="calc(100% - 18px) 17px, calc(100% - 12px) 17px"
      backgroundSize="6px 6px, 6px 6px"
      backgroundRepeat="no-repeat"
      {...props}
    >
      {children}
    </BaseSelect>
  )
);

StyledSelect.displayName = "StyledSelect";

export default StyledSelect;
