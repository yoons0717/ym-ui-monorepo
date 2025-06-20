import type {Metadata} from "next";
import "@workspace/uikit/dist/index.css";

export const metadata: Metadata = {
  title: "UIKit Tailwind v4 Test",
  description: "Tailwind v4 동작 방식 테스트",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
