// Editable channel data. Only verified info lives here.
export const CHANNEL_URL = "https://www.youtube.com/@AG2K_TAMILAN";
export const SUBSCRIBE_URL = `${CHANNEL_URL}?sub_confirmation=1`;
export const BUSINESS_EMAIL = ""; // Set your business email to show it on the site.
export const DISCORD_URL = ""; // Optional Discord invite link.

export const ABOUT = {
  creatorName: "AG2K_TAMILAN",
  channelName: "AG2K TAMILAN",
  category: "Gaming — Minecraft & Super Sus",
  language: "Tamil",
  location: "", // Optional
  started: "", // e.g. "2023"
};

// Real uploads from the channel feed (views snapshot at build time).
export type Video = { id: string; title: string; date: string; views?: number };
export const VIDEOS: Video[] = [
  { id: "idNgldXGUz8", title: "Miss Panningala Nanbarhale? 🥹🎮 | Minecraft LIVE", date: "2026-10-20", views: 118 },
  { id: "1BXl49cBaJ8", title: "Super Sus Live | #supersus", date: "2026-10-16", views: 190 },
  { id: "IE3jLA5FE28", title: "4.8K Subscribers… 5K-ku Unga Support Venumae ❤️🥹 #Shorts", date: "2026-10-15", views: 1022 },
  { id: "nby6VM8Y9e4", title: "Donut SMP Funny Moments 😂 | #minecraft", date: "2026-10-13", views: 630 },
  { id: "naOCy7O1gko", title: "Pavazhamalli weds Wither 😂 | #minecraft", date: "2026-10-12", views: 4719 },
  { id: "S9flZPK_Tzw", title: "Priyo SMP Funny Moments | #minecraft #shorts", date: "2026-10-11", views: 2020 },
];

export const search = (q: string) => `${CHANNEL_URL}/search?query=${encodeURIComponent(q)}`;
