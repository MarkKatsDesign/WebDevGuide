# WebDevGuide

A visual, interactive guide to web development concepts. Built for developers who learn better through diagrams, animations, and clear explanations.

## Why This Exists

Technical interviews often ask about HTTP, DNS, browser rendering, and other web fundamentals. This project provides visual explanations with the exact terminology engineers use, helping you understand and articulate these concepts clearly.

## Features

- **Visual Diagrams**: Animated SVG diagrams that show how things actually work
- **Interactive Exploration**: Click to expand, hover for details, step through processes
- **Key Terms**: Interview-ready definitions for important concepts
- **Dark Theme**: Easy on the eyes, modern design

## Topics Covered

### Currently Available

- [x] **HTTP/HTTPS** - Request/response cycle, methods, status codes, headers, TLS handshake

### Coming Soon

- [ ] DNS - Domain resolution, hierarchy, caching
- [ ] How the Internet Works - TCP/IP, packets, routing
- [ ] Browser Rendering - DOM, CSSOM, render tree, paint
- [ ] JavaScript Event Loop - Call stack, task queue, microtasks
- [ ] REST APIs - Resources, CRUD, best practices
- [ ] WebSockets - Real-time communication
- [ ] Authentication - Sessions, JWT, OAuth
- [ ] Web Security - CORS, XSS, CSRF
- [ ] Caching Strategies - Browser, CDN, server
- [ ] Databases - SQL vs NoSQL, indexing
- [ ] Server Architecture - Load balancing, scaling

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/MarkKatsDesign/webdevguide.git
cd webdevguide

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview  # Preview the build locally
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── topics/           # Topic-specific components
│   │   │   └── http/         # HTTP topic components
│   │   │       ├── HttpTopic.svelte
│   │   │       ├── RequestResponse.svelte
│   │   │       ├── HttpMethods.svelte
│   │   │       ├── StatusCodes.svelte
│   │   │       ├── TlsHandshake.svelte
│   │   │       └── HttpHeaders.svelte
│   │   └── ui/               # Reusable UI components
│   │       ├── TopicCard.svelte
│   │       ├── KeyTerm.svelte
│   │       ├── DiagramContainer.svelte
│   │       └── Section.svelte
│   └── data/
│       └── topics.ts         # Topic metadata
├── routes/
│   ├── +layout.svelte        # Main layout with navigation
│   ├── +page.svelte          # Home page
│   └── topics/
│       └── [slug]/           # Dynamic topic pages
└── app.css                   # Global styles + Tailwind
```

## Adding a New Topic

1. **Add topic metadata** in `src/lib/data/topics.ts`:

   ```typescript
   {
     slug: 'dns',
     title: 'DNS',
     description: 'How domain names resolve to IP addresses',
     icon: '🔍',
     color: 'cyan',
     category: 'Foundation',
     implemented: true  // Set to true when ready
   }
   ```

2. **Create topic folder** at `src/lib/components/topics/[your-topic]/`

3. **Create the main component** `[YourTopic]Topic.svelte`:

   ```svelte
   <script lang="ts">
     import { Section, KeyTerm, DiagramContainer } from '$lib/components/ui';
     // Import your diagram components
   </script>

   <div class="space-y-12">
     <Section title="Overview" subtitle="...">
       <!-- Content -->
     </Section>
     <!-- More sections -->
   </div>
   ```

4. **Register in the page** - Update `src/routes/topics/[slug]/+page.svelte`:

   ```typescript
   import YourTopic from "$lib/components/topics/your-topic/YourTopic.svelte";

   const topicComponents = {
     http: HttpTopic,
     "your-topic": YourTopic, // Add here
   };
   ```

## UI Components

### `<Section>` - Content section with title

```svelte
<Section title="My Section" subtitle="Optional subtitle">
  <!-- Your content -->
</Section>
```

### `<DiagramContainer>` - Wrapper for diagrams

```svelte
<DiagramContainer title="Diagram Title" description="Description">
  <YourDiagram />
</DiagramContainer>
```

### `<KeyTerm>` - Expandable term definition

```svelte
<KeyTerm
  term="HTTP"
  definition="HyperText Transfer Protocol..."
  color="blue"
/>
```

### `<TopicCard>` - Topic card for navigation

```svelte
<TopicCard topic={topicObject} index={0} />
```

## Tech Stack

- **SvelteKit** - Full-stack framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Svelte Transitions** - Animations

## Design System

### Colors

- Background: `#0f172a` (dark-900)
- Cards: `#1e293b` (dark-800)
- Borders: `#334155` (dark-700)
- Accents: blue, green, orange, purple, cyan, pink, yellow

### Animation Guidelines

- Use Svelte's built-in `fly`, `fade`, `slide` transitions
- Keep animations subtle (200-500ms)
- Always provide play/pause controls for continuous animations
- Use `animation-delay` for staggered effects

## Contributing

Contributions are welcome! If you'd like to add a new topic:

1. Fork the repository
2. Create a feature branch
3. Add your topic following the structure above
4. Submit a pull request

## License

MIT
