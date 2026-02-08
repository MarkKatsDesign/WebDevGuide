<script lang="ts">
	import type { PageData } from './$types';
	import { fly, fade } from 'svelte/transition';
	import { base } from '$app/paths';

	// Topic components
	import HttpTopic from '$lib/components/topics/http/HttpTopic.svelte';
	import DnsTopic from '$lib/components/topics/dns/DnsTopic.svelte';
	import InternetTopic from '$lib/components/topics/internet/InternetTopic.svelte';
	import BrowserRenderingTopic from '$lib/components/topics/browser-rendering/BrowserRenderingTopic.svelte';
	import EventLoopTopic from '$lib/components/topics/event-loop/EventLoopTopic.svelte';
	import RestApiTopic from '$lib/components/topics/rest-api/RestApiTopic.svelte';

	export let data: PageData;

	$: topic = data.topic;

	// Map slugs to components
	const topicComponents: Record<string, typeof HttpTopic> = {
		'http': HttpTopic,
		'dns': DnsTopic,
		'internet': InternetTopic,
		'browser-rendering': BrowserRenderingTopic,
		'event-loop': EventLoopTopic,
		'rest-api': RestApiTopic
	};
</script>

<svelte:head>
	<title>{topic.title} - WebDevGuide</title>
	<meta name="description" content={topic.description} />
</svelte:head>

<div class="min-h-screen">
	<!-- Topic Header -->
	<header class="border-b border-dark-700 bg-dark-800/30">
		<div class="max-w-5xl mx-auto px-6 py-8">
			<div in:fly={{ y: -10, duration: 300 }}>
				<!-- Breadcrumb -->
				<nav class="flex items-center gap-2 text-sm text-gray-500 mb-4">
					<a href="{base}/" class="hover:text-white transition-colors">Home</a>
					<span>/</span>
					<span class="text-gray-400">{topic.category}</span>
					<span>/</span>
					<span class="text-white">{topic.title}</span>
				</nav>

				<!-- Title -->
				<div class="flex items-center gap-4">
					<span class="text-4xl">{topic.icon}</span>
					<div>
						<h1 class="text-3xl font-bold text-white">{topic.title}</h1>
						<p class="text-gray-400 mt-1">{topic.description}</p>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- Topic Content -->
	<main class="max-w-5xl mx-auto px-6 py-8" in:fade={{ delay: 150, duration: 300 }}>
		{#if topicComponents[topic.slug]}
			<svelte:component this={topicComponents[topic.slug]} />
		{:else}
			<div class="text-center py-20">
				<p class="text-gray-500">Topic content not available yet.</p>
			</div>
		{/if}
	</main>

	<!-- Topic Navigation -->
	<footer class="border-t border-dark-700 mt-12">
		<div class="max-w-5xl mx-auto px-6 py-6">
			<a
				href="{base}/"
				class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back to all topics
			</a>
		</div>
	</footer>
</div>
