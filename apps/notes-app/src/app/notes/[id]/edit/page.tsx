'use client';

import { useState, useEffect, use } from 'react';

import { Button, Card, Input } from '@workspace/uikit';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';

import { useEditNote } from '@/hooks/useEditNote';
import { Navigation } from '@/components/Navigation';
import PageContainer from '@/components/PageContainer';
import PageContent from '@/components/PageContent';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditNotePage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [newTag, setNewTag] = useState('');

  const {
    originalNote,
    loading,
    error,
    isSaving,
    hasUnsavedChanges,
    title,
    content,
    tags,
    isPublic,
    setTitle,
    setContent,
    setIsPublic,
    setError,
    saveNote,
    addTag,
    removeTag,
  } = useEditNote(id);

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (hasUnsavedChanges && !isSaving) {
          handleSave();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasUnsavedChanges, isSaving]);

  const handleSave = async () => {
    const success = await saveNote();
    if (success) {
      router.push(`/notes/${id}`);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (confirm('저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?')) {
        router.push(`/notes/${id}`);
      }
    } else {
      router.push(`/notes/${id}`);
    }
  };

  const handleAddTag = () => {
    if (addTag(newTag)) {
      setNewTag('');
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-slate-600">노트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error === 'NOT_FOUND') {
    notFound();
  }

  if (error && !originalNote) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Card variant="default" padding="lg" className="max-w-md text-center">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            오류 발생
          </h2>
          <p className="mb-6 text-slate-600">{error}</p>
          <Link href="/notes">
            <Button variant="primary">목록으로 돌아가기</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!originalNote) {
    notFound();
  }

  const navigationActions = (
    <>
      {hasUnsavedChanges && (
        <span className="flex items-center space-x-2 text-sm text-amber-600">
          <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></div>
          <span>저장되지 않음</span>
        </span>
      )}

      <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
        취소
      </Button>

      <Button
        variant="primary"
        onClick={handleSave}
        disabled={isSaving || !hasUnsavedChanges || !title.trim()}
      >
        {isSaving ? '저장 중...' : '저장'}
      </Button>
    </>
  );

  return (
    <PageContainer>
      <Navigation
        breadcrumbs={[
          { label: '모든 노트', href: '/notes' },
          { label: originalNote.title, href: `/notes/${id}` },
          { label: '편집' },
        ]}
        actions={navigationActions}
      />

      {/* Main Content */}
      <PageContent>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
        >
          <Card variant="default" padding="none">
            <Card.Header className="p-8 pb-6">
              <div className="mb-6">
                <h1 className="mb-2 text-2xl font-bold text-slate-900">
                  노트 편집
                </h1>
                <p className="text-slate-600">내용을 수정하고 저장하세요.</p>
              </div>

              {/* Error Message */}
              {error && error !== 'NOT_FOUND' && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-5 w-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-red-800">
                      {error}
                    </span>
                    <button
                      type="button"
                      onClick={() => setError(null)}
                      className="ml-auto text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    노트 제목 *
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="노트 제목을 입력하세요"
                    disabled={isSaving}
                    className="text-xl font-semibold"
                    required
                  />
                </div>

                {/* Tags Management */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    태그
                  </label>

                  {tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span
                          key={tag}
                          className="group inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                            disabled={isSaving}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Input
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      placeholder="새 태그 입력"
                      className="flex-1"
                      disabled={isSaving}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddTag}
                      disabled={!newTag.trim() || isSaving}
                    >
                      추가
                    </Button>
                  </div>
                </div>

                {/* Visibility Toggle */}
                <div className="flex items-center space-x-3">
                  <label className="flex cursor-pointer items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={e => setIsPublic(e.target.checked)}
                      disabled={isSaving}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      공개 노트
                    </span>
                  </label>
                  <span className="text-xs text-slate-500">
                    {isPublic
                      ? '모든 팀원이 볼 수 있습니다'
                      : '나만 볼 수 있습니다'}
                  </span>
                </div>
              </div>
            </Card.Header>

            {/* Content Editor */}
            <Card.Body className="p-8 pt-0">
              <div>
                <label
                  htmlFor="content"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  내용
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="노트 내용을 입력하세요..."
                  disabled={isSaving}
                  className="h-96 w-full resize-none rounded-lg border border-slate-200 p-4 font-mono text-sm leading-relaxed focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center space-x-4">
                  <span>마크다운 지원</span>
                  <span>•</span>
                  <span>{content.length} 글자</span>
                  <span>•</span>
                  <span>Ctrl+S로 저장</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`flex items-center space-x-1 ${hasUnsavedChanges ? 'text-amber-600' : 'text-green-600'}`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${hasUnsavedChanges ? 'bg-amber-400' : 'bg-green-400'}`}
                    ></div>
                    <span>
                      {hasUnsavedChanges ? '저장되지 않음' : '저장됨'}
                    </span>
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Bottom Actions */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              ← 취소
            </Button>

            <div className="flex space-x-3">
              <Button type="button" variant="outline" disabled={isSaving}>
                미리보기
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSaving || !hasUnsavedChanges || !title.trim()}
              >
                {isSaving ? '저장 중...' : '저장하기'}
              </Button>
            </div>
          </div>
        </form>
      </PageContent>
    </PageContainer>
  );
}
