<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const steps = [
		{
			id: 0,
			title: 'Application Creates Data',
			description: 'Your browser creates an HTTP request to fetch a webpage',
			activeNodes: ['computer']
		},
		{
			id: 1,
			title: 'Data Split into Packets',
			description: 'Large data is broken into smaller packets (typically 1500 bytes max)',
			activeNodes: ['computer']
		},
		{
			id: 2,
			title: 'Packets Leave Your Device',
			description: 'Packets are sent to your home router via Wi-Fi or Ethernet',
			activeNodes: ['computer', 'router']
		},
		{
			id: 3,
			title: 'Router Forwards to ISP',
			description: 'Your router sends packets to your ISP\'s network',
			activeNodes: ['router', 'isp']
		},
		{
			id: 4,
			title: 'ISP Routes Through Internet',
			description: 'Packets hop through multiple routers across different networks',
			activeNodes: ['isp', 'internet']
		},
		{
			id: 5,
			title: 'Reach Destination Network',
			description: 'Packets arrive at the server\'s network/data center',
			activeNodes: ['internet', 'destNetwork']
		},
		{
			id: 6,
			title: 'Server Receives Packets',
			description: 'Server reassembles packets and processes the request',
			activeNodes: ['destNetwork', 'server']
		},
		{
			id: 7,
			title: 'Response Travels Back',
			description: 'Server sends response packets back through the same process',
			activeNodes: ['server', 'destNetwork', 'internet', 'isp', 'router', 'computer']
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

	// Reactive active states for each node
	$: computerActive = currentStep.activeNodes.includes('computer');
	$: routerActive = currentStep.activeNodes.includes('router');
	$: ispActive = currentStep.activeNodes.includes('isp');
	$: internetActive = currentStep.activeNodes.includes('internet');
	$: destNetworkActive = currentStep.activeNodes.includes('destNetwork');
	$: serverActive = currentStep.activeNodes.includes('server');
</script>

<div class="space-y-6">
	<!-- Journey Visualization -->
	<div class="relative bg-dark-900/50 rounded-xl p-6 overflow-x-auto">
		<div class="flex items-center justify-between min-w-[600px] gap-2">
			<!-- Your Computer -->
			<div class="flex flex-col items-center">
				<div
					class="w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300
						{computerActive ? 'border-accent-cyan bg-accent-cyan/10 scale-110' : 'border-dark-600 bg-dark-800'}"
				>
					<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<span class="text-xs text-gray-500 mt-2">Your PC</span>
			</div>

			<div class="text-2xl transition-all duration-300 {routerActive ? 'text-accent-green' : 'text-gray-600'}">→</div>

			<!-- Home Router -->
			<div class="flex flex-col items-center">
				<div
					class="w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all duration-300
						{routerActive ? 'border-accent-green bg-accent-green/10 scale-110' : 'border-dark-600 bg-dark-800'}"
				>
					<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
					</svg>
				</div>
				<span class="text-xs text-gray-500 mt-2">Router</span>
			</div>

			<div class="text-2xl transition-all duration-300 {ispActive ? 'text-accent-purple' : 'text-gray-600'}">→</div>

			<!-- ISP -->
			<div class="flex flex-col items-center">
				<div
					class="w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all duration-300
						{ispActive ? 'border-accent-purple bg-accent-purple/10 scale-110' : 'border-dark-600 bg-dark-800'}"
				>
					<span class="text-xs font-bold text-gray-400">ISP</span>
				</div>
				<span class="text-xs text-gray-500 mt-2">Your ISP</span>
			</div>

			<div class="text-2xl transition-all duration-300 {internetActive ? 'text-accent-yellow' : 'text-gray-600'}">→</div>

			<!-- Internet Cloud -->
			<div class="flex flex-col items-center">
				<div
					class="w-20 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300
						{internetActive ? 'border-accent-yellow bg-accent-yellow/10 scale-110' : 'border-dark-600 bg-dark-800'}"
				>
					<span class="text-2xl">☁️</span>
				</div>
				<span class="text-xs text-gray-500 mt-2">Internet</span>
			</div>

			<div class="text-2xl transition-all duration-300 {destNetworkActive ? 'text-accent-orange' : 'text-gray-600'}">→</div>

			<!-- Destination Network -->
			<div class="flex flex-col items-center">
				<div
					class="w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all duration-300
						{destNetworkActive ? 'border-accent-orange bg-accent-orange/10 scale-110' : 'border-dark-600 bg-dark-800'}"
				>
					<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
				</div>
				<span class="text-xs text-gray-500 mt-2">Data Center</span>
			</div>

			<div class="text-2xl transition-all duration-300 {serverActive ? 'text-accent-blue' : 'text-gray-600'}">→</div>

			<!-- Server -->
			<div class="flex flex-col items-center">
				<div
					class="w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300
						{serverActive ? 'border-accent-blue bg-accent-blue/10 scale-110' : 'border-dark-600 bg-dark-800'}"
				>
					<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
					</svg>
				</div>
				<span class="text-xs text-gray-500 mt-2">Server</span>
			</div>
		</div>
	</div>

	<!-- Step Progress -->
	<div class="flex justify-center gap-1 flex-wrap">
		{#each steps as s}
			<button
				on:click={() => goToStep(s.id)}
				class="w-8 h-2 rounded-full transition-all
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
			<div class="text-sm text-accent-green font-medium">Step {step + 1}: {currentStep.title}</div>
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

	<!-- Hop Count Info -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-start gap-3">
				<div class="text-accent-yellow text-xl">🔢</div>
				<div>
					<h4 class="text-sm font-medium text-white">Hop Count</h4>
					<p class="text-xs text-gray-400 mt-1">
						Each router a packet passes through is called a "hop". A typical request
						might go through <strong class="text-accent-yellow">10-20 hops</strong>.
						Use <code class="text-accent-cyan">traceroute</code> to see the path.
					</p>
				</div>
			</div>
		</div>
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-start gap-3">
				<div class="text-accent-orange text-xl">⏱️</div>
				<div>
					<h4 class="text-sm font-medium text-white">Round-Trip Time (RTT)</h4>
					<p class="text-xs text-gray-400 mt-1">
						Time for a packet to go and return. Same city: <strong class="text-accent-green">~5-20ms</strong>.
						Cross-continent: <strong class="text-accent-yellow">~100-200ms</strong>.
						Speed of light is the physical limit.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
