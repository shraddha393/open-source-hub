# Open Source Hub

Build a complete, modern, responsive landing page for FOSS IIIT Kalyani (Free and Open Source Software community at IIIT Kalyani).

DESIGN:
Create a premium, developer-focused website with a dark near-black background, neon green accents, white typography, subtle gradients, glass effects, thin borders, and a modern grid layout. Use Inter for headings and body text and a monospace font for technical details. The design should feel like a professional open-source developer community website, inspired by GitHub and modern developer portfolios. Avoid generic templates and excessive animations.

NAVBAR
Create a responsive sticky navbar with FOSS IIIT Kalyani branding and links to Home, About, Activities, Projects, Team, and Contact. Add a highlighted “Join the Community” button. Include a functional mobile hamburger menu and a subtle background transition when scrolling.

HERO SECTION
Create a visually striking hero section with the headline:
“Build Together. Open Everything.”

Add this description:
“Discover open source, collaborate with curious minds, and turn your ideas into something the world can use. Your journey into open source starts here.”

Add two CTA buttons:

Explore Our Community

Discover Projects

Include an animated terminal window displaying sample Git commands, subtle green glowing elements, and a minimal technical grid background. Add a small label reading “OPEN SOURCE • COLLABORATION • INNOVATION”.

ABOUT SECTION
Heading: “More Than Just Code.”

Explain how FOSS encourages collaboration, transparent software development, learning, and sharing knowledge. Make beginners feel welcome.

Create three cards:

Learn Together

Build in Public

Grow as a Community

Each card should have a simple icon, a short description, and a subtle hover animation.

ACTIVITIES SECTION
Heading: “Learn. Build. Contribute.”

Create attractive cards for workshops, Git and GitHub sessions, hackathons, open-source contribution drives, project-building sessions, and peer learning. Use suitable icons and concise descriptions. Treat these as example activities, not confirmed events.

PROJECTS SECTION
Heading: “Ideas Into Open Source.”

Create a responsive grid of three or four project cards. Each card should include a project title, short description, technology tags, and a GitHub link. Use clearly identified sample content if actual club projects are unavailable. Add an “Explore All Projects” button. Keep all project details easy to replace with genuine repositories.

TEAM SECTION
Heading: “The People Behind the Code.”

Create a modern team grid with photo placeholders, names, roles, and social links. Use clearly identified placeholders rather than inventing real members or positions. Add subtle hover interactions.

JOIN THE COMMUNITY SECTION
Create a prominent CTA area with the headline:
“Your First Contribution Starts Here.”

Supporting text:
“You don't need to be an expert to get started. Learn, experiment, collaborate, and make your first open-source contribution with us.”

Add buttons for “Join the Community” and “Explore GitHub”. Use placeholders for official links that have not been provided.

CONTACT AND FOOTER
Include the FOSS IIIT Kalyani branding, a short description, quick navigation links, and placeholders for verified GitHub, LinkedIn, Instagram, and email links. Do not invent official accounts or contact details.

SCROLL ANIMATIONS — VERY IMPORTANT
Implement scroll-triggered reveal animations throughout the entire website.

Whenever the user scrolls and a section enters the viewport:

Headings should smoothly fade in and move upward.

Paragraphs should appear with a slight delay.

Cards should reveal one after another using staggered animations.

Buttons, project cards, team cards, and footer content should also reveal smoothly.

Use opacity 0 to opacity 1 and translateY(24px) to translateY(0), with a 600ms duration and a smooth easing curve. Add approximately 100ms stagger delays between cards.

Use IntersectionObserver or an existing animation library. Trigger each reveal once and keep the content visible afterward. Animate the hero section on initial page load. Respect prefers-reduced-motion so users who prefer reduced motion can view all content without animations.

INTERACTIONS
Implement smooth scrolling for navigation links, working CTA buttons, subtle card hover effects, button press animations, and a sticky navbar that changes appearance on scroll. Ensure the mobile menu opens and closes correctly.

TECHNICAL REQUIREMENTS
Use React, TypeScript, Tailwind CSS, and reusable components, following the existing project setup. Use Lucide icons if available. Ensure the website is responsive on mobile, tablet, and desktop. Prevent horizontal overflow, use semantic HTML, provide accessible focus states, and optimise performance.

Do not add unnecessary dependencies if equivalent functionality already exists. Ensure every interactive element works and all navigation links point to valid sections. Never fabricate real team members, official social links, events, or project repositories.

FINAL GOAL:
Deliver a complete, polished, visually impressive landing page that feels like a real student-led open-source community at IIIT Kalyani. Prioritise clean typography, thoughtful spacing, strong visual hierarchy, smooth scrolling, and professional animations. Build the actual working website, not just a design mockup.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f673d0be-0481-55e2-984a-8d0ded0cf056).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
