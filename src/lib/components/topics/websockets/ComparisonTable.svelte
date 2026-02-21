<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Approach {
		name: string;
		description: string;
		direction: string;
		latency: string;
		overhead: string;
		useCase: string;
		color: string;
		bgColor: string;
		icon: string;
	}

	const approaches: Approach[] = [
		{
			name: 'HTTP Polling',
			description: 'Client repeatedly asks server for new data at fixed intervals. Simple but wasteful.',
			direction: 'Client → Server',
			latency: 'High (polling interval)',
			overhead: 'High (repeated HTTP headers)',
			useCase: 'Simple dashboards, low-frequency updates',
			color: 'text-accent-blue',
			bgColor: 'bg-accent-blue/10 border-accent-blue/30',
			icon: '🔄'
		},
		{
			name: 'Long Polling',
			description: 'Client sends request, server holds it open until new data is available, then responds.',
			direction: 'Client → Server (held)',
			latency: 'Medium',
			overhead: 'Medium (fewer requests)',
			useCase: 'Chat apps without WebSocket support',
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10 border-accent-orange/30',
			icon: '⏳'
		},
		{
			name: 'Server-Sent Events',
			description: 'Server pushes data to client over a persistent HTTP connection. One-directional only.',
			direction: 'Server → Client',
			latency: 'Low',
			overhead: 'Low (single connection)',
			useCase: 'Live feeds, notifications, stock tickers',
			color: 'text-accent-cyan',
			bgColor: 'bg-accent-cyan/10 border-accent-cyan/30',
			icon: '📡'
		},
		{
			name: 'WebSockets',
			description: 'Full-duplex, bi-directional communication over a single persistent TCP connection.',
			direction: 'Client ↔ Server',
			latency: 'Very Low',
			overhead: 'Very Low (2-byte frame header)',
			useCase: 'Chat, gaming, collaborative editing, trading',
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10 border-accent-pink/30',
			icon: '⚡'
		}
	];

	let selectedApproach: Approach | null = null;
</script>

<div class="space-y-6">
	<!-- Approach Cards -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
		{#each approaches as approach, i}
			<button
				class="p-4 rounded-lg border transition-all duration-200 text-left
					{selectedApproach?.name === approach.name
						? approach.bgColor + ' scale-105'
						: 'bg-dark-800/50 border-dark-700 hover:border-dark-600'}"
				on:click={() => selectedApproach = selectedApproach?.name === approach.name ? null : approach}
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="text-2xl mb-2">{approach.icon}</div>
				<div class="font-medium text-sm {approach.color}">{approach.name}</div>
				<div class="text-xs text-gray-500 mt-1">{approach.direction}</div>
			</button>
		{/each}
	</div>

	<!-- Selected Details -->
	{#if selectedApproach}
		<div
			class="rounded-lg border {selectedApproach.bgColor} p-6"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="flex items-start gap-4">
				<span class="text-3xl">{selectedApproach.icon}</span>
				<div class="flex-1">
					<h4 class="font-bold text-lg {selectedApproach.color}">{selectedApproach.name}</h4>
					<p class="text-gray-300 mt-2">{selectedApproach.description}</p>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
						<div>
							<span class="text-xs text-gray-500 uppercase tracking-wide">Latency</span>
							<p class="text-sm text-gray-300 mt-1">{selectedApproach.latency}</p>
						</div>
						<div>
							<span class="text-xs text-gray-500 uppercase tracking-wide">Overhead</span>
							<p class="text-sm text-gray-300 mt-1">{selectedApproach.overhead}</p>
						</div>
						<div>
							<span class="text-xs text-gray-500 uppercase tracking-wide">Best For</span>
							<p class="text-sm text-gray-300 mt-1">{selectedApproach.useCase}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="text-center py-6 text-gray-500 text-sm">
			Click on an approach to compare details
		</div>
	{/if}

	<!-- Visual Comparison -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<h4 class="text-sm font-medium text-gray-400 mb-4">Connection Patterns</h4>
		<div class="space-y-4">
			<!-- Polling -->
			<div class="flex items-center gap-3">
				<span class="text-xs text-accent-blue w-24 font-mono">Polling</span>
				<div class="flex-1 flex items-center gap-1">
					{#each Array(6) as _, i}
						<div class="flex items-center gap-1">
							<div class="w-6 h-1 bg-accent-blue/60 rounded"></div>
							<div class="w-2 h-1 bg-dark-600 rounded"></div>
							<div class="w-6 h-1 bg-accent-green/60 rounded"></div>
							{#if i < 5}
								<div class="w-4 h-1 bg-dark-700 rounded"></div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- Long Polling -->
			<div class="flex items-center gap-3">
				<span class="text-xs text-accent-orange w-24 font-mono">Long Poll</span>
				<div class="flex-1 flex items-center gap-1">
					<div class="w-6 h-1 bg-accent-orange/60 rounded"></div>
					<div class="w-16 h-1 bg-dark-600 rounded animate-pulse-slow"></div>
					<div class="w-6 h-1 bg-accent-green/60 rounded"></div>
					<div class="w-6 h-1 bg-accent-orange/60 rounded"></div>
					<div class="w-10 h-1 bg-dark-600 rounded animate-pulse-slow"></div>
					<div class="w-6 h-1 bg-accent-green/60 rounded"></div>
					<div class="w-6 h-1 bg-accent-orange/60 rounded"></div>
					<div class="w-20 h-1 bg-dark-600 rounded animate-pulse-slow"></div>
					<div class="w-6 h-1 bg-accent-green/60 rounded"></div>
				</div>
			</div>

			<!-- SSE -->
			<div class="flex items-center gap-3">
				<span class="text-xs text-accent-cyan w-24 font-mono">SSE</span>
				<div class="flex-1 flex items-center gap-1">
					<div class="w-6 h-1 bg-accent-cyan/60 rounded"></div>
					<div class="flex-1 h-1 bg-accent-green/40 rounded relative overflow-hidden">
						<div class="absolute inset-0 bg-gradient-to-r from-accent-green/60 via-accent-green/20 to-accent-green/60 animate-slide-right"></div>
					</div>
				</div>
			</div>

			<!-- WebSocket -->
			<div class="flex items-center gap-3">
				<span class="text-xs text-accent-pink w-24 font-mono">WebSocket</span>
				<div class="flex-1 flex items-center gap-1">
					<div class="w-6 h-1 bg-accent-pink/60 rounded"></div>
					<div class="flex-1 h-1 bg-accent-pink/40 rounded relative overflow-hidden">
						<div class="absolute inset-0 bg-gradient-to-r from-accent-pink/60 via-accent-blue/40 to-accent-pink/60 animate-slide-right"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex items-center gap-4 mt-4 text-xs text-gray-500">
			<div class="flex items-center gap-1">
				<div class="w-3 h-1 bg-accent-blue/60 rounded"></div>
				<span>Request</span>
			</div>
			<div class="flex items-center gap-1">
				<div class="w-3 h-1 bg-accent-green/60 rounded"></div>
				<span>Response</span>
			</div>
			<div class="flex items-center gap-1">
				<div class="w-3 h-1 bg-dark-600 rounded"></div>
				<span>Waiting</span>
			</div>
			<div class="flex items-center gap-1">
				<div class="w-3 h-1 bg-accent-pink/40 rounded"></div>
				<span>Bi-directional</span>
			</div>
		</div>
	</div>
</div>
