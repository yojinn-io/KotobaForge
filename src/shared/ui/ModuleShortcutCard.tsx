import { Link } from 'react-router-dom';

type ModuleShortcutCardProps = {
  to: string;
  icon: string;
  title: string;
  className?: string;
};

export function ModuleShortcutCard({ to, icon, title, className }: ModuleShortcutCardProps) {
  return (
    <Link
      to={to}
      className={['module-shortcut-card', className].filter(Boolean).join(' ')}
      aria-label={title}
    >
      <div className="module-shortcut-card__icon">
        <i className={icon} />
      </div>
      <div className="module-shortcut-card__title">{title}</div>
    </Link>
  );
}
