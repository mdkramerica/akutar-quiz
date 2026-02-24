'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { questions, calculateArchetype } from '@/lib/questions';
import { trackQuizAbandonment } from '@/lib/analytics';
import Link from 'next/link';
import Image from 'next/image';
import { quizCompanions, NFT_BLUR_DATA_URL } from '@/lib/akutars';

const interstitialQuotes = [
  {
    quote: "Never be limited by other people's limited imaginations.",
    author: "Mae C. Jemison",
    title: "First Black Woman in Space",
  },
  {
    quote: "Mystery creates wonder, and wonder is the basis of humanity's desire to understand.",
    author: "Neil Armstrong",
    title: "First Human on the Moon",
  },
  {
    quote: "The universe is under no obligation to make sense to you.",
    author: "Neil deGrasse Tyson",
    title: "Astrophysicist & Science Communicator",
  },
  {
    quote: "You can't be what you can't see.",
    author: "Marian Wright Edelman",
    title: "Children's Rights Advocate",
  },
  {
    quote: "Decide in your heart what really excites and challenges you, and start moving your life in that direction.",
    author: "Chris Hadfield",
    title: "Astronaut, Commander of the ISS",
  },
  {
    quote: "Representation changes who gets to dream.",
    author: "Micah Johnson",
    title: "Creator of Aku",
  },
  {
    quote: "Every kid has the right to dream without limits. That starts with seeing themselves in the stars.",
    author: "Guion Bluford",
    title: "First Black American in Space",
  },
  {
    quote: "The important achievement of Apollo was demonstrating that humanity is not forever chained to this planet.",
    author: "Neil Armstrong",
    title: "Apollo 11 Mission Commander",
  },
  {
    quote: "Somewhere, something incredible is waiting to be known.",
    author: "Sharon Begley",
    title: "Science Journalist",
  },
  {
    quote: "We are all astronauts on a little spaceship called Earth.",
    author: "Buckminster Fuller",
    title: "Futurist & Inventor",
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[][]>(Array(questions.length).fill([]));
  const [showInsight, setShowInsight] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState('');
  const [started, setStarted] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [interstitialQuote, setInterstitialQuote] = useState(interstitialQuotes[0]);
  const pendingAnswers = useRef<number[][] | null>(null);

  // Pre-select a random quote on mount so it doesn't change mid-display
  useEffect(() => {
    const idx = Math.floor(Math.random() * interstitialQuotes.length);
    setInterstitialQuote(interstitialQuotes[idx]);
  }, []);

  // Track quiz abandonment when user leaves mid-quiz
  useEffect(() => {
    if (!started) return;
    const handleBeforeUnload = () => {
      if (currentQuestion < questions.length - 1) {
        trackQuizAbandonment(currentQuestion + 1, questions.length);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [started, currentQuestion]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = [answerIndex];
    setAnswers(newAnswers);

    const selectedAnswer = questions[currentQuestion].answers[answerIndex];

    // After Q1 (index 0), show the rotating quote interstitial
    if (currentQuestion === 0) {
      pendingAnswers.current = newAnswers;
      if (selectedAnswer.insight) {
        setSelectedInsight(selectedAnswer.insight);
        setShowInsight(true);
        setTimeout(() => {
          setShowInsight(false);
          setShowInterstitial(true);
          setTimeout(() => {
            setShowInterstitial(false);
            moveToNext(newAnswers);
          }, 4500);
        }, 3200);
      } else {
        setShowInterstitial(true);
        setTimeout(() => {
          setShowInterstitial(false);
          moveToNext(newAnswers);
        }, 4500);
      }
      return;
    }

    if (selectedAnswer.insight) {
      setSelectedInsight(selectedAnswer.insight);
      setShowInsight(true);
      setTimeout(() => {
        setShowInsight(false);
        moveToNext(newAnswers);
      }, 3200);
    } else {
      moveToNext(newAnswers);
    }
  };

  const moveToNext = (currentAnswers: number[][]) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const archetype = calculateArchetype(currentAnswers);
      router.push(`/results/${archetype}`);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Intro screen
  if (!started) {
    return (
      <main id="main-content" className="min-h-screen bg-akuverse flex items-center justify-center p-4 pb-safe">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/6 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-purple-900/15 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-2xl w-full text-center animate-in-zoom">

          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-4">
            Akutar Mission Briefing
          </p>

          <h1 className="font-display text-[clamp(3rem,12vw,7rem)] leading-none text-white text-glow-cyan mb-5 sm:mb-6">
            DISCOVER<br />YOUR AKUTAR
          </h1>

          <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{boxShadow: '0 0 8px #00d4ff'}} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>

          <p className="font-condensed text-lg sm:text-xl text-slate-300 mb-2">
            Just like Aku, every astronaut has a unique journey.
          </p>
          <p className="font-condensed text-base sm:text-lg text-slate-400 mb-8 sm:mb-10">
            Answer 12 questions to reveal your Akutar archetype.
          </p>

          <div className="rounded-sm p-5 sm:p-8 mb-8 sm:mb-10 text-left" style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)'}}>
            <p className="font-condensed text-xs uppercase tracking-widest text-cyan-400 mb-4 sm:mb-5">Mission Parameters</p>
            <ul className="space-y-3 sm:space-y-4">
              {[
                'Your space personality & mission style',
                'Real astronaut stories that match your archetype',
                'The Akutar that shares your spirit',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-display text-cyan-400 text-lg leading-none mt-0.5 flex-shrink-0">✦</span>
                  <span className="font-condensed text-white text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="font-condensed font-bold text-lg sm:text-xl uppercase tracking-widest px-10 sm:px-14 py-4 sm:py-5 transition-all duration-200 rounded-sm w-full sm:w-auto"
            style={{background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.7)', color: '#e0f8ff', boxShadow: '0 0 20px rgba(0,212,255,0.2)'}}
          >
            Begin Mission ✦
          </button>

          <div className="mt-6">
            <Link href="/" className="font-condensed text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              ← Back to Akuverse
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];

  return (
    <main id="main-content" className="min-h-screen bg-akuverse p-4 overflow-x-hidden" aria-label="Akutar personality quiz">

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto pt-6 sm:pt-10 pb-24 sm:pb-16">

        {/* Top nav */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <Link href="/" className="font-display text-xl tracking-widest text-white/70 hover:text-white transition-colors">
            ΛKU
          </Link>
          <p className="font-condensed text-xs uppercase tracking-widest text-slate-300">
            {currentQuestion + 1} / {questions.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8 sm:mb-10">
          <div className="w-full h-px bg-white/10 relative overflow-hidden rounded-full" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label={`Quiz progress: question ${currentQuestion + 1} of ${questions.length}`}>
            <div
              className="absolute left-0 top-0 h-full bg-cyan-400 transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 8px rgba(0, 212, 255, 0.8)',
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-condensed text-xs text-slate-400 uppercase tracking-wider">{Math.round(progress)}% Complete</span>
            <span className="font-condensed text-xs text-slate-400 uppercase tracking-wider">{questions.length - currentQuestion - 1} left</span>
          </div>
        </div>

        {/* Category badge */}
        <p style={{
          fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif',
          fontSize: '11px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#00d4ff',
          marginBottom: '14px',
        }}>
          {question.category}
        </p>

        {/* Question */}
        <h2 style={{
          fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          lineHeight: '1.1',
          color: '#ffffff',
          marginBottom: '36px',
          letterSpacing: '0.03em',
        }}>
          {question.text}
        </h2>

        {/* Floating Akutar companion */}
        <div className="hidden md:block" style={{position: 'fixed', bottom: '28px', right: '28px', zIndex: 20}}>
          <div style={{border: '1px solid rgba(0,212,255,0.4)', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 0 24px rgba(0,212,255,0.2)', width: 90, height: 90}}>
            <Image
              src={quizCompanions[currentQuestion % quizCompanions.length].image}
              alt="Akutar companion"
              width={90}
              height={90}
              sizes="90px"
              placeholder="blur"
              blurDataURL={NFT_BLUR_DATA_URL}
              style={{objectFit: 'cover', display: 'block'}}
            />
          </div>
          <p style={{textAlign: 'center', color: 'rgba(0,212,255,0.5)', fontSize: '9px', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.12em', marginTop: '5px', textTransform: 'uppercase'}}>
            #{quizCompanions[currentQuestion % quizCompanions.length].tokenId}
          </p>
        </div>

        {/* Answers */}
        <div className="flex flex-col gap-2 sm:gap-[10px]" role="group" aria-label="Answer options">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              aria-label={`Option ${String.fromCharCode(65 + index)}: ${answer.text}`}
              className="w-full text-left transition-all duration-150 active:scale-[0.99]"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.30)',
                borderRadius: '3px',
                padding: '14px 16px',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(0, 212, 255, 0.15)';
                el.style.border = '1px solid rgba(0, 212, 255, 0.8)';
                el.style.boxShadow = '0 0 22px rgba(0,212,255,0.2), inset 0 0 16px rgba(0,212,255,0.05)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(255,255,255,0.08)';
                el.style.border = '1px solid rgba(255,255,255,0.30)';
                el.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-center gap-3 sm:gap-[18px]">
                <span style={{
                  fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                  fontSize: '18px',
                  color: '#00d4ff',
                  lineHeight: '1',
                  flexShrink: 0,
                  letterSpacing: '0.08em',
                  width: '20px',
                  textAlign: 'center',
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                <div style={{
                  width: '1px',
                  height: '24px',
                  background: 'rgba(0, 212, 255, 0.25)',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif',
                  fontSize: 'clamp(15px, 4vw, 19px)',
                  color: '#ffffff',
                  lineHeight: '1.3',
                  fontWeight: 400,
                }}>
                  {answer.text}
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Between-Q1-and-Q2 Quote Interstitial */}
      {showInterstitial && (
        <div className="fixed inset-0 flex items-center justify-center p-4 pb-safe z-50" role="dialog" aria-label="Inspirational quote" style={{background: 'rgba(4,8,18,0.97)', backdropFilter: 'blur(20px)'}}>
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/6 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-900/12 blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-2xl w-full text-center animate-in-zoom">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full" style={{background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)'}}>
              <span style={{width: 5, height: 5, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff', display: 'inline-block'}} />
              <span className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400">Transmission from the Akuverse</span>
            </div>

            {/* Large decorative quote mark */}
            <div className="font-display text-[8rem] leading-none text-cyan-400/10 select-none mb-[-2rem]">&ldquo;</div>

            {/* The quote */}
            <p className="font-condensed italic text-xl sm:text-2xl md:text-3xl text-white leading-relaxed mb-8 px-2" style={{textShadow: '0 0 40px rgba(0,212,255,0.2)'}}>
              {interstitialQuote.quote}
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/40" />
              <div className="w-1 h-1 rounded-full bg-cyan-400/60" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/40" />
            </div>

            {/* Attribution */}
            <p className="font-display text-lg sm:text-xl text-white tracking-wider mb-1">
              {interstitialQuote.author.toUpperCase()}
            </p>
            <p className="font-condensed text-xs uppercase tracking-[0.3em] text-cyan-400/70">
              {interstitialQuote.title}
            </p>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <span className="font-condensed text-xs uppercase tracking-widest text-slate-600">Continuing mission</span>
              <span className="inline-flex gap-1">
                {[0,1,2].map(i => (
                  <span key={i} className="w-1 h-1 rounded-full bg-cyan-400/40" style={{animation: `pulse 1.2s ease-in-out ${i * 0.3}s infinite`}} />
                ))}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Insight Popup */}
      {showInsight && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 pb-safe z-50 animate-in" role="dialog" aria-label="Astronaut insight">
          <div className="rounded-sm max-w-xl w-full p-6 sm:p-10" style={{background: 'rgba(4,10,22,0.97)', border: '1px solid rgba(0,212,255,0.55)', boxShadow: '0 0 40px rgba(0,212,255,0.25)'}}>
            <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-3 sm:mb-4">
              Astronaut Insight
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-4 sm:mb-6">DID YOU KNOW?</h3>
            <div className="h-px bg-gradient-to-r from-cyan-400/60 to-transparent mb-4 sm:mb-6" />
            <p className="font-condensed text-base sm:text-lg text-white leading-relaxed">
              {selectedInsight}
            </p>
            <p className="font-condensed text-xs text-slate-400 mt-5 sm:mt-6 uppercase tracking-widest">
              Continuing in a moment...
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
