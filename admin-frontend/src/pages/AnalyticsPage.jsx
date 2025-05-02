import LineRevenue from "../components/analytics/LineRevenue";
import LineUserRetention from "../components/analytics/LineUserRetention";
import OverviewCards from "../components/analytics/OverviewCards";
import PieChannelPerformance from "../components/analytics/PieChannelPerformance";

export default function AnalyticsPage() {
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
      <OverviewCards />
      <LineRevenue />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <PieChannelPerformance />
        <LineUserRetention />
      </div>
    </main>
  );
}
