import {Note} from "@workspace/types";
import {Button, Card} from "@workspace/uikit";
import Link from "next/link";
import {notFound} from "next/navigation";

// 임시 데이터 (나중에 API로 대체)
const mockNotes: Note[] = [
  {
    id: "1",
    title: "프로젝트 기획서 - Q1 로드맵",
    content: `# 프로젝트 기획서 - Q1 로드맵

## 프로젝트 개요
새로운 프로젝트의 기획 내용을 정리합니다. 주요 기능과 일정, 리소스 계획을 포함하여 전체적인 방향성을 제시합니다.

## 주요 기능
1. **사용자 관리 시스템**
   - 회원가입/로그인
   - 프로필 관리
   - 권한 설정

2. **실시간 협업 도구**
   - 노트 공동 편집
   - 실시간 채팅
   - 버전 관리

3. **프로젝트 관리**
   - 칸반보드
   - 일정 관리
   - 진행률 추적

## 일정 계획
- **1월**: 기반 시스템 구축
- **2월**: 핵심 기능 개발  
- **3월**: 테스트 및 최적화

## 리소스 계획
- 개발자 3명
- 디자이너 1명
- PM 1명`,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
    authorId: "user1",
    isPublic: false,
    tags: ["기획", "프로젝트", "Q1"],
  },
  {
    id: "2",
    title: "개발팀 회의록 - 1월 15일",
    content: `# 개발팀 회의록 - 1월 15일

## 참석자
- 김개발 (팀장)
- 이코딩 (시니어 개발자)
- 박프론트 (프론트엔드 개발자)
- 최백엔드 (백엔드 개발자)

## 주요 논의사항

### 1. 이번 스프린트 진행 현황
- 사용자 인증 모듈: 90% 완료
- API 설계: 80% 완료
- 프론트엔드 컴포넌트: 70% 완료

### 2. 발견된 이슈
- 데이터베이스 성능 최적화 필요
- 모바일 반응형 디자인 개선 필요
- 테스트 코드 커버리지 부족

### 3. 다음 스프린트 계획
- 실시간 기능 구현 시작
- 성능 최적화 작업
- 테스트 코드 보강

## 액션 아이템
- [ ] 데이터베이스 인덱스 최적화 (최백엔드, ~1/20)
- [ ] 모바일 UI 개선 (박프론트, ~1/25)  
- [ ] 테스트 코드 작성 (전체팀, ~1/30)`,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
    authorId: "user2",
    isPublic: true,
    tags: ["회의", "개발팀", "스프린트"],
  },
];

interface PageProps {
  params: {id: string};
}

export default function NotePage({params}: PageProps) {
  const note = mockNotes.find((n) => n.id === params.id);

  if (!note) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-800">Notes</h1>
            </Link>

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <span>/</span>
              <Link href="/notes" className="hover:text-slate-700">
                모든 노트
              </Link>
              <span>/</span>
              <span className="text-slate-900 truncate max-w-[200px]">
                {note.title}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              공유
            </Button>
            <Link href={`/notes/${note.id}/edit`}>
              <Button variant="primary" size="sm">
                편집
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card variant="default" padding="none" className="mb-8">
          {/* Note Header */}
          <Card.Header className="p-8 pb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                  {note.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-6">
                {note.isPublic ? (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>공개</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span>비공개</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center space-x-6">
                <span className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                  <span>작성자</span>
                </span>
                <span>생성: {note.createdAt.toLocaleDateString("ko-KR")}</span>
                <span>수정: {note.updatedAt.toLocaleDateString("ko-KR")}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-600">2명이 보는 중</span>
                </span>
              </div>
            </div>
          </Card.Header>

          {/* Note Content */}
          <Card.Body className="p-8 pt-0">
            <div className="prose prose-slate max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
                {note.content}
              </pre>
            </div>
          </Card.Body>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link href="/notes">
            <Button variant="outline">← 목록으로</Button>
          </Link>

          <div className="flex space-x-3">
            <Button variant="outline">복사</Button>
            <Button variant="outline">내보내기</Button>
            <Link href={`/notes/${note.id}/edit`}>
              <Button variant="primary">편집하기</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
