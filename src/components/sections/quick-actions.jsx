import { Card } from "../base/card";
import { Button } from "../base/button";
import { Users, Package, ClipboardCheck } from "lucide-react";
import { IconCard } from "../icon-card";
import { cn } from "../../utils";
import { useNavigate } from "react-router-dom";

const QUICK_ACTIONS = [
  {
    label: "View Users",
    details: "View all registered users",
    icon: Users,
    variant: "primary",
    path: "/users",
  },
  {
    label: "View Products",
    details: "View all registered products",
    icon: Package,
    variant: "accent",
    path: "/products",
  },
  {
    label: "View Categories",
    details: "View all product categories",
    icon: ClipboardCheck,
    variant: "success",
    path: "/categories",
  },
];

const bgVariant = {
  primary: "bg-primaryColor-50",
  accent: "bg-accent-50",
  success: "bg-success/8",
};

export const QuickActions = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <Card title={"Quick Actions"} asideText={"View all"}>
      <div className="flex flex-col gap-2">
        {QUICK_ACTIONS.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex justify-between items-center p-2 rounded-lg transition-colors",
              bgVariant[item.variant]
            )}
          >
            <div className="flex gap-4 items-center">
              <IconCard
                icon={item.icon}
                variant={item.variant}
                type={"outline"}
              />
              <div className="flex flex-col gap-0.5">
                <h5 className="font-medium text-foreground">{item.label}</h5>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
            </div>
            <Button
              onClick={() => handleNavigation(item.path)}
              variant={item.variant}
              size="sm"
              className="py-1"
            >
              Go
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
