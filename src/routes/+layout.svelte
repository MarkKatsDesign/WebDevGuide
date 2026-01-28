<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { topics, categories, getTopicsByCategory } from '$lib/data/topics';

	let sidebarOpen = false;

	$: currentPath = $page.url.pathname;
</script>

<div class="min-h-screen flex">
	<!-- Sidebar -->
	<aside class="hidden lg:flex lg:flex-col w-72 border-r border-dark-700 bg-dark-900/50 backdrop-blur-sm fixed h-full">
		<!-- Logo -->
		<div class="p-6 border-b border-dark-700">
			<a href="{base}/" class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
					<span class="text-white font-bold text-lg">W</span>
				</div>
				<div>
					<h1 class="font-bold text-white">WebDevGuide</h1>
					<p class="text-xs text-gray-500">Visual Learning</p>
				</div>
			</a>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 overflow-y-auto p-4">
			{#each categories as category}
				<div class="mb-6">
					<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
						{category}
					</h3>
					<ul class="space-y-1">
						{#each getTopicsByCategory(category) as topic}
							<li>
								<a
									href={topic.implemented ? `${base}/topics/${topic.slug}` : '#'}
									class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
										{currentPath === `${base}/topics/${topic.slug}`
											? 'bg-accent-blue/20 text-accent-blue'
											: topic.implemented
												? 'text-gray-400 hover:text-white hover:bg-dark-800'
												: 'text-gray-600 cursor-not-allowed'}"
								>
									<span class="text-lg">{topic.icon}</span>
									<span>{topic.title}</span>
									{#if !topic.implemented}
										<span class="ml-auto text-[10px] text-gray-600">Soon</span>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>

		<!-- Footer -->
		<div class="p-4 border-t border-dark-700">
			<p class="text-xs text-gray-600 text-center">
				Built for developers who learn visually
			</p>
		</div>
	</aside>

	<!-- Mobile Header -->
	<div class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur border-b border-dark-700">
		<div class="flex items-center justify-between p-4">
			<a href="{base}/" class="flex items-center gap-2">
				<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
					<span class="text-white font-bold">W</span>
				</div>
				<span class="font-bold text-white">WebDevGuide</span>
			</a>
			<button
				class="p-2 text-gray-400 hover:text-white"
				on:click={() => sidebarOpen = !sidebarOpen}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if sidebarOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Sidebar Overlay -->
	{#if sidebarOpen}
		<div
			class="lg:hidden fixed inset-0 z-40 bg-black/50"
			on:click={() => sidebarOpen = false}
			on:keydown={(e) => e.key === 'Escape' && (sidebarOpen = false)}
			role="button"
			tabindex="0"
		></div>
		<aside class="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-dark-900 border-r border-dark-700 overflow-y-auto">
			<div class="p-6 border-b border-dark-700">
				<a href="{base}/" class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
						<span class="text-white font-bold text-lg">W</span>
					</div>
					<div>
						<h1 class="font-bold text-white">WebDevGuide</h1>
						<p class="text-xs text-gray-500">Visual Learning</p>
					</div>
				</a>
			</div>
			<nav class="p-4">
				{#each categories as category}
					<div class="mb-6">
						<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
							{category}
						</h3>
						<ul class="space-y-1">
							{#each getTopicsByCategory(category) as topic}
								<li>
									<a
										href={topic.implemented ? `${base}/topics/${topic.slug}` : '#'}
										class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
											{currentPath === `${base}/topics/${topic.slug}`
												? 'bg-accent-blue/20 text-accent-blue'
												: topic.implemented
													? 'text-gray-400 hover:text-white hover:bg-dark-800'
													: 'text-gray-600 cursor-not-allowed'}"
										on:click={() => sidebarOpen = false}
									>
										<span class="text-lg">{topic.icon}</span>
										<span>{topic.title}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</aside>
	{/if}

	<!-- Main Content -->
	<main class="flex-1 lg:ml-72">
		<div class="pt-16 lg:pt-0">
			<slot />
		</div>
	</main>
</div>
