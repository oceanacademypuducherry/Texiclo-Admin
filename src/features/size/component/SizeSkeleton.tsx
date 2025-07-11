

export const SizeSkeleton = () => {
  return (
    <div className="flex max-w-[150px] animate-pulse flex-col items-center space-y-2.5 rounded-lg border-2 border-gray-300 p-2">
      <div className="h-6 w-20 rounded bg-gray-300" />
      <div className="flex gap-2.5 pb-1">
        <div className="h-6 w-6 rounded-full bg-gray-300" />
        <div className="h-6 w-6 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}
