interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({
  message = '로딩 중...',
  size = 'md',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div
          className={`mx-auto mb-4 animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
        ></div>
        <p className="text-slate-600">{message}</p>
      </div>
    </div>
  );
}
