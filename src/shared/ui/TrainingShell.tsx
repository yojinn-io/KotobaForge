import type { ReactNode } from 'react';
import { AppShell } from './AppShell';
import { ProgressTrack } from './ProgressTrack';
import { TopBar } from './TopBar';

type TrainingShellProps = {
  title: string;
  progressTotal?: number;
  progressActive?: number;
  actions?: ReactNode;
  left: ReactNode;
  right: ReactNode;
  swapped?: boolean;
};

export function TrainingShell({
  title,
  progressTotal = 6,
  progressActive = 0,
  actions,
  left,
  right,
  swapped = false,
}: TrainingShellProps) {
  return (
    <AppShell>
      <TopBar
        variant="training"
        left={<h1 className="topbar-page-title">{title}</h1>}
        center={<ProgressTrack total={progressTotal} activeIndex={progressActive} />}
        right={actions}
      />

      <main className={['training-grid', swapped ? 'is-swapped' : ''].filter(Boolean).join(' ')}>
        <section className="training-pane training-pane--practice">
          <div className="training-pane__inner">{left}</div>
        </section>
        <aside className="training-pane training-pane--analysis">
          <div className="training-pane__inner">{right}</div>
        </aside>
      </main>
    </AppShell>
  );
}
