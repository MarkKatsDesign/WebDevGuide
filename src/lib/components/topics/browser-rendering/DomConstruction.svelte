<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const steps = [
		{
			id: 0,
			title: 'Bytes Received',
			description: 'Browser receives raw bytes from the network',
			code: '3C 68 74 6D 6C 3E...',
			showBytes: true,
			showChars: false,
			showTokens: false,
			showNodes: false,
			showTree: false
		},
		{
			id: 1,
			title: 'Character Conversion',
			description: 'Bytes are converted to characters based on encoding (UTF-8)',
			code: '<html><head>...',
			showBytes: true,
			showChars: true,
			showTokens: false,
			showNodes: false,
			showTree: false
		},
		{
			id: 2,
			title: 'Tokenization',
			description: 'Characters are parsed into tokens (start tags, end tags, text)',
			code: 'StartTag: html',
			showBytes: false,
			showChars: true,
			showTokens: true,
			showNodes: false,
			showTree: false
		},
		{
			id: 3,
			title: 'Node Creation',
			description: 'Tokens are converted into DOM nodes with properties',
			code: 'HTMLHtmlElement',
			showBytes: false,
			showChars: false,
			showTokens: true,
			showNodes: true,
			showTree: false
		},
		{
			id: 4,
			title: 'DOM Tree',
			description: 'Nodes are linked into a tree structure representing the document',
			code: 'document.documentElement',
			showBytes: false,
			showChars: false,
			showTokens: false,
			showNodes: true,
			showTree: true
		}
	];

	const treeNodes = [
		{ id: 'document', label: 'Document', level: 0, parent: null },
		{ id: 'html', label: 'html', level: 1, parent: 'document' },
		{ id: 'head', label: 'head', level: 2, parent: 'html' },
		{ id: 'title', label: 'title', level: 3, parent: 'head' },
		{ id: 'body', label: 'body', level: 2, parent: 'html' },
		{ id: 'div', label: 'div', level: 3, parent: 'body' },
		{ id: 'p', label: 'p', level: 4, parent: 'div' }
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
	<!-- Pipeline Visualization -->
	<div class="relative bg-dark-900/50 rounded-xl p-6">
		<div class="flex flex-wrap items-center justify-center gap-3">
			<!-- Bytes -->
			<div
				class="px-4 py-3 rounded-lg border-2 transition-all duration-300 min-w-[100px] text-center
					{currentStep.showBytes ? 'border-accent-purple bg-accent-purple/10 scale-105' : 'border-dark-600 bg-dark-800 opacity-50'}"
			>
				<div class="text-xs text-gray-500 mb-1">Bytes</div>
				<code class="text-xs font-mono text-accent-purple">3C 68 74...</code>
			</div>

			{#if currentStep.showChars}
				<svg class="w-6 h-6 text-gray-600 shrink-0" in:fade fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			{/if}

			<!-- Characters -->
			<div
				class="px-4 py-3 rounded-lg border-2 transition-all duration-300 min-w-[100px] text-center
					{currentStep.showChars ? 'border-accent-blue bg-accent-blue/10 scale-105' : 'border-dark-600 bg-dark-800 opacity-50'}"
			>
				<div class="text-xs text-gray-500 mb-1">Characters</div>
				<code class="text-xs font-mono text-accent-blue">&lt;html&gt;...</code>
			</div>

			{#if currentStep.showTokens}
				<svg class="w-6 h-6 text-gray-600 shrink-0" in:fade fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			{/if}

			<!-- Tokens -->
			<div
				class="px-4 py-3 rounded-lg border-2 transition-all duration-300 min-w-[100px] text-center
					{currentStep.showTokens ? 'border-accent-green bg-accent-green/10 scale-105' : 'border-dark-600 bg-dark-800 opacity-50'}"
			>
				<div class="text-xs text-gray-500 mb-1">Tokens</div>
				<code class="text-xs font-mono text-accent-green">StartTag</code>
			</div>

			{#if currentStep.showNodes}
				<svg class="w-6 h-6 text-gray-600 shrink-0" in:fade fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			{/if}

			<!-- Nodes -->
			<div
				class="px-4 py-3 rounded-lg border-2 transition-all duration-300 min-w-[100px] text-center
					{currentStep.showNodes ? 'border-accent-orange bg-accent-orange/10 scale-105' : 'border-dark-600 bg-dark-800 opacity-50'}"
			>
				<div class="text-xs text-gray-500 mb-1">Nodes</div>
				<code class="text-xs font-mono text-accent-orange">Element</code>
			</div>

			{#if currentStep.showTree}
				<svg class="w-6 h-6 text-gray-600 shrink-0" in:fade fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			{/if}

			<!-- DOM Tree -->
			<div
				class="px-4 py-3 rounded-lg border-2 transition-all duration-300 min-w-[100px] text-center
					{currentStep.showTree ? 'border-accent-cyan bg-accent-cyan/10 scale-105' : 'border-dark-600 bg-dark-800 opacity-50'}"
			>
				<div class="text-xs text-gray-500 mb-1">DOM Tree</div>
				<span class="text-lg">🌳</span>
			</div>
		</div>
	</div>

	<!-- DOM Tree Visualization -->
	{#if currentStep.showTree}
		<div class="bg-dark-900/50 rounded-xl p-6" in:fly={{ y: 20, duration: 300 }}>
			<h4 class="text-sm font-medium text-white mb-4">Resulting DOM Tree</h4>
			<div class="font-mono text-sm space-y-1">
				{#each treeNodes as node, i}
					<div
						class="flex items-center transition-all duration-300"
						style="padding-left: {node.level * 24}px"
						in:fly={{ x: -10, duration: 200, delay: i * 100 }}
					>
						<span class="text-dark-500 mr-2">{node.level > 0 ? '├─' : ''}</span>
						<span class="px-2 py-0.5 rounded bg-accent-purple/20 text-accent-purple">
							{node.label}
						</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Step Progress -->
	<div class="flex justify-center gap-1 flex-wrap">
		{#each steps as s}
			<button
				on:click={() => goToStep(s.id)}
				class="w-6 h-2 rounded-full transition-all
					{step === s.id ? 'bg-accent-purple' : 'bg-dark-600 hover:bg-dark-500'}"
			></button>
		{/each}
	</div>

	<!-- Current Step Info -->
	{#key step}
		<div
			class="text-center p-4 rounded-lg bg-dark-800 border border-accent-purple/30"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="text-sm font-medium text-accent-purple">
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

	<!-- HTML Example -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="rounded-lg bg-dark-800 border border-dark-700 overflow-hidden">
			<div class="px-4 py-2 bg-dark-700/50 border-b border-dark-700">
				<span class="text-sm font-medium text-gray-300">HTML Source</span>
			</div>
			<pre class="p-4 text-xs font-mono text-gray-300 overflow-x-auto"><code>&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div&gt;
      &lt;p&gt;Hello&lt;/p&gt;
    &lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
		</div>

		<div class="rounded-lg bg-dark-800 border border-dark-700 overflow-hidden">
			<div class="px-4 py-2 bg-dark-700/50 border-b border-dark-700">
				<span class="text-sm font-medium text-gray-300">JavaScript Access</span>
			</div>
			<pre class="p-4 text-xs font-mono text-gray-300 overflow-x-auto"><code><span class="text-accent-purple">document</span>.documentElement  <span class="text-gray-500">// html</span>
<span class="text-accent-purple">document</span>.head             <span class="text-gray-500">// head</span>
<span class="text-accent-purple">document</span>.body             <span class="text-gray-500">// body</span>
<span class="text-accent-purple">document</span>.querySelector(<span class="text-accent-green">'p'</span>)  <span class="text-gray-500">// p</span></code></pre>
		</div>
	</div>
</div>
