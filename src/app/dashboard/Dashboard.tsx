
export const Dashboard = () => {

  // const { data, isLoading } = useGetClaimsStats({
  //   client,
  // });

  // const stats = getStatsFromClaimStatsDetails(data?.data || null);

  return (
    <div className="flex flex-col p-2 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        {/* {isLoading
          ? [...Array(3).keys()].map((item) => (
              <DashboardStatSkeletonCard key={item} />
            ))
          : stats.map((item) => (
              <DashboardStatCard key={item.name} {...item} />
            ))} */}
      </div>
    </div>
  );
};
