<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface StatusCode {
		code: number;
		name: string;
		description: string;
	}

	interface StatusCategory {
		range: string;
		name: string;
		description: string;
		color: string;
		bgColor: string;
		codes: StatusCode[];
	}

	const categories: StatusCategory[] = [
		{
			range: '1xx',
			name: 'Informational',
			description: 'Request received, continuing process',
			color: 'text-gray-400',
			bgColor: 'bg-gray-500/10 border-gray-500/30',
			codes: [
				{ code: 100, name: 'Continue', description: 'Server received request headers, client should proceed with body' },
				{ code: 101, name: 'Switching Protocols', description: 'Server is switching protocols as requested (e.g., to WebSocket)' }
			]
		},
		{
			range: '2xx',
			name: 'Success',
			description: 'Request was successfully received and processed',
			color: 'text-accent-green',
			bgColor: 'bg-accent-green/10 border-accent-green/30',
			codes: [
				{ code: 200, name: 'OK', description: 'Standard success response. Body contains the requested resource.' },
				{ code: 201, name: 'Created', description: 'Resource was successfully created. Often returns the new resource.' },
				{ code: 204, name: 'No Content', description: 'Success but no body returned. Common for DELETE operations.' },
				{ code: 206, name: 'Partial Content', description: 'Partial resource returned. Used for range requests (video streaming).' }
			]
		},
		{
			range: '3xx',
			name: 'Redirection',
			description: 'Further action needed to complete request',
			color: 'text-accent-cyan',
			bgColor: 'bg-accent-cyan/10 border-accent-cyan/30',
			codes: [
				{ code: 301, name: 'Moved Permanently', description: 'Resource permanently moved. Update your bookmarks. SEO-friendly.' },
				{ code: 302, name: 'Found', description: 'Resource temporarily at different URL. Keep using original URL.' },
				{ code: 304, name: 'Not Modified', description: 'Cached version is still valid. No body sent (save bandwidth).' },
				{ code: 307, name: 'Temporary Redirect', description: 'Like 302 but must use same method. POST stays POST.' }
			]
		},
		{
			range: '4xx',
			name: 'Client Error',
			description: 'Request contains bad syntax or cannot be fulfilled',
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10 border-accent-orange/30',
			codes: [
				{ code: 400, name: 'Bad Request', description: 'Server cannot process due to client error (malformed syntax, invalid data).' },
				{ code: 401, name: 'Unauthorized', description: 'Authentication required. Missing or invalid credentials.' },
				{ code: 403, name: 'Forbidden', description: 'Server understood but refuses. Valid auth but insufficient permissions.' },
				{ code: 404, name: 'Not Found', description: 'Resource does not exist at the requested URL.' },
				{ code: 405, name: 'Method Not Allowed', description: 'HTTP method not supported for this resource (e.g., POST on read-only).' },
				{ code: 409, name: 'Conflict', description: 'Request conflicts with current state (e.g., duplicate entry).' },
				{ code: 422, name: 'Unprocessable Entity', description: 'Request well-formed but semantically incorrect. Validation failed.' },
				{ code: 429, name: 'Too Many Requests', description: 'Rate limit exceeded. Slow down, try again later.' }
			]
		},
		{
			range: '5xx',
			name: 'Server Error',
			description: 'Server failed to fulfill a valid request',
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10 border-accent-pink/30',
			codes: [
				{ code: 500, name: 'Internal Server Error', description: 'Generic server error. Something went wrong on the server.' },
				{ code: 502, name: 'Bad Gateway', description: 'Server acting as gateway received invalid response from upstream.' },
				{ code: 503, name: 'Service Unavailable', description: 'Server temporarily unavailable (maintenance, overload).' },
				{ code: 504, name: 'Gateway Timeout', description: 'Gateway/proxy did not receive response from upstream in time.' }
			]
		}
	];

	let expandedCategory: string | null = null;
</script>

<div class="space-y-4">
	<!-- Category Overview -->
	<div class="grid grid-cols-5 gap-2 mb-6">
		{#each categories as category, i}
			<div
				class="text-center p-3 rounded-lg border {category.bgColor}"
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="font-mono font-bold text-lg {category.color}">{category.range}</div>
				<div class="text-xs text-gray-500 mt-1">{category.name}</div>
			</div>
		{/each}
	</div>

	<!-- Expandable Categories -->
	{#each categories as category, i}
		<div
			class="rounded-lg border overflow-hidden {category.bgColor}"
			in:fly={{ y: 10, delay: i * 75 }}
		>
			<button
				class="w-full p-4 flex items-center justify-between text-left"
				on:click={() => expandedCategory = expandedCategory === category.range ? null : category.range}
			>
				<div class="flex items-center gap-3">
					<span class="font-mono font-bold text-xl {category.color}">{category.range}</span>
					<div>
						<span class="font-medium text-white">{category.name}</span>
						<p class="text-xs text-gray-500">{category.description}</p>
					</div>
				</div>
				<svg
					class="w-5 h-5 text-gray-500 transition-transform {expandedCategory === category.range ? 'rotate-180' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{#if expandedCategory === category.range}
				<div transition:slide={{ duration: 200 }} class="border-t border-dark-700/50">
					<div class="p-4 space-y-2">
						{#each category.codes as code}
							<div class="flex items-start gap-4 p-3 rounded-lg bg-dark-900/30">
								<span class="font-mono font-bold {category.color} w-12 flex-shrink-0">{code.code}</span>
								<div class="flex-1">
									<span class="font-medium text-white">{code.name}</span>
									<p class="text-sm text-gray-400 mt-0.5">{code.description}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/each}

	<!-- Common Interview Question -->
	<div class="mt-6 p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-purple text-xl">🎯</div>
			<div>
				<h4 class="text-sm font-medium text-white">Common Interview Question</h4>
				<p class="text-sm text-gray-400 mt-1">
					<strong class="text-gray-300">"What's the difference between 401 and 403?"</strong><br />
					401 means "Who are you?" (authentication missing/invalid).<br />
					403 means "I know who you are, but you can't do this" (authorization failed).
				</p>
			</div>
		</div>
	</div>
</div>
