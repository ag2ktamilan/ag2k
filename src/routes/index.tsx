import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Play, Youtube, Gamepad2, Radio, Smile, Users, Sparkles, Trophy, Mail, MessageCircle, ChevronDown, Eye, Calendar } from "lucide-react";
import { ABOUT, BUSINESS_EMAIL, CHANNEL_URL, DISCORD_URL, SUBSCRIBE_URL, VIDEOS, search, type Video } from "@/lib/channel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AG2K_TAMILAN — Tamil Gaming Creator" },
      { name: "description", content: "Official portfolio of AG2K_TAMILAN: Tamil Minecraft & Super Sus gaming videos, live streams, and community." },
      { property: "og:title", content: "AG2K_TAMILAN — Tamil Gaming Creator" },
      { property: "og:description", content: "Gaming. Creativity. Tamil Passion. Watch the latest videos and join the community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["Home", "About", "Videos", "Achievements", "Socials", "Contact"];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (el.classList.add("in"), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function H2({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-secondary">{kicker}</p>
      <h2 className="font-display text-3xl font-black md:text-5xl">{children}</h2>
    </Reveal>
  );
}

function SubBtn({ className = "" }: { className?: string }) {
  return (
    <a href={SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105 ${className}`}>
      <Youtube className="h-5 w-5" /> Subscribe on YouTube
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors ${scrolled || open ? "bg-background/90 backdrop-blur-lg border-b border-border" : ""}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4" aria-label="Main">
        <a href="#home" className="font-display text-lg font-black tracking-wider">AG2K<span className="text-neon">_TAMILAN</span></a>
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} className="text-sm text-muted-foreground transition hover:text-foreground">{n}</a></li>)}
        </ul>
        <SubBtn className="hidden !px-5 !py-2 text-sm lg:inline-flex" />
        <button className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div className={`overflow-hidden transition-all lg:hidden ${open ? "max-h-[480px]" : "max-h-0"}`}>
        <ul className="flex flex-col gap-1 px-5 pb-6">
          {NAV.map((n) => <li key={n}><a onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block rounded-lg px-3 py-3 hover:bg-muted">{n}</a></li>)}
          <li className="pt-3"><SubBtn /></li>
        </ul>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-drift absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-primary/30 blur-[120px]" />
        <div className="animate-drift absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-[120px]" style={{ animationDelay: "-7s" }} />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="animate-floaty absolute h-1 w-1 rounded-full bg-secondary" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${-i * 0.7}s`, opacity: 0.6 }} />
        ))}
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="mb-4 font-display text-sm tracking-[0.4em] text-secondary">WELCOME TO MY WORLD</p>
          <h1 className="font-display text-5xl font-black leading-none sm:text-7xl xl:text-8xl">AG2K<br /><span className="text-neon">_TAMILAN</span></h1>
          <p className="mt-6 text-xl font-medium italic">Gaming. Creativity. Tamil Passion.</p>
          <p className="mt-4 max-w-xl text-muted-foreground">Explore my gaming journey, latest videos, memorable moments, and everything happening on my creator journey.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#videos" className="inline-flex items-center gap-2 rounded-full border border-secondary/60 px-6 py-3 font-bold transition hover:bg-secondary hover:text-secondary-foreground"><Play className="h-5 w-5" /> WATCH MY VIDEOS</a>
            <SubBtn />
          </div>
        </Reveal>
        <Reveal className="mx-auto">
          {/* Replace this mark with the creator's own avatar image. */}
          <div className="relative grid h-72 w-72 place-items-center sm:h-96 sm:w-96">
            <div className="absolute inset-0 rounded-[2.5rem] bg-neon opacity-80 blur-2xl" />
            <div className="glass relative grid h-full w-full place-items-center rounded-[2.5rem] border-2 border-primary/50">
              <div className="text-center">
                <Gamepad2 className="mx-auto h-24 w-24 text-secondary animate-floaty" />
                <p className="mt-4 font-display text-4xl font-black text-neon">AG2K</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <a href="#about" aria-label="Scroll down" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"><ChevronDown /></a>
    </section>
  );
}

function About() {
  const rows: [string, string][] = [
    ["Creator", ABOUT.creatorName], ["Channel", ABOUT.channelName], ["Content", ABOUT.category],
    ["Language", ABOUT.language], ["Location", ABOUT.location], ["Started", ABOUT.started],
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-28">
      <H2 kicker="About">WHO'S BEHIND THE CHANNEL?</H2>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="glass relative grid aspect-square place-items-center overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-neon opacity-20" />
            <p className="relative font-display text-6xl font-black text-neon">AG2K</p>
          </div>
        </Reveal>
        <Reveal>
          <p className="text-lg leading-relaxed text-muted-foreground">Hey! I'm <span className="font-bold text-foreground">AG2K_TAMILAN</span>, a Tamil content creator sharing my passion for gaming, entertainment, and creative content. This is my official space to showcase my videos, connect with my community, and document my journey as a creator.</p>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {rows.filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="glass rounded-xl p-4"><dt className="text-xs uppercase tracking-widest text-secondary">{k}</dt><dd className="mt-1 font-bold">{v}</dd></div>
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
    <div role="dialog" aria-modal="true" aria-label={video.title} className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-4 backdrop-blur" onClick={onClose}>
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4"><p className="font-bold">{video.title}</p><button ref={ref} onClick={onClose} aria-label="Close video" className="rounded-full p-2 hover:bg-muted"><X /></button></div>
        <div className="aspect-video overflow-hidden rounded-2xl shadow-glow">
          <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        </div>
      </div>
    </div>
  );
}

function Videos() {
  const [active, setActive] = useState<Video | null>(null);
  return (
    <section id="videos" className="mx-auto max-w-7xl px-5 py-28">
      <H2 kicker="Fresh uploads">LATEST VIDEOS</H2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v) => (
          <Reveal key={v.id}>
            <button onClick={() => setActive(v)} className="group glass block w-full overflow-hidden rounded-2xl text-left transition hover:-translate-y-1 hover:shadow-glow">
              <div className="relative aspect-video overflow-hidden">
                <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 grid place-items-center bg-background/30">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-neon shadow-glow transition group-hover:scale-110"><Play className="h-6 w-6 fill-current text-primary-foreground" /></span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="line-clamp-2 font-bold">{v.title}</h3>
                <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(v.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  {v.views != null && <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{v.views.toLocaleString()} views</span>}
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center"><a href={`${CHANNEL_URL}/videos`} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-primary px-8 py-3 font-bold transition hover:bg-primary">View All Videos</a></div>
      {active && <VideoModal video={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function Journey() {
  const cards = [
    { icon: Smile, t: "Funny Moments", d: "SMP chaos, wild Minecraft fails and laugh-out-loud clips — like “Pavazhamalli weds Wither”." },
    { icon: Radio, t: "Live Streams", d: "Regular Minecraft LIVE and Super Sus sessions where the community plays along." },
    { icon: Users, t: "Community Collabs", d: "Playing with fellow Tamil creators on servers like Priyo SMP and Donut SMP." },
    { icon: Sparkles, t: "Road to 5K", d: "Crossed 4.8K subscribers on the way to 5K — thank you for every bit of support." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-28">
      <H2 kicker="Highlights">MY CREATOR JOURNEY</H2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: I, t, d }) => (
          <Reveal key={t}><div className="glass h-full rounded-2xl p-7 transition hover:border-primary/60"><I className="h-10 w-10 text-secondary" /><h3 className="mt-5 text-xl font-bold">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div></Reveal>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { t: "Minecraft", d: "SMP adventures, builds and funny moments in Tamil.", q: "minecraft", g: "from-primary/60" },
    { t: "Super Sus", d: "Live social-deduction chaos with friends and viewers.", q: "super sus", g: "from-secondary/60" },
    { t: "Live Streams", d: "Hang out live, chat and play together.", q: "live", g: "from-primary/40" },
    { t: "Shorts", d: "Quick, punchy clips of the best moments.", q: "shorts", g: "from-secondary/40" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-28">
      <H2 kicker="Content">WHAT YOU'LL FIND HERE</H2>
      <div className="grid gap-6 md:grid-cols-2">
        {cats.map((c) => (
          <Reveal key={c.t}>
            <div className={`relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${c.g} to-transparent p-8`}>
              <Gamepad2 className="absolute -right-6 -top-6 h-40 w-40 opacity-10" />
              <h3 className="font-display text-2xl font-black">{c.t}</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">{c.d}</p>
              <a href={search(c.q)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2 text-sm font-bold text-background transition hover:scale-105">Watch {c.t}</a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  const items = [
    { t: "Channel launch", d: "Date to be added by the creator" },
    { t: "Live streaming begins", d: "Minecraft LIVE & Super Sus sessions" },
    { t: "4.8K subscribers", d: "Shared by the creator, Oct 2026" },
    { t: "Next stop: 5K", d: "Help make it happen!" },
  ];
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-5 py-28">
      <H2 kicker="Milestones">EVERY STEP COUNTS</H2>
      <ol className="relative grid gap-6 md:grid-cols-4">
        <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-neon md:block" />
        {items.map((m, i) => (
          <Reveal key={m.t}>
            <li className="relative">
              <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-neon font-display font-black text-primary-foreground shadow-glow"><Trophy className="h-5 w-5" /></div>
              <div className="glass mt-5 rounded-2xl p-5"><p className="text-xs text-secondary">STEP {i + 1}</p><h3 className="mt-1 font-bold">{m.t}</h3><p className="mt-1 text-sm text-muted-foreground">{m.d}</p></div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Community() {
  return (
    <section id="socials" className="mx-auto max-w-7xl px-5 py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/40 p-10 text-center md:p-16">
          <div className="absolute inset-0 bg-neon opacity-15" />
          <Youtube className="relative mx-auto h-16 w-16 text-primary" />
          <h2 className="relative mt-6 font-display text-3xl font-black md:text-5xl">JOIN THE COMMUNITY</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">Be part of the journey. Watch the videos, share your thoughts, and stay connected for upcoming content.</p>
          <p className="relative mt-2 text-sm text-secondary">Drop a comment on the latest upload — every comment and like helps the channel grow!</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <SubBtn />
            {DISCORD_URL && <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-bold hover:bg-muted"><MessageCircle className="h-5 w-5" /> Discord</a>}
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
    const name = String(f.get("name")).trim(), email = String(f.get("email")).trim(), subject = String(f.get("subject")).trim(), message = String(f.get("message")).trim();
    if (!name || !subject || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setStatus({ ok: false, msg: "Please fill every field with a valid email and a message of at least 10 characters." });
    if (!BUSINESS_EMAIL) return setStatus({ ok: false, msg: "Business email isn't set up yet — please reach out via YouTube for now." });
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
    setStatus({ ok: true, msg: "Opening your email app to send the message. Thank you!" });
  };
  const input = "w-full rounded-xl border border-input bg-muted/50 px-4 py-3 outline-none focus:border-primary";
  return (
    <section id="contact" className="mx-auto max-w-4xl px-5 py-28">
      <H2 kicker="Collab">LET'S CREATE SOMETHING AMAZING</H2>
      <Reveal>
        <p className="mb-8 text-center text-muted-foreground">Have an idea for a collaboration, gaming project, or creator partnership? Get in touch.</p>
        {BUSINESS_EMAIL && <p className="mb-8 text-center"><a href={`mailto:${BUSINESS_EMAIL}`} className="inline-flex items-center gap-2 text-secondary"><Mail className="h-4 w-4" />{BUSINESS_EMAIL}</a></p>}
        <form onSubmit={submit} noValidate className="glass grid gap-4 rounded-3xl p-8 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">Name<input name="name" maxLength={100} className={input} /></label>
          <label className="grid gap-2 text-sm">Email<input name="email" type="email" maxLength={255} className={input} /></label>
          <label className="grid gap-2 text-sm sm:col-span-2">Subject<input name="subject" maxLength={150} className={input} /></label>
          <label className="grid gap-2 text-sm sm:col-span-2">Message<textarea name="message" rows={5} maxLength={2000} className={input} /></label>
          <div className="sm:col-span-2">
            <button className="w-full rounded-full bg-neon py-3 font-bold text-primary-foreground shadow-glow transition hover:opacity-90">Send collaboration inquiry</button>
            <p role="status" aria-live="polite" className={`mt-4 text-center text-sm ${status?.ok ? "text-secondary" : "text-destructive"}`}>{status?.msg}</p>
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
        <p className="font-display text-xl font-black">AG2K<span className="text-neon">_TAMILAN</span></p>
        <ul className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">{NAV.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} className="hover:text-foreground">{n}</a></li>)}</ul>
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-primary"><Youtube className="h-5 w-5" /> @AG2K_TAMILAN</a>
        <p className="text-sm text-muted-foreground">Made with passion. Powered by creativity.</p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} AG2K_TAMILAN. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <main><Hero /><About /><Videos /><Journey /><Categories /><Achievements /><Community /><Contact /></main>
      <Footer />
      <a href={SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer" aria-label="Subscribe on YouTube" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-neon text-primary-foreground shadow-glow transition hover:scale-110"><Youtube /></a>
    </div>
  );
}
