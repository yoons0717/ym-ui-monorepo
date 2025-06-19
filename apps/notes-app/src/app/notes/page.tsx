import {Note} from "@workspace/types";
import {Card, Button} from "@workspace/uikit";
import Link from "next/link";

// 임시 데이터 (나중에 API로 대체)
const mockNotes: Note[] = [
  {
    id: "1",
    title: "프로젝트 기획서",
    content: "새로운 프로젝트의 기획 내용을 정리합니다...",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
    authorId: "user1",
    isPublic: false,
    tags: ["기획", "프로젝트"],
  },
  {
    id: "2",
    title: "회의록 - 1월 15일",
    content: "개발팀 정기 회의 내용입니다...",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
    authorId: "user2",
    isPublic: true,
    tags: ["회의", "개발팀"],
  },
];

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">노트 목록</h1>
            <p className="text-gray-600 mt-2">총 {mockNotes.length}개의 노트</p>
          </div>

          <Link href="/notes/new">
            <Button variant="primary">새 노트 작성</Button>
          </Link>
        </div>

        {/* 노트 목록 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow">
              <Card.Header>
                <h3 className="text-lg font-semibold truncate">{note.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  {note.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card.Header>

              <Card.Body>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {note.content}
                </p>

                <div className="mt-4 text-xs text-gray-500">
                  <p>생성: {note.createdAt.toLocaleDateString()}</p>
                  <p>수정: {note.updatedAt.toLocaleDateString()}</p>
                </div>
              </Card.Body>

              <Card.Footer>
                <Link href={`/notes/${note.id}`} className="w-full">
                  <Button variant="outline" fullWidth>
                    보기
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
