export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: TeamMember[];
  createdAt: Date;
}

export interface TeamMember {
  userId: string;
  role: "owner" | "admin" | "member";
  joinedAt: Date;
}

export interface UserPresence {
  userId: string;
  userName: string;
  avatar?: string;
  status: "online" | "away" | "offline";
  currentPage?: string;
  lastSeen: Date;
}

// 역할별 권한 정의 - 팀 내에서 할 수 있는 작업 구분
export type Permission =
  | "read_notes"
  | "write_notes"
  | "delete_notes"
  | "manage_team"
  | "invite_members"
  | "remove_members";

export const ROLE_PERMISSIONS: Record<TeamMember["role"], Permission[]> = {
  owner: [
    "read_notes",
    "write_notes",
    "delete_notes",
    "manage_team",
    "invite_members",
    "remove_members",
  ],
  admin: ["read_notes", "write_notes", "delete_notes", "invite_members"],
  member: ["read_notes", "write_notes"],
};
