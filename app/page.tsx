import Link from "next/link";
export default function Page(){
  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <nav className="h-16 border-b border-white/10 flex items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="font-black text-xl tracking-tighter">FRAMEPROOF</div>
        <div className="flex gap-3"><Link href="/login" className="px-4 py-2 text-sm opacity-60">Login</Link><Link href="/dashboard" className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold">Start Free</Link></div>
      </nav>
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex border border-white/10 rounded-full px-3 py-1 text-[10px] tracking-widest opacity-50 mb-6">BUILT FOR EDITORS</div>
        <h1 className="text-6xl font-black tracking-tighter leading-[0.9] max-w-4xl mx-auto">Stop Decoding Vague Feedback.<br/><span className="text-white/30">Ship Cuts 3x Faster.</span></h1>
        <p className="mt-6 text-white/60 max-w-2xl mx-auto">Zero-friction, frame-accurate proofing. No client login required.</p>
        <div className="mt-8 flex justify-center gap-3"><Link href="/dashboard" className="px-8 py-3 bg-white text-black rounded-full font-bold">Start Proofing Free</Link><Link href="/review/demo" className="px-8 py-3 bg-white/10 rounded-full">See Demo</Link></div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {[
          {t:"Frame-Accurate", d:"23.976, 29.97, 60 FPS with J/K/L shortcuts"},
          {t:"Draw on Frame", d:"Arrow, rect, pen tools saved as JSON"},
          {t:"Zero Friction", d:"No signup for clients, name + comment only"},
        ].map(f=><div key={f.t} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10"><div className="font-bold">{f.t}</div><div className="text-sm opacity-60 mt-2">{f.d}</div></div>)}
      </section>
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl border border-white/10"><div className="font-bold">Free</div><div className="text-3xl font-black mt-2">$0</div><div className="text-xs opacity-60 mt-4">1 Project, 2GB</div></div>
          <div className="p-8 rounded-2xl bg-white text-black scale-105"><div className="font-bold">Pro Editor</div><div className="text-3xl font-black mt-2">$19/mo</div><div className="text-xs opacity-60 mt-4">Unlimited, 100GB, Export Markers</div></div>
          <div className="p-8 rounded-2xl border border-white/10"><div className="font-bold">Agency</div><div className="text-3xl font-black mt-2">$49/mo</div><div className="text-xs opacity-60 mt-4">1TB, White-label</div></div>
        </div>
      </section>
    </div>
  );
}
