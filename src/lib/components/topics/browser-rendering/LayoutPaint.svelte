<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const steps = [
		{
			id: 0,
			title: 'Render Tree Input',
			description: 'Layout receives the render tree with computed styles',
			phase: 'input'
		},
		{
			id: 1,
			title: 'Box Model Calculation',
			description: 'Calculate width, height, padding, margin, and border for each element',
			phase: 'box'
		},
		{
			id: 2,
			title: 'Position Calculation',
			description: 'Determine exact x, y coordinates based on flow, floats, and positioning',
			phase: 'position'
		},
		{
			id: 3,
			title: 'Layout Complete',
			description: 'All elements now have exact pixel positions and sizes',
			phase: 'layout-done'
		},
		{
			id: 4,
			title: 'Paint Order',
			description: 'Determine the order to paint: backgrounds, borders, text, etc.',
			phase: 'paint-order'
		},
		{
			id: 5,
			title: 'Rasterization',
			description: 'Convert vector graphics to actual pixels on the screen',
			phase: 'raster'
		}
	];

	function startAnimation() {
		intervalId = setInterval(() => {
			step = (step + 1) % steps.length;
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

	$: currentStep = steps[step];
	$: isLayoutPhase = ['input', 'box', 'position', 'layout-done'].includes(currentStep.phase);
	$: isPaintPhase = ['paint-order', 'raster'].includes(currentStep.phase);
</script>

<div class="space-y-6">
	<!-- Main Visualization -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Layout Phase -->
		<div
			class="rounded-xl border-2 p-4 transition-all duration-300
				{isLayoutPhase ? 'border-accent-orange bg-accent-orange/5' : 'border-dark-700 bg-dark-800/50'}"
		>
			<h4 class="text-sm font-medium text-accent-orange mb-4 flex items-center gap-2">
				<span>📐</span> Layout Phase
			</h4>

			<!-- Box Model Visualization -->
			<div class="relative bg-dark-900/50 rounded-lg p-4 min-h-[200px]">
				{#if currentStep.phase === 'input'}
					<div class="text-center text-gray-500" in:fade>
						<div class="text-4xl mb-2">🎄</div>
						<p class="text-sm">Render Tree Input</p>
					</div>
				{:else if currentStep.phase === 'box'}
					<div class="flex items-center justify-center" in:scale>
						<!-- Box Model Diagram -->
						<div class="relative">
							<!-- Margin (outermost) -->
							<div class="bg-accent-orange/20 p-4 rounded border-2 border-dashed border-accent-orange/50">
								<span class="absolute -top-3 left-2 text-[10px] text-accent-orange bg-dark-900 px-1">margin</span>
								<!-- Border -->
								<div class="bg-accent-yellow/20 p-3 rounded border-2 border-accent-yellow">
									<span class="absolute top-5 left-6 text-[10px] text-accent-yellow bg-dark-900 px-1">border</span>
									<!-- Padding -->
									<div class="bg-accent-green/20 p-3 rounded border-2 border-dashed border-accent-green/50">
										<span class="absolute top-12 left-10 text-[10px] text-accent-green bg-dark-900 px-1">padding</span>
										<!-- Content -->
										<div class="bg-accent-blue/30 p-4 rounded text-center">
											<span class="text-xs text-accent-blue">Content</span>
											<div class="text-[10px] text-gray-400 mt-1">width × height</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				{:else if currentStep.phase === 'position'}
					<div class="relative h-full" in:fade>
						<!-- Coordinate Grid -->
						<div class="absolute inset-0 grid grid-cols-4 grid-rows-4">
							{#each Array(16) as _, i}
								<div class="border border-dark-700/30"></div>
							{/each}
						</div>
						<!-- Positioned Elements -->
						<div
							class="absolute top-2 left-2 w-24 h-12 bg-accent-purple/30 border border-accent-purple rounded flex items-center justify-center text-xs"
							in:fly={{ y: -10, duration: 300 }}
						>
							<span class="text-accent-purple">header</span>
						</div>
						<div
							class="absolute top-16 left-2 w-16 h-20 bg-accent-blue/30 border border-accent-blue rounded flex items-center justify-center text-xs"
							in:fly={{ x: -10, duration: 300, delay: 100 }}
						>
							<span class="text-accent-blue">nav</span>
						</div>
						<div
							class="absolute top-16 left-20 w-28 h-20 bg-accent-green/30 border border-accent-green rounded flex items-center justify-center text-xs"
							in:fly={{ y: 10, duration: 300, delay: 200 }}
						>
							<span class="text-accent-green">main</span>
						</div>
						<!-- Coordinates -->
						<div class="absolute top-0 right-0 text-[10px] text-gray-500">x: 0, y: 0</div>
					</div>
				{:else if currentStep.phase === 'layout-done'}
					<div class="space-y-2 text-xs font-mono" in:fade>
						<div class="flex justify-between items-center px-2 py-1 bg-dark-700/50 rounded">
							<span class="text-accent-purple">header</span>
							<span class="text-gray-400">x:0 y:0 w:400 h:60</span>
						</div>
						<div class="flex justify-between items-center px-2 py-1 bg-dark-700/50 rounded">
							<span class="text-accent-blue">nav</span>
							<span class="text-gray-400">x:0 y:60 w:100 h:300</span>
						</div>
						<div class="flex justify-between items-center px-2 py-1 bg-dark-700/50 rounded">
							<span class="text-accent-green">main</span>
							<span class="text-gray-400">x:100 y:60 w:300 h:300</span>
						</div>
						<div class="flex justify-between items-center px-2 py-1 bg-dark-700/50 rounded">
							<span class="text-accent-orange">footer</span>
							<span class="text-gray-400">x:0 y:360 w:400 h:40</span>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Paint Phase -->
		<div
			class="rounded-xl border-2 p-4 transition-all duration-300
				{isPaintPhase ? 'border-accent-pink bg-accent-pink/5' : 'border-dark-700 bg-dark-800/50'}"
		>
			<h4 class="text-sm font-medium text-accent-pink mb-4 flex items-center gap-2">
				<span>🖌️</span> Paint Phase
			</h4>

			<div class="relative bg-dark-900/50 rounded-lg p-4 min-h-[200px]">
				{#if currentStep.phase === 'paint-order'}
					<div class="space-y-2" in:fade>
						<h5 class="text-xs text-gray-400 mb-3">Paint Order (stacking context):</h5>
						{#each [
							{ order: 1, name: 'Background colors', color: 'cyan' },
							{ order: 2, name: 'Background images', color: 'blue' },
							{ order: 3, name: 'Borders', color: 'yellow' },
							{ order: 4, name: 'Children (in DOM order)', color: 'green' },
							{ order: 5, name: 'Outline', color: 'orange' }
						] as item, i}
							<div
								class="flex items-center gap-3 px-3 py-2 bg-dark-700/50 rounded"
								in:fly={{ x: -10, duration: 200, delay: i * 100 }}
							>
								<span class="w-6 h-6 rounded-full bg-accent-{item.color}/20 flex items-center justify-center text-xs text-accent-{item.color}">
									{item.order}
								</span>
								<span class="text-sm text-gray-300">{item.name}</span>
							</div>
						{/each}
					</div>
				{:else if currentStep.phase === 'raster'}
					<div class="space-y-4" in:scale>
						<!-- Pixel Grid -->
						<div class="flex justify-center">
							<div class="grid grid-cols-8 gap-0.5">
								{#each Array(64) as _, i}
									<div
										class="w-4 h-4 rounded-sm transition-colors duration-100"
										class:bg-accent-purple={i < 8 || i >= 56}
										class:bg-accent-blue={i >= 8 && i < 16}
										class:bg-accent-green={(i >= 16 && i < 24) || (i >= 24 && i < 32)}
										class:bg-accent-orange={(i >= 32 && i < 40) || (i >= 40 && i < 48)}
										class:bg-accent-pink={i >= 48 && i < 56}
										class:bg-dark-600={i >= 24 && i < 48 && (i % 8 === 0 || i % 8 === 7)}
										style="animation-delay: {i * 10}ms"
									></div>
								{/each}
							</div>
						</div>
						<p class="text-xs text-gray-500 text-center">
							Vectors → Pixels (rasterization)
						</p>
					</div>
				{:else}
					<div class="flex items-center justify-center h-full text-gray-500" in:fade>
						<p class="text-sm">Waiting for layout...</p>
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
					{step === s.id
						? isLayoutPhase ? 'bg-accent-orange' : 'bg-accent-pink'
						: 'bg-dark-600 hover:bg-dark-500'}"
			></button>
		{/each}
	</div>

	<!-- Current Step Info -->
	{#key step}
		<div
			class="text-center p-4 rounded-lg bg-dark-800 border transition-colors {isLayoutPhase ? 'border-accent-orange/30' : ''} {isPaintPhase ? 'border-accent-pink/30' : ''}"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="text-sm font-medium {isLayoutPhase ? 'text-accent-orange' : ''} {isPaintPhase ? 'text-accent-pink' : ''}">
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

	<!-- Layout Triggers Warning -->
	<div class="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
		<div class="flex items-start gap-3">
			<div class="text-red-400 text-xl">⚠️</div>
			<div>
				<h4 class="text-sm font-medium text-red-400">What Triggers Layout (Expensive!)</h4>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
					<ul class="text-sm text-gray-400 space-y-1">
						<li>• Changing <code class="text-red-400">width</code>, <code class="text-red-400">height</code></li>
						<li>• Changing <code class="text-red-400">padding</code>, <code class="text-red-400">margin</code></li>
						<li>• Adding/removing elements</li>
						<li>• Changing <code class="text-red-400">font-size</code></li>
					</ul>
					<ul class="text-sm text-gray-400 space-y-1">
						<li>• Reading <code class="text-red-400">offsetWidth</code>, <code class="text-red-400">offsetHeight</code></li>
						<li>• Reading <code class="text-red-400">getBoundingClientRect()</code></li>
						<li>• Window resize</li>
						<li>• Changing <code class="text-red-400">position</code></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
