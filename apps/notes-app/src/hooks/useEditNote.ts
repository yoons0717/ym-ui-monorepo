'use client';

import { useState, useEffect } from 'react';
import { Note } from '@workspace/types';
import { supabase } from '../lib/supabase';

export function useEditNote(noteId: string) {
  const [originalNote, setOriginalNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    async function fetchNote() {
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
        setTitle(transformedNote.title);
        setContent(transformedNote.content);
        setTags(transformedNote.tags || []);
        setIsPublic(transformedNote.isPublic);
      } catch (err: unknown) {
        console.error('노트 불러기 중 중 오류:', err);

        if (err instanceof Error) {
          setError(
            err.message === 'NOT_FOUND'
              ? 'NOT_FOUND'
              : '노트를 불러올 수 없습니다.'
          );
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [noteId]);

  // 변경사항 감지
  useEffect(() => {
    if (!originalNote) {
      setHasUnsavedChanges(false);
      return;
    }

    const currentData = {
      title: title.trim(),
      content: content.trim(),
      isPublic,
      tags: [...tags].sort(),
    };

    const originalData = {
      title: originalNote.title,
      content: originalNote.content,
      isPublic: originalNote.isPublic,
      tags: [...(originalNote.tags || [])].sort(),
    };

    const hasChanges =
      JSON.stringify(currentData) !== JSON.stringify(originalData);
    setHasUnsavedChanges(hasChanges);
  }, [title, content, tags, isPublic, originalNote]);

  // 저장 함수
  const saveNote = async () => {
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return false;
    }

    setIsSaving(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('notes')
        .update({
          title: title.trim(),
          content: content.trim(),
          is_public: isPublic,
          tags: tags,
          updated_at: new Date().toISOString(),
        })
        .eq('id', noteId);

      if (error) {
        throw error;
      }

      setHasUnsavedChanges(false);
      return true;
    } catch (err: unknown) {
      console.error('노트 저장 중 오류:', err);

      if (err instanceof Error) {
        setError(err.message || '노트를 저장할 수 없습니다.');
      } else {
        setError('노트를 저장할 수 없습니다.');
      }

      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // 태그 관리 함수들
  const addTag = (newTag: string) => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      return true;
    }
    return false;
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return {
    // 상태
    originalNote,
    loading,
    error,
    isSaving,
    hasUnsavedChanges,

    // form state
    title,
    content,
    tags,
    isPublic,

    // 상태 변경 함수
    setTitle,
    setContent,
    setTags,
    setIsPublic,
    setError,

    // 액션
    saveNote,
    addTag,
    removeTag,
  };
}
