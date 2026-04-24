import type { ReactNode } from 'react';

type AppShellProps = {
  children: ReactNode;
  className?: string;
};

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={['app-shell', className].filter(Boolean).join(' ')}>
      <div className="app-shell__frame">{children}</div>
    </div>
  );
}
