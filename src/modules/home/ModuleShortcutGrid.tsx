import type { AppRouteMeta } from '../../app/routeMap';
import { ModuleShortcutCard } from '../../shared/ui/ModuleShortcutCard';
import { PanelCard } from '../../shared/ui/PanelCard';

type ModuleShortcutGridProps = {
  routes: AppRouteMeta[];
};

export function ModuleShortcutGrid({ routes }: ModuleShortcutGridProps) {
  return (
    <PanelCard
      className="home-modules-panel"
      title="機能"
      subtitle=""
      bodyClassName="home-modules-panel__body"
    >
      <div className="home-module-grid">
        {routes.map((route) => (
          <ModuleShortcutCard
            key={route.id}
            to={route.path}
            icon={route.icon}
            title={route.title}
            className="home-module-card"
          />
        ))}
      </div>
    </PanelCard>
  );
}
