<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const steps = [
		{
			id: 0,
			title: 'Client Hello',
			description: 'Client sends supported TLS versions, cipher suites, and a random number',
			from: 'client',
			color: 'blue'
		},
		{
			id: 1,
			title: 'Server Hello',
			description: 'Server chooses TLS version, cipher suite, and sends its certificate',
			from: 'server',
			color: 'green'
		},
		{
			id: 2,
			title: 'Certificate Verification',
			description: 'Client verifies server certificate against trusted Certificate Authorities (CAs)',
			from: 'client',
			color: 'purple'
		},
		{
			id: 3,
			title: 'Key Exchange',
			description: 'Client generates pre-master secret, encrypts with server public key',
			from: 'client',
			color: 'orange'
		},
		{
			id: 4,
			title: 'Session Keys',
			description: 'Both derive session keys from pre-master secret. Handshake complete!',
			from: 'both',
			color: 'cyan'
		},
		{
			id: 5,
			title: 'Encrypted Communication',
			description: 'All HTTP data is now encrypted with symmetric session keys',
			from: 'both',
			color: 'green'
		}
	];

	const colorMap: Record<string, string> = {
		blue: 'border-accent-blue bg-accent-blue/10',
		green: 'border-accent-green bg-accent-green/10',
		purple: 'border-accent-purple bg-accent-purple/10',
		orange: 'border-accent-orange bg-accent-orange/10',
		cyan: 'border-accent-cyan bg-accent-cyan/10'
	};

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
</script>

<div class="space-y-6">
	<!-- Main Diagram -->
	<div class="relative">
		<!-- Timeline -->
		<div class="flex justify-between items-start mb-8">
			<!-- Client -->
			<div class="w-28 text-center">
				<div
					class="w-16 h-16 mx-auto rounded-xl border-2 flex items-center justify-center transition-all
						{steps[step].from === 'client' || steps[step].from === 'both' ? 'border-accent-purple bg-accent-purple/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
					</svg>
				</div>
				<div class="mt-2 text-sm font-medium text-gray-300">Client</div>
			</div>

			<!-- Connection Area -->
			<div class="flex-1 px-4 relative">
				<!-- Base Line -->
				<div class="absolute top-8 left-0 right-0 h-0.5 bg-dark-600"></div>

				<!-- Message Animation -->
				{#key step}
					{#if steps[step].from !== 'both'}
						<div
							class="absolute top-5 {steps[step].from === 'client' ? 'left-0' : 'right-0'}"
							in:fly={{ x: steps[step].from === 'client' ? -50 : 50, duration: 500 }}
						>
							<div
								class="px-3 py-1.5 rounded border text-xs font-mono whitespace-nowrap {colorMap[steps[step].color]}"
								style="{steps[step].from === 'client' ? 'animation: slideRight 2s ease-in-out' : 'animation: slideLeft 2s ease-in-out'}"
							>
								{steps[step].title}
							</div>
						</div>
					{:else}
						<div class="absolute top-2 left-1/2 -translate-x-1/2" in:fade>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 rounded-full bg-accent-green animate-pulse"></div>
								<span class="text-xs text-accent-green font-medium">Secure</span>
								<div class="w-3 h-3 rounded-full bg-accent-green animate-pulse"></div>
							</div>
						</div>
					{/if}
				{/key}
			</div>

			<!-- Server -->
			<div class="w-28 text-center">
				<div
					class="w-16 h-16 mx-auto rounded-xl border-2 flex items-center justify-center transition-all
						{steps[step].from === 'server' || steps[step].from === 'both' ? 'border-accent-green bg-accent-green/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
					</svg>
				</div>
				<div class="mt-2 text-sm font-medium text-gray-300">Server</div>
			</div>
		</div>

		<!-- Step Progress -->
		<div class="flex justify-center gap-2 mb-4">
			{#each steps as s}
				<button
					on:click={() => goToStep(s.id)}
					class="w-8 h-2 rounded-full transition-all
						{step === s.id ? 'bg-accent-purple' : 'bg-dark-600 hover:bg-dark-500'}"
				></button>
			{/each}
		</div>

		<!-- Current Step Info -->
		{#key step}
			<div
				class="text-center p-4 rounded-lg border {colorMap[steps[step].color]}"
				in:fly={{ y: 10, duration: 200 }}
			>
				<div class="font-medium text-white">{steps[step].title}</div>
				<p class="text-sm text-gray-400 mt-1">{steps[step].description}</p>
			</div>
		{/key}
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

	<!-- Encryption Types -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-center gap-2 mb-2">
				<div class="w-2 h-2 rounded-full bg-accent-orange"></div>
				<span class="text-sm font-medium text-white">Asymmetric Encryption</span>
			</div>
			<p class="text-xs text-gray-400">
				Used during handshake. Public key encrypts, private key decrypts.
				Slower but secure for key exchange.
			</p>
		</div>
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-center gap-2 mb-2">
				<div class="w-2 h-2 rounded-full bg-accent-cyan"></div>
				<span class="text-sm font-medium text-white">Symmetric Encryption</span>
			</div>
			<p class="text-xs text-gray-400">
				Used after handshake. Same key for encrypt/decrypt.
				Fast, efficient for data transfer.
			</p>
		</div>
	</div>

	<!-- Interview Note -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-purple text-xl">🔐</div>
			<div>
				<h4 class="text-sm font-medium text-white">Why HTTPS Matters</h4>
				<ul class="text-sm text-gray-400 mt-2 space-y-1">
					<li>• <strong class="text-gray-300">Encryption:</strong> Data cannot be read by eavesdroppers</li>
					<li>• <strong class="text-gray-300">Authentication:</strong> Proves you're talking to the real server</li>
					<li>• <strong class="text-gray-300">Integrity:</strong> Data cannot be modified in transit</li>
				</ul>
			</div>
		</div>
	</div>
</div>
