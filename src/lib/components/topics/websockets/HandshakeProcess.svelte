<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const steps = [
		{
			id: 0,
			title: 'HTTP Request (Upgrade)',
			description: 'Client sends a regular HTTP request with Upgrade: websocket header and a random Sec-WebSocket-Key',
			from: 'client',
			color: 'blue',
			code: `GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZQ==
Sec-WebSocket-Version: 13`
		},
		{
			id: 1,
			title: '101 Switching Protocols',
			description: 'Server agrees to the upgrade and responds with 101 status code and Sec-WebSocket-Accept hash',
			from: 'server',
			color: 'green',
			code: `HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`
		},
		{
			id: 2,
			title: 'Connection Established',
			description: 'The TCP connection is now upgraded from HTTP to WebSocket protocol. Both sides can send data freely.',
			from: 'both',
			color: 'pink',
			code: null
		},
		{
			id: 3,
			title: 'Bi-directional Messages',
			description: 'Client and server exchange messages as WebSocket frames. No HTTP overhead per message.',
			from: 'both',
			color: 'cyan',
			code: null
		},
		{
			id: 4,
			title: 'Close Handshake',
			description: 'Either side sends a close frame. The other side acknowledges. TCP connection is terminated.',
			from: 'client',
			color: 'orange',
			code: null
		}
	];

	const colorMap: Record<string, string> = {
		blue: 'border-accent-blue bg-accent-blue/10',
		green: 'border-accent-green bg-accent-green/10',
		pink: 'border-accent-pink bg-accent-pink/10',
		cyan: 'border-accent-cyan bg-accent-cyan/10',
		orange: 'border-accent-orange bg-accent-orange/10'
	};

	function startAnimation() {
		intervalId = setInterval(() => {
			step = (step + 1) % steps.length;
		}, 4000);
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
		<div class="flex justify-between items-start mb-8">
			<!-- Client -->
			<div class="w-28 text-center">
				<div
					class="w-16 h-16 mx-auto rounded-xl border-2 flex items-center justify-center transition-all duration-300
						{steps[step].from === 'client' || steps[step].from === 'both' ? 'border-accent-pink bg-accent-pink/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<div class="mt-2 text-sm font-medium text-gray-300">Client</div>
			</div>

			<!-- Connection Area -->
			<div class="flex-1 px-4 relative">
				<div class="absolute top-8 left-0 right-0 h-0.5 bg-dark-600"></div>

				{#key step}
					{#if steps[step].from === 'client'}
						<div
							class="absolute top-5 left-0"
							in:fly={{ x: -50, duration: 500 }}
						>
							<div
								class="px-3 py-1.5 rounded border text-xs font-mono whitespace-nowrap {colorMap[steps[step].color]}"
								style="animation: slideRight 2s ease-in-out"
							>
								{steps[step].title}
							</div>
						</div>
					{:else if steps[step].from === 'server'}
						<div
							class="absolute top-5 right-0"
							in:fly={{ x: 50, duration: 500 }}
						>
							<div
								class="px-3 py-1.5 rounded border text-xs font-mono whitespace-nowrap {colorMap[steps[step].color]}"
								style="animation: slideLeft 2s ease-in-out"
							>
								{steps[step].title}
							</div>
						</div>
					{:else}
						<div class="absolute top-2 left-1/2 -translate-x-1/2" in:fade>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 rounded-full bg-accent-pink animate-pulse"></div>
								<span class="text-xs text-accent-pink font-medium">{step === 2 ? 'Connected' : step === 3 ? 'Messaging' : ''}</span>
								<div class="w-3 h-3 rounded-full bg-accent-pink animate-pulse"></div>
							</div>
						</div>
					{/if}
				{/key}
			</div>

			<!-- Server -->
			<div class="w-28 text-center">
				<div
					class="w-16 h-16 mx-auto rounded-xl border-2 flex items-center justify-center transition-all duration-300
						{steps[step].from === 'server' || steps[step].from === 'both' ? 'border-accent-green bg-accent-green/10 scale-105' : 'border-dark-600 bg-dark-800'}"
				>
					<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
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
						{step === s.id ? 'bg-accent-pink' : 'bg-dark-600 hover:bg-dark-500'}"
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

		<!-- Code Preview -->
		{#key step}
			{#if steps[step].code}
				<div class="mt-4" in:fly={{ y: 10, duration: 200 }}>
					<pre class="p-4 rounded-lg bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{steps[step].code}</code></pre>
				</div>
			{/if}
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

	<!-- Key Upgrade Headers -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-center gap-2 mb-2">
				<div class="w-2 h-2 rounded-full bg-accent-blue"></div>
				<span class="text-sm font-medium text-white">Sec-WebSocket-Key</span>
			</div>
			<p class="text-xs text-gray-400">
				Random base64-encoded value sent by client. Server hashes it with a GUID to prove it received the request.
			</p>
		</div>
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-center gap-2 mb-2">
				<div class="w-2 h-2 rounded-full bg-accent-green"></div>
				<span class="text-sm font-medium text-white">Sec-WebSocket-Accept</span>
			</div>
			<p class="text-xs text-gray-400">
				Server's proof of understanding. Computed by concatenating the key with a magic GUID and taking the SHA-1 hash.
			</p>
		</div>
	</div>
</div>
