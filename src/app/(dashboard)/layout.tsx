"use client";

import Sidebar from "@/components/sidebar/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Outlet, UserProfile } from "@/types";
import { Store, ChevronDown, ShoppingBag } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

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
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet>(MOCK_OUTLETS[0]);
  const [printerEnabled, setPrinterEnabled] = useState(false);

  // Set sidebarOpen default to false for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [outletMenuOpen, setOutletMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar
        user={MOCK_USER}
        printerEnabled={printerEnabled}
        onTogglePrinter={() => setPrinterEnabled(!printerEnabled)}
        onOpenQRIS={() => console.log('Open QRIS')}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content area */}
      <main
        className={cn(
          "flex-1 w-full min-w-0 transition-all duration-300 ease-in-out lg:ml-64"
        )}
      >
        {/* Sticky Header + Accent Line */}
        <div className="sticky top-0 z-30">
          <header className="flex h-16 items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] bg-[var(--background)]/80 px-4 sm:px-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 relative">
            <button
              className="lg:hidden p-2 -ml-2 text-[var(--color-text-muted)] hover:bg-[var(--color-sidebar-surface)] dark:hover:bg-white/[0.06] rounded-lg shrink-0 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Outlet Selector Dropdown on Navbar */}
            <div className="relative z-50">
              <button
                onClick={() => setOutletMenuOpen(!outletMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all text-left focus:outline-none shadow-sm"
              >
                <Store size={16} className="text-[var(--color-text-muted)] shrink-0" />
                <div className="block">
                  <h4 className="font-semibold text-xs sm:text-sm text-[var(--color-text-primary)] leading-tight truncate max-w-[100px] sm:max-w-[150px]">
                    {selectedOutlet.name}
                  </h4>
                </div>
                <ChevronDown size={14} className={`text-[var(--color-text-muted)] shrink-0 transition-transform ${outletMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Outlet Selector Dropdown Menu */}
              {outletMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOutletMenuOpen(false)}></div>
                  <div className="absolute left-0 top-full mt-2 w-64 z-50 bg-[var(--color-sidebar-bg)] border border-[var(--color-sidebar-border)] rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 text-[10px] uppercase font-bold text-[var(--color-text-muted)] border-b border-[var(--color-sidebar-border)] tracking-wider">
                      Pilih Outlet
                    </div>
                    <div className="py-1 bg-[var(--color-sidebar-bg)] border border-[var(--color-sidebar-border)] rounded-md shadow-lg">
                      {MOCK_OUTLETS.map((outlet) => (
                        <button
                          key={outlet.id}
                          onClick={() => {
                            setSelectedOutlet(outlet);
                            setOutletMenuOpen(false);
                          }}
                          className={`w-full flex flex-col px-4 py-2.5 hover:bg-[var(--color-sidebar-surface)] text-left transition-colors ${selectedOutlet.id === outlet.id
                              ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                              : 'text-[var(--color-text-primary)]'
                            }`}
                        >
                          <span className="text-sm font-semibold">{outlet.name}</span>
                          <span className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                            {outlet.address}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search */}
            <div className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.03] px-2 sm:px-3 text-sm text-[var(--color-text-muted)] transition-colors hover:border-black/[0.12] dark:hover:border-white/[0.12]">
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
              <kbd className="hidden md:inline ml-4 rounded bg-black/[0.05] dark:bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-text-muted)]">
                ⌘K
              </kbd>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Icon */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.03] text-[var(--color-text-muted)] transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:text-[var(--color-text-secondary)]">
              <ShoppingBag className="h-4 w-4 shrink-0" />
            </button>

            {/* Notification bell */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.03] text-[var(--color-text-muted)] transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:text-[var(--color-text-secondary)]">
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
          {/* Thin accent line below header */}
          <div className="h-px bg-[var(--color-primary)]/20 dark:bg-[var(--color-primary)]/10" />
        </div>

        {/* Page content */}
        <div className="p-4 sm:p-6 flex-1">{children}</div>
      </main>
    </div>
  );
}
