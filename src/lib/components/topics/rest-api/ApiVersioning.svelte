<script lang="ts">
	import { fly } from 'svelte/transition';

	interface VersioningStrategy {
		name: string;
		example: string;
		pros: string[];
		cons: string[];
		color: string;
		bgColor: string;
	}

	const strategies: VersioningStrategy[] = [
		{
			name: 'URL Path',
			example: '/api/v1/users\n/api/v2/users',
			pros: ['Easy to understand', 'Clear in documentation', 'Cache-friendly'],
			cons: ['URL changes with versions', 'Not truly RESTful'],
			color: 'text-accent-blue',
			bgColor: 'bg-accent-blue/10 border-accent-blue/30'
		},
		{
			name: 'Query Parameter',
			example: '/api/users?version=1\n/api/users?version=2',
			pros: ['Simple to implement', 'Optional versioning'],
			cons: ['Easy to forget', 'Caching issues', 'Clutters URLs'],
			color: 'text-accent-green',
			bgColor: 'bg-accent-green/10 border-accent-green/30'
		},
		{
			name: 'Custom Header',
			example: 'X-API-Version: 1\nX-API-Version: 2',
			pros: ['Clean URLs', 'More RESTful'],
			cons: ['Hidden versioning', 'Harder to test in browser'],
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10 border-accent-orange/30'
		},
		{
			name: 'Accept Header',
			example: 'Accept: application/vnd.api.v1+json\nAccept: application/vnd.api.v2+json',
			pros: ['Most RESTful approach', 'Content negotiation'],
			cons: ['Complex to implement', 'Harder to debug'],
			color: 'text-accent-purple',
			bgColor: 'bg-accent-purple/10 border-accent-purple/30'
		}
	];

	let selectedStrategy: VersioningStrategy | null = null;
</script>

<div class="space-y-6">
	<!-- Strategy Cards -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
		{#each strategies as strategy, i}
			<button
				class="p-4 rounded-lg border transition-all duration-200 text-left
					{selectedStrategy?.name === strategy.name
						? strategy.bgColor + ' scale-105'
						: 'bg-dark-800/50 border-dark-700 hover:border-dark-600'}"
				on:click={() => selectedStrategy = selectedStrategy?.name === strategy.name ? null : strategy}
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="font-medium {strategy.color}">{strategy.name}</div>
			</button>
		{/each}
	</div>

	<!-- Selected Strategy Details -->
	{#if selectedStrategy}
		<div
			class="rounded-lg border {selectedStrategy.bgColor} p-6"
			in:fly={{ y: 10, duration: 200 }}
		>
			<h4 class="font-bold text-lg {selectedStrategy.color} mb-4">{selectedStrategy.name} Versioning</h4>

			<div class="mb-4">
				<span class="text-xs text-gray-500 uppercase tracking-wide">Example:</span>
				<pre class="mt-2 p-3 rounded bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{selectedStrategy.example}</code></pre>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<span class="text-xs text-accent-green uppercase tracking-wide">Pros:</span>
					<ul class="mt-2 space-y-1">
						{#each selectedStrategy.pros as pro}
							<li class="text-sm text-gray-400 flex items-center gap-2">
								<span class="text-accent-green">+</span>
								{pro}
							</li>
						{/each}
					</ul>
				</div>
				<div>
					<span class="text-xs text-accent-pink uppercase tracking-wide">Cons:</span>
					<ul class="mt-2 space-y-1">
						{#each selectedStrategy.cons as con}
							<li class="text-sm text-gray-400 flex items-center gap-2">
								<span class="text-accent-pink">-</span>
								{con}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	{:else}
		<div class="text-center py-6 text-gray-500 text-sm">
			Click on a versioning strategy to see details
		</div>
	{/if}

	<!-- Best Practices -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">Common Interview Question</h4>
				<p class="text-sm text-gray-400 mt-1">
					<strong class="text-gray-300">"Which versioning strategy should you use?"</strong><br>
					URL path versioning (/api/v1/) is most popular due to simplicity and clarity.
					Major companies like Twitter, GitHub, and Stripe use this approach.
				</p>
			</div>
		</div>
	</div>
</div>
