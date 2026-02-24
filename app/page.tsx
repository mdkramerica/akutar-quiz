import Link from 'next/link';
import Image from 'next/image';
import { homepageGallery, NFT_BLUR_DATA_URL } from '@/lib/akutars';

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-akuverse text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-dark border-b border-cyan-500/10" aria-label="Main navigation">
        <span className="font-display text-2xl tracking-widest text-white" aria-label="Aku">ΛKU</span>
        <Link
          href="/quiz"
          className="font-condensed font-semibold text-sm uppercase tracking-widest px-5 py-2 border border-cyan-400/40 text-cyan-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-400/10 transition-all duration-200 rounded-sm"
        >
          Take the Quiz
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20" aria-label="Welcome to the Akuverse">

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

        {/* Floating NFT previews — desktop only */}
        <div className="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-8 -translate-y-1/2 opacity-70 animate-in" style={{animationDelay: '500ms'}}>
            <div style={{border: '1px solid rgba(0,212,255,0.35)', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 0 24px rgba(0,212,255,0.15)', width: 110, height: 110}}>
              <Image src={homepageGallery[0].image} alt={`Akutar #${homepageGallery[0].tokenId}`} width={110} height={110} style={{objectFit: 'cover'}} placeholder="blur" blurDataURL={NFT_BLUR_DATA_URL} sizes="110px" />
            </div>
            <p style={{textAlign: 'center', color: 'rgba(0,212,255,0.6)', fontSize: '10px', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.15em', marginTop: '6px'}}>#{homepageGallery[0].tokenId}</p>
          </div>
          <div className="absolute top-1/4 right-8 opacity-70 animate-in" style={{animationDelay: '600ms'}}>
            <div style={{border: '1px solid rgba(0,212,255,0.35)', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 0 24px rgba(0,212,255,0.15)', width: 110, height: 110}}>
              <Image src={homepageGallery[1].image} alt={`Akutar #${homepageGallery[1].tokenId}`} width={110} height={110} style={{objectFit: 'cover'}} placeholder="blur" blurDataURL={NFT_BLUR_DATA_URL} sizes="110px" />
            </div>
            <p style={{textAlign: 'center', color: 'rgba(0,212,255,0.6)', fontSize: '10px', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.15em', marginTop: '6px'}}>#{homepageGallery[1].tokenId}</p>
          </div>
          <div className="absolute bottom-1/3 left-16 opacity-50 animate-in" style={{animationDelay: '700ms'}}>
            <div style={{border: '1px solid rgba(124,58,237,0.4)', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 0 20px rgba(124,58,237,0.15)', width: 80, height: 80}}>
              <Image src={homepageGallery[2].image} alt={`Akutar #${homepageGallery[2].tokenId}`} width={80} height={80} style={{objectFit: 'cover'}} placeholder="blur" blurDataURL={NFT_BLUR_DATA_URL} sizes="80px" />
            </div>
          </div>
          <div className="absolute bottom-1/4 right-16 opacity-50 animate-in" style={{animationDelay: '800ms'}}>
            <div style={{border: '1px solid rgba(124,58,237,0.4)', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 0 20px rgba(124,58,237,0.15)', width: 80, height: 80}}>
              <Image src={homepageGallery[3].image} alt={`Akutar #${homepageGallery[3].tokenId}`} width={80} height={80} style={{objectFit: 'cover'}} placeholder="blur" blurDataURL={NFT_BLUR_DATA_URL} sizes="80px" />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyan-400" />
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-14 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass border border-cyan-500/20 border-glow-cyan rounded-sm p-6 sm:p-10 text-center">
            <p className="font-condensed text-lg sm:text-xl text-slate-200 leading-relaxed">
              Aku represents every child who's ever wondered if space is for them.
              Through storytelling, art, and community, we're proving that{' '}
              <span className="text-cyan-300 font-semibold">the stars belong to everyone</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-10 sm:mb-14">
            <p className="font-condensed text-sm uppercase tracking-[0.4em] text-cyan-400 mb-2">The Universe</p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white">THREE PILLARS</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">

            {/* Story */}
            <div className="glass border border-white/10 rounded-sm p-6 sm:p-8 group hover:border-cyan-400/40 hover-glow transition-all duration-300">
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
            <div className="glass border border-white/10 rounded-sm p-6 sm:p-8 group hover:border-cyan-400/40 hover-glow transition-all duration-300">
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
            <div className="glass border border-white/10 rounded-sm p-6 sm:p-8 group hover:border-cyan-400/40 hover-glow transition-all duration-300">
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
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-dark border border-cyan-400/20 border-glow-cyan rounded-sm p-8 sm:p-12 md:p-14 text-center overflow-hidden">
            {/* BG glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full bg-cyan-500/8 blur-[80px]" />
            </div>
            <p className="font-condensed text-sm uppercase tracking-[0.4em] text-cyan-400 mb-4">Discover Your Akutar</p>
            <h2 className="font-display text-[clamp(2.8rem,10vw,8rem)] leading-none text-white text-glow-cyan mb-5 sm:mb-6">
              WHO ARE YOU<br />IN THE AKUVERSE?
            </h2>
            <p className="font-condensed text-lg sm:text-xl text-slate-300 mb-8 sm:mb-10 max-w-xl mx-auto">
              12 questions. Real astronaut insights. One Akutar that matches your spirit.
            </p>
            <Link
              href="/quiz"
              className="inline-block font-condensed font-bold text-base sm:text-xl uppercase tracking-widest px-8 sm:px-14 py-4 sm:py-5 bg-cyan-400/15 border border-cyan-400/70 text-cyan-300 hover:bg-cyan-400/25 hover:border-cyan-400 hover:text-white transition-all duration-300 rounded-sm border-glow-cyan"
            >
              Begin Your Mission ✦
            </Link>
          </div>
        </div>
      </section>

      {/* NFT Gallery */}
      <section className="py-14 sm:py-20 px-4 border-t border-white/5" aria-label="Akutar NFT collection gallery">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-2">The Collection</p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white mb-3 sm:mb-4">14,833 AKUTARS</h2>
            <p className="font-condensed text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Every Akutar is unique. Every one has a story. Take the quiz to discover which one matches your spirit.
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3 mb-8 sm:mb-10">
            {homepageGallery.map((nft) => (
              <a
                key={nft.tokenId}
                href={nft.openseaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden"
                style={{borderRadius: '4px', border: '1px solid rgba(255,255,255,0.12)'}}
              >
                <Image
                  src={nft.image}
                  alt={`Akutar #${nft.tokenId}`}
                  width={180}
                  height={180}
                  sizes="(max-width: 640px) 25vw, (max-width: 768px) 16.67vw, 12.5vw"
                  placeholder="blur"
                  blurDataURL={NFT_BLUR_DATA_URL}
                  style={{objectFit: 'cover', width: '100%', height: 'auto', display: 'block', transition: 'transform 0.3s'}}
                  className="group-hover:scale-110"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background: 'rgba(0,212,255,0.15)', borderBottom: '2px solid rgba(0,212,255,0.7)'}}>
                  <div className="absolute bottom-0 left-0 right-0 p-1.5">
                    <p style={{fontFamily: '"Barlow Condensed", sans-serif', fontSize: '10px', color: '#00d4ff', letterSpacing: '0.1em', textAlign: 'center'}}>#{nft.tokenId}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://opensea.io/collection/akutars"
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed font-semibold text-sm uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
            >
              View All 14,833 on OpenSea →
            </a>
          </div>
        </div>
      </section>

      {/* Impact & Giving */}
      <section className="py-14 sm:py-20 px-4 border-t border-white/5" aria-label="Impact and charitable giving">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-10 sm:mb-14">
            <p className="font-condensed text-sm uppercase tracking-[0.4em] text-amber-400 mb-2">Beyond the Art</p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white mb-4">IMPACT & GIVING</h2>
            <p className="font-condensed text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Aku was never just an NFT. From space missions to scholarships, Micah has used the Akuverse to change lives.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">

            {/* 1 — Art to Space */}
            <div className="glass border border-white/10 rounded-sm p-6 sm:p-8 group hover:border-amber-400/30 transition-all duration-300 hover-glow-gold">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)'}}>
                  🛸
                </div>
                <div>
                  <p className="font-condensed text-xs uppercase tracking-[0.3em] text-amber-400 mb-1">Historic First</p>
                  <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">FIRST NFT IN SPACE</h3>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-400/30 to-transparent mb-5" />
              <p className="font-condensed text-slate-300 leading-relaxed mb-5 text-sm sm:text-base">
                Aku&apos;s digital file was beamed to the International Space Station, orbiting 125,000+ miles above Earth — making it the first NFT artwork ever to travel to space. The auction proceeds went directly to{' '}
                <span className="text-amber-300 font-semibold">Students for the Exploration and Development of Space (SEDS)</span>, a 501(c)(3) nonprofit empowering the next generation of space explorers.
              </p>
              <a
                href="https://spacenews.com/the-race-to-fund-space-students-for-the-exploration-and-development-of-space-to-receive-proceeds-from-micah-johnsonaeurs-aku-nft-auction-on-notables/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-condensed font-semibold text-xs uppercase tracking-widest text-amber-400 hover:text-white transition-colors"
              >
                Read the Story →
              </a>
            </div>

            {/* 2 — Black Ambition */}
            <div className="glass border border-white/10 rounded-sm p-6 sm:p-8 group hover:border-amber-400/30 transition-all duration-300 hover-glow-gold">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)'}}>
                  💡
                </div>
                <div>
                  <p className="font-condensed text-xs uppercase tracking-[0.3em] text-amber-400 mb-1">Entrepreneurship</p>
                  <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">BLACK AMBITION × AKU</h3>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-400/30 to-transparent mb-5" />
              <p className="font-condensed text-slate-300 leading-relaxed mb-5 text-sm sm:text-base">
                Aku partnered with Pharrell Williams&apos; <span className="text-amber-300 font-semibold">Black Ambition</span> and Billionaire Boys Club to award{' '}
                <span className="text-amber-300 font-semibold">$250,000 in prize money</span> to Black and Latinx entrepreneurs through the HBCU Prize competition — funding early-stage companies across tech, healthcare, media, and Web3.
              </p>
              <a
                href="https://blackambitionprize.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-condensed font-semibold text-xs uppercase tracking-widest text-amber-400 hover:text-white transition-colors"
              >
                Black Ambition Prize →
              </a>
            </div>

            {/* 3 — Blessings in a Backpack */}
            <div className="glass border border-white/10 rounded-sm p-6 sm:p-8 group hover:border-amber-400/30 transition-all duration-300 hover-glow-gold">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)'}}>
                  🎒
                </div>
                <div>
                  <p className="font-condensed text-xs uppercase tracking-[0.3em] text-amber-400 mb-1">Food Insecurity</p>
                  <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">BLESSINGS IN A BACKPACK</h3>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-400/30 to-transparent mb-5" />
              <p className="font-condensed text-slate-300 leading-relaxed mb-5 text-sm sm:text-base">
                Through the <span className="text-amber-300 font-semibold">Starbucks Odyssey</span> Web3 partnership, Aku connected its community to Blessings in a Backpack — a nonprofit providing weekend meals to food-insecure children across America who rely on school lunch as their primary source of nutrition.
              </p>
              <a
                href="https://blessingsinabackpack.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-condensed font-semibold text-xs uppercase tracking-widest text-amber-400 hover:text-white transition-colors"
              >
                Learn More →
              </a>
            </div>

            {/* 4 — I Promise School */}
            <div className="glass border border-white/10 rounded-sm p-6 sm:p-8 group hover:border-amber-400/30 transition-all duration-300 hover-glow-gold">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)'}}>
                  ⭐
                </div>
                <div>
                  <p className="font-condensed text-xs uppercase tracking-[0.3em] text-amber-400 mb-1">Education</p>
                  <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">I PROMISE SCHOOL</h3>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-400/30 to-transparent mb-5" />
              <p className="font-condensed text-slate-300 leading-relaxed mb-5 text-sm sm:text-base">
                Micah visited <span className="text-amber-300 font-semibold">LeBron James&apos;s I Promise School</span> in Akron, Ohio to speak directly with at-risk third and fourth-grade students about dreaming without limits — sharing his journey from MLB player to digital artist and the story behind Aku.
              </p>
              <a
                href="https://ipromise.school"
                target="_blank"
                rel="noopener noreferrer"
                className="font-condensed font-semibold text-xs uppercase tracking-widest text-amber-400 hover:text-white transition-colors"
              >
                I Promise School →
              </a>
            </div>

          </div>

          {/* Pull quote */}
          <div
            className="rounded-sm p-6 sm:p-8 text-center"
            style={{background: 'linear-gradient(135deg, rgba(251,191,36,0.05), rgba(0,212,255,0.05))', border: '1px solid rgba(251,191,36,0.2)'}}
          >
            <p className="font-condensed italic text-lg sm:text-2xl text-amber-300 mb-3">
              &ldquo;Representation changes who gets to dream.&rdquo;
            </p>
            <p className="font-condensed text-xs uppercase tracking-[0.3em] text-slate-500">— Micah Johnson, Creator of Aku</p>
          </div>

        </div>
      </section>

      {/* About Micah */}
      <section className="py-14 sm:py-20 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-4">The Creator</p>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-6">MICAH JOHNSON</h2>
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
      <footer className="border-t border-white/5 py-8 sm:py-10 px-4 pb-safe">
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
