// API Types based on OpenAPI spec

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  user_id: string;
  email: string;
  message: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user: Record<string, unknown>;
  token_type?: string;
}

export interface UserResponse {
  id: string;
  email: string;
}

export interface OAuthInitRequest {
  provider: string;
  redirect_to?: string | null;
}

export interface OAuthInitResponse {
  url: string;
  provider: string;
}

export interface HardSkills {
  name: string;
  level: string;
}

export interface HardConstraints {
  location_any_of?: string[] | null;
  must_have?: string[] | null;
}

export interface SoftPreferences {
  nice_to_have?: string[] | null;
  weights?: Record<string, number> | null;
}

export interface OrgContext {
  mission?: string | null;
  stack?: string[] | null;
  collab_style?: string[] | null;
}

export interface Persona {
  titles?: string[];
  domains?: string[];
  skills_hard?: HardSkills[];
  skills_soft?: string[];
  seniority?: string[];
  outcomes?: string[];
  constraints_hard?: HardConstraints;
  preferences_soft?: SoftPreferences;
  org_context?: OrgContext;
  query_text: string;
}

export interface SearchRequest {
  query_text: string;
  org_context?: Record<string, unknown> | null;
}

export interface PersonaResponse {
  persona: Persona;
}

// 실제 검색 결과 타입
export interface CardCell {
  name: string;
  value: string;
}

export interface CardDataRow {
  cells: CardCell[];
}

export interface CandidateCard {
  name: string;
  type: "table" | "text";
  data: CardDataRow[] | string;
}

export interface Candidate {
  id: number;
  name: string;
  description: string;
  keywords: string[];
  skills: string[];
  cards: CandidateCard[];
  fit_score: number;
  reason_ko: string;
  email: string;
  created_at: string;
}

export interface SearchResultResponse {
  query_summary: string;
  candidates_top4: Candidate[];
  latency_ms: number;
}
