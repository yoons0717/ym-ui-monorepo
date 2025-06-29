import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavigationProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  actions?: React.ReactNode;
}

export function Navigation({
  breadcrumbs = [],
  title,
  actions,
}: NavigationProps) {
  return (
    <nav className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
              <span className="text-sm font-bold text-white">N</span>
            </div>
            <h1 className="text-xl font-semibold text-slate-800">
              {title || 'Notes'}
            </h1>
          </Link>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span>/</span>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="max-w-[150px] truncate hover:text-slate-700"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="max-w-[200px] truncate text-slate-900">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side Actions */}
        {actions && (
          <div className="flex items-center space-x-3">{actions}</div>
        )}
      </div>
    </nav>
  );
}
