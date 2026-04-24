import { trainingRoutes } from '../../app/routeMap';
import { DashboardShell } from '../../shared/ui/DashboardShell';
import { AdvicePanel } from './AdvicePanel';
import { ModuleShortcutGrid } from './ModuleShortcutGrid';
import { OverallAnalysisPanel } from './OverallAnalysisPanel';
import { TodoPanel } from './TodoPanel';
import { WeaknessPanel } from './WeaknessPanel';
import {
  homeAdvice,
  homeMetricCards,
  homeMiniCards,
  homeOverview,
  homeRadarAppearance,
  homeRadarIndicators,
  homeRadarSeries,
  homeTopBarPills,
  homeTodoItems,
  homeWeaknessItems,
} from './home.data';
import './home.css';

export function HomePage() {
  return (
    <DashboardShell
      brandTitle="Kotoba Forge"
      brandSubtitle="分析を中心に、訓練入口をひとつに統合"
      brandIcon={<i className="bi bi-grid-1x2-fill" />}
      pills={
        <div className="home-top-pills">
          {homeTopBarPills.map((pill) => (
            <span className="shell-pill" key={pill.label}>
              <i className={pill.icon} />
              {pill.label}
            </span>
          ))}
        </div>
      }
      actions={
        <button type="button" className="shell-button">
          <i className="bi bi-gear" />
          設定
        </button>
      }
      left={
        <div className="home-left-stack">
          <OverallAnalysisPanel
            overview={homeOverview}
            metricCards={homeMetricCards}
            miniCards={homeMiniCards}
            radarIndicators={homeRadarIndicators}
            radarSeries={homeRadarSeries}
            radarAppearance={homeRadarAppearance}
          />
          <ModuleShortcutGrid routes={trainingRoutes} />
        </div>
      }
      right={
        <div className="home-right-stack">
          <TodoPanel items={homeTodoItems} />
          <AdvicePanel intro={homeAdvice.intro} items={homeAdvice.items} />
          <WeaknessPanel items={homeWeaknessItems} />
        </div>
      }
    />
  );
}
