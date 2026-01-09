export const DashboardStatSkeletonCard = () => {
  return (
    <div
      className={
        "border-2 border-secondary-100 rounded-lg w-auto p-4 gap-2 flex flex-col animate-pulse bg-secondary-50 dark:bg-secondary-700"
      }
    >
      <div className="text-secondary-600 text-md invisible">Test</div>
      <div className="flex justify-between items-end">
        <div className="text-secondary-600 font-bold text-2xl invisible">0</div>
        <div />
      </div>
    </div>
  );
};
