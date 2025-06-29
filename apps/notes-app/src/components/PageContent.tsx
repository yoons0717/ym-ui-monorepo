import React from 'react';

export default function PageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-4xl px-6 py-16">{children}</div>;
}
