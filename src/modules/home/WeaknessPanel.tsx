import { PanelCard } from '../../shared/ui/PanelCard';
import type { HomeListItem } from './home.data';

type WeaknessPanelProps = {
  items: HomeListItem[];
};

export function WeaknessPanel({ items }: WeaknessPanelProps) {
  return (
    <PanelCard
      className="home-side-panel home-weakness-panel"
      bodyClassName="home-side-panel__body"
    >
      <div className="home-surface-card home-side-card">
        <div className="home-side-head">
          <h3 className="home-side-title">弱點分析</h3>
          <div className="home-side-badge">再発ベース</div>
        </div>

        <div className="home-side-list">
          {items.map((item) => (
            <div className="home-side-item" key={item.title}>
              <div className="home-side-item__main">
                <div className="home-side-item__title">{item.title}</div>
                <div className="home-side-item__subtitle">{item.subtitle}</div>
              </div>
              <div className="home-side-item__meta">{item.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </PanelCard>
  );
}
