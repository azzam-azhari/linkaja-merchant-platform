'use client';

import Link from 'next/link';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-1 items-center justify-center py-20 animate-[fade-in_400ms_ease-out]">
      <div className="flex flex-col items-center gap-4 text-center px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10">
          <Construction size={28} className="text-[var(--color-primary)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-sm">{description ?? 'Halaman ini sedang dalam pengembangan. Nantikan pembaruan selanjutnya!'}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-surface)] px-4 py-1.5 text-xs font-semibold text-[var(--color-text-muted)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          Akan Datang
        </span>
        <Link href="/dashboard" className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]">
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
