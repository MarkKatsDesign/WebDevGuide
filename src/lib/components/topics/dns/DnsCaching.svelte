<script lang="ts">
	import { fly } from 'svelte/transition';

	interface CacheLayer {
		name: string;
		location: string;
		ttl: string;
		description: string;
		clearMethod: string;
		color: string;
	}

	const cacheLayers: CacheLayer[] = [
		{
			name: 'Browser Cache',
			location: 'Your browser',
			ttl: '~1 minute',
			description: 'First place checked. Each browser manages its own DNS cache independently.',
			clearMethod: 'chrome://net-internals/#dns → Clear host cache',
			color: 'cyan'
		},
		{
			name: 'OS Cache',
			location: 'Operating system',
			ttl: 'Respects record TTL',
			description: 'System-wide DNS cache. Shared across all applications on your computer.',
			clearMethod: 'ipconfig /flushdns (Windows) or sudo dscacheutil -flushcache (Mac)',
			color: 'blue'
		},
		{
			name: 'Router Cache',
			location: 'Home/office router',
			ttl: 'Varies by router',
			description: 'Many routers cache DNS responses for all devices on the network.',
			clearMethod: 'Restart router or access admin panel',
			color: 'purple'
		},
		{
			name: 'ISP Resolver Cache',
			location: 'ISP\'s DNS servers',
			ttl: 'Respects record TTL',
			description: 'Your ISP caches responses for all their customers. Significant performance impact.',
			clearMethod: 'Wait for TTL to expire (you can\'t clear it)',
			color: 'orange'
		}
	];

	const colorClasses: Record<string, string> = {
		cyan: 'border-accent-cyan bg-accent-cyan/10',
		blue: 'border-accent-blue bg-accent-blue/10',
		purple: 'border-accent-purple bg-accent-purple/10',
		orange: 'border-accent-orange bg-accent-orange/10'
	};

	let selectedLayer: string | null = null;
</script>

<div class="space-y-6">
	<!-- Cache Flow Visualization -->
	<div class="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
		{#each cacheLayers as layer, i}
			<button
				class="w-full md:w-auto px-4 py-3 rounded-lg border-2 transition-all text-center
					{selectedLayer === layer.name ? colorClasses[layer.color] + ' scale-105' : 'border-dark-600 bg-dark-800 hover:border-dark-500'}"
				on:click={() => selectedLayer = selectedLayer === layer.name ? null : layer.name}
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="text-sm font-medium text-white">{layer.name}</div>
				<div class="text-xs text-gray-500 mt-1">{layer.location}</div>
			</button>
			{#if i < cacheLayers.length - 1}
				<div class="hidden md:block text-gray-600">→</div>
				<div class="md:hidden text-gray-600">↓</div>
			{/if}
		{/each}
	</div>

	<!-- Selected Layer Details -->
	{#if selectedLayer}
		{@const layer = cacheLayers.find(l => l.name === selectedLayer)}
		{#if layer}
			<div
				class="p-4 rounded-lg border {colorClasses[layer.color]}"
				in:fly={{ y: 10, duration: 200 }}
			>
				<h4 class="font-medium text-white">{layer.name}</h4>
				<p class="text-sm text-gray-400 mt-2">{layer.description}</p>

				<div class="grid grid-cols-2 gap-4 mt-4">
					<div class="p-3 rounded bg-dark-900/50">
						<div class="text-xs text-gray-500 uppercase">Typical TTL</div>
						<div class="text-sm text-white mt-1">{layer.ttl}</div>
					</div>
					<div class="p-3 rounded bg-dark-900/50">
						<div class="text-xs text-gray-500 uppercase">How to Clear</div>
						<code class="text-xs text-gray-300 mt-1 block">{layer.clearMethod}</code>
					</div>
				</div>
			</div>
		{/if}
	{/if}

	<!-- TTL Explanation -->
	<div class="p-4 rounded-lg bg-dark-800 border border-dark-700">
		<h4 class="text-sm font-medium text-white mb-3">Understanding TTL (Time To Live)</h4>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="p-3 rounded-lg bg-dark-900/50 border border-accent-green/30">
				<div class="text-accent-green font-mono text-lg">300</div>
				<div class="text-xs text-gray-500 mt-1">5 minutes</div>
				<div class="text-xs text-gray-400 mt-2">Good for: Dynamic IPs, quick failover</div>
			</div>
			<div class="p-3 rounded-lg bg-dark-900/50 border border-accent-yellow/30">
				<div class="text-accent-yellow font-mono text-lg">3600</div>
				<div class="text-xs text-gray-500 mt-1">1 hour</div>
				<div class="text-xs text-gray-400 mt-2">Good for: Most websites, balanced</div>
			</div>
			<div class="p-3 rounded-lg bg-dark-900/50 border border-accent-orange/30">
				<div class="text-accent-orange font-mono text-lg">86400</div>
				<div class="text-xs text-gray-500 mt-1">24 hours</div>
				<div class="text-xs text-gray-400 mt-2">Good for: Static sites, rarely changed</div>
			</div>
		</div>

		<div class="mt-4 p-3 rounded-lg bg-dark-900/30">
			<div class="flex items-start gap-2">
				<span class="text-accent-yellow">💡</span>
				<p class="text-xs text-gray-400">
					<strong class="text-gray-300">Pro tip:</strong> Before a migration, lower TTL to 300 seconds 24-48 hours ahead.
					After the change, wait for the old TTL to expire, then raise TTL back up.
				</p>
			</div>
		</div>
	</div>

	<!-- DNS Propagation -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-purple text-xl">🌍</div>
			<div>
				<h4 class="text-sm font-medium text-white">DNS Propagation</h4>
				<p class="text-sm text-gray-400 mt-1">
					When you update DNS records, the changes don't happen instantly everywhere.
					Different caches expire at different times based on their TTL values.
				</p>
				<div class="mt-3 flex flex-wrap gap-2">
					<span class="px-2 py-1 rounded text-xs bg-accent-green/20 text-accent-green">Immediate: Your authoritative server</span>
					<span class="px-2 py-1 rounded text-xs bg-accent-yellow/20 text-accent-yellow">Minutes-Hours: Most users</span>
					<span class="px-2 py-1 rounded text-xs bg-accent-orange/20 text-accent-orange">Up to 48h: Full global propagation</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Common Resolvers -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<h4 class="text-sm font-medium text-white mb-3">Popular Public DNS Resolvers</h4>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
			<div class="p-3 rounded-lg bg-dark-900/50 text-center">
				<div class="font-mono text-accent-cyan">8.8.8.8</div>
				<div class="text-xs text-gray-500 mt-1">Google</div>
			</div>
			<div class="p-3 rounded-lg bg-dark-900/50 text-center">
				<div class="font-mono text-accent-orange">1.1.1.1</div>
				<div class="text-xs text-gray-500 mt-1">Cloudflare</div>
			</div>
			<div class="p-3 rounded-lg bg-dark-900/50 text-center">
				<div class="font-mono text-accent-green">9.9.9.9</div>
				<div class="text-xs text-gray-500 mt-1">Quad9</div>
			</div>
			<div class="p-3 rounded-lg bg-dark-900/50 text-center">
				<div class="font-mono text-accent-purple">208.67.222.222</div>
				<div class="text-xs text-gray-500 mt-1">OpenDNS</div>
			</div>
		</div>
	</div>
</div>
