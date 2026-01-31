<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const steps = [
		{
			id: 0,
			title: 'Single Layer',
			description: 'Simple pages render on a single layer',
			layers: 1
		},
		{
			id: 1,
			title: 'Layer Creation',
			description: 'Certain CSS properties promote elements to their own layers',
			layers: 2
		},
		{
			id: 2,
			title: 'Multiple Layers',
			description: 'Complex UIs may have many composited layers',
			layers: 4
		},
		{
			id: 3,
			title: 'GPU Compositing',
			description: 'Layers are uploaded to GPU and combined efficiently',
			layers: 4,
			compositing: true
		},
		{
			id: 4,
			title: 'Efficient Updates',
			description: 'Only modified layers need to be repainted',
			layers: 4,
			updating: true
		}
	];

	const gpuProperties = [
		{ prop: 'transform', example: 'transform: translateX(100px)', safe: true },
		{ prop: 'opacity', example: 'opacity: 0.5', safe: true },
		{ prop: 'will-change', example: 'will-change: transform', safe: true },
		{ prop: 'filter', example: 'filter: blur(4px)', safe: true }
	];

	const cpuProperties = [
		{ prop: 'width/height', example: 'width: 200px', safe: false },
		{ prop: 'margin/padding', example: 'margin: 10px', safe: false },
		{ prop: 'top/left', example: 'top: 50px', safe: false },
		{ prop: 'font-size', example: 'font-size: 16px', safe: false }
	];

	function startAnimation() {
		intervalId = setInterval(() => {
			step = (step + 1) % steps.length;
		}, 3000);
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

	$: currentStep = steps[step];

	// Computed classes for layer styling
	$: baseLayerClasses = currentStep.compositing
		? 'border-accent-green bg-accent-green/30'
		: 'border-accent-blue bg-accent-blue/20';

	$: layer1Classes = currentStep.updating
		? 'border-accent-yellow bg-accent-yellow/30 animate-pulse'
		: 'border-accent-purple bg-accent-purple/20';
</script>

<div class="space-y-6">
	<!-- Layer Visualization -->
	<div class="relative bg-dark-900/50 rounded-xl p-6 min-h-[280px] overflow-hidden">
		<div class="flex justify-center items-center h-full">
			<div class="relative" style="perspective: 800px; transform-style: preserve-3d;">
				{#if currentStep.layers >= 1}
					<!-- Base Layer -->
					<div
						class="w-48 h-32 rounded-lg border-2 flex items-center justify-center transition-all duration-500 {baseLayerClasses}"
						style="transform: {currentStep.layers > 1 ? 'rotateY(-15deg) translateZ(-60px)' : 'rotateY(0) translateZ(0)'};"
						in:scale
					>
						<div class="text-center">
							<span class="text-xs text-gray-400">Layer 0</span>
							<div class="text-sm text-white mt-1">Background</div>
						</div>
					</div>
				{/if}

				{#if currentStep.layers >= 2}
					<!-- Layer 1 -->
					<div
						class="absolute top-0 left-0 w-48 h-32 rounded-lg border-2 flex items-center justify-center transition-all duration-500 {layer1Classes}"
						style="transform: rotateY(-15deg) translateZ(-20px) translateX(20px) translateY(-10px);"
						in:fly={{ y: -20, duration: 300 }}
					>
						<div class="text-center">
							<span class="text-xs text-gray-400">Layer 1</span>
							<div class="text-sm text-white mt-1">Fixed Header</div>
							{#if currentStep.updating}
								<span class="text-[10px] text-accent-yellow">Updating</span>
							{/if}
						</div>
					</div>
				{/if}

				{#if currentStep.layers >= 3}
					<!-- Layer 2 -->
					<div
						class="absolute top-0 left-0 w-48 h-32 rounded-lg border-2 border-accent-orange bg-accent-orange/20 flex items-center justify-center transition-all duration-500"
						style="transform: rotateY(-15deg) translateZ(20px) translateX(40px) translateY(-20px);"
						in:fly={{ y: -20, duration: 300, delay: 100 }}
					>
						<div class="text-center">
							<span class="text-xs text-gray-400">Layer 2</span>
							<div class="text-sm text-white mt-1">Animated Element</div>
						</div>
					</div>
				{/if}

				{#if currentStep.layers >= 4}
					<!-- Layer 3 -->
					<div
						class="absolute top-0 left-0 w-48 h-32 rounded-lg border-2 border-accent-cyan bg-accent-cyan/20 flex items-center justify-center transition-all duration-500"
						style="transform: rotateY(-15deg) translateZ(60px) translateX(60px) translateY(-30px);"
						in:fly={{ y: -20, duration: 300, delay: 200 }}
					>
						<div class="text-center">
							<span class="text-xs text-gray-400">Layer 3</span>
							<div class="text-sm text-white mt-1">Modal/Overlay</div>
						</div>
					</div>
				{/if}

				{#if currentStep.compositing}
					<!-- GPU Badge -->
					<div
						class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent-green/20 border border-accent-green"
						in:scale
					>
						<span class="text-xs text-accent-green font-medium">GPU Compositing</span>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Step Progress -->
	<div class="flex justify-center gap-1 flex-wrap">
		{#each steps as s}
			<button
				on:click={() => goToStep(s.id)}
				class="w-6 h-2 rounded-full transition-all
					{step === s.id ? 'bg-accent-cyan' : 'bg-dark-600 hover:bg-dark-500'}"
			></button>
		{/each}
	</div>

	<!-- Current Step Info -->
	{#key step}
		<div
			class="text-center p-4 rounded-lg bg-dark-800 border border-accent-cyan/30"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="text-sm font-medium text-accent-cyan">
				{currentStep.title}
			</div>
			<p class="text-gray-400 mt-1">{currentStep.description}</p>
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

	<!-- GPU vs CPU Properties -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<!-- GPU Accelerated (Good) -->
		<div class="rounded-lg bg-dark-800 border border-accent-green/30 overflow-hidden">
			<div class="px-4 py-2 bg-accent-green/10 border-b border-accent-green/30">
				<span class="text-sm font-medium text-accent-green">GPU Accelerated (Composite Only)</span>
			</div>
			<div class="p-4 space-y-2">
				{#each gpuProperties as item}
					<div class="flex items-center justify-between text-sm">
						<code class="text-accent-green">{item.prop}</code>
						<span class="text-xs text-gray-500">{item.example}</span>
					</div>
				{/each}
				<p class="text-xs text-gray-500 mt-3 pt-3 border-t border-dark-700">
					These properties skip Layout and Paint, running at 60fps
				</p>
			</div>
		</div>

		<!-- CPU Bound (Expensive) -->
		<div class="rounded-lg bg-dark-800 border border-red-500/30 overflow-hidden">
			<div class="px-4 py-2 bg-red-500/10 border-b border-red-500/30">
				<span class="text-sm font-medium text-red-400">Triggers Layout (Expensive)</span>
			</div>
			<div class="p-4 space-y-2">
				{#each cpuProperties as item}
					<div class="flex items-center justify-between text-sm">
						<code class="text-red-400">{item.prop}</code>
						<span class="text-xs text-gray-500">{item.example}</span>
					</div>
				{/each}
				<p class="text-xs text-gray-500 mt-3 pt-3 border-t border-dark-700">
					These trigger full Layout, Paint, Composite cycle
				</p>
			</div>
		</div>
	</div>

	<!-- Layer Creation Tips -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-cyan text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">What Creates a New Layer?</h4>
				<ul class="text-sm text-gray-400 mt-2 space-y-1">
					<li>• <code class="text-accent-cyan">transform: translateZ(0)</code> or <code class="text-accent-cyan">translate3d()</code></li>
					<li>• <code class="text-accent-cyan">will-change: transform, opacity</code></li>
					<li>• <code class="text-accent-cyan">position: fixed</code> or <code class="text-accent-cyan">position: sticky</code></li>
					<li>• Elements with CSS <code class="text-accent-cyan">filter</code> or <code class="text-accent-cyan">backdrop-filter</code></li>
					<li>• <code class="text-accent-cyan">&lt;video&gt;</code>, <code class="text-accent-cyan">&lt;canvas&gt;</code>, <code class="text-accent-cyan">&lt;iframe&gt;</code> elements</li>
				</ul>
				<p class="text-xs text-gray-500 mt-3">
					Warning: Too many layers consume memory. Use DevTools Layers panel to inspect.
				</p>
			</div>
		</div>
	</div>

	<!-- Animation Best Practices -->
	<div class="rounded-lg bg-dark-800 border border-dark-700 overflow-hidden">
		<div class="px-4 py-3 bg-dark-700/50 border-b border-dark-700">
			<span class="text-sm font-medium text-white">Animation Best Practices</span>
		</div>
		<div class="p-4">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
				<div>
					<div class="text-red-400 mb-2">Avoid (causes layout)</div>
					<pre class="bg-dark-900/50 p-2 rounded text-gray-400"><code>.element {'{'} animation: move 1s; {'}'}
@keyframes move {'{'} to {'{'} left: 100px; {'}'} {'}'}</code></pre>
				</div>
				<div>
					<div class="text-accent-green mb-2">Prefer (GPU accelerated)</div>
					<pre class="bg-dark-900/50 p-2 rounded text-gray-400"><code>.element {'{'} animation: move 1s; {'}'}
@keyframes move {'{'} to {'{'} transform: translateX(100px); {'}'} {'}'}</code></pre>
				</div>
			</div>
		</div>
	</div>
</div>
