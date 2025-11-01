# Gandalf - AI 기반 인재 검색 플랫폼

> 자연어로 간편하게 찾는 당신의 인재

Gandalf는 대학 커뮤니티 내 인재를 자연어 검색으로 쉽게 찾을 수 있는 AI 기반 검색 플랫폼입니다.

## 🎯 주요 기능

### 🔍 자연어 검색

- "플래닛 검색 솔루션 개발했던 사람" 같은 자연스러운 문장으로 검색
- AI가 검색 의도를 분석하여 적합한 인재 추천
- 실시간 타이핑 효과로 직관적인 UX 제공

### 👤 프로필 관리

- 개인 프로필 작성 및 미리보기
- 조직별 프로필 관리
- 리소스(논문, 프로젝트 등) 업로드

### 🔐 인증 시스템

- 이메일 기반 회원가입/로그인
- Google OAuth 소셜 로그인
- JWT 토큰 기반 인증 관리

### 📧 커뮤니케이션

- 프로필에서 바로 메일 전송
- 조직별 연락처 관리

## 🛠 기술 스택

### Frontend

- **Framework**: React 19.1.1 + TypeScript 5.9.3
- **Build Tool**: Vite 7.1.7
- **UI Library**: Chakra UI v3.28.0
- **Styling**: Emotion (styled-components)
- **Animation**: Framer Motion 12.23.24

### State Management

- **Server State**: TanStack Query 5.90.5
- **Client State**: Jotai 2.15.0
- **Form State**: React useState/useRef

### Routing & HTTP

- **Router**: React Router DOM 7.9.5
- **HTTP Client**: Axios 1.13.1 (with interceptors)

### Authentication

- JWT (Access Token + Refresh Token)
- localStorage 기반 토큰 관리
- Axios interceptor로 자동 토큰 주입
- Custom event를 통한 인증 상태 동기화

## 📁 프로젝트 구조

```
talent-pool-frontend/
├── src/
│   ├── api/                    # API 레이어
│   │   ├── auth.ts            # 인증 API (signIn, signUp, OAuth)
│   │   ├── search.ts          # 검색 API
│   │   ├── axiosInstance.ts   # Axios 설정 및 interceptors
│   │   ├── types.ts           # API 타입 정의 (OpenAPI 기반)
│   │   └── index.ts           # API 모듈 export
│   │
│   ├── components/            # 재사용 컴포넌트
│   │   ├── common/           # 공통 컴포넌트
│   │   │   ├── ProfileSection.tsx
│   │   │   └── StyledSelect.tsx
│   │   ├── modal/            # 모달 컴포넌트
│   │   │   ├── LoginModal.tsx
│   │   │   └── SignUpModal.tsx
│   │   ├── MyPage/           # 마이페이지 전용 컴포넌트
│   │   │   ├── PageHeader.tsx
│   │   │   ├── ProfilePreview.tsx
│   │   │   ├── QuestionAnswer.tsx
│   │   │   ├── OrganizationCard.tsx
│   │   │   └── ...
│   │   ├── SearchDetailProfile/  # 검색 상세 컴포넌트
│   │   │   ├── DynamicProfileSection.tsx
│   │   │   ├── ProfileDataTable.tsx
│   │   │   └── ...
│   │   └── SearchResult/     # 검색 결과 컴포넌트
│   │       └── SearchResultCard.tsx
│   │
│   ├── hooks/                # Custom Hooks
│   │   ├── useAuth.ts       # 인증 관련 훅 (TanStack Query)
│   │   ├── useSearch.ts     # 검색 훅
│   │   └── useTypingEffect.ts  # 타이핑 애니메이션 훅
│   │
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── SearchHome.tsx          # 메인 검색 화면
│   │   ├── SearchResult.tsx        # 검색 결과 페이지
│   │   ├── SearchDetailProfile.tsx # 프로필 상세 페이지
│   │   ├── MyPage.tsx             # 마이페이지
│   │   └── ServiceIntroduce.tsx   # 서비스 소개 페이지
│   │
│   ├── util/                # 유틸리티
│   │   └── mockDetail.ts   # Mock 데이터
│   │
│   ├── styles/             # 전역 스타일
│   │   └── global.css     # CSS 애니메이션 등
│   │
│   ├── App.tsx            # 라우팅 설정 및 ProtectedRoute
│   ├── main.tsx           # 앱 진입점 (Chakra Provider, React Query)
│   └── openapi.json       # OpenAPI 명세서
│
├── public/                # 정적 파일
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🚀 시작하기

### 설치

```bash
npm install
```

### 환경변수 설정

`.env` 파일 생성:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

### 프로덕션 미리보기

```bash
npm run preview
```

## 🔑 주요 컴포넌트 설명

### 1. **ProtectedRoute** (`App.tsx`)

```tsx
// 인증이 필요한 라우트 보호
// 개발 모드 플래그로 인증 우회 가능
const isDevelopment = true; // 배포 시 false
```

### 2. **useAuth Hook** (`hooks/useAuth.ts`)

```tsx
// TanStack Query 기반 인증 상태 관리
const { isAuthenticated, user } = useIsAuthenticated();
const signInMutation = useSignIn();
const signUpMutation = useSignUp();
```

### 3. **Axios Interceptor** (`api/axiosInstance.ts`)

```tsx
// 요청: 자동 토큰 주입
// 응답: 401 에러 시 자동 로그아웃 및 이벤트 발생
```

### 4. **모달 시스템**

- `LoginModal`: 이메일/Google 로그인, 서비스 소개 링크
- `SignUpModal`: 회원가입 후 자동 로그인

## 🎨 디자인 시스템

### 색상

- **Primary**: `gray.900` (#111827) - 메인 버튼
- **Accent**: `purple.300` (#c4b5fd) - 포커스 상태
- **Background**: `#fafafa` - Input 배경
- **Border**: `gray.200` (#e5e7eb)

### 타이포그래피

- **Heading**: SUITE Variable, Inter (sans-serif)
- **Body**: 시스템 폰트 스택

### 반응형 브레이크포인트

- **base**: 모바일 (< 768px)
- **md**: 데스크톱 (≥ 768px)

## 🔐 인증 플로우

```
1. 사용자 로그인 → signIn API 호출
2. 서버에서 access_token, refresh_token 반환
3. localStorage에 토큰 저장
4. TanStack Query 캐시에 user 정보 저장
5. "auth-state-changed" 이벤트 발생
6. 모든 컴포넌트에서 useIsAuthenticated()로 상태 감지
7. Axios interceptor가 자동으로 토큰 주입
8. 401 에러 시 자동 로그아웃 및 리다이렉트
```

## 📝 API 엔드포인트

### 인증

- `POST /v1/auth/signup` - 회원가입
- `POST /v1/auth/signin` - 로그인
- `GET /v1/auth/me` - 현재 사용자 정보
- `POST /v1/auth/signout` - 로그아웃
- `GET /v1/auth/oauth/google/url` - Google OAuth URL
- `GET /v1/auth/oauth/linkedin/url` - LinkedIn OAuth URL

### 검색

- `POST /v1/search` - 자연어 검색
  - Request: `{ query: string, org_context?: object }`
  - Response: `PersonaResponse` (Persona 객체 배열)

## 🧪 개발 팁

### 인증 우회 (개발용)

**방법 1**: `App.tsx`에서 플래그 설정

```tsx
const isDevelopment = true; // ProtectedRoute 통과
```

**방법 2**: localStorage에 가짜 토큰 추가

```javascript
localStorage.setItem("access_token", "fake-token");
```

### 타입 안정성

- 모든 API 타입은 `src/api/types.ts`에 정의
- OpenAPI 명세서(`openapi.json`)와 동기화 유지

### 스타일링 가이드

- Chakra UI props 우선 사용
- 복잡한 스타일은 Emotion `styled` 사용
- 다크모드 대비 명시적 hex 색상 사용

## 📦 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify

```bash
# Build 명령어: npm run build
# Publish 디렉토리: dist
```

### 환경변수 설정 (배포 플랫폼)

```
VITE_API_BASE_URL=https://your-backend-api.com
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 👥 팀

**AI Hackathon 2025** - 26-2학기

---

**Built with ❤️ using React + TypeScript + Vite**
