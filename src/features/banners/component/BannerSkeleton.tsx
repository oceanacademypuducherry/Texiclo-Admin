// BannerSkeleton.tsx
import { FC } from "react";

export const BannerSkeleton: FC = () => {
  return (
    <div className="w-full max-w-[400px] p-2">
      <div className="relative h-[200px] w-full animate-pulse rounded-md bg-gray-200 shadow-md" />
    </div>
  );
};
