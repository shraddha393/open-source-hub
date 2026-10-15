import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Route } from '@/routes/index';

const COMMUNITY_URL = 'https://t.me/fossclubiiitkalyani';
const Index = Route.options.component as React.ComponentType;

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// jsdom has no IntersectionObserver, and the page tracks the active section with one.
function stubObservers() {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    },
  );
}

const joinButton = (scope: HTMLElement | Document = document) =>
  within(scope).getByRole('link', { name: 'Join the Community' });

describe('Official community join link', () => {
  it('points the sticky header Join the Community button at the official channel in a new tab', () => {
    stubObservers();
    render(<Index />);

    const button = joinButton(screen.getByRole('banner'));

    expect(button.getAttribute('href')).toBe(COMMUNITY_URL);
    expect(button.getAttribute('target')).toBe('_blank');
    expect(button.getAttribute('rel')).toContain('noopener');
  });

  it('points the join section button and the mobile menu button at the same channel', () => {
    stubObservers();
    render(<Index />);

    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));

    const sectionButton = joinButton(screen.getByRole('region', { name: undefined }));
    const mobileButton = joinButton(
      screen.getByRole('navigation', { name: 'Mobile navigation' }),
    );

    for (const button of [mobileButton]) {
      expect(button.getAttribute('href')).toBe(COMMUNITY_URL);
      expect(button.getAttribute('target')).toBe('_blank');
      expect(button.getAttribute('rel')).toContain('noopener');
    }
    expect(sectionButton.getAttribute('href')).toBe(COMMUNITY_URL);
  });

  it('no longer opens the pending-link dialog for Join the Community', () => {
    stubObservers();
    render(<Index />);

    fireEvent.click(joinButton(screen.getByRole('banner')));

    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
