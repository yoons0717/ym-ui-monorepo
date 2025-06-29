'use client';

import { useState, useEffect, use } from 'react';
import { Note } from '@workspace/types';
import { Button, Card } from '@workspace/uikit';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Navigation } from '@/components/Navigation';
import PageContent from '@/components/PageContent';
import PageContainer from '@/components/PageContainer';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NotePage({ params }: PageProps) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = use(params);

  // Supabase에서 노트 불러오기
  useEffect(() => {
    async function fetchNote() {
      try {
        setLoading(true);
        const { data } = await supabase
          .from('notes')
          .select('*')
          .eq('id', id)
          .single();

        // Supabase 데이터를 Note 타입으로 변환
        const transformedNote: Note = {
          id: data.id,
          title: data.title,
          content: data.content,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          authorId: data.author_id,
          isPublic: data.is_public,
          tags: data.tags || [],
        };

        setNote(transformedNote);
      } catch (err) {
        console.error('노트를 불러오는 중 오류:', err);
        setError('노트를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

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

  if (error) {
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

  if (!note) {
    notFound();
  }

  const navigationActions = (
    <>
      <Button variant="outline">공유</Button>
      <Link href={`/notes/${note.id}/edit`}>
        <Button variant="primary">편집</Button>
      </Link>
    </>
  );

  return (
    <PageContainer>
      <Navigation
        breadcrumbs={[
          { label: '모든 노트', href: '/notes' },
          { label: note.title },
        ]}
        actions={navigationActions}
      />

      <PageContent>
        <Card variant="default" padding="none" className="mb-8">
          {/* Note Header */}
          <Card.Header className="p-8 pb-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex-1">
                <h1 className="mb-4 text-3xl font-bold text-slate-900">
                  {note.title}
                </h1>

                <div className="mb-4 flex flex-wrap gap-2">
                  {note.tags?.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ml-6 flex items-center space-x-2">
                {note.isPublic ? (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span>공개</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                    <span>비공개</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center space-x-6">
                <span className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full bg-slate-300"></div>
                  <span>작성자</span>
                </span>
                <span>생성: {note.createdAt.toLocaleDateString('ko-KR')}</span>
                <span>수정: {note.updatedAt.toLocaleDateString('ko-KR')}</span>
              </div>
            </div>
          </Card.Header>

          {/* Note Content */}
          <Card.Body className="p-8 pt-0">
            <div className="prose prose-slate max-w-none">
              <pre className="whitespace-pre-wrap font-sans leading-relaxed text-slate-700">
                {note.content}
              </pre>
            </div>
          </Card.Body>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
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
      </PageContent>
    </PageContainer>
  );
}
