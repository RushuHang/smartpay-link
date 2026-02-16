interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;  // <-- Add this
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", style }) => {
  return (
    <div
      className={`relative overflow-hidden bg-blue-100/50 rounded-md ${className}`}
      style={style}   // <-- Apply style here
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent"
        style={{ backgroundSize: "1000px 100%" }}
      />
    </div>
  );
};
