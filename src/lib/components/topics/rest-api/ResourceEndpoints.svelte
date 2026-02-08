<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface Endpoint {
		method: string;
		path: string;
		description: string;
		requestBody?: string;
		responseBody: string;
		color: string;
	}

	const endpoints: Endpoint[] = [
		{
			method: 'GET',
			path: '/api/users',
			description: 'List all users (collection)',
			responseBody: `[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]`,
			color: 'text-accent-green'
		},
		{
			method: 'GET',
			path: '/api/users/1',
			description: 'Get a specific user (resource)',
			responseBody: `{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}`,
			color: 'text-accent-green'
		},
		{
			method: 'POST',
			path: '/api/users',
			description: 'Create a new user',
			requestBody: `{
  "name": "Charlie",
  "email": "charlie@example.com"
}`,
			responseBody: `{
  "id": 3,
  "name": "Charlie",
  "email": "charlie@example.com"
}`,
			color: 'text-accent-blue'
		},
		{
			method: 'PUT',
			path: '/api/users/1',
			description: 'Replace entire user resource',
			requestBody: `{
  "name": "Alice Smith",
  "email": "alice.smith@example.com"
}`,
			responseBody: `{
  "id": 1,
  "name": "Alice Smith",
  "email": "alice.smith@example.com"
}`,
			color: 'text-accent-orange'
		},
		{
			method: 'PATCH',
			path: '/api/users/1',
			description: 'Partially update user',
			requestBody: `{
  "email": "newemail@example.com"
}`,
			responseBody: `{
  "id": 1,
  "name": "Alice",
  "email": "newemail@example.com"
}`,
			color: 'text-accent-yellow'
		},
		{
			method: 'DELETE',
			path: '/api/users/1',
			description: 'Delete a user',
			responseBody: `204 No Content`,
			color: 'text-accent-pink'
		}
	];

	let expandedIndex: number | null = null;
</script>

<div class="space-y-4">
	<!-- Resource Explanation -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<h4 class="text-accent-cyan font-medium mb-2">Collection Resource</h4>
			<code class="text-sm text-gray-300">/api/users</code>
			<p class="text-sm text-gray-500 mt-2">Represents a list of resources. Use plural nouns.</p>
		</div>
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<h4 class="text-accent-purple font-medium mb-2">Singleton Resource</h4>
			<code class="text-sm text-gray-300">/api/users/123</code>
			<p class="text-sm text-gray-500 mt-2">Represents a single resource identified by ID.</p>
		</div>
	</div>

	<!-- Endpoints List -->
	<div class="space-y-2">
		{#each endpoints as endpoint, i}
			<div
				class="rounded-lg border border-dark-700 overflow-hidden"
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<button
					class="w-full p-4 flex items-center gap-4 hover:bg-dark-800/50 transition-colors text-left"
					on:click={() => expandedIndex = expandedIndex === i ? null : i}
				>
					<span class="font-mono font-bold {endpoint.color} w-16">{endpoint.method}</span>
					<code class="flex-1 text-gray-300">{endpoint.path}</code>
					<span class="text-gray-500 text-sm hidden md:block">{endpoint.description}</span>
					<svg
						class="w-5 h-5 text-gray-500 transition-transform duration-200 {expandedIndex === i ? 'rotate-180' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if expandedIndex === i}
					<div class="border-t border-dark-700 p-4 bg-dark-800/30" transition:slide={{ duration: 200 }}>
						<p class="text-gray-400 text-sm mb-4 md:hidden">{endpoint.description}</p>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							{#if endpoint.requestBody}
								<div>
									<span class="text-xs text-gray-500 uppercase tracking-wide">Request Body:</span>
									<pre class="mt-2 p-3 rounded bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{endpoint.requestBody}</code></pre>
								</div>
							{/if}
							<div class:md:col-span-2={!endpoint.requestBody}>
								<span class="text-xs text-gray-500 uppercase tracking-wide">Response:</span>
								<pre class="mt-2 p-3 rounded bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{endpoint.responseBody}</code></pre>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Nested Resources -->
	<div class="mt-8">
		<h4 class="text-sm font-medium text-gray-400 mb-4">Nested Resources (Relationships)</h4>
		<div class="space-y-2">
			<div class="p-3 rounded-lg bg-dark-800/50 border border-dark-700 flex items-center gap-4">
				<span class="font-mono text-accent-green w-12">GET</span>
				<code class="text-gray-300">/api/users/1/posts</code>
				<span class="text-gray-500 text-sm ml-auto hidden md:block">Get all posts by user 1</span>
			</div>
			<div class="p-3 rounded-lg bg-dark-800/50 border border-dark-700 flex items-center gap-4">
				<span class="font-mono text-accent-green w-12">GET</span>
				<code class="text-gray-300">/api/users/1/posts/5</code>
				<span class="text-gray-500 text-sm ml-auto hidden md:block">Get post 5 by user 1</span>
			</div>
			<div class="p-3 rounded-lg bg-dark-800/50 border border-dark-700 flex items-center gap-4">
				<span class="font-mono text-accent-blue w-12">POST</span>
				<code class="text-gray-300">/api/users/1/posts</code>
				<span class="text-gray-500 text-sm ml-auto hidden md:block">Create a new post for user 1</span>
			</div>
		</div>
	</div>
</div>
