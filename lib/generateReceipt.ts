import { jsPDF } from "jspdf";
import type { Order } from "./api";

async function loadImageAsBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateReceipt(order: Order) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();

  // ── Palette ─────────────────────────────────────────────
  const GOLD   = [155, 99, 53]   as [number, number, number];
  const DARK   = [40, 32, 26]    as [number, number, number];
  const MID    = [90, 74, 60]    as [number, number, number];
  const LIGHT  = [140, 126, 114] as [number, number, number];
  const BG_ALT = [232, 224, 212] as [number, number, number];
  const BG     = [248, 244, 238] as [number, number, number];

  // ── Header bar ──────────────────────────────────────────
  doc.setFillColor(...BG_ALT);
  doc.rect(0, 0, W, 42, "F");

  // Logo + brand name side by side, centred
  const logoH = 22;
  let logoW = logoH;
  try {
    const logoData = await loadImageAsBase64("/logo_transparent.png");
    const img = new window.Image();
    img.src = logoData;
    await new Promise((r) => { img.onload = r; });
    logoW = logoH * (img.naturalWidth / img.naturalHeight);

    // measure brand text width to compute total group width
    doc.setFont("times", "italic");
    doc.setFontSize(26);
    const textW = doc.getTextWidth("Westra Wear");
    const gap = 4; // mm between logo and text
    const groupW = logoW + gap + textW;
    const startX = W / 2 - groupW / 2;

    doc.addImage(logoData, "PNG", startX, 10, logoW, logoH, undefined, "FAST");

    doc.setFont("times", "italic");
    doc.setFontSize(26);
    doc.setTextColor(...GOLD);
    doc.text("Westra Wear", startX + logoW + gap, 26);
  } catch {
    doc.setFont("times", "italic");
    doc.setFontSize(26);
    doc.setTextColor(...GOLD);
    doc.text("Westra Wear", W / 2, 26, { align: "center" });
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...LIGHT);
  doc.text("LUXURY WOMEN'S FASHION", W / 2, 37, { align: "center" });

  // ── Order title ─────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text("ORDER RECEIPT", 20, 54);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MID);
  doc.text(`Order No.  ${order.order_number}`, 20, 61);
  doc.text(
    `Date:  ${new Date(order.created_at).toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric",
    })}`,
    20,
    67
  );

  // Payment pill
  const payLabel =
    order.payment_method === "cod"
      ? "Cash on Delivery"
      : order.payment_method === "upi"
      ? "UPI"
      : "Bank Transfer";
  doc.setFillColor(...GOLD);
  doc.roundedRect(W - 52, 50, 34, 8, 1, 1, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text(payLabel.toUpperCase(), W - 35, 55.2, { align: "center" });

  // ── Divider ─────────────────────────────────────────────
  doc.setDrawColor(...BG_ALT);
  doc.setLineWidth(0.4);
  doc.line(20, 74, W - 20, 74);

  // ── Customer details ────────────────────────────────────
  let y = 82;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.text("BILL TO", 20, y);

  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  doc.text(order.customer_name, 20, y);

  y += 5;
  doc.setFontSize(8.5);
  doc.setTextColor(...MID);
  doc.text(order.customer_phone, 20, y);

  if (order.customer_email) {
    y += 5;
    doc.text(order.customer_email, 20, y);
  }

  y += 5;
  const addressLines = doc.splitTextToSize(order.customer_address, 80);
  doc.text(addressLines, 20, y);
  y += addressLines.length * 5;

  // ── Items table ─────────────────────────────────────────
  y += 6;
  doc.setFillColor(...BG_ALT);
  doc.rect(20, y, W - 40, 7, "F");

  const colX = { item: 22, size: 110, qty: 132, price: 152, total: 172 };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...MID);
  doc.text("ITEM", colX.item, y + 4.8);
  doc.text("SIZE", colX.size, y + 4.8);
  doc.text("QTY", colX.qty, y + 4.8);
  doc.text("PRICE", colX.price, y + 4.8);
  doc.text("TOTAL", colX.total, y + 4.8);

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);

  order.items.forEach((item, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(...BG);
      doc.rect(20, y - 3.5, W - 40, 8, "F");
    }
    doc.setTextColor(...DARK);
    const nameLines = doc.splitTextToSize(item.product_name, 82);
    doc.text(nameLines, colX.item, y + 0.5);
    doc.setTextColor(...MID);
    doc.text(item.size, colX.size, y + 0.5);
    doc.text(String(item.qty), colX.qty, y + 0.5);
    doc.text(`Rs. ${item.price.toLocaleString("en-IN")}`, colX.price, y + 0.5);
    doc.text(`Rs. ${(item.price * item.qty).toLocaleString("en-IN")}`, colX.total, y + 0.5);
    y += nameLines.length > 1 ? nameLines.length * 5 + 2 : 8;
  });

  // ── Total row ───────────────────────────────────────────
  doc.setDrawColor(...BG_ALT);
  doc.line(20, y, W - 20, y);
  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...GOLD);
  doc.text("TOTAL", colX.price, y);
  doc.text(`Rs. ${order.total.toLocaleString("en-IN")}`, colX.total, y);

  // ── Notes ───────────────────────────────────────────────
  if (order.notes) {
    y += 10;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(...LIGHT);
    const noteLines = doc.splitTextToSize(`Note: ${order.notes}`, W - 40);
    doc.text(noteLines, 20, y);
    y += noteLines.length * 5;
  }

  // ── Footer ──────────────────────────────────────────────
  const footerY = doc.internal.pageSize.getHeight() - 18;
  doc.setDrawColor(...BG_ALT);
  doc.line(20, footerY - 4, W - 20, footerY - 4);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...LIGHT);
  doc.text("Thank you for shopping with Westra.", W / 2, footerY, { align: "center" });
  doc.text("Questions? WhatsApp us at +91 75011 82583", W / 2, footerY + 5, { align: "center" });

  doc.save(`Westra_Receipt_${order.order_number}.pdf`);
}
