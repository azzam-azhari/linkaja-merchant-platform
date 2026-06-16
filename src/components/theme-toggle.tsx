"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button 
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.03] text-[var(--color-text-muted)] transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.05]"
        aria-label="Toggle theme"
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button 
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.03] text-[var(--color-text-muted)] transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:text-[var(--color-text-secondary)]"
      aria-label="Toggle theme"
    >
      {isDark ? <Moon className="h-4 w-4 shrink-0" /> : <Sun className="h-4 w-4 shrink-0" />}
    </button>
  );
}
