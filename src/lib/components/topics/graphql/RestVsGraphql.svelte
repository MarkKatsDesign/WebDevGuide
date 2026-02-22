<script lang="ts">
	import { fly } from 'svelte/transition';

	let activeTab: 'rest' | 'graphql' = 'rest';

	interface ComparisonItem {
		aspect: string;
		rest: string;
		graphql: string;
		winner: 'rest' | 'graphql' | 'tie';
	}

	const comparisons: ComparisonItem[] = [
		{
			aspect: 'Data Fetching',
			rest: 'Multiple endpoints, each returns fixed data structure. May require multiple requests for related data.',
			graphql: 'Single endpoint, client specifies exact fields needed. Fetches related data in one request.',
			winner: 'graphql'
		},
		{
			aspect: 'Over-fetching',
			rest: 'Returns all fields even if client only needs a few. Wastes bandwidth.',
			graphql: 'Client requests only the fields it needs. No wasted data.',
			winner: 'graphql'
		},
		{
			aspect: 'Under-fetching',
			rest: 'May need to call multiple endpoints to get all related data (N+1 requests).',
			graphql: 'Nested queries fetch all related data in a single request.',
			winner: 'graphql'
		},
		{
			aspect: 'Caching',
			rest: 'Simple HTTP caching with ETags, Cache-Control. Each URL is a cacheable resource.',
			graphql: 'Complex - POST requests are not cached by default. Requires client-side caching (Apollo, Relay).',
			winner: 'rest'
		},
		{
			aspect: 'Error Handling',
			rest: 'Standard HTTP status codes (404, 500, etc). Well-understood conventions.',
			graphql: 'Always returns 200 OK. Errors are in response body. Partial data with errors is possible.',
			winner: 'rest'
		},
		{
			aspect: 'Versioning',
			rest: 'Requires explicit versioning (v1, v2) for breaking changes.',
			graphql: 'Deprecate fields instead of versioning. Clients only use the fields they need.',
			winner: 'graphql'
		},
		{
			aspect: 'File Uploads',
			rest: 'Natively supports multipart/form-data. Simple and well-supported.',
			graphql: 'Not built-in. Requires multipart spec extension or separate REST endpoint.',
			winner: 'rest'
		},
		{
			aspect: 'Learning Curve',
			rest: 'Uses standard HTTP methods and URLs. Easy to learn and debug with curl/browser.',
			graphql: 'New query language, schema definition, resolvers. Steeper learning curve.',
			winner: 'rest'
		}
	];
</script>

<div class="space-y-6">
	<!-- Fetch Example Comparison -->
	<div>
		<div class="flex gap-2 mb-4">
			<button
				class="px-4 py-2 rounded-lg text-sm font-medium transition-all
					{activeTab === 'rest'
						? 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30'
						: 'bg-dark-800/50 text-gray-400 border border-dark-700 hover:border-dark-600'}"
				on:click={() => activeTab = 'rest'}
			>
				REST Approach
			</button>
			<button
				class="px-4 py-2 rounded-lg text-sm font-medium transition-all
					{activeTab === 'graphql'
						? 'bg-accent-pink/20 text-accent-pink border border-accent-pink/30'
						: 'bg-dark-800/50 text-gray-400 border border-dark-700 hover:border-dark-600'}"
				on:click={() => activeTab = 'graphql'}
			>
				GraphQL Approach
			</button>
		</div>

		{#key activeTab}
			<div in:fly={{ y: 10, duration: 200 }}>
				{#if activeTab === 'rest'}
					<div class="space-y-3">
						<p class="text-sm text-gray-400">Fetching a user's profile with their posts and followers requires <strong class="text-accent-orange">3 separate requests</strong>:</p>
						<div class="space-y-2">
							<div class="p-3 rounded bg-dark-900 border border-dark-700">
								<span class="text-accent-green font-mono text-xs">GET</span>
								<code class="text-sm text-gray-300 ml-2">/api/users/1</code>
								<span class="text-gray-500 text-xs ml-2">→ returns all user fields</span>
							</div>
							<div class="p-3 rounded bg-dark-900 border border-dark-700">
								<span class="text-accent-green font-mono text-xs">GET</span>
								<code class="text-sm text-gray-300 ml-2">/api/users/1/posts</code>
								<span class="text-gray-500 text-xs ml-2">→ returns all post fields</span>
							</div>
							<div class="p-3 rounded bg-dark-900 border border-dark-700">
								<span class="text-accent-green font-mono text-xs">GET</span>
								<code class="text-sm text-gray-300 ml-2">/api/users/1/followers</code>
								<span class="text-gray-500 text-xs ml-2">→ returns all follower fields</span>
							</div>
						</div>
						<p class="text-xs text-gray-500">3 round trips, likely returns more data than needed (over-fetching)</p>
					</div>
				{:else}
					<div class="space-y-3">
						<p class="text-sm text-gray-400">Same data in <strong class="text-accent-pink">1 request</strong> with only the fields you need:</p>
						<pre class="p-4 rounded bg-dark-900 border border-dark-700 text-sm text-gray-300 overflow-x-auto"><code>{`POST /graphql

query {
  user(id: "1") {
    name
    avatar
    posts(limit: 5) {
      title
      createdAt
    }
    followers {
      name
    }
  }
}`}</code></pre>
						<p class="text-xs text-gray-500">1 round trip, only requested fields are returned (no over-fetching)</p>
					</div>
				{/if}
			</div>
		{/key}
	</div>

	<!-- Detailed Comparison Table -->
	<div class="space-y-2">
		{#each comparisons as item, i}
			<div
				class="p-4 rounded-lg border border-dark-700 bg-dark-800/30"
				in:fly={{ y: 10, delay: i * 30 }}
			>
				<div class="font-medium text-white text-sm mb-3">{item.aspect}</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div class="p-3 rounded bg-dark-900/50 border {item.winner === 'rest' ? 'border-accent-orange/30' : 'border-dark-700'}">
						<div class="flex items-center gap-2 mb-1">
							<span class="text-xs font-mono text-accent-orange">REST</span>
							{#if item.winner === 'rest'}
								<span class="text-xs text-accent-green">&#10003;</span>
							{/if}
						</div>
						<p class="text-xs text-gray-400">{item.rest}</p>
					</div>
					<div class="p-3 rounded bg-dark-900/50 border {item.winner === 'graphql' ? 'border-accent-pink/30' : 'border-dark-700'}">
						<div class="flex items-center gap-2 mb-1">
							<span class="text-xs font-mono text-accent-pink">GraphQL</span>
							{#if item.winner === 'graphql'}
								<span class="text-xs text-accent-green">&#10003;</span>
							{/if}
						</div>
						<p class="text-xs text-gray-400">{item.graphql}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Bottom Line -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">When to Choose What?</h4>
				<ul class="text-sm text-gray-400 mt-2 space-y-1">
					<li>&#8226; <strong class="text-accent-orange">REST</strong> - Simple CRUD apps, public APIs, strong caching needs, file handling</li>
					<li>&#8226; <strong class="text-accent-pink">GraphQL</strong> - Complex data relationships, mobile apps (bandwidth), multiple client types, rapid iteration</li>
					<li>&#8226; <strong class="text-gray-300">Both</strong> - Many companies use REST for simple services and GraphQL as a gateway layer</li>
				</ul>
			</div>
		</div>
	</div>
</div>
