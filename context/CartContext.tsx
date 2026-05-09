"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type CartItem = {
  product_id: string;
  name: string;
  size: string;
  qty: number;
  price: number;
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
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product_id === item.product_id && i.size === item.size
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((product_id: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product_id === product_id && i.size === size))
    );
  }, []);

  const update = useCallback((product_id: string, size: string, qty: number) => {
    if (qty <= 0) { remove(product_id, size); return; }
    setItems((prev) =>
      prev.map((i) =>
        i.product_id === product_id && i.size === size ? { ...i, qty } : i
      )
    );
  }, [remove]);

  const clear = useCallback(() => setItems([]), []);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total, count, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
