import { Button, Card } from '@workspace/uikit';
import Link from 'next/link';

interface ErrorCardProps {
  title?: string;
  message: string;
  backLink?: string;
  backText?: string;
  icon?: 'error' | 'warning' | 'info';
  onRetry?: () => void;
}

export function ErrorCard({
  title = '오류 발생',
  message,
  backLink = '/notes',
  backText = '목록으로 돌아가기',
  icon = 'error',
  onRetry,
}: ErrorCardProps) {
  const iconElements = {
    error: (
      <svg
        className="mx-auto mb-4 h-16 w-16 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg
        className="mx-auto mb-4 h-16 w-16 text-amber-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    ),
    info: (
      <svg
        className="mx-auto mb-4 h-16 w-16 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card variant="default" padding="lg" className="max-w-md text-center">
        {iconElements[icon]}

        <h2 className="mb-2 text-xl font-semibold text-slate-900">{title}</h2>

        <p className="mb-6 text-slate-600">{message}</p>

        <div className="flex justify-center space-x-3">
          {onRetry && (
            <Button variant="outline" onClick={onRetry}>
              다시 시도
            </Button>
          )}
          <Link href={backLink}>
            <Button variant="primary">{backText}</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
