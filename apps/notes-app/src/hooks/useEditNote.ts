'use client';

import { useState, useEffect } from 'react';
import { Note } from '@workspace/types';
import { supabase } from '../lib/supabase';
import { NoteFormData, UpdateNoteRequest } from '../types/forms';

interface UseEditNoteReturn {
  originalNote: Note | null;
  loading: boolean;
  error: string | null;
  isSaving: boolean;
  saveNote: (formData: NoteFormData) => Promise<boolean>;
}

export function useEditNote(noteId: string): UseEditNoteReturn {
  const [originalNote, setOriginalNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 노트 불러오기
  useEffect(() => {
    async function fetchNote(): Promise<void> {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('id', noteId)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            throw new Error('NOT_FOUND');
          }
          throw error;
        }

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

        setOriginalNote(transformedNote);
      } catch (err) {
        if (err instanceof Error) {
          setError(
            err.message === 'NOT_FOUND'
              ? 'NOT_FOUND'
              : '노트를 불러올 수 없습니다.'
          );
        } else {
          setError('노트를 불러올 수 없습니다.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [noteId]);

  // 저장 함수
  const saveNote = async (formData: NoteFormData): Promise<boolean> => {
    setIsSaving(true);
    setError(null);

    try {
      const updateRequest: UpdateNoteRequest = {
        title: formData.title,
        content: formData.content,
        is_public: formData.isPublic,
        tags: formData.tags,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('notes')
        .update(updateRequest)
        .eq('id', noteId);

      if (error) {
        throw error;
      }

      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('노트를 저장할 수 없습니다.');
      }
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    originalNote,
    loading,
    error,
    isSaving,
    saveNote,
  };
}
