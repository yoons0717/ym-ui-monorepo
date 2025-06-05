"use client";

import {Button} from "@ym-ui/uikit";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          hello world! UIKit Tailwind
        </h1>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Tailwind v4 새로운 기능</h2>
          <div className="bg-white p-4 rounded-lg shadow space-y-2">
            <div className="@container">
              <div className="@sm:bg-blue-100 @md:bg-green-100 p-2 rounded">
                Container Query 테스트
              </div>
            </div>

            <div className="bg-primary-500 text-white p-2 rounded">
              v4 커스텀 색상 테스트
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">기본 HTML Button</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            기본 HTML Button (v4)
          </button>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">UIKit Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>

          <div className="flex gap-4 items-center flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* v4 특징 설명 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Tailwind v4 주요 변화</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                ✅ <strong>더 빠른 빌드</strong>: Rust 기반 엔진으로 10x 속도
                향상
              </li>
              <li>
                ✅ <strong>간소화된 설정</strong>: postcss.config.js 불필요
              </li>
              <li>
                ✅ <strong>자동 CSS 변수</strong>: 모든 색상이 CSS 변수로 자동
                생성
              </li>
              <li>
                ✅ <strong>Container Queries</strong>: @container 지원
              </li>
              <li>
                ✅ <strong>향상된 IntelliSense</strong>: 더 정확한 자동완성
              </li>
              <li>
                ✅ <strong>단일 Import</strong>: @import "tailwindcss"만 필요
              </li>
            </ul>
          </div>
        </section>

        {/* 스타일 적용 확인용 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">스타일 확인</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-2">
              만약 UIKit Button들이 스타일링이 안되어 있다면:
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Tailwind v4가 UIKit 클래스들을 감지하지 못한 것</li>
              <li>• tailwind.config.js의 sources 경로 확인 필요</li>
              <li>• v4 베타 버전 관련 이슈일 수 있음</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
