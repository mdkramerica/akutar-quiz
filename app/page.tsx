import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-akuverse text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-dark border-b border-cyan-500/10">
        <span className="font-display text-2xl tracking-widest text-white">ΛKU</span>
        <Link
          href="/quiz"
          className="font-condensed font-semibold text-sm uppercase tracking-widest px-5 py-2 border border-cyan-400/40 text-cyan-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-400/10 transition-all duration-200 rounded-sm"
        >
          Take the Quiz
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">

        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-purple-900/20 blur-[100px]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-900/15 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Eyebrow */}
          <p className="font-condensed text-sm uppercase tracking-[0.4em] text-cyan-400 mb-6 animate-in" style={{animationDelay: '0ms'}}>
            By Micah Johnson
          </p>

          {/* Main headline */}
          <h1 className="font-display text-[clamp(4rem,14vw,10rem)] leading-none text-white text-glow-cyan mb-6 animate-in" style={{animationDelay: '100ms'}}>
            WELCOME TO<br />THE AKUVERSE
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-in" style={{animationDelay: '200ms'}}>
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-cyan-400/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{boxShadow: '0 0 8px #00d4ff'}} />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-cyan-400/60" />
          </div>

          {/* Quote */}
          <p className="font-condensed italic text-2xl md:text-3xl text-amber-300 mb-4 animate-in" style={{animationDelay: '250ms'}}>
            "Can astronauts be Black?"
          </p>
          <p className="font-condensed text-lg text-slate-300 mb-2 animate-in" style={{animationDelay: '300ms'}}>
            A young boy's question.&nbsp;&nbsp;An artist's answer.
          </p>
          <p className="font-condensed font-semibold text-xl text-white mb-12 animate-in" style={{animationDelay: '350ms'}}>
            A universe born from believing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in" style={{animationDelay: '400ms'}}>
            <Link
              href="/quiz"
              className="font-condensed font-bold text-lg uppercase tracking-widest px-10 py-4 bg-cyan-400/10 border border-cyan-400/60 text-cyan-300 hover:bg-cyan-400/20 hover:border-cyan-400 hover:text-white transition-all duration-300 rounded-sm border-glow-cyan"
            >
              Discover Your Akutar ✦
            </Link>
            <a
              href="https://www.penguinrandomhouse.com/books/746514/aku-journey-to-ibra-by-micah-johnson/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed font-semibold text-lg uppercase tracking-widest px-10 py-4 border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all duration-300 rounded-sm"
            >
              Pre-Order the Book
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyan-400" />
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass border border-cyan-500/20 border-glow-cyan rounded-sm p-10 text-center">
            <p className="font-condensed text-xl text-slate-200 leading-relaxed">
              Aku represents every child who's ever wondered if space is for them.
              Through storytelling, art, and community, we're proving that{' '}
              <span className="text-cyan-300 font-semibold">the stars belong to everyone</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <p className="font-condensed text-sm uppercase tracking-[0.4em] text-cyan-400 mb-2">The Universe</p>
            <h2 className="font-display text-6xl md:text-7xl text-white">THREE PILLARS</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Story */}
            <div className="glass border border-white/10 rounded-sm p-8 group hover:border-cyan-400/40 hover-glow transition-all duration-300">
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4">Chapter I</p>
              <h3 className="font-display text-4xl text-white mb-4">THE STORY</h3>
              <div className="h-px bg-gradient-to-r from-cyan-400/40 to-transparent mb-6" />
              <p className="font-condensed text-slate-300 mb-6 leading-relaxed">
                Aku: Journey to Ibra — award-winning middle-grade sci-fi adventure from MLB player turned digital artist Micah Johnson.
              </p>
              <a
                href="https://www.penguinrandomhouse.com/books/746514/aku-journey-to-ibra-by-micah-johnson/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-condensed font-semibold text-sm uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
              >
                Pre-Order Now →
              </a>
            </div>

            {/* Project */}
            <div className="glass border border-white/10 rounded-sm p-8 group hover:border-cyan-400/40 hover-glow transition-all duration-300">
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4">Chapter II</p>
              <h3 className="font-display text-4xl text-white mb-4">THE PROJECT</h3>
              <div className="h-px bg-gradient-to-r from-cyan-400/40 to-transparent mb-6" />
              <p className="font-condensed text-slate-300 mb-6 leading-relaxed">
                14,833 Akutars — a community-owned universe of representation, proving diversity belongs at the frontier.
              </p>
              <a
                href="https://opensea.io/collection/akutars"
                target="_blank"
                rel="noopener noreferrer"
                className="font-condensed font-semibold text-sm uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
              >
                Explore Collection →
              </a>
            </div>

            {/* Mission */}
            <div className="glass border border-white/10 rounded-sm p-8 group hover:border-cyan-400/40 hover-glow transition-all duration-300">
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4">Chapter III</p>
              <h3 className="font-display text-4xl text-white mb-4">THE MISSION</h3>
              <div className="h-px bg-gradient-to-r from-cyan-400/40 to-transparent mb-6" />
              <p className="font-condensed text-slate-300 mb-6 leading-relaxed">
                Diversity in STEM. Dreaming without limits. Proving that anyone — from any background — can reach the stars.
              </p>
              <Link
                href="/quiz"
                className="font-condensed font-semibold text-sm uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
              >
                Find Your Role →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA Banner */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-dark border border-cyan-400/20 border-glow-cyan rounded-sm p-14 text-center overflow-hidden">
            {/* BG glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full bg-cyan-500/8 blur-[80px]" />
            </div>
            <p className="font-condensed text-sm uppercase tracking-[0.4em] text-cyan-400 mb-4">Discover Your Akutar</p>
            <h2 className="font-display text-6xl md:text-8xl text-white text-glow-cyan mb-6">
              WHO ARE YOU<br />IN THE AKUVERSE?
            </h2>
            <p className="font-condensed text-xl text-slate-300 mb-10 max-w-xl mx-auto">
              12 questions. Real astronaut insights. One Akutar that matches your spirit.
            </p>
            <Link
              href="/quiz"
              className="inline-block font-condensed font-bold text-xl uppercase tracking-widest px-14 py-5 bg-cyan-400/15 border border-cyan-400/70 text-cyan-300 hover:bg-cyan-400/25 hover:border-cyan-400 hover:text-white transition-all duration-300 rounded-sm border-glow-cyan"
            >
              Begin Your Mission ✦
            </Link>
          </div>
        </div>
      </section>

      {/* About Micah */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-4">The Creator</p>
          <h2 className="font-display text-5xl text-white mb-6">MICAH JOHNSON</h2>
          <div className="h-px w-16 bg-cyan-400/40 mx-auto mb-8" />
          <p className="font-condensed text-slate-300 text-lg leading-relaxed mb-4">
            Former MLB player turned digital artist and creator of Aku.
          </p>
          <p className="font-condensed text-slate-400 leading-relaxed">
            After overhearing a young boy ask "Can astronauts be Black?", Micah created Aku —
            a 3D animated boy in an oversized astronaut helmet. That character became a movement,
            proving that representation changes who gets to dream.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl tracking-widest text-white/60">ΛKU</span>
          <p className="font-condensed text-sm text-slate-500">
            Built for the Aku community
          </p>
          <div className="flex gap-6">
            <a href="https://aku.world" target="_blank" rel="noopener noreferrer" className="font-condensed text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors">
              aku.world
            </a>
            <a href="https://twitter.com/AkuDreams" target="_blank" rel="noopener noreferrer" className="font-condensed text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors">
              @AkuDreams
            </a>
            <a href="https://opensea.io/collection/akutars" target="_blank" rel="noopener noreferrer" className="font-condensed text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors">
              OpenSea
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
