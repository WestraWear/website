const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export type Product = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  original_price?: number;
  sizes: string[];
  tags: string[];
  in_stock: boolean;
  image_placeholder: string;
};

export type OrderItem = {
  product_id: string;
  product_name: string;
  size: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address: string;
  items: OrderItem[];
  total: number;
  payment_method: string;
  payment_status: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type OrderCreate = {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address: string;
  items: OrderItem[];
  total: number;
  payment_method: string;
  notes?: string;
};

export type RazorpayCreateOrderResponse = {
  order_id: string;
  amount: number;
  currency: string;
  receipt: string;
  key_id: string;
};

export type RazorpayVerifyPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address: string;
  items: OrderItem[];
  total: number;
  notes?: string;
};

export type CartValidateItem = {
  product_id: string;
  price: number;
};

export type CartValidateResult = {
  product_id: string;
  status: "ok" | "out_of_stock" | "price_changed" | "not_found";
  name?: string;
  old_price?: number;
  new_price?: number;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  products: {
    list: (params?: { category?: string; in_stock?: boolean }) => {
      const qs = new URLSearchParams();
      if (params?.category) qs.set("category", params.category);
      if (params?.in_stock !== undefined) qs.set("in_stock", String(params.in_stock));
      return request<Product[]>(`/products?${qs}`);
    },
    get: (id: string) => request<Product>(`/products/${id}`),
    validateCart: (items: CartValidateItem[]) =>
      request<CartValidateResult[]>("/products/validate-cart", {
        method: "POST",
        body: JSON.stringify(items),
      }),
  },
  orders: {
    create: (body: OrderCreate) =>
      request<Order>("/orders", { method: "POST", body: JSON.stringify(body) }),
  },
  payments: {
    createOrder: (amount_paise: number, receipt?: string) =>
      request<RazorpayCreateOrderResponse>("/payments/create-order", {
        method: "POST",
        body: JSON.stringify({ amount_paise, currency: "INR", receipt }),
      }),
    verify: (payload: RazorpayVerifyPayload) =>
      request<Order>("/payments/verify", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  },
};
