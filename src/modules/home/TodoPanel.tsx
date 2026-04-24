import { PanelCard } from '../../shared/ui/PanelCard';
import type { HomeListItem } from './home.data';

type TodoPanelProps = {
  items: HomeListItem[];
};

export function TodoPanel({ items }: TodoPanelProps) {
  return (
    <PanelCard className="home-side-panel home-todo-panel" bodyClassName="home-side-panel__body">
      <div className="home-surface-card home-side-card">
        <div className="home-side-head">
          <h3 className="home-side-title">Todo</h3>
          <div className="home-side-badge">推奨 24分</div>
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
