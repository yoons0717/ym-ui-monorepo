"use client";

import { useState, useEffect } from "react";
import { Note } from "@workspace/types";
import { Button, Card, Input } from "@workspace/uikit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

// 임시 데이터 (기존과 동일)
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
  params: { id: string };
}

export default function EditNotePage({ params }: PageProps) {
  const router = useRouter();
  const originalNote = mockNotes.find((n) => n.id === params.id);

  // 편집 상태 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // 새 태그 입력
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (originalNote) {
      setTitle(originalNote.title);
      setContent(originalNote.content);
      setTags(originalNote.tags || []);
      setIsPublic(originalNote.isPublic);
    }
  }, [originalNote]);

  useEffect(() => {
    if (originalNote) {
      const hasChanges =
        title !== originalNote.title ||
        content !== originalNote.content ||
        JSON.stringify(tags) !== JSON.stringify(originalNote.tags || []) ||
        isPublic !== originalNote.isPublic;
      setHasUnsavedChanges(hasChanges);
    }
  }, [title, content, tags, isPublic, originalNote]);

  if (!originalNote) {
    notFound();
  }

  const handleSave = async () => {
    setIsSaving(true);

    // 임시: 2초 딜레이로 저장 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 실제로는 API 호출
    console.log("저장된 노트:", {
      id: params.id,
      title,
      content,
      tags,
      isPublic,
    });

    setIsSaving(false);
    setHasUnsavedChanges(false);

    // 저장 후 상세 페이지로 이동
    router.push(`/notes/${params.id}`);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (confirm("저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?")) {
        router.push(`/notes/${params.id}`);
      }
    } else {
      router.push(`/notes/${params.id}`);
    }
  };

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
              <Link
                href={`/notes/${params.id}`}
                className="hover:text-slate-700 truncate max-w-[150px]"
              >
                {originalNote.title}
              </Link>
              <span>/</span>
              <span className="text-slate-900">편집</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <span className="text-sm text-amber-600 flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span>저장되지 않음</span>
              </span>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
            >
              취소
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
            >
              {isSaving ? "저장 중..." : "저장"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card variant="default" padding="none">
          {/* Editor Header */}
          <Card.Header className="p-8 pb-6">
            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  노트 제목
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="노트 제목을 입력하세요"
                  className="text-2xl font-bold border-0 px-0 focus:ring-0 shadow-none"
                />
              </div>

              {/* Tags Management */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  태그
                </label>

                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full group"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="새 태그 입력"
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                  >
                    추가
                  </Button>
                </div>
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    공개 노트
                  </span>
                </label>
                <span className="text-xs text-slate-500">
                  {isPublic
                    ? "모든 팀원이 볼 수 있습니다"
                    : "나만 볼 수 있습니다"}
                </span>
              </div>
            </div>
          </Card.Header>

          {/* Content Editor */}
          <Card.Body className="p-8 pt-0">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="노트 내용을 입력하세요..."
                className="w-full h-96 p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
              />
            </div>

            {/* Editor Toolbar */}
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center space-x-4">
                <span>마크다운 지원</span>
                <span>•</span>
                <span>{content.length} 글자</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-600">실시간 저장</span>
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Bottom Actions */}
        <div className="mt-8 flex justify-between items-center">
          <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
            ← 취소
          </Button>

          <div className="flex space-x-3">
            <Button variant="outline" disabled={isSaving}>
              미리보기
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
            >
              {isSaving ? "저장 중..." : "저장하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
