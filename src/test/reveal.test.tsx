import { act, cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RevealPage } from '@/components/community/reveal';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('Once-only accessible scroll reveals', () => {
  it('reveals intersecting content once and stops observing it', () => {
    let notify: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    const observer = { observe, unobserve, disconnect };
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    });
    const { container } = render(<RevealPage><p data-reveal>Community</p></RevealPage>);
    const text = container.querySelector('p');
    if (!text || !notify) throw new Error('Reveal was not registered');
    expect(observe).toHaveBeenCalledWith(text);
    const entry: IntersectionObserverEntry = {
      target: text, isIntersecting: true, intersectionRatio: 1,
      boundingClientRect: text.getBoundingClientRect(),
      intersectionRect: text.getBoundingClientRect(), rootBounds: null, time: 0,
    };
    act(() => notify?.([entry], observer as unknown as IntersectionObserver));
    expect(text).toHaveClass('is-visible');
    expect(unobserve).toHaveBeenCalledWith(text);
  });

  it('keeps content visible without animation for reduced motion', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
    const { container } = render(<RevealPage><p data-reveal>Community</p></RevealPage>);
    expect(container.firstElementChild).not.toHaveClass('reveal-ready');
  });

  it('keeps content visible when IntersectionObserver is unavailable', () => {
    const original = window.IntersectionObserver;
    Reflect.deleteProperty(window, 'IntersectionObserver');
    const { container } = render(<RevealPage><p data-reveal>Community</p></RevealPage>);
    expect(container.firstElementChild).not.toHaveClass('reveal-ready');
    if (original) window.IntersectionObserver = original;
  });
});