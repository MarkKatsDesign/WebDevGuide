<script lang="ts">
	import { slide } from 'svelte/transition';

	export let term: string;
	export let definition: string;
	export let color: 'blue' | 'green' | 'orange' | 'purple' | 'cyan' | 'pink' | 'yellow' = 'blue';

	let expanded = false;

	const dotColors: Record<string, string> = {
		blue: 'bg-accent-blue',
		green: 'bg-accent-green',
		orange: 'bg-accent-orange',
		purple: 'bg-accent-purple',
		cyan: 'bg-accent-cyan',
		pink: 'bg-accent-pink',
		yellow: 'bg-accent-yellow'
	};

	const borderColors: Record<string, string> = {
		blue: 'border-accent-blue/30',
		green: 'border-accent-green/30',
		orange: 'border-accent-orange/30',
		purple: 'border-accent-purple/30',
		cyan: 'border-accent-cyan/30',
		pink: 'border-accent-pink/30',
		yellow: 'border-accent-yellow/30'
	};
</script>

<button
	class="w-full text-left p-4 rounded-lg bg-dark-800/50 border {borderColors[color]} hover:bg-dark-800 transition-colors"
	on:click={() => expanded = !expanded}
>
	<div class="flex items-start gap-3">
		<span class="w-2 h-2 rounded-full mt-2 flex-shrink-0 {dotColors[color]}"></span>
		<div class="flex-1">
			<div class="flex items-center justify-between">
				<span class="font-mono font-medium text-white">{term}</span>
				<svg
					class="w-4 h-4 text-gray-500 transition-transform {expanded ? 'rotate-180' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</div>
			{#if expanded}
				<p transition:slide={{ duration: 200 }} class="mt-2 text-sm text-gray-400 leading-relaxed">
					{definition}
				</p>
			{/if}
		</div>
	</div>
</button>
