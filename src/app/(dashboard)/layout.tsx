"use client";

import Sidebar from "@/components/sidebar/sidebar";
import { useSidebarStore } from "@/stores/sidebar-store";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Outlet, UserProfile } from "@/types";

const MOCK_OUTLETS: Outlet[] = [
  { id: '1', name: 'Cabang Jakarta', address: 'Jl. Sudirman No. 1' },
  { id: '2', name: 'Cabang Bandung', address: 'Jl. Asia Afrika' },
];

const MOCK_USER: UserProfile = {
  name: 'Merchant Admin',
  role: 'Admin',
  avatar: 'https://ui-avatars.com/api/?name=Merchant+Admin&background=0D8ABC&color=fff',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebarStore();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet>(MOCK_OUTLETS[0]);
  const [printerEnabled, setPrinterEnabled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar 
        currentView={currentView}
        onSetView={setCurrentView}
        outlets={MOCK_OUTLETS}
        selectedOutlet={selectedOutlet}
        onSelectOutlet={setSelectedOutlet}
        user={MOCK_USER}
        printerEnabled={printerEnabled}
        onTogglePrinter={() => setPrinterEnabled(!printerEnabled)}
        onOpenQRIS={() => console.log('Open QRIS')}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content area */}
      <main
        className="flex-1 w-full min-w-0 transition-all duration-300 ease-in-out ml-0 lg:ml-64"
      >
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/[0.06] bg-[var(--background)]/80 px-4 sm:px-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button 
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg shrink-0"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xs sm:text-sm font-medium text-[var(--color-text-secondary)] truncate">
              Selamat datang kembali 👋
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search */}
            <div className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-black/[0.03] px-2 sm:px-3 text-sm text-[var(--color-text-muted)] transition-colors hover:border-black/[0.12] hover:bg-black/[0.05]">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="hidden sm:inline">Cari...</span>
              <kbd className="hidden md:inline ml-4 rounded bg-black/[0.05] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-text-muted)]">
                ⌘K
              </kbd>
            </div>

            {/* Notification bell */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-black/[0.03] text-[var(--color-text-muted)] transition-colors hover:bg-black/[0.05] hover:text-[var(--color-text-secondary)]">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              </span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 sm:p-6 flex-1">{children}</div>
      </main>
    </div>
  );
}
