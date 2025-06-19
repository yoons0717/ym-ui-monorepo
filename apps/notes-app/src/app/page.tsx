import {Button} from "@workspace/uikit";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Notes App</h1>
          <p className="text-xl text-gray-600 mb-8">
            실시간 협업 노트 애플리케이션
          </p>

          <div className="space-x-4">
            <Link href="/notes">
              <Button variant="primary" size="lg">
                노트 보기
              </Button>
            </Link>

            <Link href="/notes/new">
              <Button variant="secondary" size="lg">
                새 노트 작성
              </Button>
            </Link>
          </div>
        </div>

        {/* 기능 소개 */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">실시간 편집</h3>
            <p className="text-gray-600">
              여러 사용자가 동시에 노트를 편집할 수 있습니다.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">팀 협업</h3>
            <p className="text-gray-600">
              팀별로 노트를 관리하고 권한을 설정할 수 있습니다.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">태그 관리</h3>
            <p className="text-gray-600">
              태그로 노트를 분류하고 검색할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
