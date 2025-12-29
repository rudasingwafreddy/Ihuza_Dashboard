import { BellIcon, MenuIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/theme-context";
import { useAuth } from "../../contexts/auth-context";
import { Settings } from "lucide-react";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/categories": "Categories",
  "/users": "Users",
};

export const Navbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || "Dashboard";
  const isDashboard =
    location.pathname.split("/").includes("dashboard") || false;

  return (
    <nav className="w-full px-4 h-20 border-b flex justify-between items-center bg-background">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          type="button"
          className="md:hidden p-2 hover:bg-muted rounded-lg"
        >
          <MenuIcon className="size-5" />
        </button>
        <div className="flex flex-col gap-0.5">
          <div className="text-lg md:text-xl font-bold">{pageTitle}</div>
          {isDashboard && (
            <span className="text-xs md:text-sm text-muted-foreground hidden sm:block">
              Welcome back, {user?.name || "User"}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-4 md:gap-6 items-center">
        <button
          onClick={toggleTheme}
          type="button"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          title={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <MoonIcon className="size-4 md:size-5 text-muted-foreground hover:text-foreground transition-colors" />
          ) : (
            <SunIcon className="size-4 md:size-5 text-muted-foreground hover:text-foreground transition-colors" />
          )}
        </button>
        <Settings className="size-4 md:size-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
        <div className="relative">
          <BellIcon className="size-4 md:size-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
          <span className="absolute -top-1 -right-1 size-2 bg-destructive rounded-full"></span>
        </div>
        <div className="flex gap-2 items-center ml-2">
          <span className="mr-1 text-sm hidden lg:block font-medium">
            {user?.email || "user@ihuza.com"}
          </span>
          <div className="text-sm bg-primaryColor-500 text-white rounded-full p-2 flex justify-center items-center">
            <UserIcon className="size-4" />
          </div>
        </div>
      </div>
    </nav>
  );
};
