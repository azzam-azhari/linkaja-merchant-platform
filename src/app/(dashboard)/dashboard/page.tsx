import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  CheckCircle,
  Clock
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Stat Card Data                                                     */
/* ------------------------------------------------------------------ */

const stats = [
  {
    id: "transactions",
    label: "Transaksi Hari Ini",
    value: "156",
    subtext: "semua status",
    icon: ShoppingCart,
    gradient: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-500/10",
  },
  {
    id: "revenue",
    label: "Total Revenue",
    value: "Rp 12.450.000",
    change: "+15.2%",
    subtext: "vs kemarin",
    icon: DollarSign,
    gradient: "from-[var(--color-primary)] to-[var(--color-primary-dark)]",
    shadow: "shadow-[var(--color-primary)]/10",
  },
  {
    id: "net_profit",
    label: "Total Laba Bersih",
    value: "Rp 3.120.000",
    change: "+8.4%",
    subtext: "vs kemarin",
    icon: Activity,
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/10",
  },
  {
    id: "success",
    label: "Sukses",
    value: "142",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-500/10",
  },
  {
    id: "pending",
    label: "Pending",
    value: "14",
    icon: Clock,
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/10",
  },
];

/* ------------------------------------------------------------------ */
/*  Dashboard Page                                                     */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const currentHour = new Date().getHours();
  let greeting = "Selamat Pagi";
  if (currentHour >= 12 && currentHour < 15) greeting = "Selamat Siang";
  else if (currentHour >= 15 && currentHour < 18) greeting = "Selamat Sore";
  else if (currentHour >= 18 || currentHour < 4) greeting = "Selamat Malam";

  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="space-y-6 animate-[fade-in_400ms_ease-out]">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          {greeting}, User 👋
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {dateStr} &middot; Berikut ringkasan hari ini
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`glass-card group relative overflow-hidden p-4 transition-all duration-300 hover:-translate-y-0.5 ${
                index === 0 ? 'col-span-2 xl:col-span-1' : 'col-span-1'
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Background glow */}
              <div
                className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-[0.08] blur-2xl transition-opacity duration-300 group-hover:opacity-[0.15]`}
              />

              <div className="relative flex flex-col items-start gap-4">
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadow}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  {stat.change && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.04]">
                      <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
                        {stat.change}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {stat.label}
                  </p>
                  {stat.subtext && (
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {stat.subtext}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Chart Placeholder */}
        <div className="glass-card col-span-1 lg:col-span-2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                Grafik Pendapatan
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                30 hari terakhir
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-black/[0.08] bg-black/[0.02] p-0.5 text-xs">
              <button className="rounded-md bg-[var(--color-primary)] px-3 py-1 font-medium text-white">
                Harian
              </button>
              <button className="rounded-md px-3 py-1 font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">
                Mingguan
              </button>
              <button className="rounded-md px-3 py-1 font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">
                Bulanan
              </button>
            </div>
          </div>

          {/* Chart area - will be replaced with Recharts later */}
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-black/[0.08] text-sm text-[var(--color-text-muted)]">
            <div className="text-center">
              <Activity className="mx-auto mb-2 h-8 w-8 opacity-40" />
              <p>Grafik Recharts akan ditampilkan di sini</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="glass-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
              Transaksi Terbaru
            </h3>
            <button className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors">
              Lihat Semua
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                name: "Pembayaran QR",
                amount: "+Rp 125.000",
                time: "2 menit lalu",
                color: "from-green-500 to-emerald-600",
              },
              {
                name: "Top Up Saldo",
                amount: "+Rp 500.000",
                time: "15 menit lalu",
                color: "from-blue-500 to-indigo-600",
              },
              {
                name: "Transfer Dana",
                amount: "-Rp 250.000",
                time: "1 jam lalu",
                color: "from-orange-500 to-red-600",
              },
              {
                name: "Pembayaran QR",
                amount: "+Rp 89.000",
                time: "2 jam lalu",
                color: "from-green-500 to-emerald-600",
              },
              {
                name: "Penarikan",
                amount: "-Rp 1.000.000",
                time: "3 jam lalu",
                color: "from-purple-500 to-violet-600",
              },
            ].map((tx, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-black/[0.03]"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tx.color}`}
                >
                  <ShoppingCart className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {tx.name}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)]">
                    {tx.time}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    tx.amount.startsWith("+")
                      ? "text-[var(--color-success)]"
                      : "text-[var(--color-error)]"
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
