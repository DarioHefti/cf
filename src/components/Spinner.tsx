interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export function Spinner({ size = 'medium', text }: SpinnerProps) {
  const sizeClass = size === 'large' ? 'spinner-large' : size === 'small' ? '' : '';
  
  return (
    <div className="loading-overlay">
      <div className={`spinner ${sizeClass}`} />
      {text && <div className="loading-text">{text}</div>}
    </div>
  );
}

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

export function Skeleton({ width = '100%', height = '20px', borderRadius = '8px' }: SkeletonProps) {
  return (
    <div 
      className="skeleton" 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius 
      }} 
    />
  );
}

interface ProcessingIndicatorProps {
  text: string;
}

export function ProcessingIndicator({ text }: ProcessingIndicatorProps) {
  return (
    <div className="processing">
      <div className="spinner" />
      <span>{text}</span>
    </div>
  );
}
