import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`relative overflow-hidden bg-blue-100/50 rounded-md ${className}`}
    >
      {/* The Shimmer Overlay */}
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent"
        style={{
          backgroundSize: "1000px 100%", 
          // 'via-white/40' ensures the shimmer is subtle, not a harsh white flash
        }}
      />
    </div>
  );
};