<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface ReadyState {
		value: number;
		name: string;
		description: string;
		color: string;
		bgColor: string;
	}

	interface WsEvent {
		name: string;
		description: string;
		code: string;
		color: string;
		bgColor: string;
	}

	const readyStates: ReadyState[] = [
		{
			value: 0,
			name: 'CONNECTING',
			description: 'Connection has not yet been established. The WebSocket handshake is in progress.',
			color: 'text-accent-yellow',
			bgColor: 'bg-accent-yellow/10 border-accent-yellow/30'
		},
		{
			value: 1,
			name: 'OPEN',
			description: 'Connection is established and communication is possible. Messages can be sent and received.',
			color: 'text-accent-green',
			bgColor: 'bg-accent-green/10 border-accent-green/30'
		},
		{
			value: 2,
			name: 'CLOSING',
			description: 'Connection is going through the closing handshake. A close frame has been sent or received.',
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10 border-accent-orange/30'
		},
		{
			value: 3,
			name: 'CLOSED',
			description: 'Connection has been closed or could not be opened. No further communication is possible.',
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10 border-accent-pink/30'
		}
	];

	const events: WsEvent[] = [
		{
			name: 'onopen',
			description: 'Fired when the connection is successfully established',
			code: `ws.onopen = (event) => {
  console.log('Connected!');
  ws.send('Hello Server');
};`,
			color: 'text-accent-green',
			bgColor: 'bg-accent-green/10 border-accent-green/30'
		},
		{
			name: 'onmessage',
			description: 'Fired when a message is received from the server',
			code: `ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};`,
			color: 'text-accent-blue',
			bgColor: 'bg-accent-blue/10 border-accent-blue/30'
		},
		{
			name: 'onerror',
			description: 'Fired when an error occurs on the connection',
			code: `ws.onerror = (event) => {
  console.error('WebSocket error');
  // Note: error details are limited
  // for security reasons
};`,
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10 border-accent-orange/30'
		},
		{
			name: 'onclose',
			description: 'Fired when the connection is closed',
			code: `ws.onclose = (event) => {
  console.log('Code:', event.code);
  console.log('Reason:', event.reason);
  console.log('Clean:', event.wasClean);
};`,
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10 border-accent-pink/30'
		}
	];

	let selectedEvent: WsEvent | null = null;
	let selectedState: ReadyState | null = null;
</script>

<div class="space-y-8">
	<!-- Ready States Flow -->
	<div>
		<h4 class="text-sm font-medium text-gray-400 mb-4">WebSocket Ready States</h4>
		<div class="flex flex-wrap items-center justify-center gap-2 md:gap-3">
			{#each readyStates as state, i}
				<button
					class="px-4 py-3 rounded-lg border transition-all duration-200 text-left
						{selectedState?.value === state.value
							? state.bgColor + ' scale-105'
							: 'bg-dark-800/50 border-dark-700 hover:border-dark-600'}"
					on:click={() => selectedState = selectedState?.value === state.value ? null : state}
					in:fly={{ y: 10, delay: i * 50 }}
				>
					<div class="font-mono text-sm {state.color}">{state.value}</div>
					<div class="text-xs text-gray-300 mt-1">{state.name}</div>
				</button>

				{#if i < readyStates.length - 1}
					<svg class="w-5 h-5 text-gray-600 flex-shrink-0 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				{/if}
			{/each}
		</div>

		{#if selectedState}
			<div
				class="mt-4 rounded-lg border {selectedState.bgColor} p-4"
				transition:slide={{ duration: 200 }}
			>
				<div class="flex items-start gap-3">
					<span class="font-mono text-2xl {selectedState.color}">{selectedState.value}</span>
					<div>
						<h4 class="font-medium {selectedState.color}">{selectedState.name}</h4>
						<p class="text-sm text-gray-400 mt-1">{selectedState.description}</p>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Events -->
	<div>
		<h4 class="text-sm font-medium text-gray-400 mb-4">WebSocket Events</h4>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
			{#each events as event, i}
				<button
					class="p-4 rounded-lg border transition-all duration-200 text-left
						{selectedEvent?.name === event.name
							? event.bgColor + ' scale-105'
							: 'bg-dark-800/50 border-dark-700 hover:border-dark-600'}"
					on:click={() => selectedEvent = selectedEvent?.name === event.name ? null : event}
					in:fly={{ y: 10, delay: i * 50 }}
				>
					<div class="font-mono text-sm {event.color}">{event.name}</div>
					<p class="text-xs text-gray-500 mt-1">{event.description}</p>
				</button>
			{/each}
		</div>

		{#if selectedEvent}
			<div
				class="mt-4 rounded-lg border {selectedEvent.bgColor} p-4"
				transition:slide={{ duration: 200 }}
			>
				<div class="font-mono font-bold {selectedEvent.color} mb-3">{selectedEvent.name}</div>
				<pre class="p-3 rounded bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{selectedEvent.code}</code></pre>
			</div>
		{:else}
			<div class="text-center py-4 text-gray-500 text-sm">
				Click an event to see example code
			</div>
		{/if}
	</div>

	<!-- Basic Usage -->
	<div>
		<h4 class="text-sm font-medium text-gray-400 mb-4">Creating a WebSocket Connection</h4>
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<pre class="text-sm text-gray-300 overflow-x-auto"><code>{`// Create a new WebSocket connection
const ws = new WebSocket('wss://api.example.com/ws');

// Send data (only when readyState is OPEN)
ws.send(JSON.stringify({ type: 'chat', message: 'Hello!' }));

// Close the connection gracefully
ws.close(1000, 'Normal closure');`}</code></pre>
		</div>
	</div>

	<!-- Close Codes -->
	<div>
		<h4 class="text-sm font-medium text-gray-400 mb-4">Common Close Codes</h4>
		<div class="space-y-2">
			{#each [
				{ code: '1000', name: 'Normal Closure', desc: 'Connection fulfilled its purpose' },
				{ code: '1001', name: 'Going Away', desc: 'Server shutting down or page navigating away' },
				{ code: '1006', name: 'Abnormal Closure', desc: 'Connection dropped without close frame' },
				{ code: '1008', name: 'Policy Violation', desc: 'Message violated server policy' },
				{ code: '1011', name: 'Internal Error', desc: 'Unexpected server condition' }
			] as item, i}
				<div
					class="p-3 rounded-lg bg-dark-800/50 border border-dark-700 flex items-center gap-4"
					in:fly={{ y: 10, delay: i * 50 }}
				>
					<span class="font-mono text-accent-pink w-12">{item.code}</span>
					<span class="text-gray-300 font-medium text-sm">{item.name}</span>
					<span class="text-gray-500 text-sm ml-auto hidden md:block">{item.desc}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
