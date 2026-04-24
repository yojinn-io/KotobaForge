import type { ReactNode } from 'react';
import { AppShell } from './AppShell';
import { TopBar } from './TopBar';

type DashboardShellProps = {
  brandTitle: string;
  brandSubtitle: string;
  brandIcon: ReactNode;
  pills?: ReactNode;
  actions?: ReactNode;
  left: ReactNode;
  right: ReactNode;
};

export function DashboardShell({
  brandTitle,
  brandSubtitle,
  brandIcon,
  pills,
  actions,
  left,
  right,
}: DashboardShellProps) {
  return (
    <AppShell>
      <TopBar
        variant="dashboard"
        left={
          <div className="topbar-brand">
            <div className="topbar-brand__icon">{brandIcon}</div>
            <div>
              <div className="topbar-brand__title">{brandTitle}</div>
              <div className="topbar-brand__subtitle">{brandSubtitle}</div>
            </div>
          </div>
        }
        center={pills}
        right={actions}
      />

      <main className="dashboard-grid">
        <div className="dashboard-col">{left}</div>
        <div className="dashboard-col">{right}</div>
      </main>
    </AppShell>
  );
}
