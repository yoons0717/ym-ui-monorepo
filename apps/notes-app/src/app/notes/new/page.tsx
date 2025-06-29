'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Navigation } from '@/components/Navigation';
import PageContainer from '@/components/PageContainer';
import PageContent from '@/components/PageContent';
import { NoteForm } from '@/components/NoteForm';
import { NoteFormData } from '@/types/forms';

export default function NewNotePage() {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: NoteFormData) => {
    setIsCreating(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('notes')
        .insert({
          title: formData.title,
          content: formData.content,
          author_id: '00000000-0000-0000-0000-000000000000',
          is_public: formData.isPublic,
          tags: formData.tags,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      router.push(`/notes/${data.id}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('노트를 생성할 수 없습니다.');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    router.push('/notes');
  };

  const navigationActions = (
    <>
      <span className="text-sm text-slate-600">새 노트 작성</span>
    </>
  );

  return (
    <PageContainer>
      <Navigation
        breadcrumbs={[
          { label: '모든 노트', href: '/notes' },
          { label: '새 노트' },
        ]}
        actions={navigationActions}
      />

      <PageContent>
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-slate-900">
            새 노트 작성
          </h1>
          <p className="text-slate-600">
            새로운 아이디어를 기록하고 팀과 공유해보세요.
          </p>
        </div>

        <NoteForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel="노트 생성"
          isSubmitting={isCreating}
          error={error}
          onErrorDismiss={() => setError(null)}
        />
      </PageContent>
    </PageContainer>
  );
}
