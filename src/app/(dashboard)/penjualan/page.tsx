"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ElementType } from "react";
import {
  ArrowRight,
  Banknote,
  CupSoda,
  Minus,
  PackagePlus,
  Plus,
  Popcorn,
  QrCode,
  Search,
  ShoppingBag,
  ShoppingCart,
  SoapDispenserDroplet,
  Tags,
  Trash2,
  Utensils,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

type ProductCategory = "Makanan" | "Minuman" | "Sabun Mandi" | "Snack";
type CategoryName = "Semua" | ProductCategory;
type PaymentMethod = "qris" | "cash";
type CartState = Record<number, number>;

interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  icon: ElementType;
  price: number;
  stock: number;
  artClassName: string;
}

interface CategoryOption {
  name: CategoryName;
  icon: ElementType;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Aqua 600ml",
    category: "Minuman",
    icon: CupSoda,
    price: 3000,
    stock: 98,
    artClassName:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
  },
  {
    id: 2,
    name: "Indomie Goreng",
    category: "Makanan",
    icon: Utensils,
    price: 5000,
    stock: 49,
    artClassName:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300",
  },
  {
    id: 3,
    name: "Sabun Lifebuoy",
    category: "Sabun Mandi",
    icon: SoapDispenserDroplet,
    price: 10000,
    stock: 19,
    artClassName:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-300",
  },
  {
    id: 4,
    name: "Snack Chitato",
    category: "Snack",
    icon: Popcorn,
    price: 7000,
    stock: 30,
    artClassName:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300",
  },
  {
    id: 5,
    name: "Teh Botol Sosro",
    category: "Minuman",
    icon: CupSoda,
    price: 4000,
    stock: 80,
    artClassName:
      "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300",
  },
];

const CATEGORIES: CategoryOption[] = [
  { name: "Semua", icon: Tags },
  { name: "Makanan", icon: Utensils },
  { name: "Minuman", icon: CupSoda },
  { name: "Sabun Mandi", icon: SoapDispenserDroplet },
  { name: "Snack", icon: Popcorn },
];

const INITIAL_CART: CartState = {
  1: 1,
  2: 1,
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value);

const money = (value: number) => `Rp ${formatRupiah(value)}`;

const productById = (id: number) =>
  PRODUCTS.find((product) => product.id === id);

function QuantityButton({
  children,
  className,
  disabled,
  label,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
    >
      {children}
    </button>
  );
}

export default function PenjualanPage() {
  const [category, setCategory] = useState<CategoryName>("Semua");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartState>(INITIAL_CART);
  const [method, setMethod] = useState<PaymentMethod>("qris");
  const [paymentNote, setPaymentNote] = useState("");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(
    null
  );

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory = category === "Semua" || product.category === category;
      const matchesSearch = !query || product.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartItems = useMemo(() => {
    const items: Array<{ product: Product; quantity: number }> = [];

    Object.entries(cart).forEach(([productId, quantity]) => {
      const product = productById(Number(productId));
      if (product && quantity > 0) {
        items.push({ product, quantity });
      }
    });

    return items;
  }, [cart]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [cartItems]
  );

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!paymentOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPaymentOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paymentOpen]);

  const showToast = (message: string) => {
    setToast({ id: Date.now(), message });
  };

  const addToCart = (productId: number) => {
    const product = productById(productId);
    if (!product) return;

    setCart((currentCart) => {
      const quantity = currentCart[productId] ?? 0;
      if (quantity >= product.stock) return currentCart;

      return {
        ...currentCart,
        [productId]: quantity + 1,
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) => {
      const quantity = currentCart[productId] ?? 0;
      if (quantity <= 1) {
        const nextCart = { ...currentCart };
        delete nextCart[productId];
        return nextCart;
      }

      return {
        ...currentCart,
        [productId]: quantity - 1,
      };
    });
  };

  const deleteFromCart = (productId: number) => {
    setCart((currentCart) => {
      const nextCart = { ...currentCart };
      delete nextCart[productId];
      return nextCart;
    });
  };

  const openPayment = () => {
    if (!cartCount) return;

    setMethod("qris");
    setPaymentNote("");
    setPaymentOpen(true);
  };

  const confirmPayment = () => {
    setPaymentOpen(false);
    setCart({});
    setPaymentNote("");
    showToast("Pembayaran berhasil");
  };

  return (
    <>
      <div className="grid gap-6 animate-[fade-in_400ms_ease-out] xl:grid-cols-[minmax(0,1fr)_400px]">
        <section aria-label="Daftar produk" className="min-w-0 space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <ShoppingBag size={18} />
                </span>
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                  Penjualan
                </h1>
              </div>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Pilih produk untuk membuat transaksi.
              </p>
            </div>

            <Link
              href="/produk"
              className="inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-4 text-sm font-semibold text-[var(--color-primary)] shadow-sm transition-colors hover:bg-[var(--color-primary)]/20"
            >
              <PackagePlus size={16} />
              Kelola Produk
            </Link>
          </div>

          <label className="relative block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            />
            <input
              type="search"
              placeholder="Cari produk..."
              autoComplete="off"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-[52px] w-full rounded-2xl border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] pl-12 pr-4 text-sm text-[var(--color-text-primary)] shadow-sm outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]/40 focus:ring-2 focus:ring-[var(--color-primary)]/10"
            />
          </label>

          <nav
            aria-label="Kategori produk"
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin"
          >
            {CATEGORIES.map((item) => {
              const Icon = item.icon;
              const active = category === item.name;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setCategory(item.name)}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors",
                    active
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-sm"
                      : "border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-sidebar-surface)]"
                  )}
                >
                  <Icon size={15} />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {visibleProducts.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {visibleProducts.map((product) => {
                const ProductIcon = product.icon;
                const quantity = cart[product.id] ?? 0;

                return (
                  <article
                    key={product.id}
                    className="glass-card flex min-h-[236px] flex-col p-4 transition-all duration-200 hover:-translate-y-0.5 sm:p-5"
                  >
                    <div
                      className={cn(
                        "mb-4 flex h-24 items-center justify-center rounded-xl",
                        product.artClassName
                      )}
                      aria-hidden="true"
                    >
                      <ProductIcon size={36} strokeWidth={1.8} />
                    </div>

                    <h2 className="text-base font-bold leading-snug text-[var(--color-text-primary)]">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-sm font-extrabold text-[var(--color-primary)]">
                      {money(product.price)}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                      <span className="text-xs font-medium text-[var(--color-text-muted)]">
                        Stok: {product.stock}
                      </span>

                      <div className="inline-flex min-h-7 items-center gap-3">
                        {quantity > 0 && (
                          <>
                            <QuantityButton
                              label={`Kurangi ${product.name}`}
                              onClick={() => removeFromCart(product.id)}
                              className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20"
                            >
                              <Minus size={14} />
                            </QuantityButton>
                            <span className="min-w-4 text-center text-sm font-extrabold text-[var(--color-text-primary)]">
                              {quantity}
                            </span>
                          </>
                        )}
                        <QuantityButton
                          label={`Tambah ${product.name}`}
                          disabled={quantity >= product.stock}
                          onClick={() => addToCart(product.id)}
                          className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                        >
                          <Plus size={15} />
                        </QuantityButton>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--color-sidebar-border)] px-4 py-12 text-center text-sm text-[var(--color-text-muted)]">
              Produk tidak ditemukan.
            </div>
          )}
        </section>

        <aside
          aria-label="Keranjang"
          className="glass-card flex min-h-[520px] flex-col overflow-hidden xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)]"
        >
          <div className="flex min-h-[72px] items-center justify-between gap-4 border-b border-[var(--color-sidebar-border)] px-5">
            <div className="inline-flex items-center gap-3 text-lg font-extrabold text-[var(--color-text-primary)]">
              <ShoppingCart size={24} className="text-[var(--color-primary)]" />
              Keranjang
            </div>
            <span className="inline-flex h-7 min-w-8 items-center justify-center rounded-full bg-[var(--color-primary)] px-2 text-sm font-extrabold text-white">
              {cartCount}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
            {cartItems.length ? (
              <div className="space-y-3">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="grid gap-3 rounded-xl bg-[var(--color-sidebar-surface)] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-[var(--color-text-primary)]">
                        {product.name}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">
                        {money(product.price)}
                      </p>
                    </div>

                    <div className="inline-flex items-center justify-end gap-3">
                      <QuantityButton
                        label={`Kurangi ${product.name}`}
                        onClick={() => removeFromCart(product.id)}
                        className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20"
                      >
                        <Minus size={14} />
                      </QuantityButton>
                      <span className="min-w-4 text-center text-sm font-extrabold text-[var(--color-text-primary)]">
                        {quantity}
                      </span>
                      <QuantityButton
                        label={`Tambah ${product.name}`}
                        disabled={quantity >= product.stock}
                        onClick={() => addToCart(product.id)}
                        className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                      >
                        <Plus size={15} />
                      </QuantityButton>
                      <button
                        type="button"
                        aria-label={`Hapus ${product.name}`}
                        title={`Hapus ${product.name}`}
                        onClick={() => deleteFromCart(product.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid h-full min-h-56 place-items-center rounded-xl border border-dashed border-[var(--color-sidebar-border)] text-center text-sm text-[var(--color-text-muted)]">
                Keranjang masih kosong.
              </div>
            )}
          </div>

          <div className="border-t border-[var(--color-sidebar-border)] p-5">
            <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
              <span className="text-[var(--color-text-secondary)]">Subtotal</span>
              <strong className="text-[var(--color-text-primary)]">
                {money(cartTotal)}
              </strong>
            </div>
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <span className="font-extrabold text-[var(--color-text-primary)]">
                Total
              </span>
              <strong className="text-xl font-extrabold text-[var(--color-primary)]">
                {money(cartTotal)}
              </strong>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-[86px_76px_minmax(0,1fr)]">
              <button
                type="button"
                onClick={() => showToast("Transaksi disimpan")}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] px-3 text-sm font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-sidebar-surface)]"
              >
                Simpan
              </button>
              <button
                type="button"
                disabled={!cartCount}
                onClick={() => setCart({})}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-bg)] px-3 text-sm font-bold text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-sidebar-surface)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Hapus
              </button>
              <button
                type="button"
                disabled={!cartCount}
                onClick={openPayment}
                className="col-span-2 inline-flex h-12 items-center justify-center rounded-xl bg-[var(--color-primary)] px-3 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-1"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </aside>
      </div>

      {paymentOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-title"
          onClick={() => setPaymentOpen(false)}
        >
          <section
            className="w-full max-w-[520px] overflow-hidden rounded-[30px] border border-black/5 bg-[#fcfcfd] shadow-2xl dark:border-white/10 dark:bg-[var(--color-sidebar-bg)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-black/8 px-6 py-6 dark:border-white/8">
              <h2
                id="payment-title"
                className="text-[17px] font-extrabold text-[#1d2433] dark:text-[var(--color-text-primary)]"
              >
                Konfirmasi Pembayaran
              </h2>
              <button
                type="button"
                aria-label="Tutup"
                title="Tutup"
                onClick={() => setPaymentOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#6f7a8d] transition-colors hover:bg-black/5 hover:text-[#1d2433] dark:text-[var(--color-text-muted)] dark:hover:bg-white/5 dark:hover:text-[var(--color-text-primary)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-5">
              <div className="space-y-2">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <div className="min-w-0 text-[#667085] dark:text-[var(--color-text-secondary)]">
                      {product.name} x{quantity}
                    </div>
                    <div className="shrink-0 font-semibold text-[#1d2433] dark:text-[var(--color-text-primary)]">
                      {money(product.price * quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl bg-[#f7f8fb] p-4 dark:bg-white/[0.04]">
                <div className="flex items-center justify-between gap-4 border-b border-black/8 pb-3 text-sm dark:border-white/8">
                  <span className="text-[#667085] dark:text-[var(--color-text-secondary)]">
                    Subtotal
                  </span>
                  <span className="font-medium text-[#667085] dark:text-[var(--color-text-secondary)]">
                    {money(cartTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 pt-3">
                  <span className="text-[15px] font-extrabold text-[#1d2433] dark:text-[var(--color-text-primary)]">
                    Total
                  </span>
                  <strong className="text-[15px] font-extrabold text-[var(--color-primary)]">
                    {money(cartTotal)}
                  </strong>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-[15px] font-bold text-[#1d2433] dark:text-[var(--color-text-primary)]">
                  Metode Pembayaran
                </h3>
                <div
                  role="tablist"
                  aria-label="Metode pembayaran"
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={method === "qris"}
                    onClick={() => setMethod("qris")}
                    className={cn(
                      "flex min-h-[92px] flex-col items-center justify-center rounded-2xl border px-4 py-4 text-center transition-colors",
                      method === "qris"
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/[0.03] text-[var(--color-primary)]"
                        : "border-[#d7dde7] bg-white text-[#667085] hover:bg-[#fafbfc] dark:border-white/10 dark:bg-[var(--color-sidebar-bg)] dark:text-[var(--color-text-secondary)] dark:hover:bg-white/[0.03]"
                    )}
                  >
                    <QrCode size={22} />
                    <span className="mt-2 text-[15px] font-extrabold">QRIS</span>
                    <span className="mt-1 text-xs font-medium">
                      Scan QR untuk bayar
                    </span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={method === "cash"}
                    onClick={() => setMethod("cash")}
                    className={cn(
                      "flex min-h-[92px] flex-col items-center justify-center rounded-2xl border px-4 py-4 text-center transition-colors",
                      method === "cash"
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/[0.03] text-[var(--color-primary)]"
                        : "border-[#d7dde7] bg-white text-[#667085] hover:bg-[#fafbfc] dark:border-white/10 dark:bg-[var(--color-sidebar-bg)] dark:text-[var(--color-text-secondary)] dark:hover:bg-white/[0.03]"
                    )}
                  >
                    <Banknote size={22} />
                    <span className="mt-2 text-[15px] font-extrabold">Tunai</span>
                    <span className="mt-1 text-xs font-medium">
                      Bayar langsung
                    </span>
                  </button>
                </div>
              </div>

              <label className="block">
                <span className="mb-3 block text-[15px] font-bold text-[#1d2433] dark:text-[var(--color-text-primary)]">
                  Catatan (opsional)
                </span>
                <textarea
                  value={paymentNote}
                  onChange={(event) => setPaymentNote(event.target.value)}
                  placeholder="Tambahkan catatan..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-[#d7dde7] bg-white px-4 py-3 text-sm text-[#1d2433] outline-none transition-colors placeholder:text-[#98a2b3] focus:border-[var(--color-primary)]/30 focus:ring-2 focus:ring-[var(--color-primary)]/10 dark:border-white/10 dark:bg-[var(--color-sidebar-bg)] dark:text-[var(--color-text-primary)] dark:placeholder:text-[var(--color-text-muted)]"
                />
              </label>

              <button
                type="button"
                onClick={confirmPayment}
                className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-4 text-base font-extrabold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-dark)]"
              >
                Lanjutkan Pembayaran
                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-[60] max-w-[calc(100vw-3rem)] rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-2xl animate-[fade-in_180ms_ease-out]"
        >
          {toast.message}
        </div>
      )}
    </>
  );
}
