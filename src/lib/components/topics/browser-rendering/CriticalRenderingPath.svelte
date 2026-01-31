<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const stages = [
		{
			id: 0,
			title: 'HTML Parsing',
			description: 'Browser receives HTML bytes and begins parsing into tokens',
			active: ['html'],
			color: 'purple'
		},
		{
			id: 1,
			title: 'DOM Construction',
			description: 'HTML tokens are converted into DOM nodes, building the document tree',
			active: ['html', 'dom'],
			color: 'purple'
		},
		{
			id: 2,
			title: 'CSS Parsing',
			description: 'Browser parses CSS files and inline styles',
			active: ['css'],
			color: 'blue'
		},
		{
			id: 3,
			title: 'CSSOM Construction',
			description: 'CSS rules are converted into the CSS Object Model tree',
			active: ['css', 'cssom'],
			color: 'blue'
		},
		{
			id: 4,
			title: 'Render Tree',
			description: 'DOM + CSSOM combine to create the render tree with visible elements only',
			active: ['dom', 'cssom', 'render'],
			color: 'green'
		},
		{
			id: 5,
			title: 'Layout',
			description: 'Browser calculates the size and position of each element',
			active: ['render', 'layout'],
			color: 'orange'
		},
		{
			id: 6,
			title: 'Paint',
			description: 'Elements are painted to layers - text, colors, images, borders',
			active: ['layout', 'paint'],
			color: 'pink'
		},
		{
			id: 7,
			title: 'Composite',
			description: 'Layers are combined and sent to the screen at 60fps',
			active: ['paint', 'composite'],
			color: 'cyan'
		}
	];

	function startAnimation() {
		intervalId = setInterval(() => {
			step = (step + 1) % stages.length;
		}, 2500);
	}

	function togglePlay() {
		isPlaying = !isPlaying;
		if (isPlaying) {
			startAnimation();
		} else {
			clearInterval(intervalId);
		}
	}

	function goToStep(s: number) {
		step = s;
		if (isPlaying) {
			clearInterval(intervalId);
			startAnimation();
		}
	}

	onMount(() => {
		startAnimation();
		return () => clearInterval(intervalId);
	});

	$: currentStage = stages[step];

	const boxes = [
		{ id: 'html', label: 'HTML', icon: '📄', x: 0 },
		{ id: 'dom', label: 'DOM', icon: '🌳', x: 1 },
		{ id: 'css', label: 'CSS', icon: '🎨', x: 0, row: 2 },
		{ id: 'cssom', label: 'CSSOM', icon: '🌲', x: 1, row: 2 },
		{ id: 'render', label: 'Render Tree', icon: '🎄', x: 2 },
		{ id: 'layout', label: 'Layout', icon: '📐', x: 3 },
		{ id: 'paint', label: 'Paint', icon: '🖌️', x: 4 },
		{ id: 'composite', label: 'Composite', icon: '🖼️', x: 5 }
	];
</script>

<div class="space-y-6">
	<!-- Main Pipeline Diagram -->
	<div class="relative bg-dark-900/50 rounded-xl p-6 overflow-x-auto">
		<div class="min-w-[700px]">
			<!-- Top Row: HTML -> DOM -->
			<div class="flex items-center gap-4 mb-4">
				<!-- HTML -->
				<div
					class="w-24 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300
						{currentStage.active.includes('html') ? 'border-accent-purple bg-accent-purple/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<span class="text-2xl">📄</span>
					<span class="text-xs mt-1 text-gray-400">HTML</span>
				</div>

				<svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>

				<!-- DOM -->
				<div
					class="w-24 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300
						{currentStage.active.includes('dom') ? 'border-accent-purple bg-accent-purple/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<span class="text-2xl">🌳</span>
					<span class="text-xs mt-1 text-gray-400">DOM</span>
				</div>

				<!-- Merge Arrow (pointing down-right) -->
				<div class="relative w-16 h-20 flex items-center justify-center">
					<svg class="w-full h-full text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 64 80">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20 L32 40 L10 60" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M32 40 L54 40" />
					</svg>
				</div>

				<!-- Render Tree -->
				<div
					class="w-28 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300
						{currentStage.active.includes('render') ? 'border-accent-green bg-accent-green/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<span class="text-2xl">🎄</span>
					<span class="text-xs mt-1 text-gray-400">Render Tree</span>
				</div>

				<svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>

				<!-- Layout -->
				<div
					class="w-24 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300
						{currentStage.active.includes('layout') ? 'border-accent-orange bg-accent-orange/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<span class="text-2xl">📐</span>
					<span class="text-xs mt-1 text-gray-400">Layout</span>
				</div>

				<svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>

				<!-- Paint -->
				<div
					class="w-24 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300
						{currentStage.active.includes('paint') ? 'border-accent-pink bg-accent-pink/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<span class="text-2xl">🖌️</span>
					<span class="text-xs mt-1 text-gray-400">Paint</span>
				</div>

				<svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>

				<!-- Composite -->
				<div
					class="w-24 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300
						{currentStage.active.includes('composite') ? 'border-accent-cyan bg-accent-cyan/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<span class="text-2xl">🖼️</span>
					<span class="text-xs mt-1 text-gray-400">Composite</span>
				</div>
			</div>

			<!-- Bottom Row: CSS -> CSSOM -->
			<div class="flex items-center gap-4 ml-0">
				<!-- CSS -->
				<div
					class="w-24 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300
						{currentStage.active.includes('css') ? 'border-accent-blue bg-accent-blue/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<span class="text-2xl">🎨</span>
					<span class="text-xs mt-1 text-gray-400">CSS</span>
				</div>

				<svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>

				<!-- CSSOM -->
				<div
					class="w-24 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300
						{currentStage.active.includes('cssom') ? 'border-accent-blue bg-accent-blue/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<span class="text-2xl">🌲</span>
					<span class="text-xs mt-1 text-gray-400">CSSOM</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Step Progress -->
	<div class="flex justify-center gap-1 flex-wrap">
		{#each stages as s}
			<button
				on:click={() => goToStep(s.id)}
				class="w-6 h-2 rounded-full transition-all
					{step === s.id ? 'bg-accent-' + currentStage.color : 'bg-dark-600 hover:bg-dark-500'}"
				style={step === s.id ? `background-color: var(--accent-${currentStage.color})` : ''}
			></button>
		{/each}
	</div>

	<!-- Current Step Info -->
	{#key step}
		<div
			class="text-center p-4 rounded-lg bg-dark-800 border transition-colors"
			style="border-color: var(--accent-{currentStage.color}, #4f46e5)30"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="text-sm font-medium" style="color: var(--accent-{currentStage.color}, #8b5cf6)">
				Stage {step + 1}: {currentStage.title}
			</div>
			<p class="text-gray-400 mt-1">{currentStage.description}</p>
		</div>
	{/key}

	<!-- Controls -->
	<div class="flex justify-center">
		<button
			on:click={togglePlay}
			class="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors text-sm"
		>
			{#if isPlaying}
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
				</svg>
				Pause
			{:else}
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
				</svg>
				Play
			{/if}
		</button>
	</div>

	<!-- Performance Tips -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-start gap-3">
				<div class="text-accent-orange text-xl">⚡</div>
				<div>
					<h4 class="text-sm font-medium text-white">Render Blocking</h4>
					<p class="text-sm text-gray-400 mt-1">
						CSS is <strong class="text-gray-300">render-blocking</strong> - the browser won't paint
						until CSSOM is complete. Put critical CSS inline and defer non-critical styles.
					</p>
				</div>
			</div>
		</div>
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-start gap-3">
				<div class="text-accent-cyan text-xl">🚀</div>
				<div>
					<h4 class="text-sm font-medium text-white">GPU Acceleration</h4>
					<p class="text-sm text-gray-400 mt-1">
						Use <code class="text-accent-cyan">transform</code> and <code class="text-accent-cyan">opacity</code>
						for animations - they skip Layout and Paint, going straight to Composite.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
