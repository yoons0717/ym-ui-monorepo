'use client';

import { useState } from 'react';
import { Button, Card, Input } from '@workspace/uikit';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function NewNotePage() {
  const router = useRouter();

  // 새 노트 상태 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 새 태그 입력
  const [newTag, setNewTag] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const tempUserId = '00000000-0000-0000-0000-000000000000';

      // Supabase에 새 노트 저장
      const { data, error } = await supabase
        .from('notes')
        .insert({
          title: title.trim(),
          content: content.trim(),
          author_id: tempUserId, // 임시 사용자 ID (나중에 실제 인증으로 대체)
          is_public: isPublic,
          tags: tags,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log('생성된 노트:', data);

      // 생성 후 상세 페이지로 이동
      router.push(`/notes/${data.id}`);
    } catch (err: any) {
      console.error('노트 생성 중 오류:', err);
      setError(err.message || '노트를 생성할 수 없습니다.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCancel = () => {
    const hasContent = title.trim() || content.trim() || tags.length > 0;

    if (hasContent) {
      if (confirm('작성 중인 내용이 사라집니다. 정말 나가시겠습니까?')) {
        router.push('/notes');
      }
    } else {
      router.push('/notes');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
                <span className="text-sm font-bold text-white">N</span>
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
              <span className="text-slate-900">새 노트</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isCreating}
            >
              취소
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleCreate}
              disabled={isCreating || !title.trim()}
            >
              {isCreating ? '생성 중...' : '노트 생성'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <Card variant="default" padding="none">
          {/* Header */}
          <Card.Header className="p-8 pb-6">
            <div className="mb-6">
              <h1 className="mb-2 text-2xl font-bold text-slate-900">
                새 노트 작성
              </h1>
              <p className="text-slate-600">
                새로운 아이디어를 기록하고 팀과 공유해보세요.
              </p>
            </div>

            {/* Error Message */}
            {error && (
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
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  노트 제목 *
                </label>
                <Input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="노트 제목을 입력하세요"
                  className="text-xl font-semibold"
                  disabled={isCreating}
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
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                          disabled={isCreating}
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
                    placeholder="태그 입력 (예: 기획, 회의, 아이디어)"
                    className="flex-1"
                    disabled={isCreating}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddTag}
                    disabled={!newTag.trim() || isCreating}
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
                    disabled={isCreating}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
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
              <label className="mb-2 block text-sm font-medium text-slate-700">
                내용
              </label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="노트 내용을 입력하세요..."
                disabled={isCreating}
                className="h-96 w-full resize-none rounded-lg border border-slate-200 p-4 font-mono text-sm leading-relaxed text-slate-600 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
            </div>

            {/* Editor Info */}
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center space-x-4">
                <span>마크다운 지원</span>
                <span>•</span>
                <span>{content.length} 글자</span>
                <span>•</span>
                <span>{title.trim() ? '제목 입력됨' : '제목 필수'}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`${isCreating ? 'text-blue-600' : 'text-slate-400'}`}
                >
                  {isCreating ? '저장 중...' : '자동 저장: 비활성'}
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Bottom Actions */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isCreating}
          >
            ← 취소
          </Button>

          <div className="flex space-x-3">
            <Button variant="outline" disabled={isCreating}>
              임시저장
            </Button>
            <Button
              variant="primary"
              onClick={handleCreate}
              disabled={isCreating || !title.trim()}
            >
              {isCreating ? '생성 중...' : '노트 생성'}
            </Button>
          </div>
        </div>

        {/* Quick Tips */}
        <Card
          variant="default"
          padding="md"
          className="mt-8 border-blue-200 bg-blue-50"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="mt-0.5 h-5 w-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium text-blue-900">💡 팁</h4>
              <p className="text-sm text-blue-800">
                마크다운 문법을 사용해 서식을 지정할 수 있습니다. 태그를 활용해
                노트를 체계적으로 분류해보세요.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
