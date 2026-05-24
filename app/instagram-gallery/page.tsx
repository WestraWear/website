import type { Metadata } from "next";
import InstagramGallery from "./InstagramGallery";
import type { InstagramPost } from "@/lib/api";

export const dynamic = "force-dynamic";

const BASE = "https://westrawear.com";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function fetchInstagram() {
  try {
    const [feedRes, statsRes] = await Promise.all([
      fetch(`${API}/social/instagram/feed?limit=24`, { cache: "no-store" }),
      fetch(`${API}/social/instagram/stats`, { cache: "no-store" }),
    ]);
    const items: InstagramPost[] = feedRes.ok ? await feedRes.json() : [];
    const stats = statsRes.ok ? await statsRes.json() : null;
    return {
      posts: items.filter((m) => m.media_type !== "VIDEO"),
      reels: items.filter((m) => m.media_type === "VIDEO"),
      stats,
    };
  } catch {
    return { posts: [], reels: [], stats: null };
  }
}

export const metadata: Metadata = {
  title: "Instagram Gallery | #WestraWear | Westra Wear",
  description: "Follow Westra Wear on Instagram @westra.wear — explore our latest photo posts, reels, behind-the-scenes and customer styling inspiration.",
  keywords: ["Westra Wear Instagram", "women's fashion Instagram India", "westra.wear", "#WestraWear", "fashion reels India"],
  alternates: { canonical: `${BASE}/instagram-gallery` },
  openGraph: { type: "website", locale: "en_IN", url: `${BASE}/instagram-gallery`, siteName: "Westra Wear", title: "Instagram Gallery | #WestraWear | Westra Wear", description: "Explore the Westra Wear Instagram gallery — photos, reels and styling inspiration from @westra.wear.", images: [{ url: `${BASE}/og-instagram.jpg`, width: 1200, height: 630, alt: "Westra Wear Instagram Gallery" }] },
  twitter: { card: "summary_large_image", site: "@westra_wear", title: "Instagram Gallery | Westra Wear", description: "Explore photos, reels and styling inspiration from @westra.wear.", images: [`${BASE}/og-instagram.jpg`] },
};

export default async function InstagramGalleryPage() {
  const { posts, reels, stats } = await fetchInstagram();
  return <InstagramGallery initialPosts={posts} initialReels={reels} initialStats={stats} />;
}
