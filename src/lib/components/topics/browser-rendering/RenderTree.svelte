<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const domNodes = [
		{ id: 'html', tag: 'html', visible: true, styles: null },
		{ id: 'head', tag: 'head', visible: false, styles: 'display: none' },
		{ id: 'body', tag: 'body', visible: true, styles: null },
		{ id: 'div', tag: 'div', visible: true, styles: 'color: blue' },
		{ id: 'p1', tag: 'p', visible: true, styles: 'font-size: 16px' },
		{ id: 'span', tag: 'span', visible: false, styles: 'display: none' },
		{ id: 'p2', tag: 'p', visible: true, styles: 'color: red' }
	];

	const cssomRules = [
		{ selector: 'body', props: 'margin: 0; font-family: sans-serif' },
		{ selector: 'div', props: 'color: blue; padding: 20px' },
		{ selector: 'p', props: 'font-size: 16px; line-height: 1.5' },
		{ selector: '.hidden', props: 'display: none' }
	];

	const renderNodes = [
		{ id: 'html', tag: 'html', computedStyle: 'display: block' },
		{ id: 'body', tag: 'body', computedStyle: 'margin: 0; font-family: sans-serif' },
		{ id: 'div', tag: 'div', computedStyle: 'color: blue; padding: 20px' },
		{ id: 'p1', tag: 'p', computedStyle: 'font-size: 16px; line-height: 1.5' },
		{ id: 'p2', tag: 'p', computedStyle: 'font-size: 16px; color: red' }
	];

	const steps = [
		{
			id: 0,
			title: 'DOM Tree',
			description: 'Start with the complete DOM tree containing all elements',
			highlight: 'dom'
		},
		{
			id: 1,
			title: 'CSSOM Tree',
			description: 'CSS rules are parsed and organized in the CSSOM',
			highlight: 'cssom'
		},
		{
			id: 2,
			title: 'Matching Styles',
			description: 'Browser matches CSS selectors to DOM nodes',
			highlight: 'both'
		},
		{
			id: 3,
			title: 'Filter Hidden',
			description: 'Elements with display:none are excluded from render tree',
			highlight: 'filter'
		},
		{
			id: 4,
			title: 'Render Tree Complete',
			description: 'Only visible elements with computed styles remain',
			highlight: 'render'
		}
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
</script>

<div class="space-y-6">
	<!-- Trees Visualization -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
		<!-- DOM Tree -->
		<div
			class="rounded-xl border-2 p-4 transition-all duration-300
				{currentStep.highlight === 'dom' || currentStep.highlight === 'both' || currentStep.highlight === 'filter'
					? 'border-accent-purple bg-accent-purple/5'
					: 'border-dark-700 bg-dark-800/50'}"
		>
			<h4 class="text-sm font-medium text-accent-purple mb-3 flex items-center gap-2">
				<span>🌳</span> DOM
			</h4>
			<div class="space-y-1.5 font-mono text-xs">
				{#each domNodes as node}
					<div
						class="flex items-center gap-2 px-2 py-1 rounded transition-all duration-300
							{currentStep.highlight === 'filter' && !node.visible
								? 'bg-red-500/20 line-through opacity-50'
								: 'bg-dark-700/50'}"
					>
						<span class="text-accent-purple">&lt;{node.tag}&gt;</span>
						{#if !node.visible && currentStep.highlight === 'filter'}
							<span class="text-red-400 text-[10px]">hidden</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- CSSOM Tree -->
		<div
			class="rounded-xl border-2 p-4 transition-all duration-300
				{currentStep.highlight === 'cssom' || currentStep.highlight === 'both'
					? 'border-accent-blue bg-accent-blue/5'
					: 'border-dark-700 bg-dark-800/50'}"
		>
			<h4 class="text-sm font-medium text-accent-blue mb-3 flex items-center gap-2">
				<span>🎨</span> CSSOM
			</h4>
			<div class="space-y-1.5 font-mono text-xs">
				{#each cssomRules as rule}
					<div class="px-2 py-1 rounded bg-dark-700/50">
						<span class="text-accent-blue">{rule.selector}</span>
						<span class="text-gray-500"> {'{'}</span>
						<div class="pl-3 text-gray-400 text-[10px]">{rule.props}</div>
						<span class="text-gray-500">{'}'}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Render Tree -->
		<div
			class="rounded-xl border-2 p-4 transition-all duration-300
				{currentStep.highlight === 'render'
					? 'border-accent-green bg-accent-green/5'
					: 'border-dark-700 bg-dark-800/50'}"
		>
			<h4 class="text-sm font-medium text-accent-green mb-3 flex items-center gap-2">
				<span>🎄</span> Render Tree
			</h4>
			{#if currentStep.highlight === 'render'}
				<div class="space-y-1.5 font-mono text-xs" in:fade>
					{#each renderNodes as node, i}
						<div
							class="px-2 py-1 rounded bg-dark-700/50"
							in:fly={{ x: 10, duration: 200, delay: i * 100 }}
						>
							<span class="text-accent-green">&lt;{node.tag}&gt;</span>
							<div class="text-[10px] text-gray-500 pl-2">{node.computedStyle}</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="flex items-center justify-center h-32 text-gray-500 text-sm">
					<span class="animate-pulse">Building...</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Merge Arrow -->
	{#if currentStep.highlight === 'both' || currentStep.highlight === 'filter' || currentStep.highlight === 'render'}
		<div class="flex justify-center" in:fade>
			<div class="flex items-center gap-4 px-6 py-3 rounded-xl bg-dark-800 border border-dark-700">
				<span class="text-accent-purple">DOM</span>
				<span class="text-gray-500">+</span>
				<span class="text-accent-blue">CSSOM</span>
				<svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
				<span class="text-accent-green">Render Tree</span>
			</div>
		</div>
	{/if}

	<!-- Step Progress -->
	<div class="flex justify-center gap-1 flex-wrap">
		{#each steps as s}
			<button
				on:click={() => goToStep(s.id)}
				class="w-6 h-2 rounded-full transition-all
					{step === s.id ? 'bg-accent-green' : 'bg-dark-600 hover:bg-dark-500'}"
			></button>
		{/each}
	</div>

	<!-- Current Step Info -->
	{#key step}
		<div
			class="text-center p-4 rounded-lg bg-dark-800 border border-accent-green/30"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="text-sm font-medium text-accent-green">
				Step {step + 1}: {currentStep.title}
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

	<!-- Important Note -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">What's NOT in the Render Tree?</h4>
				<ul class="text-sm text-gray-400 mt-2 space-y-1">
					<li>• Elements with <code class="text-accent-pink">display: none</code> (completely hidden)</li>
					<li>• The <code class="text-accent-purple">&lt;head&gt;</code> element and its children</li>
					<li>• Script and meta tags</li>
					<li>• Note: <code class="text-accent-cyan">visibility: hidden</code> elements ARE included (they take up space)</li>
				</ul>
			</div>
		</div>
	</div>
</div>
