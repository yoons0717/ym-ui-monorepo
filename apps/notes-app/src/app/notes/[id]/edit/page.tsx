'use client';

import { notFound, useRouter } from 'next/navigation';

import { useEditNote } from '@/hooks/useEditNote';
import { Navigation } from '@/components/Navigation';
import PageContainer from '@/components/PageContainer';
import PageContent from '@/components/PageContent';
import { NoteFormData } from '@/types/forms';
import { NoteForm } from '@/components/NoteForm';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorCard } from '@/components/ErrorCard';
import { use } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditNotePage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { originalNote, loading, error, saveNote } = useEditNote(id);

  const handleSubmit = async (formData: NoteFormData): Promise<void> => {
    const success = await saveNote(formData);
    if (success) {
      router.push(`/notes/${id}`);
    }
  };

  const handleCancel = (): void => {
    router.push(`/notes/${id}`);
  };

  if (loading) {
    return <LoadingSpinner message="노트를 불러오는 중..." />;
  }

  if (error === 'NOT_FOUND' || !originalNote) {
    notFound();
  }

  if (error && !originalNote) {
    return <ErrorCard message={error} />;
  }

  const navigationActions = (
    <>
      <span className="text-sm text-slate-600">노트 편집</span>
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

      <PageContent>
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-slate-900">노트 편집</h1>
          <p className="text-slate-600">내용을 수정하고 저장하세요.</p>
        </div>
        <NoteForm
          initialData={{
            title: originalNote.title,
            content: originalNote.content,
            tags: originalNote.tags || [],
            isPublic: originalNote.isPublic,
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel="저장하기"
          error={error}
        />
      </PageContent>
    </PageContainer>
  );
}
