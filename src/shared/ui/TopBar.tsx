import { useEffect, useState, type ReactNode } from 'react';

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type TopBarProps = {
  left: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  variant?: 'dashboard' | 'training';
};

function getFullscreenElement(doc: FullscreenDocument) {
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

function isFullscreenSupported(doc: FullscreenDocument) {
  const root = doc.documentElement as FullscreenElement;

  return Boolean(
    doc.fullscreenEnabled ||
      root.requestFullscreen ||
      doc.webkitExitFullscreen ||
      root.webkitRequestFullscreen,
  );
}

export function TopBar({ left, center, right, variant = 'training' }: TopBarProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const doc = document as FullscreenDocument;

    const syncFullscreenState = () => {
      setIsSupported(isFullscreenSupported(doc));
      setIsFullscreen(Boolean(getFullscreenElement(doc)));
    };

    syncFullscreenState();
    document.addEventListener('fullscreenchange', syncFullscreenState);
    document.addEventListener('webkitfullscreenchange', syncFullscreenState as EventListener);

    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState);
      document.removeEventListener(
        'webkitfullscreenchange',
        syncFullscreenState as EventListener,
      );
    };
  }, []);

  const handleFullscreenToggle = async () => {
    const doc = document as FullscreenDocument;
    const root = doc.documentElement as FullscreenElement;

    if (!isFullscreenSupported(doc)) {
      return;
    }

    if (getFullscreenElement(doc)) {
      if (doc.exitFullscreen) {
        await doc.exitFullscreen();
        return;
      }

      if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      }

      return;
    }

    if (root.requestFullscreen) {
      await root.requestFullscreen();
      return;
    }

    if (root.webkitRequestFullscreen) {
      await root.webkitRequestFullscreen();
    }
  };

  return (
    <header className={['topbar', `topbar--${variant}`].join(' ')}>
      <div className="topbar__left">{left}</div>
      <div className="topbar__center">{center}</div>
      <div className="topbar__right">
        {right}
        {isSupported ? (
          <button
            type="button"
            className="shell-button shell-button--icon"
            onClick={handleFullscreenToggle}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            <i className={`bi ${isFullscreen ? 'bi-fullscreen-exit' : 'bi-fullscreen'}`} />
          </button>
        ) : null}
      </div>
    </header>
  );
}
