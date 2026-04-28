import { PanelCard } from '../../shared/ui/PanelCard';
import type { HomeListItem } from './home.data';

type WeaknessPanelProps = {
  items: HomeListItem[];
};

export function WeaknessPanel({ items }: WeaknessPanelProps) {
  return (
    <PanelCard
      title="弱點分析"
      badge="再発ベース"
      className="home-side-panel home-weakness-panel"
      bodyClassName="home-side-panel__body"
    >
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
    </PanelCard>
  );
}
