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
import { Outlet, UserProfile } from '@/types';

interface SidebarProps {
  currentView: string;
  onSetView: (view: string) => void;
  outlets: Outlet[];
  selectedOutlet: Outlet;
  onSelectOutlet: (outlet: Outlet) => void;
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
  outlets,
  selectedOutlet,
  onSelectOutlet,
  user,
  printerEnabled,
  onTogglePrinter,
  onOpenQRIS,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const [outletMenuOpen, setOutletMenuOpen] = React.useState(false);

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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-100 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding Bar */}
        <div className="flex items-center justify-between h-16 px-6 bg-[#e11a22] text-white">
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

        {/* Selected Outlet Section */}
        <div className="px-4 py-4 border-b border-gray-100 relative">
          <button
            onClick={() => setOutletMenuOpen(!outletMenuOpen)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all text-left focus:outline-none"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <Store size={18} />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-semibold text-xs text-gray-800 truncate leading-tight">
                  {selectedOutlet.name.split(' ')[0]} {selectedOutlet.name.split(' ')[1] || ''}
                </h4>
                <p className="text-[10px] text-gray-400 mt-0.5 truncate">
                  {selectedOutlet.name.split(' ').slice(2).join(' ') || 'Cabang'}
                </p>
              </div>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${outletMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Outlet Selector Dropdown */}
          {outletMenuOpen && (
            <div className="absolute left-4 right-4 mt-1 z-50 bg-white border border-gray-100 rounded-xl shadow-xl py-1 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-400 border-b border-gray-50 tracking-wider">
                Pilih Outlet
              </div>
              {outlets.map((outlet) => (
                <button
                  key={outlet.id}
                  onClick={() => {
                    onSelectOutlet(outlet);
                    setOutletMenuOpen(false);
                  }}
                  className={`w-full flex flex-col px-4 py-2 hover:bg-gray-50 text-left transition-colors ${
                    selectedOutlet.id === outlet.id ? 'bg-red-50/40 text-[#e11a22]' : 'text-gray-700'
                  }`}
                >
                  <span className="text-xs font-semibold">{outlet.name}</span>
                  <span className="text-[10px] text-gray-400 truncate mt-0.5">{outlet.address}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Button: QRIS */}
        <div className="px-4 py-3">
          <button
            onClick={onOpenQRIS}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#e11a22] text-white hover:bg-[#c6131a] active:scale-[0.98] font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all"
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
                ? 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100/70' 
                : 'bg-rose-50 border-rose-100 text-[#e11a22] hover:bg-rose-100/70'
            }`}
          >
            <div className={`p-1.5 rounded-lg ${printerEnabled ? 'bg-emerald-100' : 'bg-rose-100'} transition-colors`}>
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
                    ? 'bg-slate-100 text-slate-900 font-semibold shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={17} 
                    className={`transition-colors ${
                      isActive ? 'text-[#e11a22]' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  <span className="text-xs">{item.label}</span>
                </div>
                {item.badge && (
                  <ChevronDown size={14} className="text-gray-300 group-hover:text-gray-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm referrer-policy: no-referrer"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="overflow-hidden">
                <h5 className="font-semibold text-xs text-slate-800 truncate leading-none">
                  {user.name}
                </h5>
                <span className="text-[10px] text-gray-500 block mt-0.5 leading-none">
                  {user.role} profile
                </span>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
