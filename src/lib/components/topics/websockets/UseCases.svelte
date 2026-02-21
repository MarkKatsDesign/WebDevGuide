<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface UseCase {
		name: string;
		description: string;
		examples: string[];
		whyWebSockets: string;
		icon: string;
		color: string;
		bgColor: string;
	}

	const useCases: UseCase[] = [
		{
			name: 'Real-Time Chat',
			description: 'Instant messaging between users with typing indicators and read receipts.',
			examples: ['Slack', 'Discord', 'WhatsApp Web'],
			whyWebSockets: 'Messages must arrive instantly. Polling would add unacceptable latency and waste bandwidth.',
			icon: '💬',
			color: 'text-accent-blue',
			bgColor: 'bg-accent-blue/10 border-accent-blue/30'
		},
		{
			name: 'Live Gaming',
			description: 'Multiplayer games requiring real-time state synchronization between players.',
			examples: ['Browser games', 'Turn-based games', 'Real-time strategy'],
			whyWebSockets: 'Game state must be synced across all players with minimal latency for smooth gameplay.',
			icon: '🎮',
			color: 'text-accent-green',
			bgColor: 'bg-accent-green/10 border-accent-green/30'
		},
		{
			name: 'Financial Trading',
			description: 'Live stock prices, cryptocurrency rates, and order book updates.',
			examples: ['Stock tickers', 'Crypto exchanges', 'Trading platforms'],
			whyWebSockets: 'Price data changes multiple times per second. HTTP polling cannot keep up with the update frequency.',
			icon: '📈',
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10 border-accent-orange/30'
		},
		{
			name: 'Collaborative Editing',
			description: 'Multiple users editing the same document simultaneously with conflict resolution.',
			examples: ['Google Docs', 'Figma', 'VS Code Live Share'],
			whyWebSockets: 'Every keystroke must be broadcast to all collaborators in real-time for seamless editing.',
			icon: '📝',
			color: 'text-accent-purple',
			bgColor: 'bg-accent-purple/10 border-accent-purple/30'
		},
		{
			name: 'Live Notifications',
			description: 'Push notifications, alerts, and activity feeds delivered instantly.',
			examples: ['Social media feeds', 'System alerts', 'Order tracking'],
			whyWebSockets: 'Users expect instant delivery. SSE works for one-way, but WebSockets allow acknowledgment.',
			icon: '🔔',
			color: 'text-accent-cyan',
			bgColor: 'bg-accent-cyan/10 border-accent-cyan/30'
		},
		{
			name: 'IoT & Dashboards',
			description: 'Sensor data streaming, monitoring dashboards, and device control.',
			examples: ['Smart home', 'Server monitoring', 'Industrial IoT'],
			whyWebSockets: 'Continuous data streaming from devices requires persistent connections with minimal overhead.',
			icon: '📊',
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10 border-accent-pink/30'
		}
	];

	let selectedUseCase: UseCase | null = null;
</script>

<div class="space-y-6">
	<!-- Use Case Grid -->
	<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
		{#each useCases as useCase, i}
			<button
				class="p-4 rounded-lg border transition-all duration-200 text-left
					{selectedUseCase?.name === useCase.name
						? useCase.bgColor + ' scale-105'
						: 'bg-dark-800/50 border-dark-700 hover:border-dark-600'}"
				on:click={() => selectedUseCase = selectedUseCase?.name === useCase.name ? null : useCase}
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="text-2xl mb-2">{useCase.icon}</div>
				<div class="font-medium text-sm {useCase.color}">{useCase.name}</div>
				<p class="text-xs text-gray-500 mt-1 line-clamp-2">{useCase.description}</p>
			</button>
		{/each}
	</div>

	<!-- Selected Details -->
	{#if selectedUseCase}
		<div
			class="rounded-lg border {selectedUseCase.bgColor} p-6"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="flex items-start gap-4">
				<span class="text-3xl">{selectedUseCase.icon}</span>
				<div class="flex-1">
					<h4 class="font-bold text-lg {selectedUseCase.color}">{selectedUseCase.name}</h4>
					<p class="text-gray-300 mt-2">{selectedUseCase.description}</p>

					<div class="mt-4">
						<span class="text-xs text-gray-500 uppercase tracking-wide">Why WebSockets?</span>
						<p class="text-sm text-gray-400 mt-1">{selectedUseCase.whyWebSockets}</p>
					</div>

					<div class="mt-4">
						<span class="text-xs text-gray-500 uppercase tracking-wide">Real-World Examples:</span>
						<div class="flex flex-wrap gap-2 mt-2">
							{#each selectedUseCase.examples as example}
								<span class="px-2 py-1 rounded text-xs bg-dark-900/50 text-gray-300">{example}</span>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="text-center py-6 text-gray-500 text-sm">
			Click on a use case to learn more
		</div>
	{/if}

	<!-- When NOT to use WebSockets -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">When NOT to Use WebSockets</h4>
				<ul class="text-sm text-gray-400 mt-2 space-y-1">
					<li>&#8226; <strong class="text-gray-300">Simple CRUD:</strong> REST APIs are simpler and more appropriate</li>
					<li>&#8226; <strong class="text-gray-300">One-way server pushes:</strong> Server-Sent Events (SSE) are lighter</li>
					<li>&#8226; <strong class="text-gray-300">Infrequent updates:</strong> HTTP polling is simpler to implement</li>
					<li>&#8226; <strong class="text-gray-300">Request/response patterns:</strong> HTTP with caching is more efficient</li>
				</ul>
			</div>
		</div>
	</div>
</div>
