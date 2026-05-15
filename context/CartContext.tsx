"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const STORAGE_KEY = "westra_cart";

export type CartItem = {
  product_id: string;
  name: string;
  size: string;
  qty: number;
  price: number;
  image?: string;
  warning?: "out_of_stock" | "price_changed";
};

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (product_id: string, size: string) => void;
  update: (product_id: string, size: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  validating: boolean;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [validating, setValidating] = useState(false);
  // Track whether we've hydrated from localStorage yet
  const hydrated = useRef(false);
  const [hydratedState, setHydratedState] = useState(false);

  // ── Hydrate from localStorage on first mount ──────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore parse errors — start with empty cart
    }
    hydrated.current = true;
    setHydratedState(true);
  }, []);

  // ── Persist to localStorage whenever items change (after hydration) ───────
  useEffect(() => {
    if (!hydrated.current) return;
    // Strip transient warning field before persisting
    const toSave = items.map(({ warning: _w, ...rest }) => rest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [items]);

  // ── Validate cart against backend after hydration ─────────────────────────
  const validateCart = useCallback(async (cartItems: CartItem[]) => {
    if (cartItems.length === 0) return;
    setValidating(true);
    try {
      const results = await api.products.validateCart(
        cartItems.map((i) => ({ product_id: i.product_id, price: i.price }))
      );

      setItems((prev) => {
        let next = [...prev];
        for (const r of results) {
          if (r.status === "not_found") {
            const item = next.find((i) => i.product_id === r.product_id);
            if (item) toast.error(`"${item.name}" is no longer available and was removed from your cart.`);
            next = next.filter((i) => i.product_id !== r.product_id);
          } else if (r.status === "out_of_stock") {
            next = next.map((i) =>
              i.product_id === r.product_id ? { ...i, warning: "out_of_stock" } : i
            );
            toast.warning(`"${r.name}" is currently out of stock.`);
          } else if (r.status === "price_changed" && r.new_price !== undefined) {
            next = next.map((i) =>
              i.product_id === r.product_id
                ? { ...i, price: r.new_price!, warning: "price_changed" }
                : i
            );
            toast.info(
              `Price for "${r.name}" changed from ₹${r.old_price} to ₹${r.new_price}.`
            );
          }
        }
        return next;
      });
    } catch {
      // Silently skip — don't block the user if backend is unreachable
    } finally {
      setValidating(false);
    }
  }, []);

  // Run validation once after initial hydration
  useEffect(() => {
    if (!hydratedState) return;
    if (items.length > 0) {
      validateCart(items);
    }
    // Only run once when hydratedState flips to true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydratedState]);

  // ── Mutation helpers ───────────────────────────────────────────────────────
  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product_id === item.product_id && i.size === item.size
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty, warning: undefined };
        return next;
      }
      return [...prev, { ...item, warning: undefined }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((product_id: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product_id === product_id && i.size === size))
    );
  }, []);

  const update = useCallback(
    (product_id: string, size: string, qty: number) => {
      if (qty <= 0) {
        remove(product_id, size);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product_id === product_id && i.size === size ? { ...i, qty } : i
        )
      );
    },
    [remove]
  );

  const clear = useCallback(() => setItems([]), []);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, update, clear, total, count, open, setOpen, validating }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
