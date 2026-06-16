'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ReceiptText, ShoppingBag, Package, BarChart3, Users, Store, DollarSign, Printer, Settings, X, QrCode, LogOut } from 'lucide-react';
import { UserProfile } from '@/types';

interface SidebarProps {
  user: UserProfile;
  printerEnabled: boolean;
  onTogglePrinter: () => void;
  onOpenQRIS: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ user, printerEnabled, onTogglePrinter, onOpenQRIS, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'transaksi', label: 'Transaksi', icon: ReceiptText, href: '/transaksi' },
    { id: 'penjualan', label: 'Penjualan', icon: ShoppingBag, href: '/penjualan' },
    { id: 'produk', label: 'Produk', icon: Package, href: '/produk' },
    { id: 'laporan', label: 'Laporan', icon: BarChart3, href: '/laporan' },
    { id: 'user-management', label: 'User Management', icon: Users, href: '/user-management' },
    { id: 'outlet', label: 'Outlet', icon: Store, href: '/outlet' },
    { id: 'modul-biaya', label: 'Modul Biaya', icon: DollarSign, href: '/modul-biaya' },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings, href: '/setting' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-[var(--color-sidebar-bg)] border-r border-[var(--color-sidebar-border)] transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Top Branding Bar */}
        <div className="flex items-center justify-between h-16 px-6 bg-[var(--color-primary)] text-white">
          <div>
            <h1 className="font-sans font-bold leading-none tracking-tight text-lg">LinkAja Merchant</h1>
            <span className="text-[10px] font-semibold tracking-widest text-[#FFF5F5] opacity-90 block mt-1">PLATFORM</span>
          </div>
          {/* Mobile close button */}
          <button onClick={() => setSidebarOpen(false)} className="p-1 text-white border border-white/20 rounded-md hover:bg-white/10 lg:hidden focus:outline-none" aria-label="Tutup Menu">
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
            className={`w-full flex items-center justify-between gap-3 p-3 rounded-2xl transition-all duration-300 shadow-md text-left overflow-hidden relative group ${printerEnabled
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 border border-emerald-400/50 shadow-emerald-500/25'
              : 'bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 shadow-slate-900/20'
              }`}
          >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Left: icon + textt */}
            <div className="flex items-center gap-3 relative z-10">
              <div className={`p-2 rounded-xl backdrop-blur-md shadow-inner transition-colors ${printerEnabled
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-slate-400 border border-white/5'
                }`}>
                <Printer size={16} className={printerEnabled ? 'drop-shadow-md' : ''} />
              </div>
              <div>
                <div className={`text-xs font-extrabold uppercase tracking-widest leading-none mb-1 ${printerEnabled ? 'text-white drop-shadow-sm' : 'text-slate-300'}`}>
                  PRINTER {printerEnabled ? 'ON' : 'OFF'}
                </div>
                <p className={`text-[10px] leading-none font-medium ${printerEnabled ? 'text-emerald-50' : 'text-slate-500'}`}>
                  {printerEnabled ? 'Siap mencetak struk' : 'Ketuk mengaktifkan'}
                </p>
              </div>
            </div>

            {/* Right: toggle switch */}
            <div className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-300 ease-in-out border shadow-inner z-10 ${printerEnabled ? 'bg-emerald-400/30 border-emerald-300/30' : 'bg-black/50 border-white/5'}`}>
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-all duration-300 ease-in-out ${printerEnabled ? 'translate-x-4 shadow-[0_0_8px_rgba(255,255,255,0.9)]' : 'translate-x-1 opacity-50'}`} />
            </div>
          </button>
        </div>

        {/* Navigation Area */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all group ${isActive
                  ? 'bg-[var(--color-sidebar-surface)] text-[var(--color-sidebar-text)] font-semibold shadow-sm'
                  : 'text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-surface)] hover:text-[var(--color-sidebar-text)]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} className={`transition-colors ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-sidebar-text-muted)] group-hover:text-[var(--color-sidebar-text)]'}`} />
                  <span className="text-xs">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Profile Footer */}
        <div className="p-4 border-t border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-surface)]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative flex-shrink-0">
                <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-[var(--color-sidebar-bg)] shadow-sm referrer-policy: no-referrer" referrerPolicy="no-referrer" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--color-sidebar-bg)]" />
              </div>
              <div className="overflow-hidden">
                <h5 className="font-semibold text-xs text-[var(--color-sidebar-text)] truncate leading-none">{user.name}</h5>
                <span className="text-[10px] text-[var(--color-sidebar-text-muted)] block mt-0.5 leading-none">{user.role} profile</span>
              </div>
            </div>
            <Link href="/" className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-[var(--color-sidebar-text-muted)] hover:text-[var(--color-primary)] transition-colors" title="Logout">
              <LogOut size={14} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
