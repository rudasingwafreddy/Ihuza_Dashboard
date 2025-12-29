import { Outlet } from "react-router-dom";
import { Sidebar, MobileSidebar } from "./sections/sidebar";
import { Navbar } from "./sections/navbar";
import { useState } from "react";

export const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r bg-background z-40">
        <div className="flex-1 p-4 overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      <MobileSidebar open={mobileMenuOpen} setOpen={setMobileMenuOpen} />

      <div className="flex-1 flex flex-col w-full md:pl-60">
        <header className="sticky top-0 z-30 bg-background">
          <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
        </header>

        <main className="flex-1 bg-muted/50 p-4 md:p-6 flex flex-col gap-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
