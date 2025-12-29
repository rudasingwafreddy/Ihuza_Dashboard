import { BoxIcon, Layers, AlertTriangleIcon, UserIcon } from "lucide-react";
import { useData } from "../../contexts/data-context";
import { useAuth } from "../../contexts/auth-context";
import { cn } from "../../utils";
import { IconCard } from "../icon-card";

export const StatSection = () => {
  const { isAdmin, user } = useAuth();
  const { getStats } = useData();
  const stats = getStats(isAdmin ? null : user?.email);

  const statItems = [
    isAdmin && {
      label: "Total Users",
      value: String(stats.totalUsers),
      icon: UserIcon,
      variant: "primary",
    },
    {
      label: "Total Products",
      value: String(stats.totalProducts),
      icon: BoxIcon,
      variant: "primary",
    },
    {
      label: "Categories",
      value: String(stats.totalCategories),
      icon: Layers,
      variant: "accent",
    },
    {
      label: "Low Stock Alert",
      value: String(stats.lowStockProducts),
      icon: AlertTriangleIcon,
      variant: "warning",
    },
  ].filter(Boolean);

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "px-5 py-6 bg-background border shadow-sm rounded-xl flex items-center gap-5 transition-all hover:shadow-md"
          )}
        >
          <IconCard icon={stat.icon} variant={stat.variant} size="lg" />
          <div className="flex flex-col gap-0.5">
            <h5 className={`text-2xl font-bold`}>{stat.value}</h5>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
