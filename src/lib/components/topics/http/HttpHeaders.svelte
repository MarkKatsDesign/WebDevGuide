<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface Header {
		name: string;
		type: 'request' | 'response' | 'both';
		description: string;
		example: string;
	}

	const headers: Header[] = [
		{
			name: 'Content-Type',
			type: 'both',
			description: 'Indicates the media type of the resource. Tells the recipient how to parse the body.',
			example: 'Content-Type: application/json'
		},
		{
			name: 'Authorization',
			type: 'request',
			description: 'Contains credentials for authenticating the client. Common schemes: Bearer (JWT), Basic.',
			example: 'Authorization: Bearer eyJhbGciOiJIUzI1NiIs...'
		},
		{
			name: 'Accept',
			type: 'request',
			description: 'Tells the server what content types the client can process. Server chooses best match.',
			example: 'Accept: application/json, text/html'
		},
		{
			name: 'Cache-Control',
			type: 'both',
			description: 'Directives for caching mechanisms. Controls how and for how long responses are cached.',
			example: 'Cache-Control: max-age=3600, public'
		},
		{
			name: 'Set-Cookie',
			type: 'response',
			description: 'Sends cookies from server to client. Stored by browser, sent back with future requests.',
			example: 'Set-Cookie: sessionId=abc123; HttpOnly; Secure'
		},
		{
			name: 'Cookie',
			type: 'request',
			description: 'Contains stored cookies. Sent automatically by browser for matching domain.',
			example: 'Cookie: sessionId=abc123; theme=dark'
		},
		{
			name: 'User-Agent',
			type: 'request',
			description: 'Identifies the client application. Contains browser name, version, and OS info.',
			example: 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
		},
		{
			name: 'CORS Headers',
			type: 'response',
			description: 'Access-Control-* headers that control cross-origin resource sharing.',
			example: 'Access-Control-Allow-Origin: https://example.com'
		}
	];

	let selectedHeader: string | null = null;

	function getTypeColor(type: string) {
		switch (type) {
			case 'request': return 'text-accent-blue bg-accent-blue/10';
			case 'response': return 'text-accent-green bg-accent-green/10';
			default: return 'text-accent-purple bg-accent-purple/10';
		}
	}
</script>

<div class="space-y-3">
	{#each headers as header, i}
		<div
			class="rounded-lg border border-dark-700 overflow-hidden bg-dark-800/30"
			in:fly={{ y: 10, delay: i * 40 }}
		>
			<button
				class="w-full p-4 flex items-center justify-between text-left hover:bg-dark-800/50 transition-colors"
				on:click={() => selectedHeader = selectedHeader === header.name ? null : header.name}
			>
				<div class="flex items-center gap-3">
					<code class="font-mono text-accent-cyan">{header.name}</code>
					<span class="px-2 py-0.5 rounded text-xs {getTypeColor(header.type)}">
						{header.type === 'both' ? 'req/res' : header.type}
					</span>
				</div>
				<svg
					class="w-4 h-4 text-gray-500 transition-transform {selectedHeader === header.name ? 'rotate-180' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{#if selectedHeader === header.name}
				<div transition:slide={{ duration: 200 }} class="px-4 pb-4 border-t border-dark-700">
					<p class="text-sm text-gray-400 mt-3 mb-3">{header.description}</p>
					<div class="p-3 rounded bg-dark-900 font-mono text-xs text-gray-300">
						{header.example}
					</div>
				</div>
			{/if}
		</div>
	{/each}

	<!-- Header Categories Legend -->
	<div class="flex gap-4 justify-center pt-4 text-xs">
		<div class="flex items-center gap-2">
			<span class="w-2 h-2 rounded-full bg-accent-blue"></span>
			<span class="text-gray-500">Request Header</span>
		</div>
		<div class="flex items-center gap-2">
			<span class="w-2 h-2 rounded-full bg-accent-green"></span>
			<span class="text-gray-500">Response Header</span>
		</div>
		<div class="flex items-center gap-2">
			<span class="w-2 h-2 rounded-full bg-accent-purple"></span>
			<span class="text-gray-500">Both</span>
		</div>
	</div>
</div>
