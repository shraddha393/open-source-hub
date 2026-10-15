import { useEffect, useRef, type ReactNode } from 'react';

export function RevealPage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Reveal text independently inside existing cards and footer groups without
    // adding wrappers that could affect their layout or hover transforms.
    element.querySelectorAll('.feature-card h3, .feature-card p, .feature-card button, .tech-tag, footer h2, footer p, footer nav, footer button, .principle-strip-inner > span').forEach(node => {
      node.setAttribute('data-reveal', '');
      if (node.matches('.tech-tag')) {
        const siblings = Array.from(node.parentElement?.children ?? []);
        node.setAttribute('data-delay', String(siblings.indexOf(node) + 1));
      }
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    element.classList.add('reveal-ready');
    element.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node));
    return () => {
      observer.disconnect();
      element.classList.remove('reveal-ready');
    };
  }, []);
  return <div ref={root} className="page-shell">{children}</div>;
}
