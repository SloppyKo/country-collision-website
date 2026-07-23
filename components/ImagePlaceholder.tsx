type ImagePlaceholderProps = {
  label: string;
  className?: string;
};

export default function ImagePlaceholder({
  label,
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-border bg-surface text-center text-xs text-muted ${className}`}
    >
      {label}
    </div>
  );
}
