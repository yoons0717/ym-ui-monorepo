export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  authorId: string;
  teamId?: string;
  isPublic: boolean;
  tags?: string[];
}

// 실시간 편집을 위한 권한 관리 - 누가 어떤 노트를 편집할 수 있는지
export interface NotePermission {
  noteId: string;
  userId: string;
  permission: "read" | "write" | "admin"; // 읽기만/편집가능/관리자
}

// 실시간 편집 상태 표시용 - "홍길동님이 편집 중..." 표시
export interface NoteEditingStatus {
  noteId: string;
  userId: string;
  userName: string;
  cursorPosition?: number; // 커서 위치 (나중에 고도화 시 사용)
  lastActivity: Date;
}
