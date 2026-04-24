import { PanelCard } from '../../shared/ui/PanelCard';

type AdvicePanelProps = {
  intro: string;
  items: string[];
};

export function AdvicePanel({ intro, items }: AdvicePanelProps) {
  return (
    <PanelCard className="home-side-panel home-advice-panel" bodyClassName="home-side-panel__body">
      <div className="home-surface-card home-side-card">
        <div className="home-side-head">
          <h3 className="home-side-title">AI意見</h3>
          <div className="home-side-badge">今週の重点</div>
        </div>

        <div className="home-advice-copy">{intro}</div>
        {/* <div className="home-advice-list">
          {items.map((item) => (
            <div className="home-advice-item" key={item}>
              {item}
            </div>
          ))}
        </div> */}
      </div>
    </PanelCard>
  );
}
