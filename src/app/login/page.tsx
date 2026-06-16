"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login delay, then redirect
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center bg-[var(--color-primary)] text-white overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5" />
        <div className="absolute top-1/3 right-12 h-48 w-48 rounded-full bg-white/[0.03]" />

        <div className="relative z-10 flex flex-col items-center gap-6 px-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm shadow-2xl">
            <svg
              className="h-10 w-10 text-white"
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
            <h1 className="text-3xl font-bold tracking-tight">
              LinkAja Merchant
            </h1>
            <p className="mt-2 text-base text-white/70 max-w-sm">
              Platform manajemen merchant — kelola transaksi, laporan, dan
              perangkat dalam satu dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex flex-1 items-center justify-center bg-[var(--background)] px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20">
              <svg
                className="h-5 w-5 text-white"
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
            <span className="text-lg font-bold text-[var(--color-text-primary)]">
              LinkAja Merchant
            </span>
          </div>

          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Selamat Datang
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Masuk ke akun merchant Anda untuk melanjutkan.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-text-secondary)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@merchant.com"
                className="w-full rounded-xl border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors focus:border-[var(--color-primary)]/40 focus:ring-2 focus:ring-[var(--color-primary)]/10"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[var(--color-text-secondary)]"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
                >
                  Lupa password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full rounded-xl border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] px-4 py-3 pr-12 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors focus:border-[var(--color-primary)]/40 focus:ring-2 focus:ring-[var(--color-primary)]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-[var(--color-sidebar-border)] text-[var(--color-primary)] accent-[var(--color-primary)]"
              />
              <label
                htmlFor="remember"
                className="text-sm text-[var(--color-text-secondary)]"
              >
                Ingat saya
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-xl active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <>
                  <LogIn size={16} />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-sidebar-border)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[var(--background)] px-4 text-[var(--color-text-muted)]">
                atau
              </span>
            </div>
          </div>

          {/* Back to Home */}
          <p className="text-center text-sm text-[var(--color-text-muted)]">
            Kembali ke{" "}
            <Link
              href="/"
              className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
            >
              Halaman Utama
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
