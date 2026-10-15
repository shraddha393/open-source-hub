import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Braces, Check, Code2, Coffee, ExternalLink, GitBranch, GitFork, Github, Globe2, Heart, Instagram, Linkedin, Mail, Menu, Terminal, Users, UserRound, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { RevealPage } from '@/components/community/reveal';
import { ProjectArt } from '@/components/community/project-art';
import officialLogo from '@/assets/foss-iiit-kalyani-logo.png.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'FOSS IIIT Kalyani — Build Together. Open Everything.' },
    { name: 'description', content: 'Discover open source at IIIT Kalyani. A welcoming community to learn together, build in public, and turn ideas into open-source contributions.' },
    { property: 'og:title', content: 'FOSS IIIT Kalyani — Build Together. Open Everything.' },
    { property: 'og:description', content: 'Your journey into open source starts here. Learn, build, and collaborate with FOSS IIIT Kalyani.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const navigation = ['Home', 'About', 'Activities', 'Projects', 'Team', 'Contact'];
const communityUrl = 'https://t.me/fossclubiiitkalyani';
const values = [
  { icon: BookOpen, title: 'Learn Together', description: 'From your first terminal command to your first pull request. Ask questions, share what you know, and learn at your own pace.' },
  { icon: GitBranch, title: 'Build in Public', description: 'Ideas get better when they’re shared. Write code transparently, exchange feedback, and create things anyone can use.' },
  { icon: Users, title: 'Grow as a Community', description: 'Find your people, not just your next project. Connect with curious minds and celebrate every small contribution.' },
];
const activities = [
  { icon: Terminal, title: 'Hands-on Workshops', description: 'Get your hands on new tools and technologies. Less watching, more doing.', type: 'EXPERIMENT & LEARN' },
  { icon: GitBranch, title: 'Git & GitHub Sessions', description: 'Branches, commits, and pull requests. Get comfortable with the tools of collaboration.', type: 'START WITH THE BASICS' },
  { icon: Zap, title: 'Hackathons', description: 'Turn a spark of an idea into something real with a team of fellow builders.', type: 'IDEATE. CODE. SHIP.' },
  { icon: GitFork, title: 'Contribution Drives', description: 'Find your first issue, explore a codebase, and make a meaningful contribution.', type: 'MAKE YOUR FIRST PR' },
  { icon: Code2, title: 'Project-building Sessions', description: 'Build useful things together, from a weekend experiment to a community tool.', type: 'BUILD SOMETHING REAL' },
  { icon: Coffee, title: 'Peer Learning', description: 'Share a discovery, untangle a bug, or learn something new over a conversation.', type: 'KNOWLEDGE GOES BOTH WAYS' },
];
const projects = [
  { title: 'Campus CLI', description: 'A terminal-first toolkit concept for keeping everyday campus resources one command away.', tags: ['Python', 'CLI', 'Rich'] },
  { title: 'OpenConnect', description: 'A community platform concept to help student developers find collaborators and share ideas.', tags: ['React', 'TypeScript', 'Node.js'] },
  { title: 'DevKit', description: 'A collection concept for useful developer utilities, scripts, and open-source starter templates.', tags: ['JavaScript', 'Shell', 'Markdown'] },
];
const team = [
  { name: 'Ayush Lahiri', role: 'Lead', linkedin: 'https://www.linkedin.com/in/ayush-lahiri?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { name: 'Sahil Sujit Singh', role: 'Mentor', linkedin: 'https://www.linkedin.com/in/sahilssingh04?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
];


function Brand() {
  return <a href="#home" className="flex shrink-0 items-center gap-3" aria-label="FOSS IIIT Kalyani home"><img src={officialLogo.url} alt="FOSS Club — Indian Institute of Information and Technology, Kalyani" width={2865} height={624} className="official-logo" /></a>;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div data-reveal className="eyebrow"><span className="text-muted-foreground">{number} /</span> {children}</div>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [destination, setDestination] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -65% 0px' });
    navigation.forEach(name => { const section = document.getElementById(name.toLowerCase()); if (section) observer.observe(section); });
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    const resize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('keydown', close);
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('resize', resize); };
  }, [menuOpen]);
  const placeholder = (name: string) => setDestination(name);
  return <RevealPage>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:p-3">Skip to content</a>
    <header className={`site-nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container-wide flex h-full items-center justify-between gap-8">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">{navigation.map(name => <a key={name} href={`#${name.toLowerCase()}`} className={`nav-link ${active === name.toLowerCase() ? 'active' : ''}`}>{name}</a>)}</nav>
        <Button asChild variant="community" className="hidden h-9 px-4 text-[11px] lg:inline-flex"><a href={communityUrl} target="_blank" rel="noopener noreferrer">Join the Community <ArrowUpRight /></a></Button>
        <Button ref={menuButton} variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col gap-1 border-b border-border bg-background px-5 py-5 lg:hidden">{navigation.map(name => <a key={name} href={`#${name.toLowerCase()}`} className="nav-link py-3" onClick={() => setMenuOpen(false)}>{name}</a>)}<Button asChild variant="community" className="mt-3"><a href={communityUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Join the Community <ArrowUpRight /></a></Button></nav>}
    </header>
    <main id="main" tabIndex={-1}>
      <section id="home" className="hero">
        <div className="container-wide hero-content">
          <div data-reveal className="hero-label eyebrow"><span className="status-dot" /> OPEN SOURCE · COLLABORATION · INNOVATION</div>
          <h1 data-reveal data-delay="1">Build Together.<br /><span className="text-primary">Open Everything.</span></h1>
          <p data-reveal data-delay="2" className="hero-description">Discover open source, collaborate with curious minds, and turn your ideas into something the world can use. Your journey into open source starts here.</p>
          <div data-reveal data-delay="3" className="hero-actions"><Button asChild variant="community" className="h-11 px-5 text-xs"><a href="#about">Explore Our Community <ArrowRight /></a></Button><Button asChild variant="communityOutline" className="h-11 px-5 text-xs"><a href="#projects"><Github /> Discover Projects</a></Button></div>
          <div data-reveal data-delay="4" className="mt-5 flex items-center justify-center gap-2 text-[10px] text-muted-foreground"><Users size={12} /><span>For the curious. For the builders. For everyone.</span></div>
          <div data-reveal data-delay="3" className="terminal-window">
            <div className="terminal-top"><span className="terminal-light" /><span className="terminal-light" /><span className="terminal-light" /><span className="mx-auto font-mono text-[9px] text-muted-foreground">your-open-source-journey — zsh</span><Terminal size={12} className="text-muted-foreground" /></div>
            <div className="terminal-body">
              <div className="terminal-line"><span className="text-primary">❯</span> <span className="text-muted-foreground"># every great contribution starts with a first step</span></div>
              <div className="terminal-line"><span className="text-primary">❯</span> git init my-open-source-journey</div>
              <div className="terminal-line text-muted-foreground">Initialized empty Git repository. The possibilities aren't.</div>
              <div className="terminal-line"><span className="text-primary">❯</span> git commit -m <span className="text-primary">"Hello, open source."</span></div>
              <div className="terminal-line"><span className="text-primary">✓</span> First step taken. Let's build something together. <span className="cursor" /></div>
            </div>
          </div>
          <div className="hero-coordinate">FREE SOFTWARE<br />SHARED KNOWLEDGE<br /><span className="text-primary">KALYANI, INDIA</span></div>
          <div className="hero-coordinate right">BUILT ON CURIOSITY<br />POWERED BY COMMUNITY<br /><span className="text-primary">&lt; OPEN BY DEFAULT / &gt;</span></div>
        </div>
      </section>
      <div className="principle-strip"><div className="container-wide principle-strip-inner"><span className="flex items-center gap-2"><GitFork size={14} /> Free & open source</span><span className="flex items-center gap-2"><Globe2 size={14} /> Community over competition</span><span className="flex items-center gap-2"><Braces size={14} /> Built by students, for everyone</span><span className="flex items-center gap-2"><Heart size={14} /> All skill levels welcome</span></div></div>
      <section id="about" className="section-space container-wide">
        <div className="section-top"><div><SectionLabel number="01">WHO WE ARE</SectionLabel><h2 data-reveal data-delay="1" className="section-heading">More Than Just Code<span className="text-primary">.</span></h2><p data-reveal data-delay="2" className="section-description">We’re FOSS IIIT Kalyani — a community of curious minds who believe great software is built together. We learn openly, share freely, and help each other turn “what if” into “what’s next.”</p></div><p data-reveal className="section-description max-w-72">No experience? No problem.<br />Bring your curiosity. There’s a place for you here.</p></div>
        <div className="grid gap-4 md:grid-cols-3">{values.map((value,i) => <div data-reveal data-delay={i + 3} key={value.title}><article className="feature-card h-full"><div className="icon-tile"><value.icon size={19} /></div><h3 className="card-heading">{value.title}</h3><p className="card-description">{value.description}</p></article></div>)}</div>
      </section>
      <section id="activities" className="section-space section-band"><div className="container-wide">
        <div className="section-top"><div><SectionLabel number="02">WHAT WE DO</SectionLabel><h2 data-reveal data-delay="1" className="section-heading">Learn. Build. Contribute<span className="text-primary">.</span></h2><p data-reveal data-delay="2" className="section-description">Good things happen when curious people come together.<br />Here’s what learning in the open can look like.</p></div><span data-reveal className="sample-label"><span className="status-dot" /> EXAMPLE ACTIVITIES · NOT SCHEDULED EVENTS</span></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{activities.map((activity,i) => <div data-reveal data-delay={(i % 3) + 3} key={activity.title}><article className="feature-card activity-card h-full"><div className="flex items-center justify-between"><activity.icon size={22} className="text-primary" /><span className="activity-number">0{i+1}</span></div><h3 className="card-heading">{activity.title}</h3><p className="card-description">{activity.description}</p><p className="mt-6 font-mono text-[8px] text-muted-foreground">{activity.type}</p></article></div>)}</div>
      </div></section>
      <section id="projects" className="section-space container-wide">
        <div className="section-top"><div><SectionLabel number="03">MADE IN THE OPEN</SectionLabel><h2 data-reveal data-delay="1" className="section-heading">Ideas Into Open Source<span className="text-primary">.</span></h2><p data-reveal data-delay="2" className="section-description">Small ideas. Shared ambition. Endless possibilities.<br />A glimpse of the kinds of things we could build together.</p></div><Button data-reveal variant="communityOutline" className="text-[11px]" onClick={() => placeholder('All Projects on GitHub')}>Explore All Projects <ArrowUpRight /></Button></div>
        <div className="grid gap-4 md:grid-cols-3">{projects.map((project,i) => <div data-reveal data-delay={i + 3} key={project.title}><article className="feature-card project-card h-full"><ProjectArt kind={i} /><div className="project-body"><span className="sample-label">SAMPLE PROJECT / CONCEPT</span><h3 className="card-heading">{project.title}</h3><p className="card-description min-h-16">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.tags.map(tag=><span key={tag} className="tech-tag">{tag}</span>)}</div><div className="mt-6 flex items-center justify-between border-t border-border pt-4"><span className="font-mono text-[9px] text-muted-foreground">Repository not yet provided</span><Button variant="ghost" size="icon" aria-label={`GitHub repository for ${project.title} (placeholder)`} title="Repository link pending" onClick={() => placeholder(`${project.title} Repository`)}><Github /></Button></div></div></article></div>)}</div>
        <p data-reveal className="mt-5 flex items-center gap-2 font-mono text-[9px] leading-relaxed text-muted-foreground"><Code2 size={13} className="shrink-0" />These are illustrative concepts, not confirmed club projects. Verified repositories will be shared here.</p>
      </section>
      <section id="team" className="section-space section-band"><div className="container-wide">
        <div className="section-top"><div><SectionLabel number="04">THE COMMUNITY</SectionLabel><h2 data-reveal data-delay="1" className="section-heading">The People Behind the Code<span className="text-primary">.</span></h2><p data-reveal data-delay="2" className="section-description">Different perspectives. Shared curiosity.<br />A community is only as great as the people who make it.</p></div><span data-reveal className="sample-label">MORE PROFILES TO BE ANNOUNCED</span></div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{team.map((member,i)=><div data-reveal data-delay={i + 3} key={member.name}><article className="feature-card project-card h-full"><div className="team-photo"><UserRound /><span className="absolute bottom-3 font-mono text-[8px] text-muted-foreground">PHOTO PLACEHOLDER</span></div><div className="p-5"><h3 className="text-sm font-semibold">{member.name}</h3><p className="mt-2 font-mono text-[9px] text-primary/80">{member.role}</p><div className="mt-4 flex gap-1"><Button asChild variant="communityOutline" size="icon" className="team-link"><a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`View ${member.name}'s LinkedIn profile`} title={`${member.name} on LinkedIn (opens in a new tab)`}><Linkedin /></a></Button></div></div></article></div>)}{[3,4].map((member,i)=><div data-reveal data-delay={i + 5} key={member}><article className="feature-card project-card h-full"><div className="team-photo"><UserRound /><span className="absolute bottom-3 font-mono text-[8px] text-muted-foreground">PHOTO PLACEHOLDER</span></div><div className="p-5"><h3 className="text-sm font-semibold">Member {String(member).padStart(2,'0')}</h3><p className="mt-2 font-mono text-[9px] text-muted-foreground">Name & role to be confirmed</p><div className="mt-4 flex gap-1"><Button variant="communityOutline" size="icon" className="team-link" aria-label={`Member ${member} GitHub (placeholder)`} title="GitHub link pending" onClick={()=>placeholder('Team Member GitHub')}><Github /></Button><Button variant="communityOutline" size="icon" className="team-link" aria-label={`Member ${member} LinkedIn (placeholder)`} title="LinkedIn link pending" onClick={()=>placeholder('Team Member LinkedIn')}><Linkedin /></Button></div></div></article></div>)}</div>
        <p data-reveal className="mt-5 font-mono text-[9px] leading-relaxed text-muted-foreground">Member 03 and Member 04 are placeholders. Profiles and photos will be updated as more details are confirmed.</p>

      </div></section>
      <section id="join" className="join-section"><div className="container-wide"><div data-reveal className="mx-auto mb-5 icon-tile"><GitFork size={21} /></div><div data-reveal className="eyebrow justify-center">A LITTLE CURIOSITY GOES A LONG WAY</div><h2 data-reveal data-delay="1" className="section-heading">Your First Contribution<br />Starts <span className="text-primary">Here.</span></h2><p data-reveal data-delay="2" className="section-description">You don't need to be an expert to get started. Learn, experiment, collaborate, and make your first open-source contribution with us.</p><div data-reveal data-delay="3" className="hero-actions"><Button asChild variant="community" className="h-11 px-5 text-xs"><a href={communityUrl} target="_blank" rel="noopener noreferrer">Join the Community <ArrowRight /></a></Button><Button variant="communityOutline" className="h-11 px-5 text-xs" onClick={()=>placeholder('FOSS IIIT Kalyani GitHub')}><Github /> Explore GitHub</Button></div><p data-reveal data-delay="4" className="mt-5 font-mono text-[9px] text-muted-foreground">OFFICIAL COMMUNITY LINKS COMING SOON</p></div></section>
    </main>
    <footer id="contact" className="container-wide"><div className="footer-grid"><div data-reveal><Brand /><p className="mt-5 max-w-80 text-xs leading-7 text-muted-foreground">Free and Open Source Software community at IIIT Kalyani. Learning together. Building in public. Open by default.</p><div className="mt-5 flex items-center gap-2 font-mono text-[9px] text-muted-foreground"><span className="status-dot" /> KALYANI, WEST BENGAL, INDIA</div></div><div data-reveal data-delay="1"><h2 className="footer-title">Explore</h2><nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-5 gap-y-4">{navigation.map(name=><a key={name} href={`#${name.toLowerCase()}`} className="nav-link">{name}</a>)}</nav></div><div data-reveal data-delay="2"><h2 className="footer-title">Let’s connect</h2><div className="flex gap-1">{[{name:'GitHub',icon:Github},{name:'LinkedIn',icon:Linkedin},{name:'Instagram',icon:Instagram},{name:'Email',icon:Mail}].map(social=><Button key={social.name} variant="communityOutline" size="icon" className="mr-1" aria-label={`${social.name} (official link pending)`} title={`${social.name} — link pending`} onClick={()=>placeholder(`Official ${social.name}`)}><social.icon /></Button>)}</div><p className="mt-4 font-mono text-[9px] leading-5 text-muted-foreground">Verified social & contact<br />links will be added here.</p></div></div><div data-reveal className="footer-bottom"><span>© {new Date().getFullYear()} FOSS IIIT Kalyani. Open minds. Open source.</span><span className="flex items-center gap-2">Made with <Heart size={11} className="text-primary" /> & a love for open source <span className="text-primary">{'</>'}</span></span></div></footer>
    <Dialog open={destination !== null} onOpenChange={open => { if (!open) setDestination(null); }}><DialogContent className="max-w-[calc(100%-32px)] sm:max-w-md"><div className="icon-tile"><ExternalLink size={20} /></div><DialogTitle>{destination}</DialogTitle><DialogDescription className="leading-7">This is a placeholder. The verified official link has not been provided yet. We’ll share it here once it’s available.</DialogDescription><Button variant="community" onClick={()=>setDestination(null)}>Got it <Check /></Button></DialogContent></Dialog>
  </RevealPage>;
}
