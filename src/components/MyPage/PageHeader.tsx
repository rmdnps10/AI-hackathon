import { Box } from "@chakra-ui/react/box";
import { Heading } from "@chakra-ui/react/heading";
import { HStack } from "@chakra-ui/react/stack";
import TabButton from "./TabButton";
import UserProfile from "./UserProfile";
import reviseIcon from "../../assets/revise.svg";
import previewIcon from "../../assets/preview.svg";
import organizationIcon from "../../assets/organization.svg";

type PageHeaderProps = {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
};

const tabs = [
  { label: "수정", icon: reviseIcon },
  { label: "미리보기", icon: previewIcon },
  { label: "조직관리", icon: organizationIcon },
];

function PageHeader({ selectedTab, onTabChange, userName }: PageHeaderProps) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Heading
          fontSize={{ base: "28px", md: "32px" }}
          fontWeight="700"
          color="gray.900"
          fontFamily="'SUITE Variable', 'Inter', sans-serif"
        >
          내 정보
        </Heading>
        <HStack gap="0px" mt="12px" flexWrap="wrap">
          {tabs.map((tab) => (
            <TabButton
              key={tab.label}
              label={tab.label}
              icon={tab.icon}
              isSelected={selectedTab === tab.label}
              onClick={() => onTabChange(tab.label)}
            />
          ))}
        </HStack>
      </Box>
      <UserProfile name={userName} />
    </Box>
  );
}

export default PageHeader;
