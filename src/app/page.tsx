import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <div className="flex flex-col items-center gap-8 text-center px-6">
        {/* Logo / Branding */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
              LinkAja Merchant
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Platform manajemen merchant — kelola transaksi, laporan, dan perangkat.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Go to Dashboard
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
