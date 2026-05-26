import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function AppShell({ children, sidebar = true }: { children: ReactNode; sidebar?: boolean }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        {sidebar && <Sidebar />}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
