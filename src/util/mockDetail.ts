export interface TableCell {
  name: string;
  value: string;
}

export interface TableRow {
  cells: TableCell[];
}

export interface BadgeItem {
  name: string;
  link: string;
}

export interface LinkItem {
  name: string;
  href: string;
}

export type ProfileDataItem =
  | {
      type: "text";
      name: string;
      data: string;
    }
  | {
      type: "table";
      name: string;
      data: TableRow[];
    }
  | {
      type: "badgeList" | "badge list";
      name: string;
      data: BadgeItem[];
    }
  | {
      type: "links";
      name: string;
      data: LinkItem[];
    };

export const mockDetail: ProfileDataItem[] = [
  {
    type: "text",
    name: "연구분야",
    data: "본 연구실은 인공지능(AI) 기술을 활용한 영상 및 음성 인식 분야를 중점적으로 연구하고 있습니다. 머신러닝과 딥러닝 등 최신 인공지능 기법을 적용하여 복잡한 시각 및 청각 데이터를 분석하고, 이를 통해 객체 인식, 얼굴 인식, 다중 객체 추적, 음성 인식 등 다양한 핵심 기술을 개발하고 있습니다.",
  },
  { 
    type: "table",
    name: "경력",
    data: [
      {
        cells: [
          { name: "기간", value: "1995.01.01 ~ 1995.12.31" },
          {
            name: "기관",
            value: "USC Signal & Image Processing Institute",
          },
          { name: "직책", value: "Visiting Researcher" },
        ],
      },
      {
        cells: [
          { name: "기간", value: "1995.01.01 ~ 1997.12.31" },
          { name: "기관", value: "Samsung Electronics" },
          { name: "직책", value: "Senior Research Engineer" },
        ],
      },
      {
        cells: [
          { name: "기간", value: "1997.01.01 ~ 재직중" },
          { name: "기관", value: "Sogang University" },
          {
            name: "직책",
            value: "Assistant/Associate/Full Professor",
          },
        ],
      },
    ],
  },
  {
    type: "table",
    name: "학력",
    data: [
      {
        cells: [
          { name: "졸업 연도", value: "1995" },
          { name: "기관", value: "USC" },
          { name: "학위", value: "전자공학 박사" },
        ],
      },
      {
        cells: [
          { name: "졸업 연도", value: "1989" },
          { name: "기관", value: "서강대학교" },
          { name: "학위", value: "전자공학 석사" },
        ],
      },
      {
        cells: [
          { name: "졸업 연도", value: "1987" },
          { name: "기관", value: "서강대학교" },
          { name: "학위", value: "전자공학 학사" },
        ],
      },
    ],
  },
  {
    type: "badgeList",
    name: "소속",
    data: [{ name: "서강대학교", link: "https://www.sogang.ac.kr" }],
  },
  {
    type: "table",
    name: "문의처",
    data: [
      {
        cells: [
          { name: "담당자", value: "서강대학교산학협력단" },
          { name: "이메일", value: "tlo@sogang.ac.kr" },
          { name: "연락처", value: "02-3274-4863" },
        ],
      },
    ],
  },
  {
    type: "links",
    name: "관련 링크",
    data: [
      {
        name: "연구자 홈페이지",
        href: "http://grmanet.sogang.ac.kr/people_professor.html",
      },
      {
        name: "연구실 홈페이지",
        href: "http://grmanet.sogang.ac.kr/",
      },
    ],
  },
];
