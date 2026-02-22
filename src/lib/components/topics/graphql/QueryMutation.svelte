<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface Operation {
		name: string;
		type: 'query' | 'mutation' | 'subscription';
		description: string;
		query: string;
		variables?: string;
		response: string;
		color: string;
	}

	const operations: Operation[] = [
		{
			name: 'Basic Query',
			type: 'query',
			description: 'Fetch specific fields from a resource. Client asks for exactly what it needs.',
			query: `query {
  user(id: "1") {
    name
    email
  }
}`,
			response: `{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}`,
			color: 'text-accent-blue'
		},
		{
			name: 'Nested Query',
			type: 'query',
			description: 'Fetch related data in a single request. No need for multiple API calls.',
			query: `query {
  user(id: "1") {
    name
    posts {
      title
      comments {
        text
        author { name }
      }
    }
  }
}`,
			response: `{
  "data": {
    "user": {
      "name": "Alice",
      "posts": [
        {
          "title": "GraphQL 101",
          "comments": [
            {
              "text": "Great post!",
              "author": { "name": "Bob" }
            }
          ]
        }
      ]
    }
  }
}`,
			color: 'text-accent-cyan'
		},
		{
			name: 'Query with Variables',
			type: 'query',
			description: 'Use variables for dynamic values. Prevents string interpolation and enables caching.',
			query: `query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
    role
  }
}`,
			variables: `{
  "id": "1"
}`,
			response: `{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com",
      "role": "ADMIN"
    }
  }
}`,
			color: 'text-accent-green'
		},
		{
			name: 'Create Mutation',
			type: 'mutation',
			description: 'Mutations modify server-side data. They can return the created/updated resource.',
			query: `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}`,
			variables: `{
  "input": {
    "name": "Charlie",
    "email": "charlie@example.com"
  }
}`,
			response: `{
  "data": {
    "createUser": {
      "id": "3",
      "name": "Charlie",
      "email": "charlie@example.com"
    }
  }
}`,
			color: 'text-accent-orange'
		},
		{
			name: 'Update Mutation',
			type: 'mutation',
			description: 'Update existing data and get back the modified fields in one round trip.',
			query: `mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
  }
}`,
			variables: `{
  "id": "1",
  "input": {
    "name": "Alice Smith"
  }
}`,
			response: `{
  "data": {
    "updateUser": {
      "id": "1",
      "name": "Alice Smith",
      "email": "alice@example.com"
    }
  }
}`,
			color: 'text-accent-yellow'
		},
		{
			name: 'Subscription',
			type: 'subscription',
			description: 'Real-time updates over WebSocket. Server pushes data when events occur.',
			query: `subscription OnNewMessage($channel: String!) {
  messageAdded(channel: $channel) {
    id
    text
    author { name }
    createdAt
  }
}`,
			variables: `{
  "channel": "general"
}`,
			response: `{
  "data": {
    "messageAdded": {
      "id": "42",
      "text": "Hello everyone!",
      "author": { "name": "Alice" },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}`,
			color: 'text-accent-pink'
		}
	];

	let selectedOp: Operation | null = null;
</script>

<div class="space-y-4">
	<!-- Operation Type Legend -->
	<div class="flex flex-wrap gap-3 mb-2">
		<div class="flex items-center gap-2 text-xs">
			<div class="w-2 h-2 rounded-full bg-accent-blue"></div>
			<span class="text-gray-400">Query (read)</span>
		</div>
		<div class="flex items-center gap-2 text-xs">
			<div class="w-2 h-2 rounded-full bg-accent-orange"></div>
			<span class="text-gray-400">Mutation (write)</span>
		</div>
		<div class="flex items-center gap-2 text-xs">
			<div class="w-2 h-2 rounded-full bg-accent-pink"></div>
			<span class="text-gray-400">Subscription (real-time)</span>
		</div>
	</div>

	<!-- Operation List -->
	<div class="space-y-2">
		{#each operations as op, i}
			<div
				class="rounded-lg border border-dark-700 overflow-hidden"
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<button
					class="w-full p-4 flex items-center gap-4 hover:bg-dark-800/50 transition-colors text-left"
					on:click={() => selectedOp = selectedOp?.name === op.name ? null : op}
				>
					<span
						class="font-mono font-bold text-xs px-2 py-0.5 rounded
							{op.type === 'query' ? 'bg-accent-blue/20 text-accent-blue' :
							 op.type === 'mutation' ? 'bg-accent-orange/20 text-accent-orange' :
							 'bg-accent-pink/20 text-accent-pink'}"
					>
						{op.type.toUpperCase()}
					</span>
					<span class="flex-1 text-gray-300 font-medium">{op.name}</span>
					<span class="text-gray-500 text-sm hidden md:block">{op.description}</span>
					<svg
						class="w-5 h-5 text-gray-500 transition-transform duration-200 {selectedOp?.name === op.name ? 'rotate-180' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if selectedOp?.name === op.name}
					<div class="border-t border-dark-700 bg-dark-800/30" transition:slide={{ duration: 200 }}>
						<p class="text-gray-400 text-sm p-4 pb-0 md:hidden">{op.description}</p>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
							<!-- Query -->
							<div>
								<span class="text-xs text-gray-500 uppercase tracking-wide">Operation:</span>
								<pre class="mt-2 p-3 rounded bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{op.query}</code></pre>
								{#if op.variables}
									<span class="text-xs text-gray-500 uppercase tracking-wide mt-3 block">Variables:</span>
									<pre class="mt-2 p-3 rounded bg-dark-900 text-sm text-accent-yellow/80 overflow-x-auto"><code>{op.variables}</code></pre>
								{/if}
							</div>
							<!-- Response -->
							<div>
								<span class="text-xs text-gray-500 uppercase tracking-wide">Response:</span>
								<pre class="mt-2 p-3 rounded bg-dark-900 text-sm text-accent-green/80 overflow-x-auto"><code>{op.response}</code></pre>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
