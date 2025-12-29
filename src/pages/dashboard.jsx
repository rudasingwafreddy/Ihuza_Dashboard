import { CTA } from "../components/sections/cta";
import { RecentlyAddedProducts } from "../components/sections/recently-added-products";
import { RecentActivity } from "../components/sections/recent-activity";
import { QuickActions } from "../components/sections/quick-actions";
import { StatSection } from "../components/sections/stat-section";

export const DashboardPage = () => {
  return (
    <>
      <CTA />
      <StatSection />
      <RecentlyAddedProducts />
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-2">
        <RecentActivity />
        <QuickActions />
      </div>
    </>
  );
};
