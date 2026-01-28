<script lang="ts">
	import { fade } from 'svelte/transition';

	export let title: string = '';
	export let description: string = '';
</script>

<div
	class="rounded-xl border border-dark-700 bg-dark-800/30 overflow-hidden"
	in:fade={{ duration: 300 }}
>
	{#if title || description}
		<div class="px-6 py-4 border-b border-dark-700">
			{#if title}
				<h3 class="text-lg font-semibold text-white">{title}</h3>
			{/if}
			{#if description}
				<p class="text-sm text-gray-400 mt-1">{description}</p>
			{/if}
		</div>
	{/if}

	<div class="p-6">
		<slot />
	</div>
</div>
