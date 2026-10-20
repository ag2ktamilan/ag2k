// Editable channel data and types for AG2K_TAMILAN
export const CHANNEL_URL = "https://www.youtube.com/@AG2K_TAMILAN";
export const CHANNEL_ID = "UCcgS9KfMscStPknb7B3IJvg";
export const UPLOADS_PLAYLIST_ID = "UUcgS9KfMscStPknb7B3IJvg";
export const SUBSCRIBE_URL = `${CHANNEL_URL}?sub_confirmation=1`;
export const BUSINESS_EMAIL = ""; // Optional: Set your business email to show direct mailto link
export const DISCORD_URL = "https://discord.gg/qRcWfcNyQZ";
export const SMP_DISCORD_URL = "https://discord.gg/q558r7PNq7";
export const INSTAGRAM_URL = "https://www.instagram.com/ag2k_tamilan";

export const ABOUT = {
  creatorName: "AG2K_TAMILAN",
  channelName: "AG2K TAMILAN",
  category: "Gaming — Minecraft & Super Sus",
  language: "Tamil",
  location: "Tamil Nadu, India",
  started: "2025",
};

export type Video = {
  id: string;
  title: string;
  date: string;
  views?: number;
  likes?: number;
  comments?: number;
  duration?: string;
  isLiveStream?: boolean;
  isLiveNow?: boolean;
  isShort?: boolean;
  thumbnail?: string;
  description?: string;
};

export type ChannelStats = {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  title: string;
  description: string;
  customUrl: string;
  avatarUrl: string;
  isLiveData: boolean;
  updatedAt: string;
};

export type YouTubeFeedResponse = {
  stats: ChannelStats;
  videos: Video[];
  source: "youtube_api" | "fallback";
};

export const DEFAULT_STATS: ChannelStats = {
  subscriberCount: 4890,
  viewCount: 507197,
  videoCount: 396,
  title: "AG2K TAMILAN",
  description:
    "Welcome to AG2K TAMILAN! Join me as I explore the rich stories and immersive worlds of Tamil gaming — from Minecraft SMP live streams to Super Sus chaos.",
  customUrl: "@ag2k_tamilan",
  avatarUrl: "/ag2k-logo.png",
  isLiveData: false,
  updatedAt: new Date().toISOString(),
};

// Fallback snapshot from the channel feed when offline
export const VIDEOS: Video[] = [
  {
    id: "idNgldXGUz8",
    title: "Miss Panningala Nanbarhale? 🥹🎮 | Minecraft LIVE",
    date: "2026-10-20T05:17:12Z",
    views: 118,
    likes: 28,
    duration: "1:42:15",
    isLiveStream: true,
    isShort: false,
  },
  {
    id: "1BXl49cBaJ8",
    title: "Super Sus Live | #supersus",
    date: "2026-10-16T14:20:00Z",
    views: 190,
    likes: 34,
    duration: "1:18:40",
    isLiveStream: true,
    isShort: false,
  },
  {
    id: "IE3jLA5FE28",
    title: "4.8K Subscribers… 5K-ku Unga Support Venumae ❤️🥹 #Shorts",
    date: "2026-10-15T12:00:00Z",
    views: 1022,
    likes: 112,
    duration: "0:48",
    isLiveStream: false,
    isShort: true,
  },
  {
    id: "nby6VM8Y9e4",
    title: "Donut SMP Funny Moments 😂 | #minecraft",
    date: "2026-10-13T11:30:00Z",
    views: 630,
    likes: 64,
    duration: "0:55",
    isLiveStream: false,
    isShort: true,
  },
  {
    id: "naOCy7O1gko",
    title: "Pavazhamalli weds Wither 😂 | #minecraft",
    date: "2026-10-12T10:15:00Z",
    views: 4719,
    likes: 340,
    duration: "0:59",
    isLiveStream: false,
    isShort: true,
  },
  {
    id: "S9flZPK_Tzw",
    title: "Priyo SMP Funny Moments | #minecraft #shorts",
    date: "2026-10-11T09:45:00Z",
    views: 2020,
    likes: 185,
    duration: "0:52",
    isLiveStream: false,
    isShort: true,
  },
];

export type SupportTier = {
  id: string;
  name: string;
  amount: number;
  tagline: string;
  perks: string[];
  featured?: boolean;
};

export const SUPPORT_TIERS: SupportTier[] = [
  {
    id: "soldier-shoutout",
    name: "Soldier Shoutout",
    amount: 49,
    tagline: "Fuel the next stream & get a live shoutout",
    perks: [
      "Live shoutout on the next Minecraft or Super Sus stream",
      "Supporter message featured on the AG Soldiers Wall",
      "AG Soldier supporter role in the community Discord",
    ],
  },
  {
    id: "super-chat-priority",
    name: "Super Stream Priority",
    amount: 149,
    tagline: "Pinned live message & priority viewer lobby spot",
    featured: true,
    perks: [
      "Pinned highlight message during live gameplay",
      "Priority invite slot for viewer Super Sus & Minecraft lobbies",
      "Featured badge on the AG2K Supporter Leaderboard",
    ],
  },
  {
    id: "smp-vip-pass",
    name: "SMP Squad VIP",
    amount: 499,
    tagline: "Join exclusive community SMP events & voice sessions",
    perks: [
      "Access to community SMP events & custom challenge nights",
      "Exclusive VIP Squad Discord channel & voice lounge",
      "Name credited in the end-screen of upcoming videos",
    ],
  },
  {
    id: "stream-sponsor",
    name: "Stream Champion Sponsor",
    amount: 999,
    tagline: "Power an entire stream & upgrade creator gear",
    perks: [
      "Dedicated supporter overlay banner during a full live stream",
      "Permanent credit in the video description & supporter hall",
      "1-on-1 co-op game match or base tour on stream",
    ],
  },
];

export type SupporterEntry = {
  id: string;
  name: string;
  gameTag?: string;
  amount: number;
  currency: string;
  tierName: string;
  message: string;
  paymentId: string;
  createdAt: string;
  verified: boolean;
};

export const INITIAL_SUPPORTERS: SupporterEntry[] = [
  {
    id: "sup-1",
    name: "Karthik_MC",
    gameTag: "KarthikCraft#2026",
    amount: 499,
    currency: "INR",
    tierName: "SMP Squad VIP",
    message: "Priyo SMP episodes vera level bro! Keep grinding towards 5K subscribers!",
    paymentId: "pay_P9kLm28xQz71vR",
    createdAt: "2026-10-19T16:40:00Z",
    verified: true,
  },
  {
    id: "sup-2",
    name: "Praveen Tamil",
    gameTag: "PraveenSus",
    amount: 149,
    currency: "INR",
    tierName: "Super Stream Priority",
    message: "Super Sus live streams are my daily stress buster. Waiting for tonight's lobby!",
    paymentId: "pay_P9j8vW12nKp44T",
    createdAt: "2026-10-18T19:15:00Z",
    verified: true,
  },
  {
    id: "sup-3",
    name: "Dhanush_OP",
    gameTag: "Dhanush07",
    amount: 49,
    currency: "INR",
    tierName: "Soldier Shoutout",
    message: "Pavazhamalli weds Wither short made me laugh so hard! Love from Madurai.",
    paymentId: "pay_P9h3xR99bLm10Q",
    createdAt: "2026-10-17T14:20:00Z",
    verified: true,
  },
];

export const search = (q: string) => `${CHANNEL_URL}/search?query=${encodeURIComponent(q)}`;
