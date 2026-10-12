// The brand motif: a ring of overlapping circles (the scrunchie silhouette). It takes the text colour, and its
// lines stay 1px thick at any size.
const circles = Array.from({ length: 12 }, (_, i) => {
  const angle = (2 * Math.PI * i) / 12;
  return { cx: (20 + 12.5 * Math.cos(angle)).toFixed(2), cy: (20 + 12.5 * Math.sin(angle)).toFixed(2) };
});

export function Ring({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {circles.map((circle) => (
        <circle key={`${circle.cx}-${circle.cy}`} cx={circle.cx} cy={circle.cy} r="6.5" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
