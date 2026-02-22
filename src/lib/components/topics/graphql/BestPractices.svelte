<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface Practice {
		name: string;
		problem: string;
		solution: string;
		code?: string;
		icon: string;
		color: string;
		bgColor: string;
	}

	const practices: Practice[] = [
		{
			name: 'N+1 Query Problem',
			problem: 'When fetching a list of users with their posts, the ORM executes 1 query for users + N queries for each user\'s posts.',
			solution: 'Use DataLoader to batch and deduplicate database queries. It collects all IDs in a single tick, then makes one batched query.',
			code: `// Without DataLoader: N+1 queries
// 1: SELECT * FROM users
// 2: SELECT * FROM posts WHERE user_id = 1
// 3: SELECT * FROM posts WHERE user_id = 2
// ... N more queries

// With DataLoader: 2 queries
const postLoader = new DataLoader(async (userIds) => {
  const posts = await db.posts.findByUserIds(userIds);
  return userIds.map(id => posts.filter(p => p.userId === id));
});`,
			icon: '🔁',
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10 border-accent-orange/30'
		},
		{
			name: 'Query Depth Limiting',
			problem: 'Deeply nested queries can exhaust server resources. A malicious client could craft queries with infinite depth.',
			solution: 'Set a maximum query depth. Reject queries that exceed the limit before execution.',
			code: `# This malicious query nests too deep:
query {
  user {
    posts {
      author {
        posts {
          author {    # depth = 5, rejected!
            posts { ... }
          }
        }
      }
    }
  }
}

# Set max depth to 3-5 in your server config`,
			icon: '🛡️',
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10 border-accent-pink/30'
		},
		{
			name: 'Query Complexity Analysis',
			problem: 'Even shallow queries can be expensive if they request large lists with many fields.',
			solution: 'Assign a cost to each field and reject queries that exceed a total complexity budget.',
			code: `# Field costs:
# user         → cost: 1
# posts(limit) → cost: limit × 2
# comments     → cost: limit × 1

query {
  users(limit: 100) {        # 100 × 1 = 100
    posts(limit: 50) {        # 100 × 50 × 2 = 10000
      comments(limit: 10) {   # 100 × 50 × 10 = 50000
        text
      }
    }
  }
}
# Total: 60,100 → REJECTED (limit: 10,000)`,
			icon: '📊',
			color: 'text-accent-purple',
			bgColor: 'bg-accent-purple/10 border-accent-purple/30'
		},
		{
			name: 'Pagination',
			problem: 'Returning unbounded lists of results is dangerous. Large collections can crash clients and servers.',
			solution: 'Use cursor-based pagination (Relay spec) for stable, efficient results. Offset-based works for simple cases.',
			code: `# Cursor-based pagination (recommended)
query {
  users(first: 10, after: "cursor_abc") {
    edges {
      node { id, name }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`,
			icon: '📄',
			color: 'text-accent-cyan',
			bgColor: 'bg-accent-cyan/10 border-accent-cyan/30'
		},
		{
			name: 'Persisted Queries',
			problem: 'Sending full query strings wastes bandwidth and allows arbitrary queries from untrusted clients.',
			solution: 'Pre-register allowed queries with hashed IDs. Clients send only the hash. Blocks unknown queries in production.',
			code: `// Instead of sending the full query:
POST /graphql
{ "query": "query { user(id: 1) { name } }" }

// Send just the hash:
POST /graphql
{ "extensions": {
    "persistedQuery": {
      "sha256Hash": "abc123..."
    }
  },
  "variables": { "id": "1" }
}`,
			icon: '🔒',
			color: 'text-accent-green',
			bgColor: 'bg-accent-green/10 border-accent-green/30'
		}
	];

	let selectedPractice: Practice | null = null;
</script>

<div class="space-y-6">
	<!-- Practice Cards -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
		{#each practices as practice, i}
			<button
				class="p-4 rounded-lg border transition-all duration-200 text-left
					{selectedPractice?.name === practice.name
						? practice.bgColor + ' scale-105'
						: 'bg-dark-800/50 border-dark-700 hover:border-dark-600'}"
				on:click={() => selectedPractice = selectedPractice?.name === practice.name ? null : practice}
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="text-2xl mb-2">{practice.icon}</div>
				<div class="font-medium text-sm {practice.color}">{practice.name}</div>
				<p class="text-xs text-gray-500 mt-1 line-clamp-2">{practice.problem}</p>
			</button>
		{/each}
	</div>

	<!-- Selected Details -->
	{#if selectedPractice}
		<div
			class="rounded-lg border {selectedPractice.bgColor} p-6"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="flex items-start gap-4">
				<span class="text-3xl">{selectedPractice.icon}</span>
				<div class="flex-1">
					<h4 class="font-bold text-lg {selectedPractice.color}">{selectedPractice.name}</h4>

					<div class="mt-3">
						<span class="text-xs text-gray-500 uppercase tracking-wide">Problem:</span>
						<p class="text-sm text-gray-300 mt-1">{selectedPractice.problem}</p>
					</div>

					<div class="mt-3">
						<span class="text-xs text-gray-500 uppercase tracking-wide">Solution:</span>
						<p class="text-sm text-gray-300 mt-1">{selectedPractice.solution}</p>
					</div>

					{#if selectedPractice.code}
						<pre class="mt-4 p-3 rounded bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{selectedPractice.code}</code></pre>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div class="text-center py-6 text-gray-500 text-sm">
			Click on a topic to see the problem and solution
		</div>
	{/if}
</div>
