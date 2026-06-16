"use client";

import { useState } from "react";
import {
  RefreshCw,
  Search,
  ChevronDown,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  ArrowUpDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Status = "sukses" | "pending" | "gagal" | "kadaluarsa";

interface Transaction {
  invoice: string;
  kasir: string;
  produk: string;
  jumlah: number;
  metode: string;
  status: Status;
  waktu: string;
}

/* ------------------------------------------------------------------ */
/*  Dummy Data                                                         */
/* ------------------------------------------------------------------ */

const DUMMY_TRANSACTIONS: Transaction[] = [
  { invoice: "INV-20260616-001", kasir: "Andi", produk: "Paket Data 10GB", jumlah: 25000, metode: "QRIS", status: "sukses", waktu: "16 Jun 2026, 09:12" },
  { invoice: "INV-20260616-002", kasir: "Sari", produk: "Token Listrik 50kWh", jumlah: 50000, metode: "QRIS", status: "sukses", waktu: "16 Jun 2026, 09:25" },
  { invoice: "INV-20260616-003", kasir: "Budi", produk: "Voucher Game RP50K", jumlah: 50000, metode: "Cash", status: "pending", waktu: "16 Jun 2026, 09:31" },
  { invoice: "INV-20260616-004", kasir: "Andi", produk: "Pulsa Telkomsel 25K", jumlah: 25000, metode: "QRIS", status: "gagal", waktu: "16 Jun 2026, 09:45" },
  { invoice: "INV-20260616-005", kasir: "Dewi", produk: "BPJS Kesehatan", jumlah: 150000, metode: "Transfer", status: "sukses", waktu: "16 Jun 2026, 10:02" },
  { invoice: "INV-20260616-006", kasir: "Sari", produk: "Paket Data 25GB", jumlah: 50000, metode: "QRIS", status: "kadaluarsa", waktu: "16 Jun 2026, 10:15" },
  { invoice: "INV-20260616-007", kasir: "Budi", produk: "Token Listrik 100kWh", jumlah: 100000, metode: "QRIS", status: "sukses", waktu: "16 Jun 2026, 10:30" },
  { invoice: "INV-20260616-008", kasir: "Andi", produk: "Voucher Game RP100K", jumlah: 100000, metode: "E-Wallet", status: "pending", waktu: "16 Jun 2026, 10:48" },
  { invoice: "INV-20260616-009", kasir: "Dewi", produk: "Pulsa Indosat 50K", jumlah: 50000, metode: "QRIS", status: "sukses", waktu: "16 Jun 2026, 11:05" },
  { invoice: "INV-20260616-010", kasir: "Sari", produk: "PDAM Jakarta", jumlah: 85000, metode: "Transfer", status: "gagal", waktu: "16 Jun 2026, 11:20" },
];

/* ------------------------------------------------------------------ */
/*  Status Badge Component                                             */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: Status }) {
  const config: Record<Status, { label: string; icon: React.ElementType; classes: string }> = {
    sukses: {
      label: "Sukses",
      icon: CheckCircle2,
      classes: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      classes: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    },
    gagal: {
      label: "Gagal",
      icon: XCircle,
      classes: "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    },
    kadaluarsa: {
      label: "Kadaluarsa",
      icon: AlertTriangle,
      classes: "bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700",
    },
  };

  const { label, icon: Icon, classes } = config[status];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${classes}`}>
      <Icon size={12} />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Status Filter Options                                              */
/* ------------------------------------------------------------------ */

const STATUS_OPTIONS = [
  { value: "semua", label: "Semua" },
  { value: "pending", label: "Pending" },
  { value: "sukses", label: "Sukses" },
  { value: "gagal", label: "Gagal" },
  { value: "kadaluarsa", label: "Kadaluarsa" },
];

/* ------------------------------------------------------------------ */
/*  Transaction Page                                                   */
/* ------------------------------------------------------------------ */

export default function TransaksiPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [statusOpen, setStatusOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const filtered = DUMMY_TRANSACTIONS.filter((tx) => {
    const matchSearch =
      search === "" ||
      tx.invoice.toLowerCase().includes(search.toLowerCase()) ||
      tx.kasir.toLowerCase().includes(search.toLowerCase()) ||
      tx.produk.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "semua" || tx.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const activeLabel =
    STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label ?? "Semua";

  return (
    <div className="space-y-6 animate-[fade-in_400ms_ease-out]">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Transaksi
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Kelola dan pantau seluruh transaksi merchant Anda.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="mt-2 sm:mt-0 inline-flex items-center gap-2 rounded-xl border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] px-4 py-2.5 text-xs font-semibold text-[var(--color-text-secondary)] shadow-sm transition-all hover:bg-[var(--color-sidebar-surface)] active:scale-[0.98] disabled:opacity-50"
        >
          <RefreshCw
            size={14}
            className={`transition-transform ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          />
          <input
            type="text"
            placeholder="Cari invoice, kasir, atau produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors focus:border-[var(--color-primary)]/40 focus:ring-2 focus:ring-[var(--color-primary)]/10"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] shadow-sm transition-colors hover:bg-[var(--color-sidebar-surface)]"
          >
            Status: <span className="font-semibold text-[var(--color-text-primary)]">{activeLabel}</span>
            <ChevronDown
              size={14}
              className={`text-[var(--color-text-muted)] transition-transform ${statusOpen ? "rotate-180" : ""}`}
            />
          </button>

          {statusOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setStatusOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-50 w-44 rounded-xl border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setStatusFilter(opt.value);
                      setStatusOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      statusFilter === opt.value
                        ? "bg-[var(--color-primary)]/10 font-semibold text-[var(--color-primary)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-sidebar-surface)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-surface)]/60">
                {[
                  { label: "Invoice", align: "left" },
                  { label: "Kasir", align: "left" },
                  { label: "Produk", align: "left" },
                  { label: "Jumlah", align: "right" },
                  { label: "Metode", align: "center" },
                  { label: "Status", align: "center" },
                  { label: "Waktu", align: "left" },
                  { label: "Aksi", align: "center" },
                ].map((col) => (
                  <th
                    key={col.label}
                    className={`whitespace-nowrap px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-sidebar-border)]">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-sm text-[var(--color-text-muted)]"
                  >
                    Tidak ada transaksi ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr
                    key={tx.invoice}
                    className="transition-colors hover:bg-[var(--color-sidebar-surface)]/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-[var(--color-primary)]">
                      {tx.invoice}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-[var(--color-text-primary)]">
                      {tx.kasir}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-[var(--color-text-secondary)]">
                      {tx.produk}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-[var(--color-text-primary)]">
                      Rp {tx.jumlah.toLocaleString("id-ID")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      <span className="inline-flex items-center rounded-md bg-[var(--color-surface-1)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-text-secondary)]">
                        {tx.metode}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-[var(--color-text-muted)] text-xs">
                      {tx.waktu}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      <button className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-sidebar-surface)] hover:text-[var(--color-text-primary)]">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between border-t border-[var(--color-sidebar-border)] px-4 py-3">
          <p className="text-xs text-[var(--color-text-muted)]">
            Menampilkan <span className="font-semibold text-[var(--color-text-secondary)]">{filtered.length}</span> dari{" "}
            <span className="font-semibold text-[var(--color-text-secondary)]">{DUMMY_TRANSACTIONS.length}</span> transaksi
          </p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-sidebar-surface)]">
              Sebelumnya
            </button>
            <button className="rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-xs font-medium text-white shadow-sm">
              1
            </button>
            <button className="rounded-lg border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-sidebar-surface)]">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
