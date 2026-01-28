<script lang="ts">
	import type { Topic } from '$lib/data/topics';
	import { fly } from 'svelte/transition';
	import { base } from '$app/paths';

	export let topic: Topic;
	export let index: number = 0;

	const colorClasses: Record<string, string> = {
		blue: 'border-accent-blue/30 hover:border-accent-blue hover:shadow-accent-blue/20',
		green: 'border-accent-green/30 hover:border-accent-green hover:shadow-accent-green/20',
		orange: 'border-accent-orange/30 hover:border-accent-orange hover:shadow-accent-orange/20',
		purple: 'border-accent-purple/30 hover:border-accent-purple hover:shadow-accent-purple/20',
		cyan: 'border-accent-cyan/30 hover:border-accent-cyan hover:shadow-accent-cyan/20',
		pink: 'border-accent-pink/30 hover:border-accent-pink hover:shadow-accent-pink/20',
		yellow: 'border-accent-yellow/30 hover:border-accent-yellow hover:shadow-accent-yellow/20'
	};

	const badgeColors: Record<string, string> = {
		blue: 'bg-accent-blue/20 text-accent-blue',
		green: 'bg-accent-green/20 text-accent-green',
		orange: 'bg-accent-orange/20 text-accent-orange',
		purple: 'bg-accent-purple/20 text-accent-purple',
		cyan: 'bg-accent-cyan/20 text-accent-cyan',
		pink: 'bg-accent-pink/20 text-accent-pink',
		yellow: 'bg-accent-yellow/20 text-accent-yellow'
	};
</script>

<a
	href={topic.implemented ? `${base}/topics/${topic.slug}` : '#'}
	class="block group"
	in:fly={{ y: 20, duration: 300, delay: index * 50 }}
>
	<div
		class="relative p-6 rounded-xl border-2 bg-dark-800/50 backdrop-blur transition-all duration-300 hover:shadow-lg {colorClasses[topic.color]} {!topic.implemented ? 'opacity-50 cursor-not-allowed' : ''}"
	>
		<!-- Icon -->
		<div class="text-4xl mb-4">{topic.icon}</div>

		<!-- Title -->
		<h3 class="text-xl font-semibold text-white mb-2 group-hover:text-gray-100">
			{topic.title}
		</h3>

		<!-- Description -->
		<p class="text-gray-400 text-sm leading-relaxed mb-4">
			{topic.description}
		</p>

		<!-- Footer -->
		<div class="flex items-center justify-between">
			<span class="text-xs px-2 py-1 rounded-full {badgeColors[topic.color]}">
				{topic.category}
			</span>

			{#if topic.implemented}
				<span class="text-xs text-accent-green flex items-center gap-1">
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
					</svg>
					Available
				</span>
			{:else}
				<span class="text-xs text-gray-500">Coming soon</span>
			{/if}
		</div>

		<!-- Hover arrow -->
		{#if topic.implemented}
			<div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
				<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</div>
		{/if}
	</div>
</a>
