<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface ErrorCategory {
		range: string;
		name: string;
		description: string;
		color: string;
		errors: {
			code: number;
			name: string;
			description: string;
			example?: string;
		}[];
	}

	const errorCategories: ErrorCategory[] = [
		{
			range: '4xx',
			name: 'Client Errors',
			description: 'The request contains bad syntax or cannot be fulfilled',
			color: 'text-accent-orange',
			errors: [
				{
					code: 400,
					name: 'Bad Request',
					description: 'Invalid JSON, missing required fields, validation errors',
					example: '{ "error": "Validation failed", "details": { "email": "Invalid email format" } }'
				},
				{
					code: 401,
					name: 'Unauthorized',
					description: 'Authentication required or token expired',
					example: '{ "error": "Invalid or expired token" }'
				},
				{
					code: 403,
					name: 'Forbidden',
					description: 'Authenticated but not authorized for this action',
					example: '{ "error": "You do not have permission to delete this resource" }'
				},
				{
					code: 404,
					name: 'Not Found',
					description: 'Resource does not exist at this URL',
					example: '{ "error": "User not found", "id": 123 }'
				},
				{
					code: 409,
					name: 'Conflict',
					description: 'Resource state conflict (e.g., duplicate entry)',
					example: '{ "error": "Email already exists" }'
				},
				{
					code: 422,
					name: 'Unprocessable Entity',
					description: 'Valid JSON but semantically incorrect',
					example: '{ "error": "Cannot transfer more than account balance" }'
				},
				{
					code: 429,
					name: 'Too Many Requests',
					description: 'Rate limit exceeded',
					example: '{ "error": "Rate limit exceeded", "retry_after": 60 }'
				}
			]
		},
		{
			range: '5xx',
			name: 'Server Errors',
			description: 'The server failed to fulfill a valid request',
			color: 'text-accent-pink',
			errors: [
				{
					code: 500,
					name: 'Internal Server Error',
					description: 'Unexpected server error - never expose internal details',
					example: '{ "error": "An unexpected error occurred", "request_id": "abc123" }'
				},
				{
					code: 502,
					name: 'Bad Gateway',
					description: 'Invalid response from upstream server',
					example: '{ "error": "Service temporarily unavailable" }'
				},
				{
					code: 503,
					name: 'Service Unavailable',
					description: 'Server overloaded or under maintenance',
					example: '{ "error": "Service under maintenance", "retry_after": 300 }'
				},
				{
					code: 504,
					name: 'Gateway Timeout',
					description: 'Upstream server did not respond in time',
					example: '{ "error": "Request timed out" }'
				}
			]
		}
	];

	let expandedCategory: string | null = null;
	let selectedError: { code: number; name: string; description: string; example?: string } | null = null;
</script>

<div class="space-y-4">
	{#each errorCategories as category, i}
		<div
			class="rounded-lg border border-dark-700 overflow-hidden"
			in:fly={{ y: 10, delay: i * 100 }}
		>
			<button
				class="w-full p-4 flex items-center gap-4 hover:bg-dark-800/50 transition-colors"
				on:click={() => {
					expandedCategory = expandedCategory === category.range ? null : category.range;
					selectedError = null;
				}}
			>
				<span class="font-mono font-bold {category.color}">{category.range}</span>
				<div class="flex-1 text-left">
					<span class="text-white font-medium">{category.name}</span>
					<span class="text-gray-500 text-sm ml-2 hidden md:inline">{category.description}</span>
				</div>
				<svg
					class="w-5 h-5 text-gray-500 transition-transform duration-200 {expandedCategory === category.range ? 'rotate-180' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{#if expandedCategory === category.range}
				<div class="border-t border-dark-700 bg-dark-800/30" transition:slide={{ duration: 200 }}>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-4">
						{#each category.errors as error}
							<button
								class="p-3 rounded-lg border text-left transition-all duration-200
									{selectedError?.code === error.code
										? (category.color === 'text-accent-orange' ? 'bg-accent-orange/10 border-accent-orange/30' : 'bg-accent-pink/10 border-accent-pink/30')
										: 'bg-dark-900/50 border-dark-700 hover:border-dark-600'}"
								on:click={() => selectedError = selectedError?.code === error.code ? null : error}
							>
								<span class="font-mono {category.color}">{error.code}</span>
								<div class="text-sm text-gray-400 mt-1">{error.name}</div>
							</button>
						{/each}
					</div>

					{#if selectedError}
						<div class="border-t border-dark-700 p-4" transition:slide={{ duration: 200 }}>
							<div class="flex items-start gap-3">
								<span class="font-mono text-2xl {category.color}">{selectedError.code}</span>
								<div class="flex-1">
									<h4 class="font-medium text-white">{selectedError.name}</h4>
									<p class="text-sm text-gray-400 mt-1">{selectedError.description}</p>
									{#if selectedError.example}
										<div class="mt-3">
											<span class="text-xs text-gray-500 uppercase tracking-wide">Example Response:</span>
											<pre class="mt-2 p-3 rounded bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{selectedError.example}</code></pre>
										</div>
									{/if}
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	{/each}

	<!-- Error Response Structure -->
	<div class="mt-6">
		<h4 class="text-sm font-medium text-gray-400 mb-4">Consistent Error Response Structure</h4>
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<pre class="text-sm text-gray-300 overflow-x-auto"><code>{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request data is invalid",
    "details": [
      { "field": "email", "message": "Must be a valid email" },
      { "field": "age", "message": "Must be at least 18" }
    ]
  },
  "request_id": "req_abc123",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</code></pre>
		</div>
	</div>

	<!-- Best Practice Note -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">Security Best Practice</h4>
				<p class="text-sm text-gray-400 mt-1">
					Never expose internal error details (stack traces, database errors) in production.
					Log detailed errors server-side and return generic messages with a request ID for debugging.
				</p>
			</div>
		</div>
	</div>
</div>
