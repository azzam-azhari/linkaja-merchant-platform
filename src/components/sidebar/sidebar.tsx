"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  ReceiptText, 
  ShoppingBag, 
  Package, 
  BarChart3, 
  Users, 
  Store, 
  DollarSign, 
  Printer, 
  ChevronDown, 
  Menu,
  X,
  CreditCard,
  QrCode
} from 'lucide-react';
import { UserProfile } from '@/types';

interface SidebarProps {
  currentView: string;
  onSetView: (view: string) => void;
  user: UserProfile;
  printerEnabled: boolean;
  onTogglePrinter: () => void;
  onOpenQRIS: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({
  currentView,
  onSetView,
  user,
  printerEnabled,
  onTogglePrinter,
  onOpenQRIS,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transaksi', label: 'Transaksi', icon: ReceiptText },
    { id: 'penjualan', label: 'Penjualan', icon: ShoppingBag },
    { id: 'produk', label: 'Produk', icon: Package },
    { id: 'laporan', label: 'Laporan', icon: BarChart3, badge: true },
    { id: 'user-management', label: 'User Management', icon: Users },
    { id: 'outlet', label: 'Outlet', icon: Store },
    { id: 'modul-biaya', label: 'Modul Biaya', icon: DollarSign, badge: true },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-[var(--color-sidebar-bg)] border-r border-[var(--color-sidebar-border)] transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding Bar */}
        <div className="flex items-center justify-between h-16 px-6 bg-[var(--color-primary)] text-white">
          <div>
            <h1 className="font-sans font-bold leading-none tracking-tight text-lg">
              LinkAja Merchant
            </h1>
            <span className="text-[10px] font-semibold tracking-widest text-[#FFF5F5] opacity-90 block mt-1">
              PLATFORM
            </span>
          </div>
          {/* Mobile close button */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-white border border-white/20 rounded-md hover:bg-white/10 lg:hidden focus:outline-none"
            aria-label="Tutup Menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Button: QRIS */}
        <div className="px-4 py-3">
          <button
            onClick={onOpenQRIS}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-[0.98] font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all"
          >
            <QrCode size={16} />
            <span>Buat QRIS</span>
          </button>
        </div>

        {/* Printer Status Bar */}
        <div className="px-4 pb-2">
          <button
            onClick={onTogglePrinter}
            className={`w-full flex items-center justify-start gap-3 p-2.5 rounded-xl border transition-all text-left group ${
              printerEnabled 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40' 
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/40 text-[var(--color-primary)] dark:text-red-400 hover:bg-rose-100/70 dark:hover:bg-rose-900/40'
            }`}
          >
            <div className={`p-1.5 rounded-lg ${printerEnabled ? 'bg-emerald-100 dark:bg-emerald-900/50' : 'bg-rose-100 dark:bg-rose-900/50'} transition-colors`}>
              <Printer size={15} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider leading-none">
                PRINTER {printerEnabled ? 'ON' : 'OFF'}
              </div>
              <p className="text-[9px] text-opacity-80 mt-0.5 leading-none">
                {printerEnabled ? 'Siap mencetak struk' : 'Ketuk untuk mengaktifkan'}
              </p>
            </div>
          </button>
        </div>

        {/* Navigation Area */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSetView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all group ${
                  isActive 
                    ? 'bg-[var(--color-sidebar-surface)] text-[var(--color-sidebar-text)] font-semibold shadow-sm' 
                    : 'text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-surface)] hover:text-[var(--color-sidebar-text)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={17} 
                    className={`transition-colors ${
                      isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-sidebar-text-muted)] group-hover:text-[var(--color-sidebar-text)]'
                    }`} 
                  />
                  <span className="text-xs">{item.label}</span>
                </div>
                {item.badge && (
                  <ChevronDown size={14} className="text-[var(--color-sidebar-text-muted)] opacity-40 group-hover:opacity-60" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile Footer */}
        <div className="p-4 border-t border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-surface)]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[var(--color-sidebar-bg)] shadow-sm referrer-policy: no-referrer"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--color-sidebar-bg)]" />
              </div>
              <div className="overflow-hidden">
                <h5 className="font-semibold text-xs text-[var(--color-sidebar-text)] truncate leading-none">
                  {user.name}
                </h5>
                <span className="text-[10px] text-[var(--color-sidebar-text-muted)] block mt-0.5 leading-none">
                  {user.role} profile
                </span>
              </div>
            </div>
            <button className="p-1 hover:bg-[var(--color-sidebar-surface)] rounded-lg text-[var(--color-sidebar-text-muted)] transition-colors">
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
