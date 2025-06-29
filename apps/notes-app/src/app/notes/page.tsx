'use client';

import { useState, useEffect } from 'react';
import { Note } from '@workspace/types';
import { Card, Button } from '@workspace/uikit';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Navigation } from '@/components/Navigation';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Supabase에서 노트 목록 불러오기
  useEffect(() => {
    async function fetchNotes() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Supabase 데이터를 Note 타입으로 변환
        const transformedNotes: Note[] = data.map(note => ({
          id: note.id,
          title: note.title,
          content: note.content,
          createdAt: new Date(note.created_at),
          updatedAt: new Date(note.updated_at),
          authorId: note.author_id,
          isPublic: note.is_public,
          tags: note.tags || [],
        }));

        setNotes(transformedNotes);
      } catch (err) {
        console.error('노트를 불러오는 중 오류:', err);
        setError('노트를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  const navigationActions = (
    <>
      <div className="flex items-center space-x-2 text-sm text-slate-600">
        {loading ? (
          <span>로딩 중...</span>
        ) : (
          <span>총 {notes.length}개 노트</span>
        )}
      </div>
      <Link href="/notes/new">
        <Button variant="primary">새 노트</Button>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation
        breadcrumbs={[{ label: '모든 노트' }]}
        actions={navigationActions}
      />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">모든 노트</h1>
            <p className="mt-1 text-slate-600">
              팀의 지식을 한 곳에서 관리하세요
            </p>
          </div>

          {/* Filter & Search */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="노트 검색..."
                className="w-64 rounded-lg border border-slate-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-slate-600">노트를 불러오는 중...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card
            variant="default"
            padding="md"
            className="mb-8 border-red-200 bg-red-50"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
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
              </div>
              <div>
                <h4 className="text-sm font-medium text-red-900">오류 발생</h4>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Notes Grid */}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map(note => (
              <Card
                key={note.id}
                className="group border border-slate-200 transition-all duration-200 hover:border-slate-300 hover:shadow-md"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                      {note.title}
                    </h3>
                    {note.isPublic ? (
                      <div className="ml-2 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-400"></div>
                    ) : (
                      <div className="ml-2 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-slate-300"></div>
                    )}
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1">
                    {note.tags?.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {note.tags && note.tags.length > 3 && (
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                        +{note.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 pb-4">
                  <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {note.content}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <span>
                      수정: {note.updatedAt.toLocaleDateString('ko-KR')}
                    </span>
                    <span className="flex items-center space-x-1">
                      <div className="h-4 w-4 rounded-full bg-slate-300"></div>
                      <span>작성자</span>
                    </span>
                  </div>

                  <Link href={`/notes/${note.id}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      열기
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && notes.length === 0 && (
          <Card className="py-16 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <svg
                className="h-8 w-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              아직 노트가 없습니다
            </h3>
            <p className="mb-6 text-slate-600">첫 번째 노트를 작성해보세요</p>
            <Link href="/notes/new">
              <Button variant="primary">새 노트 작성</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
