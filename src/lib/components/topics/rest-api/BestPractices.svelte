<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface Practice {
		category: string;
		color: string;
		items: {
			good: string;
			bad: string;
			explanation: string;
		}[];
	}

	const practices: Practice[] = [
		{
			category: 'URL Design',
			color: 'text-accent-blue',
			items: [
				{
					good: 'GET /api/users',
					bad: 'GET /api/getUsers',
					explanation: 'Use nouns, not verbs. HTTP method indicates action.'
				},
				{
					good: 'GET /api/users',
					bad: 'GET /api/user',
					explanation: 'Use plural nouns for collections.'
				},
				{
					good: 'GET /api/user-profiles',
					bad: 'GET /api/userProfiles',
					explanation: 'Use kebab-case for multi-word resources.'
				}
			]
		},
		{
			category: 'HTTP Methods',
			color: 'text-accent-green',
			items: [
				{
					good: 'POST /api/users',
					bad: 'GET /api/users/create',
					explanation: 'Use POST for creation, not GET with action in URL.'
				},
				{
					good: 'DELETE /api/users/1',
					bad: 'POST /api/users/1/delete',
					explanation: 'Use DELETE method, not POST with delete action.'
				},
				{
					good: 'PATCH /api/users/1',
					bad: 'PUT /api/users/1 (partial data)',
					explanation: 'Use PATCH for partial updates, PUT for full replacement.'
				}
			]
		},
		{
			category: 'Query Parameters',
			color: 'text-accent-orange',
			items: [
				{
					good: '/api/users?status=active',
					bad: '/api/users/active',
					explanation: 'Use query params for filtering, not path segments.'
				},
				{
					good: '/api/users?page=2&limit=10',
					bad: '/api/users/page/2/limit/10',
					explanation: 'Use query params for pagination.'
				},
				{
					good: '/api/users?sort=name&order=asc',
					bad: '/api/users/sort/name/asc',
					explanation: 'Use query params for sorting.'
				}
			]
		},
		{
			category: 'Response Design',
			color: 'text-accent-purple',
			items: [
				{
					good: '{ "data": [...], "meta": { "total": 100 } }',
					bad: '[...]',
					explanation: 'Wrap responses to allow metadata and future extension.'
				},
				{
					good: '201 Created with Location header',
					bad: '200 OK for resource creation',
					explanation: 'Use appropriate status codes for each operation.'
				},
				{
					good: 'Content-Type: application/json',
					bad: 'No Content-Type header',
					explanation: 'Always include Content-Type header in responses.'
				}
			]
		}
	];

	let expandedCategory: string | null = null;
</script>

<div class="space-y-3">
	{#each practices as practice, i}
		<div
			class="rounded-lg border border-dark-700 overflow-hidden"
			in:fly={{ y: 10, delay: i * 50 }}
		>
			<button
				class="w-full p-4 flex items-center justify-between hover:bg-dark-800/50 transition-colors"
				on:click={() => expandedCategory = expandedCategory === practice.category ? null : practice.category}
			>
				<h4 class="font-medium {practice.color}">{practice.category}</h4>
				<svg
					class="w-5 h-5 text-gray-500 transition-transform duration-200 {expandedCategory === practice.category ? 'rotate-180' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{#if expandedCategory === practice.category}
				<div class="border-t border-dark-700 p-4 bg-dark-800/30 space-y-4" transition:slide={{ duration: 200 }}>
					{#each practice.items as item}
						<div class="space-y-2">
							<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
								<div class="p-3 rounded bg-accent-green/10 border border-accent-green/30">
									<span class="text-xs text-accent-green uppercase tracking-wide block mb-1">Do:</span>
									<code class="text-sm text-gray-300">{item.good}</code>
								</div>
								<div class="p-3 rounded bg-accent-pink/10 border border-accent-pink/30">
									<span class="text-xs text-accent-pink uppercase tracking-wide block mb-1">Don't:</span>
									<code class="text-sm text-gray-300">{item.bad}</code>
								</div>
							</div>
							<p class="text-sm text-gray-500 pl-2">{item.explanation}</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}

	<!-- HATEOAS Note -->
	<div class="mt-6 p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-cyan text-xl">🔗</div>
			<div>
				<h4 class="text-sm font-medium text-white">HATEOAS (Hypermedia)</h4>
				<p class="text-sm text-gray-400 mt-1">
					Hypermedia As The Engine Of Application State. Responses include links to related actions:
				</p>
				<pre class="mt-2 p-3 rounded bg-dark-900 text-xs text-gray-300 overflow-x-auto"><code>{`{
  "id": 1,
  "name": "Alice",
  "_links": {
    "self": "/api/users/1",
    "posts": "/api/users/1/posts",
    "delete": "/api/users/1"
  }
}`}</code></pre>
			</div>
		</div>
	</div>
</div>
