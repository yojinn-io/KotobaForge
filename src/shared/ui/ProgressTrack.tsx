type ProgressTrackProps = {
  total: number;
  activeIndex: number;
};

export function ProgressTrack({ total, activeIndex }: ProgressTrackProps) {
  if (total <= 0) {
    return null;
  }

  return (
    <div className="progress-track" aria-label="progress track">
      {Array.from({ length: total }, (_, index) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={[
            'progress-track__segment',
            index <= activeIndex ? 'is-active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ))}
    </div>
  );
}
