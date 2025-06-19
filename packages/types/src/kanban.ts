import {User} from "./user";

export interface Board {
  id: string;
  title: string;
  description?: string;
  teamId: string;
  ownerId: string;
  columns: Column[]; // 컬럼 목록 (할 일, 진행 중, 완료 등)
  members: BoardMember[];
  createdAt: Date;
  updatedAt: Date;
}

// 칸반 컬럼 - "할 일", "진행 중", "완료" 등의 상태
export interface Column {
  id: string;
  title: string; // 컬럼 제목 ("할 일", "진행 중" 등)
  boardId: string;
  order: number;
  cards: Card[]; // 컬럼 내 카드 목록
  color?: string; // 컬럼 헤더 색상
}

// 칸반 카드 - 실제 작업 항목
export interface Card {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  order: number;
  assigneeId?: string; // 담당자 ID
  assignee?: User;
  labels?: Label[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 보드 멤버 - 보드별 참여자 및 권한
export interface BoardMember {
  boardId: string;
  userId: string;
  user?: User;
  role: "admin" | "member" | "viewer";
  joinedAt: Date; // 보드 참여일시
}

// 카드 라벨 - 우선순위, 카테고리 표시
export interface Label {
  id: string; // 라벨 ID
  name: string; // 라벨 이름 ("긴급", "버그" 등)
  color: string; // 라벨 색상 (hex 코드)
  boardId: string; // 어떤 보드의 라벨인지
}

// 실시간 카드 이동 이벤트 - 드래그 앤 드롭 동기화용
export interface CardMoveEvent {
  cardId: string; // 이동할 카드 ID
  sourceColumnId: string; // 원래 컬럼 ID
  targetColumnId: string; // 이동할 컬럼 ID
  newOrder: number; // 새로운 순서
  movedBy: string; // 누가 이동했는지 (사용자 ID)
  timestamp: Date; // 이동 시각
}

// 보드 권한 정의
export type BoardPermission =
  | "view_board" // 보드 보기
  | "create_card" // 카드 생성
  | "edit_card" // 카드 편집
  | "move_card" // 카드 이동
  | "delete_card" // 카드 삭제
  | "manage_board"; // 보드 설정 변경

export const BOARD_ROLE_PERMISSIONS: Record<
  BoardMember["role"],
  BoardPermission[]
> = {
  admin: [
    "view_board",
    "create_card",
    "edit_card",
    "move_card",
    "delete_card",
    "manage_board",
  ],
  member: ["view_board", "create_card", "edit_card", "move_card"],
  viewer: ["view_board"],
};
