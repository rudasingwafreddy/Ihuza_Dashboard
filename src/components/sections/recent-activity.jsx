import { Card } from "../base/card";
import {
  PackagePlus,
  PackageMinus,
  PackageCheck,
  FolderPlus,
  FolderPen,
  FolderMinus,
  UserPlus,
  UserPen,
  UserMinus,
  Activity,
} from "lucide-react";
import { IconCard } from "../icon-card";
import { cn } from "../../utils";
import { useData } from "../../contexts/data-context";
import { useAuth } from "../../contexts/auth-context";

const activityConfig = {
  "product-add": {
    label: "Product added",
    icon: PackagePlus,
  },
  "product-update": {
    label: "Product updated",
    icon: PackageCheck,
  },
  "product-delete": {
    label: "Product deleted",
    icon: PackageMinus,
  },
  "category-add": {
    label: "Category added",
    icon: FolderPlus,
  },
  "category-update": {
    label: "Category updated",
    icon: FolderPen,
  },
  "category-delete": {
    label: "Category deleted",
    icon: FolderMinus,
  },
  "user-add": {
    label: "User added",
    icon: UserPlus,
  },
  "user-update": {
    label: "User updated",
    icon: UserPen,
  },
  "user-delete": {
    label: "User deleted",
    icon: UserMinus,
  },
};

const variantMap = {
  "product-add": "success",
  "product-update": "primary",
  "product-delete": "warning",
  "category-add": "success",
  "category-update": "primary",
  "category-delete": "warning",
  "user-add": "success",
  "user-update": "primary",
  "user-delete": "warning",
};

export const RecentActivity = () => {
  const { isAdmin, user } = useAuth();
  const { activities, getProductById, getCategoryById, getUserById } =
    useData();

  const filteredActivities = isAdmin
    ? activities
    : activities.filter((a) => a.doneBy === user?.email);

  const getItemName = (activity) => {
    try {
      if (activity.type.startsWith("product-")) {
        return getProductById(activity.itemId)?.data?.name || "Unknown product";
      }
      if (activity.type.startsWith("category-")) {
        return (
          getCategoryById(activity.itemId)?.data?.name || "Unknown category"
        );
      }
      if (activity.type.startsWith("user-")) {
        return getUserById(activity.itemId)?.data?.name || "Unknown user";
      }
    } catch {
      return "Unknown item";
    }
    return "Unknown item";
  };

  const recentActivities = filteredActivities.slice(0, 4).map((activity) => {
    const config = activityConfig[activity.type] || {
      label: "Unknown activity",
      icon: Activity,
    };

    return {
      label: config.label,
      details: getItemName(activity),
      date: new Date(activity.createdAt).toLocaleDateString(),
      icon: config.icon,
      type: activity.type,
      variant: variantMap[activity.type] || "default",
    };
  });

  return (
    <Card title={"Recent Activities"} asideText={"View all"}>
      {recentActivities.length === 0 ? (
        <p className="text-muted-foreground text-sm py-4 text-center">
          No recent activities
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className={cn(
                "py-3 flex gap-4 items-start rounded-lg px-2 transition-colors",
                "hover:bg-muted/60"
              )}
            >
              <IconCard icon={activity.icon} variant={activity.variant} />
              <div className="flex flex-col gap-1 flex-1">
                <h5 className="font-medium text-foreground">
                  {activity.label}
                </h5>
                <p className="text-sm text-muted-foreground">
                  {activity.details}
                </p>
                <span className="mt-1 text-muted-foreground/90 text-xs">
                  {activity.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
