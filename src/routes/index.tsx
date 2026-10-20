import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Menu,
  X,
  Play,
  Youtube,
  Gamepad2,
  Radio,
  Smile,
  Users,
  Sparkles,
  Trophy,
  Mail,
  MessageCircle,
  ChevronDown,
  Eye,
  Calendar,
  RefreshCw,
  ThumbsUp,
  Heart,
  Search,
  ArrowRight,
} from "lucide-react";
import logo from "@/assets/ag2k-logo.png.asset.json";
import {
  ABOUT,
  BUSINESS_EMAIL,
  CHANNEL_URL,
  DEFAULT_STATS,
  DISCORD_URL,
  INSTAGRAM_URL,
  SMP_DISCORD_URL,
  SUBSCRIBE_URL,
  SUPPORT_TIERS,
  VIDEOS,
  search,
  type ChannelStats,
  type Video,
  type YouTubeFeedResponse,
} from "@/lib/channel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AG2K_TAMILAN — Tamil Gaming Creator" },
      {
        name: "description",
        content:
          "Official portfolio of AG2K_TAMILAN: live YouTube uploads, Tamil Minecraft & Super Sus gaming streams, community hub, and creator support powered by Razorpay.",
      },
      { property: "og:title", content: "AG2K_TAMILAN — Tamil Gaming Creator" },
      {
        property: "og:description",
        content:
          "Gaming. Creativity. Tamil Passion. Watch live YouTube uploads and support the channel via Razorpay.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["About", "Videos", "Achievements", "Contact"] as const;

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e?.isIntersecting && (el.classList.add("in"), io.disconnect()),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function H2({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-secondary">{kicker}</p>
      <h2 className="font-display text-3xl font-black md:text-5xl" style={{ textWrap: "balance" }}>
        {children}
      </h2>
    </Reveal>
  );
}

function SubBtn({ className = "" }: { className?: string }) {
  return (
    <a
      href={SUBSCRIBE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-neon px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105 ${className}`}
    >
      <Youtube className="h-5 w-5" /> Subscribe on YouTube
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled || open ? "border-b border-border bg-background/90 backdrop-blur-lg" : ""
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 py-4"
        aria-label="Main"
      >
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-lg font-black tracking-wider"
        >
          <img
            src={logo.url}
            alt="AG2K_TAMILAN"
            referrerPolicy="no-referrer"
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
          <span>
            AG2K<span className="text-neon">_TAMILAN</span>
          </span>
        </a>
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <li key={n}>
              <a
                href={`#${n.toLowerCase()}`}
                className="whitespace-nowrap text-sm text-muted-foreground transition hover:text-foreground"
              >
                {n}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/support"
              className="whitespace-nowrap text-sm font-semibold text-secondary transition hover:text-foreground"
            >
              Support
            </Link>
          </li>
        </ul>
        <div className="hidden shrink-0 lg:block">
          <SubBtn className="!px-5 !py-2 text-sm" />
        </div>
        <button
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div
        className={`overflow-hidden transition-all lg:hidden ${open ? "max-h-[480px]" : "max-h-0"}`}
      >
        <ul className="flex flex-col gap-1 px-5 pb-6">
          {NAV.map((n) => (
            <li key={n}>
              <a
                onClick={() => setOpen(false)}
                href={`#${n.toLowerCase()}`}
                className="block rounded-lg px-3 py-3 hover:bg-muted"
              >
                {n}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/support"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 font-bold text-secondary hover:bg-muted"
            >
              Support (Razorpay)
            </Link>
          </li>
          <li className="pt-3">
            <SubBtn />
          </li>
        </ul>
      </div>
    </header>
  );
}

function Hero({ stats }: { stats: ChannelStats }) {
  const goalTarget = 5000;
  const subPct = Math.min(100, Math.round((stats.subscriberCount / goalTarget) * 100));

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-drift absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-primary/30 blur-[120px]" />
        <div
          className="animate-drift absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-[120px]"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="mb-4 font-display text-sm tracking-[0.4em] text-secondary">
              WELCOME TO MY WORLD
            </p>
            <h1 className="font-display text-5xl font-black leading-none sm:text-7xl xl:text-8xl">
              AG2K
              <br />
              <span className="text-neon">_TAMILAN</span>
            </h1>
            <p className="mt-6 text-xl font-medium italic">Gaming. Creativity. Tamil Passion.</p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Explore live YouTube uploads, Tamil Minecraft SMP adventures, Super Sus viewer
              lobbies, and join the AG Soldiers community.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#videos"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-secondary/60 px-6 py-3 font-bold transition hover:bg-secondary hover:text-secondary-foreground"
              >
                <Play className="h-5 w-5" /> WATCH LIVE UPLOADS
              </a>
              <Link
                to="/support"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-neon px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105"
              >
                <Heart className="h-5 w-5 fill-current" /> SUPPORT VIA RAZORPAY
              </Link>
            </div>
          </Reveal>

          <Reveal className="mx-auto">
            <div className="relative grid h-72 w-72 place-items-center sm:h-96 sm:w-96">
              <div className="absolute inset-0 rounded-[2.5rem] bg-neon opacity-75 blur-2xl" />
              <div className="glass relative grid h-full w-full place-items-center rounded-[2.5rem] border-2 border-primary/50 p-4">
                <img
                  src={logo.url}
                  alt="AG2K_TAMILAN official logo"
                  referrerPolicy="no-referrer"
                  className="animate-floaty h-[88%] w-[88%] rounded-full object-cover shadow-glow"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Full-width Live YouTube Channel Stats Row below Hero Split */}
        <Reveal className="mt-14">
          <div className="glass grid gap-6 rounded-3xl p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-secondary">Subscribers</p>
              <p className="mt-1 font-display text-3xl font-black tabular-nums">
                {stats.subscriberCount.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Road to 5,000 ({subPct}% complete)
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-secondary">
                Total Channel Views
              </p>
              <p className="mt-1 font-display text-3xl font-black tabular-nums">
                {stats.viewCount.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Across streams, videos & Shorts</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-secondary">Published Uploads</p>
              <p className="mt-1 font-display text-3xl font-black tabular-nums">
                {stats.videoCount.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Minecraft SMP & Super Sus</p>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-widest text-secondary">5K Milestone</span>
                <span className="font-bold tabular-nums">
                  {Math.max(0, goalTarget - stats.subscriberCount)} to go
                </span>
              </div>
              <div className="my-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-neon transition-all duration-500"
                  style={{ width: `${subPct}%` }}
                />
              </div>
              <a
                href={SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-secondary hover:underline"
              >
                Subscribe on YouTube →
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="mt-10 self-center animate-bounce text-muted-foreground"
      >
        <ChevronDown />
      </a>
    </section>
  );
}

function About({ stats }: { stats: ChannelStats }) {
  const rows: [string, string][] = [
    ["Creator", ABOUT.creatorName],
    ["Channel", stats.title || ABOUT.channelName],
    ["Content", ABOUT.category],
    ["Language", ABOUT.language],
    ["Location", ABOUT.location],
    ["Uploads", `${stats.videoCount.toLocaleString("en-IN")} Videos`],
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24">
      <H2 kicker="About">WHO'S BEHIND THE CHANNEL?</H2>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="glass relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl border border-primary/40 shadow-glow">
            <img
              src="/creator-about.jpg"
              alt="AG2K_TAMILAN creator portrait"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Hey! I'm <span className="font-bold text-foreground">AG2K_TAMILAN</span>, a Tamil
            content creator sharing my passion for gaming, entertainment, and creative content. From
            survival challenges on Priyo SMP & Donut SMP to high-energy Super Sus viewer lobbies,
            every stream is built around community fun.
          </p>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {rows
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="glass rounded-xl p-4">
                  <dt className="text-xs uppercase tracking-widest text-secondary">{k}</dt>
                  <dd className="mt-1 font-bold">{v}</dd>
                </div>
              ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    ref.current?.focus();
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-4 backdrop-blur"
      onClick={onClose}
    >
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="font-bold">{video.title}</p>
          <button
            ref={ref}
            onClick={onClose}
            aria-label="Close video"
            className="rounded-full p-2 hover:bg-muted"
          >
            <X />
          </button>
        </div>
        <div className="aspect-video overflow-hidden rounded-2xl shadow-glow">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

type VideoFilter = "all" | "live" | "shorts" | "videos";

function Videos({
  videos,
  isLiveApi,
  loading,
  onRefresh,
}: {
  videos: Video[];
  isLiveApi: boolean;
  loading: boolean;
  onRefresh: () => void;
}) {
  const [active, setActive] = useState<Video | null>(null);
  const [filter, setFilter] = useState<VideoFilter>("all");
  const [query, setQuery] = useState("");

  const filteredVideos = videos.filter((v) => {
    if (filter === "live" && !v.isLiveStream) return false;
    if (filter === "shorts" && !v.isShort) return false;
    if (filter === "videos" && (v.isShort || v.isLiveStream)) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      return (
        v.title.toLowerCase().includes(q) || (v.description?.toLowerCase().includes(q) ?? false)
      );
    }
    return true;
  });

  return (
    <section id="videos" className="mx-auto max-w-7xl px-5 py-24">
      <H2 kicker={isLiveApi ? "YouTube Data API v3 · Live Sync" : "Fresh uploads"}>
        LIVE YOUTUBE UPLOADS
      </H2>

      {/* Interactive Filter Tabs + Search + Refresh */}
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-card p-1.5">
          {(
            [
              { id: "all", label: "All Uploads" },
              { id: "live", label: "Live Streams" },
              { id: "shorts", label: "Shorts" },
              { id: "videos", label: "Videos" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${
                filter === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Minecraft, Super Sus..."
              className="w-full rounded-xl border border-input bg-muted/40 py-2 pl-10 pr-3.5 text-xs text-foreground outline-none focus:border-primary"
            />
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold transition hover:border-primary disabled:opacity-60"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Syncing..." : "Sync YouTube"}
          </button>
        </div>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <p className="font-bold">No uploads matched your filter.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setQuery("");
            }}
            className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground"
          >
            Show All Uploads
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((v) => {
            const formatLabel = v.isLiveNow
              ? "LIVE NOW"
              : v.isLiveStream
                ? "Stream"
                : v.isShort
                  ? "Short"
                  : "Video";
            return (
              <Reveal key={v.id}>
                <button
                  type="button"
                  onClick={() => setActive(v)}
                  className="group glass flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl text-left transition hover:-translate-y-1 hover:shadow-glow"
                >
                  <div>
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={v.thumbnail || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                        alt={v.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="grid h-14 w-14 place-items-center rounded-full bg-neon shadow-glow transition group-hover:scale-110">
                          <Play className="h-6 w-6 fill-current text-primary-foreground" />
                        </span>
                      </div>
                      {v.duration && (
                        <span className="absolute bottom-3 right-3 text-xs font-bold tabular-nums text-white drop-shadow">
                          {v.duration}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="line-clamp-2 font-bold leading-snug">{v.title}</h3>
                    </div>
                  </div>

                  {/* Clean unboxed metadata with middle-dot separators */}
                  <div className="flex flex-wrap items-center gap-2 border-t border-border/60 px-5 py-3.5 text-xs text-muted-foreground">
                    <span className="font-semibold text-secondary">{formatLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(v.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {v.views != null && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 tabular-nums">
                          <Eye className="h-3.5 w-3.5" />
                          {v.views.toLocaleString("en-IN")} views
                        </span>
                      </>
                    )}
                    {v.likes != null && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 tabular-nums">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {v.likes.toLocaleString("en-IN")}
                        </span>
                      </>
                    )}
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      )}

      <div className="mt-12 text-center">
        <a
          href={`${CHANNEL_URL}/videos`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-primary px-8 py-3 font-bold transition hover:bg-primary"
        >
          View All Videos on YouTube
        </a>
      </div>
      {active && <VideoModal video={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function SupportSection() {
  return (
    <section id="support-preview" className="mx-auto max-w-5xl px-5 py-24">
      <H2 kicker="Razorpay Creator Gateway">SUPPORT THE CHANNEL</H2>
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-8 text-center md:p-12">
          <h3 className="font-display text-2xl font-black sm:text-4xl">
            Power Our Tamil Minecraft SMP & Live Streams
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Support AG2K_TAMILAN directly with Razorpay and get featured on the live AG Soldiers
            Supporter Wall.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/support"
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-neon px-8 py-3.5 font-bold text-primary-foreground shadow-glow transition hover:scale-105"
            >
              <Heart className="h-5 w-5 fill-current" /> Pay with Razorpay
            </Link>
            <Link
              to="/support"
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-bold text-secondary hover:underline"
            >
              AG Soldiers Supporter Wall <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Journey() {
  const cards = [
    {
      icon: Smile,
      t: "Funny Moments",
      d: "SMP chaos, wild Minecraft fails and laugh-out-loud clips — like “Pavazhamalli weds Wither”.",
    },
    {
      icon: Radio,
      t: "Live Streams",
      d: "Regular Minecraft LIVE and Super Sus sessions where the community plays along.",
    },
    {
      icon: Users,
      t: "Community Collabs",
      d: "Playing with fellow Tamil creators on servers like Priyo SMP and Donut SMP.",
    },
    {
      icon: Sparkles,
      t: "Road to 5K",
      d: "Crossed 4.89K subscribers on the way to 5K — thank you for every bit of support.",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <H2 kicker="Highlights">MY CREATOR JOURNEY</H2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: I, t, d }) => (
          <Reveal key={t}>
            <div className="glass h-full rounded-2xl p-7 transition hover:border-primary/60">
              <I className="h-10 w-10 text-secondary" />
              <h3 className="mt-5 text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    {
      t: "Minecraft",
      d: "SMP adventures, builds and funny moments in Tamil.",
      q: "minecraft",
      g: "from-primary/60",
    },
    {
      t: "Super Sus",
      d: "Live social-deduction chaos with friends and viewers.",
      q: "super sus",
      g: "from-secondary/60",
    },
    {
      t: "Live Streams",
      d: "Hang out live, chat and play together.",
      q: "live",
      g: "from-primary/40",
    },
    {
      t: "Shorts",
      d: "Quick, punchy clips of the best moments.",
      q: "shorts",
      g: "from-secondary/40",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <H2 kicker="Content">WHAT YOU'LL FIND HERE</H2>
      <div className="grid gap-6 md:grid-cols-2">
        {cats.map((c) => (
          <Reveal key={c.t}>
            <div
              className={`relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${c.g} to-transparent p-8`}
            >
              <Gamepad2 className="absolute -right-6 -top-6 h-40 w-40 opacity-10" />
              <h3 className="font-display text-2xl font-black">{c.t}</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">{c.d}</p>
              <a
                href={search(c.q)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2 text-sm font-bold text-background transition hover:scale-105"
              >
                Watch {c.t}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Achievements({ stats }: { stats: ChannelStats }) {
  const items = [
    { t: "Channel launch", d: "Started September 2025 in Tamil Nadu" },
    { t: "390+ Uploads & Streams", d: "Minecraft LIVE & Super Sus sessions" },
    {
      t: `${(stats.subscriberCount / 1000).toFixed(2)}K Subscribers`,
      d: `${stats.viewCount.toLocaleString("en-IN")}+ total channel views`,
    },
    { t: "Next stop: 5K", d: "Join the AG Soldiers family!" },
  ];
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-5 py-24">
      <H2 kicker="Milestones">EVERY STEP COUNTS</H2>
      <ol className="relative grid gap-6 md:grid-cols-4">
        <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-neon md:block" />
        {items.map((m, i) => (
          <Reveal key={m.t}>
            <li className="relative">
              <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-neon font-display font-black text-primary-foreground shadow-glow">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="glass mt-5 rounded-2xl p-5">
                <p className="text-xs text-secondary">STEP {i + 1}</p>
                <h3 className="mt-1 font-bold">{m.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.d}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Community() {
  return (
    <section id="socials" className="mx-auto max-w-7xl px-5 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/40 p-10 text-center md:p-16">
          <div className="absolute inset-0 bg-neon opacity-15" />
          <Youtube className="relative mx-auto h-16 w-16 text-primary" />
          <h2 className="relative mt-6 font-display text-3xl font-black md:text-5xl">
            JOIN THE AG SOLDIERS
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
            Be part of the journey. Watch the live streams, join the Discord & SMP servers, and
            connect with Tamil gamers.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <SubBtn />
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 font-bold transition hover:bg-muted"
            >
              <MessageCircle className="h-5 w-5" /> Community Discord
            </a>
            <a
              href={SMP_DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 font-bold transition hover:bg-muted"
            >
              <Gamepad2 className="h-5 w-5" /> SMP Server Discord
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name")).trim(),
      email = String(f.get("email")).trim(),
      subject = String(f.get("subject")).trim(),
      message = String(f.get("message")).trim();
    if (!name || !subject || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setStatus({
        ok: false,
        msg: "Please fill every field with a valid email and a message of at least 10 characters.",
      });
    if (!BUSINESS_EMAIL) {
      e.currentTarget.reset();
      return setStatus({
        ok: true,
        msg: "Inquiry received! You can also reach out directly on our Discord or YouTube channel.",
      });
    }
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
    setStatus({ ok: true, msg: "Opening your email app to send the message. Thank you!" });
  };
  const input =
    "w-full rounded-xl border border-input bg-muted/50 px-4 py-3 outline-none focus:border-primary";
  return (
    <section id="contact" className="mx-auto max-w-4xl px-5 py-24">
      <H2 kicker="Collab">LET'S CREATE SOMETHING AMAZING</H2>
      <Reveal>
        <p className="mb-8 text-center text-muted-foreground">
          Have an idea for a collaboration, gaming project, or creator partnership? Get in touch.
        </p>
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <Mail className="h-8 w-8 text-primary" />
            <h3 className="mt-3 text-lg font-bold">For brands & sponsors</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Sponsorships, collabs and gaming projects.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <a href="#inquiry" className="inline-flex font-bold text-secondary hover:underline">
                Send an inquiry below →
              </a>
              <Link to="/support" className="inline-flex font-bold text-secondary hover:underline">
                Sponsor via Razorpay →
              </Link>
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <MessageCircle className="h-8 w-8 text-secondary" />
            <h3 className="mt-3 text-lg font-bold">For fans & community</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Say hi in the comments, join Discord, or follow on Instagram.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-secondary hover:underline"
              >
                <Youtube className="h-4 w-4" /> YouTube
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-secondary hover:underline"
              >
                Discord
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-secondary hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <form
          id="inquiry"
          onSubmit={submit}
          noValidate
          className="glass grid gap-4 rounded-3xl p-8 sm:grid-cols-2"
        >
          <label className="grid gap-2 text-sm">
            Name
            <input name="name" maxLength={100} className={input} />
          </label>
          <label className="grid gap-2 text-sm">
            Email
            <input name="email" type="email" maxLength={255} className={input} />
          </label>
          <label className="grid gap-2 text-sm sm:col-span-2">
            Subject
            <input name="subject" maxLength={150} className={input} />
          </label>
          <label className="grid gap-2 text-sm sm:col-span-2">
            Message
            <textarea name="message" rows={5} maxLength={2000} className={input} />
          </label>
          <div className="sm:col-span-2">
            <button className="w-full rounded-full bg-neon py-3 font-bold text-primary-foreground shadow-glow transition hover:opacity-90">
              Send collaboration inquiry
            </button>
            <p
              role="status"
              aria-live="polite"
              className={`mt-4 text-center text-sm ${
                status?.ok ? "text-secondary" : "text-destructive"
              }`}
            >
              {status?.msg}
            </p>
          </div>
        </form>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <p className="font-display text-xl font-black">
          AG2K<span className="text-neon">_TAMILAN</span>
        </p>
        <ul className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <li key={n}>
              <a href={`#${n.toLowerCase()}`} className="hover:text-foreground">
                {n}
              </a>
            </li>
          ))}
          <li>
            <Link to="/support" className="font-semibold text-secondary hover:text-foreground">
              Support (Razorpay)
            </Link>
          </li>
        </ul>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm hover:text-primary"
        >
          <Youtube className="h-5 w-5" /> @AG2K_TAMILAN
        </a>
        <p className="text-sm text-muted-foreground">Made with passion. Powered by creativity.</p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AG2K_TAMILAN. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Index() {
  const [stats, setStats] = useState<ChannelStats>(DEFAULT_STATS);
  const [videos, setVideos] = useState<Video[]>(VIDEOS);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [loadingFeed, setLoadingFeed] = useState(false);

  const loadYouTubeFeed = async (forceRefresh = false) => {
    setLoadingFeed(true);
    try {
      const res = await fetch(forceRefresh ? "/api/youtube?refresh=1" : "/api/youtube");
      if (res.ok) {
        const data = (await res.json()) as YouTubeFeedResponse;
        if (data.stats) setStats(data.stats);
        if (data.videos?.length) setVideos(data.videos);
        setIsLiveApi(data.source === "youtube_api");
      }
    } catch {
      // Keep fallback data on network error
    } finally {
      setLoadingFeed(false);
    }
  };

  useEffect(() => {
    void loadYouTubeFeed(false);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <Hero stats={stats} />
        <About stats={stats} />
        <Videos
          videos={videos}
          isLiveApi={isLiveApi}
          loading={loadingFeed}
          onRefresh={() => void loadYouTubeFeed(true)}
        />
        <SupportSection />
        <Journey />
        <Categories />
        <Achievements stats={stats} />
        <Community />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
