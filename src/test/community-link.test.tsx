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

function expectOfficialChannel(button: HTMLElement) {
  expect(button.getAttribute('href')).toBe(COMMUNITY_URL);
  expect(button.getAttribute('target')).toBe('_blank');
  expect(button.getAttribute('rel')).toContain('noopener');
}

const joinButtonIn = (scope: HTMLElement) =>
  within(scope).getByRole('link', { name: 'Join the Community' });

describe('Official community join link', () => {
  it('points every Join the Community button at the official channel in a new tab', () => {
    stubObservers();
    render(<Index />);

    const buttons = screen.getAllByRole('link', { name: 'Join the Community' });
    expect(buttons.length).toBeGreaterThanOrEqual(2); // sticky header + join section

    for (const button of buttons) expectOfficialChannel(button);
  });

  it('points the mobile menu Join the Community button at the official channel', () => {
    stubObservers();
    render(<Index />);

    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    const mobileButton = joinButtonIn(
      screen.getByRole('navigation', { name: 'Mobile navigation' }),
    );

    expectOfficialChannel(mobileButton);
  });

  it('no longer opens the pending-link dialog for Join the Community', () => {
    stubObservers();
    render(<Index />);

    fireEvent.click(joinButtonIn(screen.getByRole('banner')));

    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
