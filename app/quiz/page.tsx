'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions, calculateArchetype } from '@/lib/questions';
import Link from 'next/link';
import Image from 'next/image';
import { quizCompanions } from '@/lib/akutars';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[][]>(Array(questions.length).fill([]));
  const [showInsight, setShowInsight] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState('');
  const [started, setStarted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = [answerIndex];
    setAnswers(newAnswers);

    const selectedAnswer = questions[currentQuestion].answers[answerIndex];
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
      <main className="min-h-screen bg-akuverse flex items-center justify-center p-4">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/6 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-purple-900/15 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-2xl w-full text-center animate-in-zoom">

          <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-4">
            Akutar Mission Briefing
          </p>

          <h1 className="font-display text-[clamp(3.5rem,12vw,7rem)] leading-none text-white text-glow-cyan mb-6">
            DISCOVER<br />YOUR AKUTAR
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{boxShadow: '0 0 8px #00d4ff'}} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>

          <p className="font-condensed text-xl text-slate-300 mb-2">
            Just like Aku, every astronaut has a unique journey.
          </p>
          <p className="font-condensed text-lg text-slate-400 mb-10">
            Answer 12 questions to reveal your Akutar archetype.
          </p>

          <div className="rounded-sm p-8 mb-10 text-left" style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)'}}>
            <p className="font-condensed text-xs uppercase tracking-widest text-cyan-400 mb-5">Mission Parameters</p>
            <ul className="space-y-4">
              {[
                'Your space personality & mission style',
                'Real astronaut stories that match your archetype',
                'The Akutar that shares your spirit',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-display text-cyan-400 text-lg leading-none mt-0.5">✦</span>
                  <span className="font-condensed text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="font-condensed font-bold text-xl uppercase tracking-widest px-14 py-5 transition-all duration-200 rounded-sm w-full sm:w-auto"
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
    <main className="min-h-screen bg-akuverse p-4">

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto pt-10 pb-16">

        {/* Top nav */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="font-display text-xl tracking-widest text-white/70 hover:text-white transition-colors">
            ΛKU
          </Link>
          <p className="font-condensed text-xs uppercase tracking-widest text-slate-300">
            Question {currentQuestion + 1} / {questions.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="w-full h-px bg-white/10 relative overflow-hidden rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-cyan-400 transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 8px rgba(0, 212, 255, 0.8)',
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-condensed text-xs text-slate-400 uppercase tracking-widest">{Math.round(progress)}% Complete</span>
            <span className="font-condensed text-xs text-slate-400 uppercase tracking-widest">{questions.length - currentQuestion - 1} remaining</span>
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
              style={{objectFit: 'cover', display: 'block'}}
            />
          </div>
          <p style={{textAlign: 'center', color: 'rgba(0,212,255,0.5)', fontSize: '9px', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.12em', marginTop: '5px', textTransform: 'uppercase'}}>
            #{quizCompanions[currentQuestion % quizCompanions.length].tokenId}
          </p>
        </div>

        {/* Answers */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.30)',
                borderRadius: '3px',
                padding: '18px 22px',
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
              <div style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
                <span style={{
                  fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
                  fontSize: '20px',
                  color: '#00d4ff',
                  lineHeight: '1',
                  flexShrink: 0,
                  letterSpacing: '0.08em',
                  width: '24px',
                  textAlign: 'center',
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                <div style={{
                  width: '1px',
                  height: '28px',
                  background: 'rgba(0, 212, 255, 0.25)',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif',
                  fontSize: '19px',
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

      {/* Insight Popup */}
      {showInsight && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in">
          <div className="rounded-sm max-w-xl w-full p-10" style={{background: 'rgba(4,10,22,0.97)', border: '1px solid rgba(0,212,255,0.55)', boxShadow: '0 0 40px rgba(0,212,255,0.25)'}}>
            <p className="font-condensed text-xs uppercase tracking-[0.4em] text-cyan-400 mb-4">
              Astronaut Insight
            </p>
            <h3 className="font-display text-3xl text-white mb-6">DID YOU KNOW?</h3>
            <div className="h-px bg-gradient-to-r from-cyan-400/60 to-transparent mb-6" />
            <p className="font-condensed text-lg text-white leading-relaxed">
              {selectedInsight}
            </p>
            <p className="font-condensed text-xs text-slate-400 mt-6 uppercase tracking-widest">
              Continuing in a moment...
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
