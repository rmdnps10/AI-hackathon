import { useState } from "react";
import { Box } from "@chakra-ui/react/box";
import { Container } from "@chakra-ui/react/container";
import { VStack } from "@chakra-ui/react/stack";
import { SimpleGrid } from "@chakra-ui/react/simple-grid";
import AccountLinkButton from "../components/MyPage/AccountLinkButton";
import ProfileSection from "../components/common/ProfileSection";
import ResourceUploadTile from "../components/MyPage/ResourceUploadTile";
import ResourceCard from "../components/MyPage/ResourceCard";
import PageHeader from "../components/MyPage/PageHeader";
import QuestionAnswer from "../components/MyPage/QuestionAnswer";
import OrganizationCard from "../components/MyPage/OrganizationCard";
import ProfilePreview from "../components/MyPage/ProfilePreview";

import figmaIcon from "../assets/figma.svg";
import githubIcon from "../assets/github.svg";
import kaggleIcon from "../assets/kaggle.svg";
import notionIcon from "../assets/notion.svg";

type ResourceItem = {
  id: string;
  name: string;
  description?: string;
  url?: string;
};

const initialResources: ResourceItem[] = [
  {
    id: "resource-1",
    name: "중국 언어와 문화 자유논술.pdf",
    description:
      "중국 콘트라스트트레이딩 업로드 상황을 담은 국가 시스템 및 정책을 바탕으로 하여 정리된 문서.",
  },
  {
    id: "resource-2",
    name: "https://bento.me/3",
    description: "개인 정보를 정리한 바이오와 포트폴리오 링크.",
    url: "https://bento.me/3",
  },
  {
    id: "resource-3",
    name: "https://garden.postica.app/resume",
    description:
      "금융과 기계학습 기반의 다양한 프로젝트를 개발, UI, 디자인, 그리고 NLP 연구 프로젝트를 수행한 스토리라인이 정리되어 설명된 문서.",
    url: "https://garden.postica.app/resume",
  },
];

const accountProviders = [
  { label: "Figma Community", icon: figmaIcon },
  { label: "GitHub", icon: githubIcon },
  { label: "Kaggle", icon: kaggleIcon },
  { label: "Notion", icon: notionIcon },
];

const organizationCards = [
  {
    id: "org-1",
    title: "서강대학교 Release",
    year: "2020년 등록",
    placeholder: "동아리 소개 혹은 입회 당시 VISION을 적어주세요",
    emailSuffix: "sogang.ac.kr",
  },
  {
    id: "org-2",
    title: "서강대학교 컴퓨터과학과",
    year: "2020년 입학",
    placeholder: "전공 소개 혹은 학업 방향을 적어주세요",
    emailSuffix: "sogang.ac.kr",
  },
];

function MyPage() {
  const [answer, setAnswer] = useState("");
  const [resources, setResources] = useState<ResourceItem[]>(initialResources);
  const [selectedTab, setSelectedTab] = useState("수정");

  const handleUpload = (files: FileList) => {
    const uploadedItems: ResourceItem[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      description: "새로 업로드한 자료입니다.",
      url: URL.createObjectURL(file),
    }));
    setResources((prev) => [...uploadedItems, ...prev]);
  };

  const handleRemoveResource = (id: string) => {
    setResources((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box bg="white" minH="100vh" py={{ base: "56px", md: "80px" }}>
      <Container maxW="1080px" px={{ base: "20px", md: "32px" }}>
        <VStack align="stretch" gap={{ base: "24px", md: "32px" }}>
          <PageHeader
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            userName="천예준"
          />

          {selectedTab === "미리보기" ? (
            <ProfilePreview name="천예준" subtitle="컴퓨터공학과" />
          ) : selectedTab === "조직관리" ? (
            <Box />
          ) : (
            <>
              <ProfileSection title="지금까지 개발하면서 가장 재밌었던 제품이 무엇인가요?">
                <QuestionAnswer value={answer} onChange={setAnswer} />
              </ProfileSection>

              <ProfileSection title="자료">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="16px">
                  <ResourceUploadTile onFilesSelected={handleUpload} />
                  {resources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      name={resource.name}
                      description={resource.description}
                      href={resource.url}
                      onRemove={() => handleRemoveResource(resource.id)}
                    />
                  ))}
                </SimpleGrid>
              </ProfileSection>

              <ProfileSection title="계정 연동">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
                  {accountProviders.map((provider) => (
                    <AccountLinkButton
                      key={provider.label}
                      iconSrc={provider.icon}
                      label={provider.label}
                    />
                  ))}
                </SimpleGrid>
              </ProfileSection>

              <ProfileSection title="조직별 정보">
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap="20px">
                  {organizationCards.map((org) => (
                    <OrganizationCard key={org.id} {...org} />
                  ))}
                </SimpleGrid>
              </ProfileSection>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default MyPage;
