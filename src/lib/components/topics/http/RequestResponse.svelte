<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let animationStep = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const steps = [
		{ id: 0, label: 'Ready', description: 'Client is ready to make a request' },
		{ id: 1, label: 'Request', description: 'Client sends HTTP request to server' },
		{ id: 2, label: 'Processing', description: 'Server processes the request' },
		{ id: 3, label: 'Response', description: 'Server sends HTTP response back' },
		{ id: 4, label: 'Complete', description: 'Client receives and renders response' }
	];

	function startAnimation() {
		intervalId = setInterval(() => {
			animationStep = (animationStep + 1) % 5;
		}, 2000);
	}

	function togglePlay() {
		isPlaying = !isPlaying;
		if (isPlaying) {
			startAnimation();
		} else {
			clearInterval(intervalId);
		}
	}

	function setStep(step: number) {
		animationStep = step;
		if (isPlaying) {
			clearInterval(intervalId);
			startAnimation();
		}
	}

	onMount(() => {
		startAnimation();
		return () => clearInterval(intervalId);
	});
</script>

<div class="space-y-6">
	<!-- Main Diagram -->
	<div class="relative h-64 flex items-center justify-between px-8">
		<!-- Client -->
		<div class="flex flex-col items-center z-10">
			<div
				class="w-24 h-24 rounded-xl bg-dark-700 border-2 flex flex-col items-center justify-center transition-all duration-300
					{animationStep === 1 ? 'border-accent-blue glow-blue scale-105' : animationStep === 4 ? 'border-accent-green glow-green scale-105' : 'border-dark-600'}"
			>
				<svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</div>
			<span class="mt-2 text-sm font-medium text-gray-300">Client</span>
			<span class="text-xs text-gray-500">(Browser)</span>
		</div>

		<!-- Connection Line & Packets -->
		<div class="absolute left-32 right-32 top-1/2 -translate-y-1/2">
			<!-- Base line -->
			<div class="h-0.5 bg-dark-600 w-full"></div>

			<!-- Request Packet -->
			{#if animationStep === 1}
				<div
					class="absolute top-1/2 -translate-y-1/2 left-0"
					in:fly={{ x: -20, duration: 300 }}
				>
					<div class="animate-slide-right">
						<div class="bg-accent-blue px-3 py-1.5 rounded text-xs font-mono text-white shadow-lg shadow-accent-blue/30">
							GET /api/data
						</div>
					</div>
				</div>
			{/if}

			<!-- Response Packet -->
			{#if animationStep === 3}
				<div
					class="absolute top-1/2 -translate-y-1/2 right-0"
					in:fly={{ x: 20, duration: 300 }}
				>
					<div class="animate-slide-left">
						<div class="bg-accent-green px-3 py-1.5 rounded text-xs font-mono text-white shadow-lg shadow-accent-green/30">
							200 OK
						</div>
					</div>
				</div>
			{/if}

			<!-- Direction Arrows -->
			<div class="flex justify-between mt-2">
				<span class="text-xs text-accent-blue">Request →</span>
				<span class="text-xs text-accent-green">← Response</span>
			</div>
		</div>

		<!-- Server -->
		<div class="flex flex-col items-center z-10">
			<div
				class="w-24 h-24 rounded-xl bg-dark-700 border-2 flex flex-col items-center justify-center transition-all duration-300
					{animationStep === 2 ? 'border-accent-orange glow-blue scale-105' : animationStep === 3 ? 'border-accent-green scale-105' : 'border-dark-600'}"
			>
				<svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
				</svg>
				{#if animationStep === 2}
					<div class="mt-1 flex gap-0.5" in:fade>
						<div class="w-1 h-1 rounded-full bg-accent-orange animate-pulse"></div>
						<div class="w-1 h-1 rounded-full bg-accent-orange animate-pulse animate-delay-100"></div>
						<div class="w-1 h-1 rounded-full bg-accent-orange animate-pulse animate-delay-200"></div>
					</div>
				{/if}
			</div>
			<span class="mt-2 text-sm font-medium text-gray-300">Server</span>
			<span class="text-xs text-gray-500">(Web Server)</span>
		</div>
	</div>

	<!-- Step Indicator -->
	<div class="flex items-center justify-center gap-2">
		{#each steps as step}
			<button
				on:click={() => setStep(step.id)}
				class="w-3 h-3 rounded-full transition-all duration-200
					{animationStep === step.id ? 'bg-accent-blue scale-125' : 'bg-dark-600 hover:bg-dark-500'}"
				aria-label="Step {step.id + 1}"
			></button>
		{/each}
	</div>

	<!-- Current Step Description -->
	<div class="text-center">
		<div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 border border-dark-700">
			<span class="text-sm font-medium text-accent-blue">{steps[animationStep].label}:</span>
			<span class="text-sm text-gray-400">{steps[animationStep].description}</span>
		</div>
	</div>

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

	<!-- Request/Response Details -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
		<!-- Request Example -->
		<div class="rounded-lg bg-dark-800 border border-accent-blue/30 overflow-hidden">
			<div class="px-4 py-2 bg-accent-blue/10 border-b border-accent-blue/30">
				<span class="text-sm font-medium text-accent-blue">HTTP Request</span>
			</div>
			<pre class="p-4 text-xs font-mono text-gray-300 overflow-x-auto"><code>GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer token123
User-Agent: Mozilla/5.0</code></pre>
		</div>

		<!-- Response Example -->
		<div class="rounded-lg bg-dark-800 border border-accent-green/30 overflow-hidden">
			<div class="px-4 py-2 bg-accent-green/10 border-b border-accent-green/30">
				<span class="text-sm font-medium text-accent-green">HTTP Response</span>
			</div>
			<pre class="p-4 text-xs font-mono text-gray-300 overflow-x-auto"><code>HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600

{`{`}"users": [...]{`}`}</code></pre>
		</div>
	</div>
</div>
