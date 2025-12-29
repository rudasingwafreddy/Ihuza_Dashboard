import { BoxIcon, Computer, Layers, UserIcon, LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { IconCard } from "../icon-card";
import { cn } from "../../utils";
import { useAuth } from "../../contexts/auth-context";
import { Badge } from "../base/badge";
import { useData } from "../../contexts/data-context";

export const Sidebar = () => {
  const { isAdmin, logout, user } = useAuth();
  const { getStats } = useData();
  const stats = getStats(isAdmin ? null : user?.email);
  const navigate = useNavigate();

  const getNavItems = (isAdmin) =>
    [
      {
        label: "Dashboard",
        icon: Computer,
        path: "/dashboard",
      },
      isAdmin && {
        label: "Users",
        icon: UserIcon,
        path: "/users",
        count: stats?.totalUsers || 0,
      },
      {
        label: "Products",
        icon: BoxIcon,
        path: "/products",
        count: stats?.totalProducts || 0,
      },
      {
        label: "Categories",
        icon: Layers,
        path: "/categories",
        count: stats?.totalCategories || 0,
      },
    ].filter(Boolean);

  const navItems = getNavItems(isAdmin);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <IconCard icon={BoxIcon} variant="primary-inverse" />
          <div className="flex flex-col">
            <h4 className="font-semibold text-lg">iHuza</h4>
            <span className="text-xs text-muted-foreground">Inventory</span>
          </div>
        </div>
      </div>
      <nav className="mt-6 flex-1 flex flex-col justify-between">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "p-2.5 cursor-pointer flex justify-between items-center rounded-lg transition-colors",
                    isActive
                      ? "bg-primaryColor-50 text-primaryColor-500 dark:bg-primaryColor-50 dark:text-primaryColor-400 shadow-sm"
                      : "hover:bg-muted text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <div className="flex justify-between items-center gap-2 w-full">
                    <div className="flex text-sm items-center gap-2">
                      <item.icon
                        className={cn(
                          "size-4",
                          isActive
                            ? "text-primaryColor-500"
                            : "text-muted-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium",
                          isActive
                            ? "text-primaryColor-500"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                    {item.count !== undefined && (
                      <Badge
                        variant="muted"
                        text={item.count}
                        className="text-xs py-0.5 px-1.5 self-center"
                      />
                    )}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            type="button"
            className="w-full cursor-pointer p-2.5 flex justify-between items-center rounded-lg hover:bg-destructive/10 transition-colors"
          >
            <div className="flex text-sm items-center gap-2 text-destructive">
              <LogOut className="size-4" />
              <span className="font-medium">Logout</span>
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
};

export function MobileSidebar({ open, setOpen }) {
  const { isAdmin, logout, user } = useAuth();
  const { getStats } = useData();
  // For non-admin users, filter stats to show only their products
  const stats = getStats(isAdmin ? null : user?.email);
  const navigate = useNavigate();

  const getNavItems = (isAdmin) =>
    [
      {
        label: "Dashboard",
        icon: Computer,
        path: "/dashboard",
      },
      isAdmin && {
        label: "Users",
        icon: UserIcon,
        path: "/users",
        count: stats?.totalUsers || 0,
      },
      {
        label: "Products",
        icon: BoxIcon,
        path: "/products",
        count: stats?.totalProducts || 0,
      },
      {
        label: "Categories",
        icon: Layers,
        path: "/categories",
        count: stats?.totalCategories || 0,
      },
    ].filter(Boolean);

  const navItems = getNavItems(isAdmin);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const handleNavClick = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed md:hidden top-0 right-0 left-0 w-dvw overflow-x-hidden z-50 h-screen bg-background p-4">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <IconCard icon={BoxIcon} variant="primary-inverse" />
          <div className="flex flex-col">
            <h4 className="font-semibold text-lg">iHuza</h4>
            <span className="text-xs text-muted-foreground">Inventory</span>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="p-2 hover:bg-muted rounded-lg"
        >
          <X className="size-5" />
        </button>
      </div>
      <nav className="mt-6 h-[calc(100vh-6rem)] flex-1 flex flex-col justify-between">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  cn(
                    "p-3 cursor-pointer flex justify-between items-center rounded-lg transition-colors",
                    isActive
                      ? "bg-primaryColor-500 text-white shadow-sm"
                      : "hover:bg-muted text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <div className="flex justify-between items-center gap-2 w-full">
                    <div className="flex text-sm items-center gap-2">
                      <item.icon
                        className={cn(
                          "size-4",
                          isActive ? "text-white" : "text-muted-foreground"
                        )}
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <Badge
                        variant="muted"
                        text={item.count}
                        className="text-xs py-0.5 px-1.5 self-center"
                      />
                    )}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            type="button"
            className="w-full cursor-pointer p-3 flex justify-between items-center rounded-lg hover:bg-destructive/10 transition-colors"
          >
            <div className="flex text-sm items-center gap-2 text-destructive">
              <LogOut className="size-4" />
              <span className="font-medium">Logout</span>
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
}
