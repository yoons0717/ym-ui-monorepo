import {Button} from "@workspace/uikit";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-semibold text-slate-800">Notes</h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/notes">
              <Button variant="outline" size="md">
                모든 노트
              </Button>
            </Link>
            <Link href="/notes/new">
              <Button variant="primary" size="md">
                새 노트
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            팀과 함께하는 스마트 노트
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            실시간 협업으로 아이디어를 공유하고, 체계적으로 정리하세요. 언제
            어디서나 팀과 연결되어 있습니다.
          </p>

          <div className="flex justify-center space-x-4">
            <Link href="/notes">
              <Button variant="primary" size="lg" className="px-8">
                시작하기
              </Button>
            </Link>
            <Link href="/notes/new">
              <Button variant="outline" size="lg" className="px-8">
                노트 작성
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              실시간 편집
            </h3>
            <p className="text-slate-600 leading-relaxed">
              여러 사용자가 동시에 노트를 편집하고 즉시 변경사항을 확인할 수
              있습니다.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              팀 협업
            </h3>
            <p className="text-slate-600 leading-relaxed">
              팀별로 노트를 관리하고 세밀한 권한 설정으로 안전하게 협업하세요.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              스마트 태그
            </h3>
            <p className="text-slate-600 leading-relaxed">
              태그로 노트를 체계적으로 분류하고 빠르게 원하는 내용을 찾으세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
