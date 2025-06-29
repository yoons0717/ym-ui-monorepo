'use client';

import { useState } from 'react';
import { Button, Card, Input } from '@workspace/uikit';
import { NoteFormData } from '@/types/forms';

interface NoteFormProps {
  initialData?: Partial<NoteFormData>;
  onSubmit: (data: NoteFormData) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
  error?: string | null;
  onErrorDismiss?: () => void;
}

export function NoteForm({
  initialData = {},
  onSubmit,
  onCancel,
  isSubmitting = false,
  error,
  onErrorDismiss,
}: NoteFormProps) {
  // 폼 상태
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [isPublic, setIsPublic] = useState(initialData.isPublic || false);
  const [newTag, setNewTag] = useState('');

  // 태그 관리
  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    await onSubmit({
      title: title.trim(),
      content: content.trim(),
      tags,
      isPublic,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card variant="default" padding="none">
        <Card.Header className="p-8 pb-6">
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
                {onErrorDismiss && (
                  <button
                    type="button"
                    onClick={onErrorDismiss}
                    className="ml-auto text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                )}
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
                disabled={isSubmitting}
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
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                        disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  onKeyDown={e => {
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
                  disabled={!newTag.trim() || isSubmitting}
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
                  disabled={isSubmitting}
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
              disabled={isSubmitting}
              className="h-96 w-full resize-none rounded-lg border border-slate-200 p-4 text-sm leading-relaxed text-slate-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
          </div>
        </Card.Body>
      </Card>

      {/* Form Actions */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          ← 취소
        </Button>

        <div className="flex space-x-3">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !title.trim()}
          >
            저장하기
          </Button>
        </div>
      </div>
    </form>
  );
}
