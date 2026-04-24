import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PanelCard } from './PanelCard';
import { TrainingShell } from './TrainingShell';

type TrainingPagePlaceholderProps = {
  title: string;
  intro: string;
  analysisSummary: string;
  pending: string[];
  phase3Focus: string[];
  progressActive?: number;
  rightTopBadge?: ReactNode;
};

export function TrainingPagePlaceholder({
  title,
  intro,
  analysisSummary,
  pending,
  phase3Focus,
  progressActive = 0,
  rightTopBadge,
}: TrainingPagePlaceholderProps) {
  return (
    <TrainingShell
      title={title}
      progressTotal={6}
      progressActive={progressActive}
      actions={
        <Link to="/" className="shell-button">
          <i className="bi bi-house-door" />
          ダッシュボード
        </Link>
      }
      left={
        <>
          <PanelCard title="Phase 2 Scaffold" subtitle="Shared shell is ready">
            <div className="placeholder-copy">{intro}</div>
            <div className="placeholder-note">
              このページはまだ完全移植ではありません。Phase 2 ではルーティング、共通シェル、共通フックの受け皿だけを整えています。
            </div>
          </PanelCard>

          <PanelCard title="Left Pane Migration Queue" subtitle="Still to port from the prototype">
            <ul className="placeholder-list">
              {pending.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </PanelCard>
        </>
      }
      right={
        <>
          <PanelCard title="Current Status" subtitle="Analysis placeholder" badge={rightTopBadge}>
            <div className="placeholder-quote">{analysisSummary}</div>
          </PanelCard>

          <PanelCard title="Phase 3 Focus" subtitle="Next migration slice">
            <ul className="placeholder-list">
              {phase3Focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </PanelCard>
        </>
      }
    />
  );
}
