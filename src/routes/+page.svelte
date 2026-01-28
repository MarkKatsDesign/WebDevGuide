<script lang="ts">
	import { topics, categories, getTopicsByCategory, getImplementedTopics } from '$lib/data/topics';
	import { TopicCard } from '$lib/components/ui';
	import { fade, fly } from 'svelte/transition';

	const implementedCount = getImplementedTopics().length;
	const totalCount = topics.length;
</script>

<svelte:head>
	<title>WebDevGuide - Visual Web Development Learning</title>
	<meta name="description" content="Learn web development concepts through interactive visuals, diagrams, and animations. Master HTTP, DNS, APIs, security, and more." />
</svelte:head>

<div class="min-h-screen">
	<!-- Hero Section -->
	<section class="relative overflow-hidden border-b border-dark-700">
		<!-- Background gradient -->
		<div class="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10"></div>

		<div class="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
			<div in:fly={{ y: 20, duration: 500 }}>
				<h1 class="text-4xl lg:text-5xl font-bold text-white mb-4">
					Learn Web Development
					<span class="gradient-text">Visually</span>
				</h1>
				<p class="text-xl text-gray-400 max-w-2xl mb-8">
					Master the concepts that matter in technical interviews. Interactive diagrams,
					animations, and the exact terminology engineers use.
				</p>

				<!-- Stats -->
				<div class="flex gap-8">
					<div>
						<div class="text-3xl font-bold text-accent-blue">{implementedCount}/{totalCount}</div>
						<div class="text-sm text-gray-500">Topics Available</div>
					</div>
					<div>
						<div class="text-3xl font-bold text-accent-green">Free</div>
						<div class="text-sm text-gray-500">Always</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Topics Grid -->
	<section class="max-w-6xl mx-auto px-6 py-12">
		{#each categories as category, categoryIndex}
			{@const categoryTopics = getTopicsByCategory(category)}
			<div class="mb-12" in:fade={{ delay: categoryIndex * 100 }}>
				<h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
					<span class="w-8 h-px bg-dark-700"></span>
					{category}
					<span class="text-gray-700">({categoryTopics.length})</span>
				</h2>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{#each categoryTopics as topic, index}
						<TopicCard {topic} index={index + categoryIndex * 3} />
					{/each}
				</div>
			</div>
		{/each}
	</section>

	<!-- Footer -->
	<footer class="border-t border-dark-700 mt-12">
		<div class="max-w-6xl mx-auto px-6 py-8">
			<div class="flex flex-col md:flex-row items-center justify-between gap-4">
				<p class="text-sm text-gray-500">
					WebDevGuide - Built for visual learners
				</p>
				<p class="text-sm text-gray-600">
					More topics coming soon...
				</p>
			</div>
		</div>
	</footer>
</div>
