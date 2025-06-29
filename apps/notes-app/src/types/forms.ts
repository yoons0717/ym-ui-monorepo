export interface NoteFormData {
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  author_id: string;
  is_public: boolean;
  tags: string[];
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  is_public?: boolean;
  tags?: string[];
  updated_at?: string;
}
