<script lang="ts">
	import { Section, KeyTerm, DiagramContainer } from '$lib/components/ui';
	import CriticalRenderingPath from './CriticalRenderingPath.svelte';
	import DomConstruction from './DomConstruction.svelte';
	import RenderTree from './RenderTree.svelte';
	import LayoutPaint from './LayoutPaint.svelte';
	import CompositeLayers from './CompositeLayers.svelte';

	const keyTerms = [
		{
			term: 'DOM (Document Object Model)',
			definition: 'A tree-structured representation of HTML where each tag becomes a node. The browser parses HTML top-to-bottom, creating nodes for elements, text, and attributes. JavaScript can modify the DOM, triggering re-renders.',
			color: 'purple' as const
		},
		{
			term: 'CSSOM (CSS Object Model)',
			definition: 'A tree-structured representation of CSS rules. The browser parses CSS and builds the CSSOM, which contains all styles that apply to each element. CSSOM construction blocks rendering until complete.',
			color: 'blue' as const
		},
		{
			term: 'Render Tree',
			definition: 'A combination of DOM and CSSOM containing only visible elements with their computed styles. Elements with display:none are excluded. This tree is used to calculate the layout of each element.',
			color: 'green' as const
		},
		{
			term: 'Layout (Reflow)',
			definition: 'The process of calculating the exact position and size of each element on the page. Layout is expensive and triggered by DOM changes, style changes, or viewport resizing. Batch DOM operations to minimize reflows.',
			color: 'orange' as const
		},
		{
			term: 'Paint (Rasterization)',
			definition: 'Converting the layout into actual pixels. The browser paints text, colors, images, borders, and shadows. Paint operations are performed in layers, which can be independently updated.',
			color: 'pink' as const
		},
		{
			term: 'Composite',
			definition: 'The final stage where painted layers are combined in the correct order. GPU-accelerated properties like transform and opacity skip layout and paint, going straight to composite for 60fps animations.',
			color: 'cyan' as const
		},
		{
			term: 'Critical Rendering Path',
			definition: 'The sequence of steps the browser takes to convert HTML, CSS, and JavaScript into pixels on screen. Optimizing this path is key to fast initial page loads and smooth interactions.',
			color: 'yellow' as const
		},
		{
			term: 'Render-Blocking Resources',
			definition: 'CSS and synchronous JavaScript that block the browser from rendering content. CSS blocks render tree construction. Synchronous JS blocks HTML parsing. Use async/defer for scripts and critical CSS for faster renders.',
			color: 'orange' as const
		}
	];
</script>

<div class="space-y-12">
	<!-- Overview Section -->
	<Section title="How Browsers Render Pages" subtitle="From HTML bytes to pixels on screen">
		<div class="prose prose-invert max-w-none">
			<p class="text-gray-300 leading-relaxed">
				When your browser receives HTML from a server, it goes through a multi-step process to convert that text into the visual page you see.
				This process, called the <strong class="text-accent-purple">Critical Rendering Path</strong>, involves parsing, tree construction,
				layout calculations, and painting pixels.
			</p>
			<p class="text-gray-400 mt-4">
				Understanding this pipeline helps you write more performant code. Each stage has performance implications,
				and knowing what triggers expensive operations like <strong class="text-accent-orange">layout</strong> and
				<strong class="text-accent-pink">paint</strong> helps you avoid janky animations and slow page loads.
			</p>
		</div>
	</Section>

	<!-- Critical Rendering Path Animation -->
	<Section title="The Critical Rendering Path" subtitle="The complete pipeline from HTML to pixels">
		<DiagramContainer
			title="Browser Rendering Pipeline"
			description="Watch how the browser transforms code into visual content"
		>
			<CriticalRenderingPath />
		</DiagramContainer>
	</Section>

	<!-- DOM Construction -->
	<Section title="DOM Construction" subtitle="Parsing HTML into a tree structure">
		<DiagramContainer
			title="Building the Document Object Model"
			description="The browser parses HTML bytes into a tree of nodes"
		>
			<DomConstruction />
		</DiagramContainer>
	</Section>

	<!-- Render Tree -->
	<Section title="Render Tree" subtitle="Combining DOM and CSSOM for visible elements">
		<DiagramContainer
			title="Creating the Render Tree"
			description="Only visible elements with computed styles make it to the render tree"
		>
			<RenderTree />
		</DiagramContainer>
	</Section>

	<!-- Layout & Paint -->
	<Section title="Layout & Paint" subtitle="Calculating positions and drawing pixels">
		<DiagramContainer
			title="From Boxes to Pixels"
			description="Layout calculates geometry, paint fills in the visuals"
		>
			<LayoutPaint />
		</DiagramContainer>
	</Section>

	<!-- Composite Layers -->
	<Section title="Composite Layers" subtitle="GPU acceleration and efficient updates">
		<DiagramContainer
			title="Layer Composition"
			description="How the browser uses layers for smooth animations"
		>
			<CompositeLayers />
		</DiagramContainer>
	</Section>

	<!-- Key Terms -->
	<Section title="Key Terms to Remember" subtitle="Master these terms for technical interviews">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
			{#each keyTerms as { term, definition, color }}
				<KeyTerm {term} {definition} {color} />
			{/each}
		</div>
	</Section>
</div>
