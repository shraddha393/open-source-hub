import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Route } from '@/routes/index';

const Index = Route.options.component as React.ComponentType;

const MEMBERS = [
  {
    name: 'Ayush Lahiri',
    role: 'Lead',
    url: 'https://www.linkedin.com/in/ayush-lahiri?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    name: 'Sahil Sujit Singh',
    role: 'Mentor',
    url: 'https://www.linkedin.com/in/sahilssingh04?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
];

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

describe('Team LinkedIn profiles', () => {
  it('opens each confirmed member’s exact LinkedIn profile in a new tab', () => {
    stubObservers();
    render(<Index />);

    for (const member of MEMBERS) {
      const link = screen.getByRole('link', {
        name: `View ${member.name}'s LinkedIn profile`,
      });
      expect(link.getAttribute('href')).toBe(member.url);
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    }
  });

  it('shows the confirmed members first, in order, and keeps two placeholders', () => {
    stubObservers();
    const { container } = render(<Index />);
    const team = container.querySelector('#team');
    expect(team).not.toBeNull();

    const names = Array.from(team!.querySelectorAll('h3')).map(heading => heading.textContent);
    expect(names).toEqual(['Ayush Lahiri', 'Sahil Sujit Singh', 'Member 03', 'Member 04']);

    const roles = Array.from(team!.querySelectorAll('p')).map(paragraph => paragraph.textContent);
    expect(roles).toContain('Lead');
    expect(roles).toContain('Mentor');
  });

  it('does not open the pending-link dialog for a confirmed profile', () => {
    stubObservers();
    render(<Index />);

    const link = screen.getByRole('link', { name: "View Ayush Lahiri's LinkedIn profile" });
    expect(link.closest('button')).toBeNull();
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
