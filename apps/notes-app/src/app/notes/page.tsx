import {Note} from "@workspace/types";
import {Button, Card} from "@workspace/uikit";
import Link from "next/link";

// 임시 데이터
const mockNotes: Note[] = [
  {
    id: "1",
    title: "프로젝트 기획서 - Q1 로드맵",
    content:
      "새로운 프로젝트의 기획 내용을 정리합니다. 주요 기능과 일정, 리소스 계획을 포함하여 전체적인 방향성을 제시합니다.",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
    authorId: "user1",
    isPublic: false,
    tags: ["기획", "프로젝트", "Q1"],
  },
  {
    id: "2",
    title: "개발팀 회의록 - 1월 15일",
    content:
      "개발팀 정기 회의 내용입니다. 진행 상황 점검, 이슈 논의, 다음 스프린트 계획 등을 다뤘습니다.",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
    authorId: "user2",
    isPublic: true,
    tags: ["회의", "개발팀", "스프린트"],
  },
  {
    id: "3",
    title: "UI/UX 디자인 가이드라인",
    content:
      "통일된 사용자 경험을 위한 디자인 시스템 가이드라인입니다. 컬러, 타이포그래피, 컴포넌트 규칙을 정의합니다.",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-14"),
    authorId: "user3",
    isPublic: true,
    tags: ["디자인", "UI", "UX", "가이드라인"],
  },
];
export default function NotesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation - 동일 */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        {/* ... 네비게이션 코드 동일 ... */}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header - 동일 */}
        <div className="flex justify-between items-center mb-8">
          {/* ... 헤더 코드 동일 ... */}
        </div>

        {/* Notes Grid - Card 컴포넌트 사용 */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {mockNotes.map((note) => (
            <Card
              key={note.id}
              className="border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {note.title}
                  </h3>
                  {note.isPublic ? (
                    <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full ml-2 mt-2"></div>
                  ) : (
                    <div className="flex-shrink-0 w-2 h-2 bg-slate-300 rounded-full ml-2 mt-2"></div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {note.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {note.tags && note.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">
                      +{note.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 pb-4">
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {note.content}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center text-xs text-slate-500 space-x-4">
                  <span>
                    수정: {note.updatedAt.toLocaleDateString("ko-KR")}
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                    <span>작성자</span>
                  </span>
                </div>

                <Link href={`/notes/${note.id}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    열기
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockNotes.length === 0 && (
          <Card className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              아직 노트가 없습니다
            </h3>
            <p className="text-slate-600 mb-6">첫 번째 노트를 작성해보세요</p>
            <Link href="/notes/new">
              <Button variant="primary">새 노트 작성</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
