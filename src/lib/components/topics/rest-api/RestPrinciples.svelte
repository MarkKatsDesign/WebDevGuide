<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Principle {
		name: string;
		description: string;
		example: string;
		color: string;
		bgColor: string;
		icon: string;
	}

	const principles: Principle[] = [
		{
			name: 'Client-Server',
			description: 'Separation of concerns between UI and data storage. Client handles presentation, server handles data persistence.',
			example: 'Browser (client) requests data from API server. Each can evolve independently.',
			color: 'text-accent-blue',
			bgColor: 'bg-accent-blue/10 border-accent-blue/30',
			icon: '🔄'
		},
		{
			name: 'Stateless',
			description: 'Each request contains all information needed. Server does not store client session state between requests.',
			example: 'Every request includes authentication token. No session stored on server.',
			color: 'text-accent-green',
			bgColor: 'bg-accent-green/10 border-accent-green/30',
			icon: '📦'
		},
		{
			name: 'Cacheable',
			description: 'Responses must define themselves as cacheable or non-cacheable to prevent stale data.',
			example: 'Cache-Control: max-age=3600 allows clients to cache response for 1 hour.',
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10 border-accent-orange/30',
			icon: '💾'
		},
		{
			name: 'Uniform Interface',
			description: 'Standardized way to interact with resources using URIs, HTTP methods, and standard media types.',
			example: 'GET /users/123 returns user, PUT /users/123 updates user - consistent patterns.',
			color: 'text-accent-purple',
			bgColor: 'bg-accent-purple/10 border-accent-purple/30',
			icon: '🎯'
		},
		{
			name: 'Layered System',
			description: 'Client cannot tell if connected directly to server or intermediary. Enables load balancers, proxies, CDNs.',
			example: 'Request may pass through CDN, load balancer, then API server - client is unaware.',
			color: 'text-accent-cyan',
			bgColor: 'bg-accent-cyan/10 border-accent-cyan/30',
			icon: '📚'
		},
		{
			name: 'Code on Demand (Optional)',
			description: 'Server can extend client functionality by transferring executable code (JavaScript).',
			example: 'Server returns JS that client executes to render dynamic content.',
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10 border-accent-pink/30',
			icon: '⚡'
		}
	];

	let selectedPrinciple: Principle | null = null;
</script>

<div class="space-y-6">
	<!-- Principles Grid -->
	<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
		{#each principles as principle, i}
			<button
				class="p-4 rounded-lg border transition-all duration-200 text-left
					{selectedPrinciple?.name === principle.name
						? principle.bgColor + ' scale-105'
						: 'bg-dark-800/50 border-dark-700 hover:border-dark-600'}"
				on:click={() => selectedPrinciple = selectedPrinciple?.name === principle.name ? null : principle}
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="text-2xl mb-2">{principle.icon}</div>
				<div class="font-medium {principle.color}">{principle.name}</div>
			</button>
		{/each}
	</div>

	<!-- Selected Principle Details -->
	{#if selectedPrinciple}
		<div
			class="rounded-lg border {selectedPrinciple.bgColor} p-6"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="flex items-start gap-4">
				<span class="text-3xl">{selectedPrinciple.icon}</span>
				<div class="flex-1">
					<h4 class="font-bold text-lg {selectedPrinciple.color}">{selectedPrinciple.name}</h4>
					<p class="text-gray-300 mt-2">{selectedPrinciple.description}</p>

					<div class="mt-4">
						<span class="text-xs text-gray-500 uppercase tracking-wide">Example:</span>
						<p class="text-sm text-gray-400 mt-1">{selectedPrinciple.example}</p>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="text-center py-6 text-gray-500 text-sm">
			Click on a principle to see details
		</div>
	{/if}

	<!-- REST vs RESTful -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">REST vs RESTful</h4>
				<p class="text-sm text-gray-400 mt-1">
					<strong class="text-gray-300">REST</strong> is the architectural style defined by Roy Fielding.
					<strong class="text-gray-300">RESTful</strong> describes APIs that follow REST principles.
					Most APIs claim to be RESTful but only partially follow the constraints.
				</p>
			</div>
		</div>
	</div>
</div>
