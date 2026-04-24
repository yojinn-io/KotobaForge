import type { ReactNode } from 'react';

type PanelCardProps = {
  title?: string;
  subtitle?: string;
  badge?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
};

export function PanelCard({
  title,
  subtitle,
  badge,
  className,
  bodyClassName,
  children,
}: PanelCardProps) {
  const hasHead = Boolean(title || subtitle || badge);

  return (
    <section className={['panel-card', className].filter(Boolean).join(' ')}>
      {hasHead ? (
        <div className="panel-card__head">
          <div className="panel-card__heading">
            {title ? <h2 className="panel-card__title">{title}</h2> : null}
            {subtitle ? <div className="panel-card__subtitle">{subtitle}</div> : null}
          </div>
          {badge ? <div className="panel-card__badge">{badge}</div> : null}
        </div>
      ) : null}
      <div className={['panel-card__body', bodyClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
    </section>
  );
}
