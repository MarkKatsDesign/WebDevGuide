<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const steps = [
		{
			id: 0,
			title: 'User Request',
			description: 'You type www.example.com in your browser',
			active: ['browser'],
			arrow: null
		},
		{
			id: 1,
			title: 'Check Browser Cache',
			description: 'Browser checks if it has a cached DNS record',
			active: ['browser'],
			arrow: null
		},
		{
			id: 2,
			title: 'Query Resolver',
			description: 'Browser asks the DNS resolver (usually your ISP)',
			active: ['browser', 'resolver'],
			arrow: 'browser-resolver'
		},
		{
			id: 3,
			title: 'Query Root Server',
			description: 'Resolver asks root server: "Where is .com?"',
			active: ['resolver', 'root'],
			arrow: 'resolver-root'
		},
		{
			id: 4,
			title: 'Root Response',
			description: 'Root server responds with TLD server address for .com',
			active: ['resolver', 'root'],
			arrow: 'root-resolver'
		},
		{
			id: 5,
			title: 'Query TLD Server',
			description: 'Resolver asks .com TLD: "Where is example.com?"',
			active: ['resolver', 'tld'],
			arrow: 'resolver-tld'
		},
		{
			id: 6,
			title: 'TLD Response',
			description: 'TLD server responds with authoritative nameserver',
			active: ['resolver', 'tld'],
			arrow: 'tld-resolver'
		},
		{
			id: 7,
			title: 'Query Authoritative',
			description: 'Resolver asks authoritative server for the IP',
			active: ['resolver', 'auth'],
			arrow: 'resolver-auth'
		},
		{
			id: 8,
			title: 'Get IP Address',
			description: 'Authoritative server returns: 93.184.216.34',
			active: ['resolver', 'auth'],
			arrow: 'auth-resolver'
		},
		{
			id: 9,
			title: 'Return to Browser',
			description: 'Resolver returns IP to browser and caches it',
			active: ['browser', 'resolver'],
			arrow: 'resolver-browser'
		},
		{
			id: 10,
			title: 'Connect!',
			description: 'Browser can now connect to 93.184.216.34',
			active: ['browser'],
			arrow: null
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
</script>

<div class="space-y-6">
	<!-- Main Diagram -->
	<div class="relative bg-dark-900/50 rounded-xl p-6 min-h-[350px]">
		<!-- Browser -->
		<div class="absolute left-4 top-1/2 -translate-y-1/2">
			<div
				class="w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300
					{currentStep.active.includes('browser') ? 'border-accent-cyan bg-accent-cyan/10 scale-110' : 'border-dark-600 bg-dark-800'}"
			>
				<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
				</svg>
			</div>
			<div class="text-xs text-center mt-2 text-gray-400">Browser</div>
		</div>

		<!-- Resolver -->
		<div class="absolute left-32 top-1/2 -translate-y-1/2">
			<div
				class="w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300
					{currentStep.active.includes('resolver') ? 'border-accent-purple bg-accent-purple/10 scale-110' : 'border-dark-600 bg-dark-800'}"
			>
				<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
				</svg>
			</div>
			<div class="text-xs text-center mt-2 text-gray-400">Resolver</div>
		</div>

		<!-- Root Server -->
		<div class="absolute right-4 top-4">
			<div
				class="w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300
					{currentStep.active.includes('root') ? 'border-accent-orange bg-accent-orange/10 scale-110' : 'border-dark-600 bg-dark-800'}"
			>
				<span class="text-lg font-bold text-gray-400">.</span>
			</div>
			<div class="text-xs text-center mt-1 text-gray-500">Root</div>
		</div>

		<!-- TLD Server -->
		<div class="absolute right-4 top-1/2 -translate-y-1/2">
			<div
				class="w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300
					{currentStep.active.includes('tld') ? 'border-accent-blue bg-accent-blue/10 scale-110' : 'border-dark-600 bg-dark-800'}"
			>
				<span class="text-sm font-mono text-gray-400">.com</span>
			</div>
			<div class="text-xs text-center mt-1 text-gray-500">TLD</div>
		</div>

		<!-- Authoritative Server -->
		<div class="absolute right-4 bottom-4">
			<div
				class="w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300
					{currentStep.active.includes('auth') ? 'border-accent-green bg-accent-green/10 scale-110' : 'border-dark-600 bg-dark-800'}"
			>
				<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
				</svg>
			</div>
			<div class="text-xs text-center mt-1 text-gray-500">Auth NS</div>
		</div>

		<!-- Connection Lines (static) -->
		<svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 0;">
			<!-- Browser to Resolver -->
			<line x1="100" y1="175" x2="128" y2="175" stroke="#334155" stroke-width="2" stroke-dasharray="4" />
			<!-- Resolver to Root -->
			<line x1="200" y1="140" x2="calc(100% - 100px)" y2="60" stroke="#334155" stroke-width="2" stroke-dasharray="4" />
			<!-- Resolver to TLD -->
			<line x1="200" y1="175" x2="calc(100% - 100px)" y2="175" stroke="#334155" stroke-width="2" stroke-dasharray="4" />
			<!-- Resolver to Auth -->
			<line x1="200" y1="210" x2="calc(100% - 100px)" y2="290" stroke="#334155" stroke-width="2" stroke-dasharray="4" />
		</svg>

		<!-- Animated Arrow/Packet -->
		{#if currentStep.arrow}
			{#key step}
				<div
					class="absolute z-10"
					in:fade={{ duration: 200 }}
				>
					{#if currentStep.arrow === 'browser-resolver'}
						<div class="absolute left-[90px] top-[168px] animate-pulse">
							<div class="px-2 py-1 rounded bg-accent-cyan text-xs font-mono text-white">
								?
							</div>
						</div>
					{:else if currentStep.arrow === 'resolver-root'}
						<div class="absolute left-[55%] top-[80px] animate-pulse">
							<div class="px-2 py-1 rounded bg-accent-purple text-xs font-mono text-white">
								Where is .com?
							</div>
						</div>
					{:else if currentStep.arrow === 'root-resolver'}
						<div class="absolute left-[55%] top-[80px] animate-pulse">
							<div class="px-2 py-1 rounded bg-accent-orange text-xs font-mono text-white">
								Ask 192.5.6.30
							</div>
						</div>
					{:else if currentStep.arrow === 'resolver-tld'}
						<div class="absolute left-[55%] top-[160px] animate-pulse">
							<div class="px-2 py-1 rounded bg-accent-purple text-xs font-mono text-white">
								Where is example.com?
							</div>
						</div>
					{:else if currentStep.arrow === 'tld-resolver'}
						<div class="absolute left-[55%] top-[160px] animate-pulse">
							<div class="px-2 py-1 rounded bg-accent-blue text-xs font-mono text-white">
								Ask ns1.example.com
							</div>
						</div>
					{:else if currentStep.arrow === 'resolver-auth'}
						<div class="absolute left-[55%] top-[240px] animate-pulse">
							<div class="px-2 py-1 rounded bg-accent-purple text-xs font-mono text-white">
								IP for www.example.com?
							</div>
						</div>
					{:else if currentStep.arrow === 'auth-resolver'}
						<div class="absolute left-[55%] top-[240px] animate-pulse">
							<div class="px-2 py-1 rounded bg-accent-green text-xs font-mono text-white">
								93.184.216.34
							</div>
						</div>
					{:else if currentStep.arrow === 'resolver-browser'}
						<div class="absolute left-[90px] top-[168px] animate-pulse">
							<div class="px-2 py-1 rounded bg-accent-green text-xs font-mono text-white">
								93.184.216.34
							</div>
						</div>
					{/if}
				</div>
			{/key}
		{/if}
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
			<div class="text-sm text-accent-cyan font-medium">Step {step + 1}: {currentStep.title}</div>
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

	<!-- Summary Box -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-cyan text-xl">⚡</div>
			<div>
				<h4 class="text-sm font-medium text-white">Why so many steps?</h4>
				<p class="text-sm text-gray-400 mt-1">
					This iterative process only happens on the <strong class="text-gray-300">first lookup</strong>.
					Results are cached at each level, so subsequent requests are much faster.
					A typical cached lookup takes <strong class="text-accent-green">~1-5ms</strong> instead of ~100ms+.
				</p>
			</div>
		</div>
	</div>
</div>
