<script lang="ts">
	export let title: string;
	export let subtitle: string = '';
</script>

<section class="mb-12">
	<div class="mb-6">
		<h2 class="text-2xl font-bold text-white">{title}</h2>
		{#if subtitle}
			<p class="text-gray-400 mt-1">{subtitle}</p>
		{/if}
	</div>
	<slot />
</section>
