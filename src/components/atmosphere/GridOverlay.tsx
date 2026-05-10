export function GridOverlay({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 grid-overlay opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] ${className}`} />
  );
}
