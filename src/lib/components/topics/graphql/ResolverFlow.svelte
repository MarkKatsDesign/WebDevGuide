<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const steps = [
		{
			id: 0,
			title: 'Client Sends Query',
			description: 'Client sends a GraphQL query specifying exactly which fields it needs',
			from: 'client',
			color: 'blue',
			highlight: ['client'],
			code: `query {
  user(id: "1") {
    name
    posts { title }
  }
}`
		},
		{
			id: 1,
			title: 'Parse & Validate',
			description: 'Server parses the query string into an AST and validates it against the schema',
			from: 'server',
			color: 'purple',
			highlight: ['server'],
			code: null
		},
		{
			id: 2,
			title: 'Execute Root Resolver',
			description: 'The root Query.user resolver is called with the argument id: "1"',
			from: 'server',
			color: 'orange',
			highlight: ['server', 'resolver'],
			code: `// Root resolver
Query: {
  user: (_, { id }) => db.users.findById(id)
}`
		},
		{
			id: 3,
			title: 'Execute Field Resolvers',
			description: 'Field resolvers for "name" and "posts" are called on the returned User object',
			from: 'server',
			color: 'cyan',
			highlight: ['server', 'resolver', 'db'],
			code: `// Field resolvers
User: {
  name: (user) => user.name,
  posts: (user) => db.posts.findByUserId(user.id)
}`
		},
		{
			id: 4,
			title: 'Assemble Response',
			description: 'Resolved data is assembled to match the exact shape of the query',
			from: 'server',
			color: 'green',
			highlight: ['server'],
			code: null
		},
		{
			id: 5,
			title: 'Return Data',
			description: 'The response is sent back matching the query structure. No over-fetching!',
			from: 'response',
			color: 'green',
			highlight: ['client'],
			code: `{
  "data": {
    "user": {
      "name": "Alice",
      "posts": [{ "title": "GraphQL 101" }]
    }
  }
}`
		}
	];

	const colorMap: Record<string, string> = {
		blue: 'border-accent-blue bg-accent-blue/10',
		green: 'border-accent-green bg-accent-green/10',
		purple: 'border-accent-purple bg-accent-purple/10',
		orange: 'border-accent-orange bg-accent-orange/10',
		cyan: 'border-accent-cyan bg-accent-cyan/10'
	};

	function startAnimation() {
		intervalId = setInterval(() => {
			step = (step + 1) % steps.length;
		}, 4000);
	}

	function togglePlay() {
		isPlaying = !isPlaying;
		if (isPlaying) {
			startAnimation();
		} else {
			clearInterval(intervalId);
		}
	}

	function goToStep(s: number) {
		step = s;
		if (isPlaying) {
			clearInterval(intervalId);
			startAnimation();
		}
	}

	onMount(() => {
		startAnimation();
		return () => clearInterval(intervalId);
	});
</script>

<div class="space-y-6">
	<!-- Architecture Diagram -->
	<div class="flex items-start justify-between gap-3 md:gap-6">
		<!-- Client -->
		<div class="text-center flex-shrink-0">
			<div
				class="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-xl border-2 flex items-center justify-center transition-all duration-300
					{steps[step].highlight.includes('client') ? 'border-accent-pink bg-accent-pink/10 scale-105' : 'border-dark-600 bg-dark-800'}"
			>
				<svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</div>
			<div class="mt-2 text-xs font-medium text-gray-300">Client</div>
		</div>

		<!-- Arrow -->
		<div class="flex-shrink-0 pt-5">
			<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</div>

		<!-- Server -->
		<div class="text-center flex-shrink-0">
			<div
				class="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-xl border-2 flex items-center justify-center transition-all duration-300
					{steps[step].highlight.includes('server') ? 'border-accent-purple bg-accent-purple/10 scale-105' : 'border-dark-600 bg-dark-800'}"
			>
				<svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
				</svg>
			</div>
			<div class="mt-2 text-xs font-medium text-gray-300">GraphQL Server</div>
		</div>

		<!-- Arrow -->
		<div class="flex-shrink-0 pt-5">
			<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</div>

		<!-- Resolvers -->
		<div class="text-center flex-shrink-0">
			<div
				class="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-xl border-2 flex items-center justify-center transition-all duration-300
					{steps[step].highlight.includes('resolver') ? 'border-accent-orange bg-accent-orange/10 scale-105' : 'border-dark-600 bg-dark-800'}"
			>
				<svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
			</div>
			<div class="mt-2 text-xs font-medium text-gray-300">Resolvers</div>
		</div>

		<!-- Arrow -->
		<div class="flex-shrink-0 pt-5">
			<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</div>

		<!-- Data Sources -->
		<div class="text-center flex-shrink-0">
			<div
				class="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-xl border-2 flex items-center justify-center transition-all duration-300
					{steps[step].highlight.includes('db') ? 'border-accent-green bg-accent-green/10 scale-105' : 'border-dark-600 bg-dark-800'}"
			>
				<svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
				</svg>
			</div>
			<div class="mt-2 text-xs font-medium text-gray-300">Data Sources</div>
		</div>
	</div>

	<!-- Step Progress -->
	<div class="flex justify-center gap-2">
		{#each steps as s}
			<button
				on:click={() => goToStep(s.id)}
				class="w-8 h-2 rounded-full transition-all
					{step === s.id ? 'bg-accent-pink' : 'bg-dark-600 hover:bg-dark-500'}"
			></button>
		{/each}
	</div>

	<!-- Current Step Info -->
	{#key step}
		<div
			class="p-4 rounded-lg border {colorMap[steps[step].color]}"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="font-medium text-white text-center">{steps[step].title}</div>
			<p class="text-sm text-gray-400 mt-1 text-center">{steps[step].description}</p>
		</div>
	{/key}

	<!-- Code Preview -->
	{#key step}
		{#if steps[step].code}
			<div in:fly={{ y: 10, duration: 200 }}>
				<pre class="p-4 rounded-lg bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{steps[step].code}</code></pre>
			</div>
		{/if}
	{/key}

	<!-- Controls -->
	<div class="flex justify-center">
		<button
			on:click={togglePlay}
			class="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors text-sm"
		>
			{#if isPlaying}
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
				</svg>
				Pause
			{:else}
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
				</svg>
				Play
			{/if}
		</button>
	</div>

	<!-- Resolver Signature -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">Resolver Function Signature</h4>
				<pre class="mt-2 p-3 rounded bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{`fieldName(parent, args, context, info)
  parent  → result from parent resolver
  args    → arguments passed to the field
  context → shared data (auth, DB connections)
  info    → query AST and execution info`}</code></pre>
			</div>
		</div>
	</div>
</div>
