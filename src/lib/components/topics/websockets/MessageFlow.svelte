<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	interface Message {
		id: number;
		from: 'client' | 'server';
		type: 'text' | 'binary' | 'ping' | 'pong';
		content: string;
		color: string;
	}

	let messages: Message[] = [];
	let messageId = 0;
	let intervalId: ReturnType<typeof setInterval>;
	let isPlaying = true;

	const messageSequence: Omit<Message, 'id'>[] = [
		{ from: 'client', type: 'text', content: '{"action": "subscribe", "channel": "stocks"}', color: 'text-accent-blue' },
		{ from: 'server', type: 'text', content: '{"status": "subscribed", "channel": "stocks"}', color: 'text-accent-green' },
		{ from: 'server', type: 'text', content: '{"AAPL": 178.52, "GOOGL": 141.80}', color: 'text-accent-green' },
		{ from: 'server', type: 'text', content: '{"AAPL": 178.65, "GOOGL": 141.92}', color: 'text-accent-green' },
		{ from: 'client', type: 'text', content: '{"action": "unsubscribe", "channel": "stocks"}', color: 'text-accent-blue' },
		{ from: 'server', type: 'text', content: '{"status": "unsubscribed"}', color: 'text-accent-green' },
		{ from: 'client', type: 'ping', content: 'ping', color: 'text-accent-yellow' },
		{ from: 'server', type: 'pong', content: 'pong', color: 'text-accent-yellow' },
	];

	let seqIndex = 0;

	function addMessage() {
		const msg = messageSequence[seqIndex];
		messages = [...messages.slice(-5), { ...msg, id: messageId++ }];
		seqIndex = (seqIndex + 1) % messageSequence.length;
	}

	function startAnimation() {
		intervalId = setInterval(addMessage, 2000);
	}

	function togglePlay() {
		isPlaying = !isPlaying;
		if (isPlaying) {
			startAnimation();
		} else {
			clearInterval(intervalId);
		}
	}

	function reset() {
		messages = [];
		seqIndex = 0;
		messageId = 0;
		if (!isPlaying) {
			isPlaying = true;
		} else {
			clearInterval(intervalId);
		}
		startAnimation();
	}

	onMount(() => {
		startAnimation();
		return () => clearInterval(intervalId);
	});
</script>

<div class="space-y-6">
	<!-- Live Message Stream -->
	<div class="flex gap-4 items-start">
		<!-- Client Label -->
		<div class="w-20 text-center flex-shrink-0 pt-2">
			<div class="w-12 h-12 mx-auto rounded-lg border-2 border-accent-pink bg-accent-pink/10 flex items-center justify-center">
				<svg class="w-6 h-6 text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</div>
			<span class="text-xs text-gray-400 mt-1 block">Client</span>
		</div>

		<!-- Message Area -->
		<div class="flex-1 min-h-[280px] rounded-lg border border-dark-700 bg-dark-800/30 p-4 overflow-hidden">
			{#if messages.length === 0}
				<div class="flex items-center justify-center h-full text-gray-500 text-sm">
					Messages will appear here...
				</div>
			{:else}
				<div class="space-y-2">
					{#each messages as msg (msg.id)}
						<div
							class="flex {msg.from === 'client' ? 'justify-start' : 'justify-end'}"
							in:fly={{ x: msg.from === 'client' ? -30 : 30, duration: 300 }}
						>
							<div
								class="max-w-[85%] px-3 py-2 rounded-lg text-xs font-mono
									{msg.from === 'client'
										? 'bg-accent-blue/10 border border-accent-blue/30'
										: 'bg-accent-green/10 border border-accent-green/30'}"
							>
								{#if msg.type === 'ping' || msg.type === 'pong'}
									<span class="text-accent-yellow">[{msg.type.toUpperCase()}]</span>
								{:else}
									<span class={msg.color}>{msg.content}</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Server Label -->
		<div class="w-20 text-center flex-shrink-0 pt-2">
			<div class="w-12 h-12 mx-auto rounded-lg border-2 border-accent-green bg-accent-green/10 flex items-center justify-center">
				<svg class="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
				</svg>
			</div>
			<span class="text-xs text-gray-400 mt-1 block">Server</span>
		</div>
	</div>

	<!-- Controls -->
	<div class="flex justify-center gap-3">
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
		<button
			on:click={reset}
			class="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors text-sm"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
			</svg>
			Reset
		</button>
	</div>

	<!-- Message Types -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
		<div class="p-3 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-center gap-2 mb-1">
				<div class="w-2 h-2 rounded-full bg-accent-blue"></div>
				<span class="text-xs font-medium text-white">Text Frame</span>
			</div>
			<p class="text-xs text-gray-500">UTF-8 encoded text data (JSON, plain text)</p>
		</div>
		<div class="p-3 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-center gap-2 mb-1">
				<div class="w-2 h-2 rounded-full bg-accent-purple"></div>
				<span class="text-xs font-medium text-white">Binary Frame</span>
			</div>
			<p class="text-xs text-gray-500">Raw binary data (images, audio, files)</p>
		</div>
		<div class="p-3 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-center gap-2 mb-1">
				<div class="w-2 h-2 rounded-full bg-accent-yellow"></div>
				<span class="text-xs font-medium text-white">Ping / Pong</span>
			</div>
			<p class="text-xs text-gray-500">Keep-alive heartbeat frames</p>
		</div>
		<div class="p-3 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-center gap-2 mb-1">
				<div class="w-2 h-2 rounded-full bg-accent-orange"></div>
				<span class="text-xs font-medium text-white">Close Frame</span>
			</div>
			<p class="text-xs text-gray-500">Graceful connection termination</p>
		</div>
	</div>
</div>
