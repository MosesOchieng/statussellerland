import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDownRight, ArrowRight, BarChart3, Check, ChevronDown, ChevronRight, CircleCheck, Clock3, CreditCard, Menu, MessageCircle, MoreHorizontal, PackageCheck, Play, Plus, Send, ShoppingBag, Store, Tag, Truck, Users, X, Zap } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import logoPath from './assets/statusseller-logo.png';
import stillLifePath from './assets/commerce-still-life.jpg';
import laptopPath from './assets/commerce-laptop.jpg';
import statusFlowPath from './assets/status-flow.png';
import shopPopupPath from './assets/app-shop-popup.png';
import statusProductPath from './assets/app-status-product.png';
import chatCheckoutPath from './assets/app-chat-checkout.png';
import cartPath from './assets/app-cart.png';
import fullFlowPath from './assets/app-full-flow.png';

const queryClient = new QueryClient();
const WAITLIST_URL = 'https://forms.gle/sNHC68KJbZead3nq6';

type IconType = typeof Store;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" data-testid="link-brand">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${dark ? 'bg-[#f6f2e8]' : 'bg-[#192541]'} overflow-hidden`}>
        <img src={logoPath} alt="StatusSeller logo" className="h-12 w-12 max-w-none object-cover object-top" />
      </span>
      <span className={`font-display text-[19px] font-bold tracking-[-.04em] ${dark ? 'text-[#f6f2e8]' : 'text-[#192541]'}`}>
        Status<span className="text-[#16b878]">Seller</span>
      </span>
    </a>
  );
}

function Notice({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#192541] px-5 py-3 text-sm font-semibold text-[#f6f2e8] shadow-2xl" role="status" data-testid="status-notice">
      <CircleCheck className="h-4 w-4 text-[#16b878]" />
      {message}
      <button onClick={onClose} className="ml-1 rounded-full p-1 text-[#f6f2e8]/60 transition hover:bg-white/10 hover:text-white" aria-label="Close notification" data-testid="button-close-notice"><X className="h-3.5 w-3.5" /></button>
    </div>
  );
}

function Nav({ onAction }: { onAction: (message: string) => void }) {
  const [open, setOpen] = useState(false);
  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#192541]/70 lg:flex" aria-label="Primary navigation">
          <button onClick={() => go('how-it-works')} className="transition hover:text-[#192541]" data-testid="nav-how-it-works">How it works</button>
           <button onClick={() => go('for-businesses')} className="transition hover:text-[#192541]" data-testid="nav-for-businesses">For businesses</button>
           <button onClick={() => go('app')} className="transition hover:text-[#192541]" data-testid="nav-app">The app</button>
          <button onClick={() => go('pricing')} className="transition hover:text-[#192541]" data-testid="nav-pricing">Pricing</button>
          <button onClick={() => go('stories')} className="transition hover:text-[#192541]" data-testid="nav-stories">Stories</button>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <button onClick={() => onAction('Demo workspace opening shortly')} className="rounded-full px-4 py-2 text-sm font-bold text-[#192541] transition hover:bg-[#192541]/5" data-testid="button-login">Log in</button>
          <a href={WAITLIST_URL} target="_blank" rel="noreferrer" className="group flex items-center gap-2 rounded-full bg-[#16b878] px-5 py-3 text-sm font-bold text-[#192541] shadow-[0_7px_0_#0c8054] transition hover:-translate-y-0.5 hover:shadow-[0_9px_0_#0c8054] active:translate-y-1 active:shadow-[0_3px_0_#0c8054]" data-testid="button-nav-start">Join the waitlist <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></a>
        </div>
        <button className="rounded-xl p-2 text-[#192541] lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mx-4 rounded-2xl border border-[#192541]/10 bg-[#fbf9f3] p-4 shadow-xl lg:hidden" data-testid="mobile-navigation">
          <div className="grid gap-1 text-left text-sm font-semibold text-[#192541]">
            {['how-it-works', 'for-businesses', 'app', 'pricing', 'stories'].map((id) => (
              <button key={id} onClick={() => go(id)} className="rounded-xl px-4 py-3 text-left capitalize transition hover:bg-[#eaf6ee]" data-testid={`mobile-nav-${id}`}>{id.replaceAll('-', ' ')}</button>
            ))}
            <a href={WAITLIST_URL} target="_blank" rel="noreferrer" className="mt-2 rounded-xl bg-[#16b878] px-4 py-3 text-left font-bold" data-testid="mobile-nav-start">Join the waitlist <ArrowRight className="ml-1 inline h-4 w-4" /></a>
          </div>
        </div>
      )}
    </header>
  );
}

function PostCard({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="relative w-full max-w-[390px] rotate-[-2deg] rounded-[24px] border border-[#192541]/10 bg-[#fbf9f3] p-4 shadow-[0_20px_60px_rgba(25,37,65,.14)] transition duration-500 hover:rotate-0" data-testid="card-social-post">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[#f4a0b8] text-sm font-bold text-[#192541]">N</div>
        <div><p className="text-sm font-bold text-[#192541]">Nia’s Studio</p><p className="text-xs text-[#192541]/45">Just now · Nairobi</p></div>
        <MoreHorizontal className="ml-auto h-5 w-5 text-[#192541]/35" />
      </div>
      <div className="overflow-hidden rounded-2xl bg-[#eadfd6]">
        <img src={stillLifePath} alt="A shopping bag and cart ready for a sale" className="h-[205px] w-full object-cover" />
      </div>
      <div className="flex items-center gap-4 py-3 text-[#192541]/50"><MessageCircle className="h-4 w-4" /><span className="text-xs">48 replies</span><span className="text-xs">127 likes</span></div>
      <div className="border-t border-[#192541]/10 pt-3">
        <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#192541]/45">New drop</p><p className="font-display text-lg font-bold text-[#192541]">Linen co-ord set</p></div><p className="font-display text-lg font-bold text-[#192541]">KSh 3,850</p></div>
        <button onClick={onOpen} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#192541] py-3 text-sm font-bold text-[#f6f2e8] transition hover:bg-[#25375b]" data-testid="button-open-product">Tap to shop <ArrowRight className="h-4 w-4" /></button>
      </div>
      <span className="absolute -right-4 -top-4 flex h-11 w-11 rotate-[8deg] items-center justify-center rounded-full bg-[#f8bf3c] text-[#192541] shadow-lg"><Zap className="h-5 w-5 fill-current" /></span>
    </div>
  );
}

function ProductDemo({ stage, setStage, onAction }: { stage: number; setStage: (stage: number) => void; onAction: (message: string) => void }) {
  const stages = [
    { label: 'Product popup', icon: ShoppingBag },
    { label: 'Chat & negotiate', icon: MessageCircle },
    { label: 'Pay securely', icon: CreditCard },
    { label: 'Track order', icon: Truck },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="absolute -left-12 top-24 hidden h-40 w-40 rounded-full bg-[#a69be8]/40 blur-2xl lg:block" />
      <div className="relative overflow-hidden rounded-[38px] border-[9px] border-[#192541] bg-[#f8f7f1] phone-shadow">
        <div className="flex items-center justify-between bg-[#192541] px-6 pb-3 pt-2 text-[10px] font-bold text-[#f6f2e8]"><span>9:41</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#16b878]" /> StatusSeller</span><span>100%</span></div>
        <div className="demo-scroll h-[430px] overflow-y-auto px-4 pb-6">
          <div className="flex items-center justify-between py-4"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#f4a0b8] text-xs font-bold">N</div><p className="text-xs font-bold text-[#192541]">Nia’s Studio</p><button className="rounded-full bg-[#e8ecf4] p-2" aria-label="Add to favorites" data-testid="button-demo-favorite"><Plus className="h-3.5 w-3.5" /></button></div>
          {stage === 0 && <div className="animate-in fade-in slide-in-from-bottom-2 duration-500"><div className="overflow-hidden rounded-2xl"><img src={stillLifePath} alt="Linen co-ord set product" className="h-[205px] w-full object-cover" /></div><div className="pt-4"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#16b878]">Just dropped</p><h3 className="mt-1 font-display text-2xl font-bold text-[#192541]">Linen co-ord set</h3><p className="mt-1 text-xs leading-relaxed text-[#192541]/55">A breezy two-piece for long lunches and longer weekends.</p><div className="mt-5 flex items-end justify-between"><div><p className="text-[10px] text-[#192541]/45">From</p><p className="font-display text-2xl font-bold text-[#192541]">KSh 3,850</p></div><button onClick={() => setStage(1)} className="rounded-xl bg-[#16b878] px-4 py-3 text-xs font-bold text-[#192541]" data-testid="button-demo-chat">Ask a question <MessageCircle className="ml-1 inline h-3.5 w-3.5" /></button></div></div></div>}
          {stage === 1 && <div className="animate-in fade-in slide-in-from-bottom-2 duration-500"><div className="mb-4 rounded-2xl bg-[#e9f6ee] p-4"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#16b878]">Nia’s Studio is online</p><p className="mt-2 text-sm font-semibold leading-relaxed text-[#192541]">Hi! Is the blue set available in medium?</p></div><div className="space-y-3"><div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[#192541] p-3 text-xs text-[#f6f2e8]">Yes, medium is ready to ship. Want me to hold it for you?</div><div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[#e8ecf4] p-3 text-xs font-medium text-[#192541]">Could you do KSh 3,500 if I pay now?</div><div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[#a69be8]/30 p-3 text-xs font-semibold text-[#192541]">Let’s meet at KSh 3,650. I’ll include delivery to Westlands.</div></div><button onClick={() => setStage(2)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#16b878] py-3 text-xs font-bold text-[#192541]" data-testid="button-demo-accept">Accept KSh 3,650 <ArrowRight className="h-3.5 w-3.5" /></button></div>}
          {stage === 2 && <div className="animate-in fade-in slide-in-from-bottom-2 duration-500"><div className="rounded-2xl bg-[#192541] p-5 text-[#f6f2e8]"><div className="flex items-center justify-between"><span className="text-xs text-[#f6f2e8]/65">Order total</span><CreditCard className="h-5 w-5 text-[#16b878]" /></div><p className="mt-2 font-display text-3xl font-bold">KSh 3,650</p><div className="mt-5 flex items-center gap-2 rounded-xl bg-white/10 p-3 text-xs"><div className="grid h-7 w-7 place-items-center rounded-md bg-[#f8bf3c] text-[#192541]"><CreditCard className="h-4 w-4" /></div><span>•••• 2048</span><ChevronRight className="ml-auto h-4 w-4 text-white/50" /></div></div><div className="my-5 space-y-3 text-xs"><div className="flex justify-between"><span className="text-[#192541]/55">Linen co-ord set</span><span className="font-semibold text-[#192541]">KSh 3,650</span></div><div className="flex justify-between"><span className="text-[#192541]/55">Delivery</span><span className="font-semibold text-[#16b878]">Included</span></div></div><button onClick={() => { setStage(3); onAction('Payment confirmed — your order is on its way'); }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#16b878] py-3 text-xs font-bold text-[#192541]" data-testid="button-demo-pay">Pay securely <LockIcon /></button><p className="mt-3 text-center text-[10px] text-[#192541]/45">Protected by StatusSeller checkout</p></div>}
          {stage === 3 && <div className="animate-in fade-in slide-in-from-bottom-2 duration-500"><div className="rounded-2xl bg-[#e9f6ee] p-5"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#16b878] text-[#192541]"><PackageCheck className="h-5 w-5" /></div><div><p className="text-sm font-bold text-[#192541]">Order confirmed</p><p className="text-xs text-[#192541]/55">#NS-2841 · Arriving tomorrow</p></div></div><div className="mt-6 space-y-5 pl-1"><TimelineItem title="Payment received" detail="Today, 10:42 AM" done /><TimelineItem title="Order packed" detail="Today, 11:18 AM" done /><TimelineItem title="Rider is on the way" detail="Estimated by 4:00 PM" /></div></div><button onClick={() => setStage(0)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#192541]/15 py-3 text-xs font-bold text-[#192541]" data-testid="button-demo-shop-again">Shop another drop <ArrowRight className="h-3.5 w-3.5" /></button></div>}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-1 rounded-2xl border border-[#192541]/10 bg-[#fbf9f3]/80 p-1.5 backdrop-blur-sm">
        {stages.map(({ label, icon: Icon }, index) => <button key={label} onClick={() => setStage(index)} className={`rounded-xl px-1 py-2 text-[10px] font-bold transition ${stage === index ? 'bg-[#192541] text-[#f6f2e8]' : 'text-[#192541]/50 hover:bg-[#e8ecf4]'}`} data-testid={`button-demo-stage-${index}`}><Icon className="mx-auto mb-1 h-3.5 w-3.5" />{index + 1}</button>)}
      </div>
    </div>
  );
}

function LockIcon() { return <span className="inline-flex h-3 w-3 rounded-[3px] border-2 border-[#192541] border-t-0" />; }

function TimelineItem({ title, detail, done = false }: { title: string; detail: string; done?: boolean }) {
  return <div className="relative flex gap-3"><div className={`z-10 mt-0.5 grid h-5 w-5 place-items-center rounded-full ${done ? 'bg-[#16b878] text-[#192541]' : 'border-2 border-[#a69be8] bg-[#e9f6ee]'}`}>{done && <Check className="h-3 w-3" />}</div><div><p className="text-xs font-bold text-[#192541]">{title}</p><p className="mt-0.5 text-[10px] text-[#192541]/50">{detail}</p></div></div>;
}

function Hero({ onAction }: { onAction: (message: string) => void }) {
  const [stage, setStage] = useState(0);
  return (
    <section id="top" className="relative min-h-[680px] overflow-hidden bg-[#f6f2e8] pt-24 lg:pt-28">
      <div className="absolute -right-20 top-8 h-[530px] w-[530px] rounded-full bg-[#e1daf8] opacity-60 blur-3xl" />
      <div className="absolute left-[42%] top-[30%] h-3 w-3 rounded-full bg-[#f8bf3c] glow-orb" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 lg:grid-cols-[.92fr_1.08fr] lg:px-10 lg:pb-16">
        <div className="relative z-10">
          <div className="reveal flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#16b878]"><span className="h-2 w-2 rounded-full bg-[#16b878]" /> Social commerce, made human</div>
          <h1 className="reveal delay-1 mt-5 max-w-[680px] font-display text-[clamp(3.2rem,6.4vw,6rem)] font-bold leading-[.91] tracking-[-.075em] text-[#192541]">Turn every<br /><span className="text-[#16b878]">social post</span><br />into a store<span className="text-[#f8bf3c]">.</span></h1>
          <p className="reveal delay-2 mt-6 max-w-[475px] text-base leading-7 text-[#192541]/65 lg:text-lg">Views are attention. Sales are action. Give your customers a reason to stop, chat, pay and come back — without ever leaving the post.</p>
          <div className="reveal delay-3 mt-7 flex flex-wrap items-center gap-4">
            <a href={WAITLIST_URL} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-full bg-[#16b878] px-6 py-4 text-sm font-bold text-[#192541] shadow-[0_8px_0_#0c8054] transition hover:-translate-y-1 hover:shadow-[0_11px_0_#0c8054] active:translate-y-1 active:shadow-[0_3px_0_#0c8054]" data-testid="button-hero-start">Join the waitlist <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
            <button onClick={() => onAction('Demo loaded — try the four steps on the right')} className="group flex items-center gap-2 rounded-full px-3 py-3 text-sm font-bold text-[#192541] transition hover:text-[#16b878]" data-testid="button-watch-demo"><span className="grid h-9 w-9 place-items-center rounded-full border border-[#192541]/20 transition group-hover:border-[#16b878] group-hover:bg-[#16b878]"><Play className="ml-0.5 h-3.5 w-3.5 fill-current" /></span> Watch the 60-sec demo</button>
          </div>
          <div className="reveal delay-3 mt-11 flex items-center gap-3 text-xs text-[#192541]/55"><div className="flex -space-x-2"><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#f6f2e8] bg-[#f4a0b8] text-[9px] font-bold">AM</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#f6f2e8] bg-[#a69be8] text-[9px] font-bold">JO</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#f6f2e8] bg-[#f8bf3c] text-[9px] font-bold">SK</span></div><span>Join 2,400+ ambitious sellers<br /><strong className="text-[#192541]">across East Africa</strong></span></div>
        </div>
        <div className="relative z-10 flex items-center justify-center gap-5 lg:justify-end">
          <div className="hidden pt-16 lg:block"><PostCard onOpen={() => setStage(0)} /></div>
          <ProductDemo stage={stage} setStage={setStage} onAction={onAction} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-12 items-center overflow-hidden border-y border-[#192541]/10 bg-[#192541] text-[#f6f2e8]"><div className="marquee-track flex min-w-max items-center gap-10 text-xs font-bold uppercase tracking-[.18em]"><span>Post</span><ArrowRight className="h-3.5 w-3.5 text-[#16b878]" /><span>Chat</span><ArrowRight className="h-3.5 w-3.5 text-[#f8bf3c]" /><span>Negotiate</span><ArrowRight className="h-3.5 w-3.5 text-[#a69be8]" /><span>Pay</span><ArrowRight className="h-3.5 w-3.5 text-[#16b878]" /><span>Deliver</span><ArrowRight className="h-3.5 w-3.5 text-[#f8bf3c]" /><span>Post</span><ArrowRight className="h-3.5 w-3.5 text-[#16b878]" /><span>Chat</span><ArrowRight className="h-3.5 w-3.5 text-[#a69be8]" /><span>Negotiate</span><ArrowRight className="h-3.5 w-3.5 text-[#16b878]" /><span>Pay</span><ArrowRight className="h-3.5 w-3.5 text-[#f8bf3c]" /><span>Deliver</span></div></div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, body, dark = false }: { eyebrow: string; title: ReactNode; body: string; dark?: boolean }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${dark ? 'text-[#f6f2e8]' : 'text-[#192541]'}`}><p className={`text-xs font-bold uppercase tracking-[.2em] ${dark ? 'text-[#f8bf3c]' : 'text-[#16b878]'}`}>{eyebrow}</p><h2 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[.97] tracking-[-.065em]">{title}</h2><p className={`mt-6 max-w-xl text-base leading-7 ${dark ? 'text-[#f6f2e8]/65' : 'text-[#192541]/62'}`}>{body}</p></div>;
}

function HowItWorks() {
  const items: { number: string; title: string; copy: string; icon: IconType; color: string }[] = [
    { number: '01', title: 'Post like you always do.', copy: 'Share a product on WhatsApp, Instagram or Facebook. StatusSeller turns the post into a shoppable moment.', icon: Send, color: '#16b878' },
    { number: '02', title: 'Let customers talk it out.', copy: 'A storefront that sounds like you. Answer questions, suggest a size and meet in the middle — right inside the chat.', icon: MessageCircle, color: '#a69be8' },
    { number: '03', title: 'Get paid. Stay in the loop.', copy: 'Secure payment and order tracking close the loop. No screenshots. No “did you receive my order?” messages.', icon: PackageCheck, color: '#f8bf3c' },
  ];
  return <section id="how-it-works" className="bg-[#192541] px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><SectionIntro eyebrow="From scroll to sale" title={<>One post.<br /><span className="text-[#16b878]">The whole journey.</span></>} body="StatusSeller keeps the warmth of social selling and removes the friction that makes good customers disappear." dark /><div className="mt-16 grid gap-4 lg:grid-cols-3">{items.map(({ number, title, copy, icon: Icon, color }, i) => { const ref = useReveal(); return <article ref={ref} key={number} className={`reveal delay-${i + 1} group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[.06] p-7 transition duration-500 hover:-translate-y-2 hover:bg-white/[.1]`}><div className="flex items-start justify-between"><span className="font-display text-sm font-bold" style={{ color }}>{number}</span><div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ backgroundColor: `${color}22`, color }}><Icon className="h-5 w-5" /></div></div><h3 className="mt-20 max-w-[270px] font-display text-2xl font-bold leading-tight text-[#f6f2e8]">{title}</h3><p className="mt-4 text-sm leading-6 text-[#f6f2e8]/55">{copy}</p><ArrowDownRight className="absolute bottom-7 right-7 h-5 w-5 text-white/25 transition duration-500 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-white/75" /></article>; })}</div><div className="mt-20 flex flex-wrap items-center justify-between gap-8 border-t border-white/10 pt-8 text-[#f6f2e8]/65"><p className="max-w-md text-sm leading-6">“Before StatusSeller, my DMs were a second job. Now they are where my best orders happen.”</p><span className="text-xs font-bold uppercase tracking-[.16em] text-[#f6f2e8]">— Amina, Nia’s Studio</span></div></div></section>;
}

function BusinessSection({ onAction }: { onAction: (message: string) => void }) {
  const features = [{ icon: BarChart3, title: 'See what is actually selling', copy: 'Know which post, product and price moved a buyer.' }, { icon: Users, title: 'Keep every customer close', copy: 'Build a customer list from conversations, not cold leads.' }, { icon: Clock3, title: 'Get your time back', copy: 'Automate order updates while keeping your voice.' }];
  return <section id="for-businesses" className="bg-[#e7f5ea] px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.9fr_1.1fr]"><div><SectionIntro eyebrow="A better back office" title={<>Your business,<br /><span className="text-[#a25dd1]">in motion.</span></>} body="A simple command centre for the part of your business that matters most: the moment someone decides to buy." /><div className="mt-9 grid gap-6">{features.map(({ icon: Icon, title, copy }, i) => <div key={title} className="group flex gap-4" data-testid={`feature-business-${i}`}><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#192541] text-[#f8bf3c] transition group-hover:rotate-[-6deg]"><Icon className="h-5 w-5" /></div><div><h3 className="font-display text-lg font-bold text-[#192541]">{title}</h3><p className="mt-1 text-sm leading-6 text-[#192541]/58">{copy}</p></div></div>)}</div><button onClick={() => onAction('Your seller workspace preview is ready')} className="mt-10 flex items-center gap-2 rounded-full border-2 border-[#192541] px-5 py-3 text-sm font-bold text-[#192541] transition hover:bg-[#192541] hover:text-[#f6f2e8]" data-testid="button-business-preview">Explore the dashboard <ArrowRight className="h-4 w-4" /></button></div><DashboardPreview /></div></section>;
}

function DashboardPreview() {
  return <div className="relative"><div className="absolute -right-6 -top-10 h-32 w-32 rounded-full bg-[#f8bf3c]/50 blur-2xl" /><div className="relative rotate-[1.5deg] rounded-[28px] border border-[#192541]/12 bg-[#fbf9f3] p-3 shadow-[0_25px_70px_rgba(25,37,65,.14)] transition duration-500 hover:rotate-0"><div className="flex gap-3 rounded-2xl bg-[#192541] p-4"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#16b878] text-[#192541]"><Store className="h-4 w-4" /></div><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#f6f2e8]/50">Good morning, Nia</p><p className="mt-1 font-display text-lg font-bold text-[#f6f2e8]">Here’s your shop pulse.</p></div><MoreHorizontal className="ml-auto h-5 w-5 text-white/40" /></div><div className="grid gap-3 p-3 sm:grid-cols-3"><DashStat label="Sales today" value="KSh 48,620" up="+18.4%" /><DashStat label="Open orders" value="24" up="+6 today" /><DashStat label="Customers" value="1,284" up="+42 this week" /></div><div className="grid gap-3 p-3 sm:grid-cols-[1.35fr_.65fr]"><div className="rounded-2xl border border-[#192541]/10 p-4"><div className="flex justify-between"><p className="text-xs font-bold text-[#192541]">Sales overview</p><button className="text-[10px] font-semibold text-[#a25dd1]" data-testid="button-dashboard-period">This week <ChevronDown className="ml-1 inline h-3 w-3" /></button></div><div className="mt-5 flex h-32 items-end gap-2">{[35, 48, 41, 67, 54, 81, 72, 94, 83, 100, 89, 96].map((height, i) => <div key={i} className="group flex flex-1 flex-col justify-end gap-1"><div className={`rounded-t-sm transition-all group-hover:bg-[#a25dd1] ${i > 8 ? 'bg-[#16b878]' : 'bg-[#c9c4ef]'}`} style={{ height: `${height}%` }} /></div>)}</div><div className="mt-2 flex justify-between text-[9px] text-[#192541]/35"><span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span></div></div><div className="rounded-2xl border border-[#192541]/10 p-4"><p className="text-xs font-bold text-[#192541]">Top post</p><div className="mt-3 overflow-hidden rounded-xl"><img src={laptopPath} alt="Shopping cart and laptop" className="h-20 w-full object-cover" /></div><p className="mt-2 truncate text-[10px] font-semibold text-[#192541]">Weekend drop: linen edit</p><p className="mt-1 text-[10px] text-[#16b878]">42 orders · KSh 161k</p></div></div></div></div>;
}

function DashStat({ label, value, up }: { label: string; value: string; up: string }) { return <div className="rounded-2xl bg-[#f0eee6] p-4"><p className="text-[10px] font-semibold text-[#192541]/50">{label}</p><p className="mt-2 font-display text-xl font-bold tracking-[-.04em] text-[#192541]">{value}</p><p className="mt-1 text-[10px] font-bold text-[#16b878]">{up}</p></div>; }

function AppSection() {
  return <section id="app" className="bg-[#fbf9f3] px-5 py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-7xl"><div className="grid items-end gap-8 lg:grid-cols-[.9fr_1.1fr]"><SectionIntro eyebrow="Meet the selling layer" title={<>Your status is<br /><span className="text-[#16b878]">already a storefront.</span></>} body="This is what customers see when a view becomes intent. One tap opens the product, the conversation, the offer and the checkout — all in the flow they already trust." /><div className="rounded-[24px] bg-[#192541] p-6 text-[#f6f2e8] shadow-[12px_12px_0_#f8bf3c]"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#16b878]">The conversion gap</p><p className="mt-3 font-display text-3xl font-bold leading-tight">10,000 views can still mean zero orders.</p><p className="mt-3 text-sm leading-6 text-white/60">StatusSeller gives every interested viewer a next step before the moment disappears.</p></div></div><div className="mt-8 overflow-hidden rounded-[22px] border border-[#192541]/10 bg-[#f0eee6] p-2"><img src={statusFlowPath} alt="Five steps from viewing a status to confirming an order" className="h-auto w-full rounded-[16px]" /></div><div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_.95fr]"><div className="overflow-hidden rounded-[28px] bg-[#e9e6fa] p-3 shadow-[0_20px_50px_rgba(25,37,65,.1)]"><img src={fullFlowPath} alt="StatusSeller customer journey from status to confirmed order" className="h-auto w-full rounded-[20px]" /></div><div className="grid gap-4 sm:grid-cols-2"><div className="overflow-hidden rounded-[24px] bg-[#192541] p-3"><img src={statusProductPath} alt="Product status with Shop Now button" className="h-full w-full rounded-[17px] object-cover" /></div><div className="overflow-hidden rounded-[24px] bg-[#dff2e5] p-3"><img src={shopPopupPath} alt="Product popup with size and purchase options" className="h-full w-full rounded-[17px] object-cover" /></div><div className="overflow-hidden rounded-[24px] bg-[#f0eee6] p-3"><img src={cartPath} alt="Cart summary inside the StatusSeller popup" className="h-full w-full rounded-[17px] object-cover" /></div><div className="overflow-hidden rounded-[24px] bg-[#e7e2f8] p-3"><img src={chatCheckoutPath} alt="Chat negotiation and checkout screens" className="h-full w-full rounded-[17px] object-cover" /></div></div></div><div className="mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-[#192541]/10 bg-[#f0eee6] p-5"><p className="font-display text-3xl font-bold text-[#192541]">Views</p><p className="mt-1 text-sm text-[#192541]/55">become product interest</p></div><div className="rounded-2xl border border-[#192541]/10 bg-[#f0eee6] p-5"><p className="font-display text-3xl font-bold text-[#192541]">Chats</p><p className="mt-1 text-sm text-[#192541]/55">become qualified buyers</p></div><div className="rounded-2xl border border-[#192541]/10 bg-[#f0eee6] p-5"><p className="font-display text-3xl font-bold text-[#192541]">Orders</p><p className="mt-1 text-sm text-[#192541]/55">become trackable revenue</p></div></div></div></section>;
}

function Waitlist() {
  return <section id="waitlist" className="bg-[#192541] px-5 py-16 text-[#f6f2e8] lg:px-10 lg:py-24"><div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#f8bf3c]">Be early to the movement</p><h2 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,5vw,5rem)] font-bold leading-[.95] tracking-[-.07em]">Stop collecting views.<br /><span className="text-[#16b878]">Start collecting orders.</span></h2><p className="mt-5 max-w-xl text-base leading-7 text-white/60">Join the StatusSeller waitlist and be among the first businesses turning everyday social attention into measurable sales.</p></div><a href={WAITLIST_URL} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-3 rounded-full bg-[#16b878] px-7 py-4 text-sm font-bold text-[#192541] shadow-[0_8px_0_#0c8054] transition hover:-translate-y-1 hover:shadow-[0_11px_0_#0c8054]" data-testid="button-join-waitlist">Join now <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a></div></section>;
}

function Stories() {
  return <section id="stories" className="bg-[#f6f2e8] px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><SectionIntro eyebrow="Built for the hustle" title={<>Small teams.<br /><span className="text-[#f07892]">Big movement.</span></>} body="The sellers using StatusSeller are not waiting for perfect. They are posting, replying and growing in public." /><div className="flex items-center gap-2 text-sm font-bold text-[#192541]"><span className="h-2 w-2 rounded-full bg-[#16b878]" /> Live seller stories</div></div><div className="mt-14 grid gap-4 md:grid-cols-[1.1fr_.9fr_.9fr]"><StoryCard name="Nia’s Studio" role="Contemporary womenswear" quote="My customers love that they can ask, negotiate and pay in the same place. It feels like me, just faster." accent="green" stat="3.2×" statLabel="more completed chats" image={stillLifePath} /><StoryCard name="Kipepeo Home" role="Handmade interiors" quote="I stopped losing orders in a sea of screenshots. Every sale has a name, a status and a next step." accent="purple" stat="41%" statLabel="fewer follow-up messages" image={laptopPath} compact /><div className="flex flex-col justify-between rounded-[26px] bg-[#f8bf3c] p-7 text-[#192541]"><div><Tag className="h-7 w-7" /><p className="mt-20 font-display text-[2rem] font-bold leading-[.97] tracking-[-.06em]">Make your next post a little more powerful.</p></div><button onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 flex items-center justify-between border-t border-[#192541]/20 pt-4 text-sm font-bold" data-testid="button-story-cta">See what’s possible <ArrowRight className="h-4 w-4" /></button></div></div></div></section>;
}

function StoryCard({ name, role, quote, accent, stat, statLabel, image, compact = false }: { name: string; role: string; quote: string; accent: 'green' | 'purple'; stat: string; statLabel: string; image: string; compact?: boolean }) {
  return <article className={`overflow-hidden rounded-[26px] ${accent === 'green' ? 'bg-[#dff2e5]' : 'bg-[#e7e2f8]'}`}><div className={`relative ${compact ? 'h-40' : 'h-52'} overflow-hidden`}><img src={image} alt="" className="h-full w-full object-cover mix-blend-multiply opacity-85 transition duration-700 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#192541]/30 to-transparent" /></div><div className="p-6"><div className="flex items-center justify-between"><div><p className="font-display font-bold text-[#192541]">{name}</p><p className="text-xs text-[#192541]/50">{role}</p></div><div className="text-right"><p className="font-display text-2xl font-bold text-[#192541]">{stat}</p><p className="text-[9px] font-bold uppercase tracking-[.1em] text-[#192541]/45">{statLabel}</p></div></div><p className="mt-6 text-sm font-medium leading-6 text-[#192541]/75">“{quote}”</p></div></article>;
}

function Pricing({ onAction }: { onAction: (message: string) => void }) {
  const [annual, setAnnual] = useState(true);
  return <section id="pricing" className="bg-[#e9e6fa] px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionIntro eyebrow="Start small. Grow loud." title={<>A plan that moves<br /><span className="text-[#a25dd1]">with you.</span></>} body="No setup fee. No long contracts. Just the tools you need for your next sale." /><div className="flex items-center gap-2 rounded-full border border-[#192541]/15 bg-[#fbf9f3]/65 p-1 text-xs font-bold"><button onClick={() => setAnnual(false)} className={`rounded-full px-4 py-2 ${!annual ? 'bg-[#192541] text-[#f6f2e8]' : 'text-[#192541]/55'}`} data-testid="button-billing-monthly">Monthly</button><button onClick={() => setAnnual(true)} className={`rounded-full px-4 py-2 ${annual ? 'bg-[#16b878] text-[#192541]' : 'text-[#192541]/55'}`} data-testid="button-billing-annual">Annual · save 2 months</button></div></div><div className="mt-14 grid gap-4 lg:grid-cols-3"><PriceCard name="Starter" price={annual ? '0' : '0'} description="For getting your first selling flow moving." features={['Unlimited social product links', '50 customer conversations / month', 'Basic order tracking']} button="Start for free" onClick={() => onAction('Starter plan selected — no card required')} /><PriceCard name="Momentum" price={annual ? '2,490' : '2,990'} description="For sellers turning conversation into a channel." features={['Everything in Starter', 'Unlimited customer conversations', 'Negotiation and payment links', 'Sales dashboard and insights']} featured button="Choose Momentum" onClick={() => onAction('Momentum plan selected — welcome to the fast lane')} /><PriceCard name="Scale" price={annual ? '7,900' : '9,500'} description="For teams ready to make social their storefront." features={['Everything in Momentum', 'Team inbox and roles', 'Automated order updates', 'Priority support']} button="Talk to our team" onClick={() => onAction('A product specialist will be in touch')} /></div></div></section>;
}

function PriceCard({ name, price, description, features, featured = false, button, onClick }: { name: string; price: string; description: string; features: string[]; featured?: boolean; button: string; onClick: () => void }) {
  return <article className={`relative rounded-[26px] border p-7 ${featured ? 'border-[#16b878] bg-[#192541] text-[#f6f2e8] shadow-[0_18px_0_#16b878]' : 'border-[#192541]/12 bg-[#fbf9f3] text-[#192541]'}`}>{featured && <span className="absolute right-6 top-6 rounded-full bg-[#f8bf3c] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#192541]">Most loved</span>}<p className={`text-xs font-bold uppercase tracking-[.18em] ${featured ? 'text-[#16b878]' : 'text-[#a25dd1]'}`}>{name}</p><p className="mt-6 flex items-baseline gap-1 font-display"><span className="text-sm font-semibold">KSh</span><span className="text-5xl font-bold tracking-[-.07em]">{price}</span><span className={`text-xs ${featured ? 'text-white/50' : 'text-[#192541]/45'}`}>/ month</span></p><p className={`mt-4 min-h-[48px] text-sm leading-6 ${featured ? 'text-white/60' : 'text-[#192541]/55'}`}>{description}</p><button onClick={onClick} className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${featured ? 'bg-[#16b878] text-[#192541] hover:bg-[#37d492]' : 'border-2 border-[#192541] text-[#192541] hover:bg-[#192541] hover:text-[#f6f2e8]'}`} data-testid={`button-price-${name.toLowerCase()}`}>{button} <ArrowRight className="h-4 w-4" /></button><ul className={`mt-8 space-y-4 border-t pt-6 text-sm ${featured ? 'border-white/10 text-white/72' : 'border-[#192541]/10 text-[#192541]/68'}`}>{features.map((feature) => <li key={feature} className="flex gap-3"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-[#16b878]' : 'text-[#a25dd1]'}`} />{feature}</li>)}</ul></article>;
}

function CTA({ onAction }: { onAction: (message: string) => void }) {
  const [email, setEmail] = useState('');
  const submit = () => { if (!email.includes('@')) { onAction('Enter a valid email and we’ll save your spot'); return; } onAction(`Invite sent to ${email}`); setEmail(''); };
  return <section id="cta" className="relative overflow-hidden bg-[#16b878] px-5 py-24 lg:px-10 lg:py-32"><div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border-[44px] border-[#f8bf3c]/70" /><div className="absolute -bottom-28 left-[-8%] h-72 w-72 rounded-full border-[35px] border-[#a69be8]/60" /><div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.78fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#192541]/60">Your next customer is scrolling</p><h2 className="mt-5 max-w-3xl font-display text-[clamp(3rem,6vw,6.3rem)] font-bold leading-[.92] tracking-[-.08em] text-[#192541]">Make it easy<br />to say yes.</h2><p className="mt-7 max-w-lg text-lg leading-7 text-[#192541]/70">Build your first selling flow in minutes. Bring your products, your voice and a little momentum.</p></div><div className="rounded-[26px] bg-[#192541] p-6 text-[#f6f2e8] shadow-[15px_15px_0_rgba(25,37,65,.16)]"><p className="font-display text-xl font-bold">Get your free workspace</p><p className="mt-2 text-sm leading-6 text-white/60">No card details. Just a better way to sell.</p><div className="mt-6 flex flex-col gap-2 sm:flex-row"><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@yourbusiness.com" className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-[#f6f2e8] outline-none placeholder:text-white/35 focus:border-[#16b878]" data-testid="input-cta-email" /><button onClick={submit} className="rounded-xl bg-[#f8bf3c] px-5 py-3 text-sm font-bold text-[#192541] transition hover:bg-[#ffd266]" data-testid="button-cta-submit">Let’s go <ArrowRight className="ml-1 inline h-4 w-4" /></button></div><p className="mt-5 flex items-center gap-2 text-[11px] text-white/45"><Check className="h-3.5 w-3.5 text-[#16b878]" /> Setup takes less than 5 minutes</p></div></div></section>;
}

function Footer({ onAction }: { onAction: (message: string) => void }) {
  return <footer className="bg-[#192541] px-5 pb-8 pt-14 text-[#f6f2e8] lg:px-10"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-9 border-b border-white/10 pb-12 md:flex-row"><div><Logo dark /><p className="mt-5 max-w-xs text-sm leading-6 text-white/50">The fastest way to sell on social media. Built for the businesses moving East Africa forward.</p></div><div className="grid grid-cols-2 gap-x-16 gap-y-8 text-sm sm:grid-cols-3"><FooterGroup title="Explore" links={['How it works', 'For businesses', 'Pricing']} onAction={onAction} /><FooterGroup title="Company" links={['About us', 'Stories', 'Contact']} onAction={onAction} /><div><p className="font-bold text-white">Stay in the loop</p><p className="mt-3 max-w-[150px] text-xs leading-5 text-white/45">Small notes for big moves.</p><button onClick={() => onAction('Newsletter signup coming your way')} className="mt-3 flex items-center gap-2 text-xs font-bold text-[#16b878]" data-testid="button-newsletter">Join the list <ArrowRight className="h-3 w-3" /></button></div></div></div><div className="flex flex-col justify-between gap-3 pt-7 text-xs text-white/35 sm:flex-row"><span>© 2024 StatusSeller Technologies</span><span>Made for the ones making it happen.</span></div></div></footer>;
}

function FooterGroup({ title, links, onAction }: { title: string; links: string[]; onAction: (message: string) => void }) {
  return <div><p className="font-bold text-white">{title}</p><div className="mt-3 grid gap-2.5">{links.map((link) => <button key={link} onClick={() => onAction(`${link} section is on the way`)} className="text-left text-xs text-white/45 transition hover:text-[#16b878]" data-testid={`footer-link-${link.toLowerCase().replaceAll(' ', '-')}`}>{link}</button>)}</div></div>;
}

function DemoModal({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#192541]/75 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="StatusSeller product demo" data-testid="demo-modal"><div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] bg-[#f6f2e8] shadow-2xl"><button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-[#192541] text-[#f6f2e8]" aria-label="Close demo" data-testid="button-close-demo"><X className="h-4 w-4" /></button><div className="grid gap-8 p-7 md:grid-cols-[1fr_1.1fr] md:p-10"><div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#16b878]">A 60-second tour</p><h2 className="mt-4 font-display text-4xl font-bold leading-[.95] tracking-[-.06em] text-[#192541]">Post it.<br /><span className="text-[#a25dd1]">Sell it.</span><br />Keep moving.</h2><p className="mt-5 text-sm leading-6 text-[#192541]/60">See how Nia turns a single social post into a paid, tracked order without leaving her customers on read.</p><button onClick={onClose} className="mt-7 flex w-fit items-center gap-2 rounded-full bg-[#16b878] px-5 py-3 text-sm font-bold text-[#192541]" data-testid="button-demo-try">Try the interactive demo <ArrowRight className="h-4 w-4" /></button></div><div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#192541]"><img src={laptopPath} alt="Commerce product demo" className="h-full w-full object-cover opacity-55" /><div className="absolute inset-0 grid place-items-center"><div className="grid h-16 w-16 place-items-center rounded-full bg-[#16b878] text-[#192541] shadow-lg"><Play className="ml-1 h-6 w-6 fill-current" /></div></div><div className="absolute bottom-4 left-4 right-4 flex items-center gap-2"><span className="h-1 flex-1 overflow-hidden rounded-full bg-white/30"><span className="block h-full w-1/3 rounded-full bg-[#16b878]" /></span><span className="text-[10px] font-bold text-white">00:18 / 01:00</span></div></div></div></div></div>;
}

function Home() {
  const [notice, setNotice] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 3600); };
  useEffect(() => {
    const revealNodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
   return <main className="page-shell grain min-h-[100dvh]"><Nav onAction={notify} /><Hero onAction={(message) => { if (message.includes('Demo')) setShowDemo(true); else notify(message); }} /><HowItWorks /><BusinessSection onAction={notify} /><AppSection /><Waitlist /><Stories /><Pricing onAction={notify} /><CTA onAction={notify} /><Footer onAction={notify} />{notice && <Notice message={notice} onClose={() => setNotice(null)} />}{showDemo && <DemoModal onClose={() => setShowDemo(false)} />}</main>;
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><RoutedErrorBoundary><Router /></RoutedErrorBoundary></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;