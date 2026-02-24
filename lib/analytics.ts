// Client-side analytics utilities

/**
 * Track quiz abandonment - called when user navigates away during quiz
 */
export function trackQuizAbandonment(questionNumber: number, totalQuestions: number) {
  if (typeof window === 'undefined') return;

  try {
    // Use sendBeacon for reliable delivery on page unload
    const data = JSON.stringify({
      event: 'quiz_abandonment',
      questionNumber,
      totalQuestions,
      completionPercentage: Math.round((questionNumber / totalQuestions) * 100),
      timestamp: new Date().toISOString(),
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', data);
    }
  } catch {
    // Silent fail - analytics should never break the app
  }
}

/**
 * Track quiz start
 */
export function trackQuizStart() {
  if (typeof window === 'undefined') return;

  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'quiz_start' }),
    }).catch(() => {});
  } catch {
    // Silent fail
  }
}

/**
 * Report Web Vitals metrics
 */
export function reportWebVitals(metric: {
  name: string;
  value: number;
  id: string;
}) {
  if (typeof window === 'undefined') return;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}: ${metric.value}`);
  }
}
