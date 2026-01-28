<script lang="ts">
	import { Section, KeyTerm, DiagramContainer } from '$lib/components/ui';
	import RequestResponse from './RequestResponse.svelte';
	import HttpMethods from './HttpMethods.svelte';
	import StatusCodes from './StatusCodes.svelte';
	import TlsHandshake from './TlsHandshake.svelte';
	import HttpHeaders from './HttpHeaders.svelte';

	const keyTerms = [
		{
			term: 'HTTP (HyperText Transfer Protocol)',
			definition: 'An application-layer protocol for transmitting hypermedia documents. It follows a client-server model where the client (browser) sends requests and the server sends responses. HTTP is stateless - each request is independent.',
			color: 'blue' as const
		},
		{
			term: 'HTTPS',
			definition: 'HTTP Secure - the encrypted version of HTTP using TLS (Transport Layer Security). Data is encrypted before transmission, preventing eavesdropping and man-in-the-middle attacks. Uses port 443 by default.',
			color: 'purple' as const
		},
		{
			term: 'Request',
			definition: 'A message sent from client to server containing: a method (GET, POST, etc.), a URL path, headers (metadata), and optionally a body (data payload). Example: GET /api/users HTTP/1.1',
			color: 'blue' as const
		},
		{
			term: 'Response',
			definition: 'A message sent from server to client containing: a status code (200, 404, etc.), status text, headers, and optionally a body. The body typically contains HTML, JSON, or other content.',
			color: 'green' as const
		},
		{
			term: 'Headers',
			definition: 'Key-value pairs providing metadata about the request or response. Common headers: Content-Type (data format), Authorization (credentials), Cache-Control (caching rules), Cookie (session data).',
			color: 'cyan' as const
		},
		{
			term: 'Stateless',
			definition: 'HTTP does not maintain state between requests. Each request is independent - the server does not remember previous requests. State is maintained using cookies, sessions, or tokens.',
			color: 'orange' as const
		},
		{
			term: 'Idempotent',
			definition: 'An operation that produces the same result regardless of how many times it is executed. GET, PUT, DELETE are idempotent. POST is NOT idempotent (each call may create a new resource).',
			color: 'yellow' as const
		},
		{
			term: 'TLS/SSL Handshake',
			definition: 'The process of establishing a secure connection. Client and server exchange certificates, agree on encryption algorithms, and generate session keys. This happens before any HTTP data is sent.',
			color: 'purple' as const
		}
	];
</script>

<div class="space-y-12">
	<!-- Overview Section -->
	<Section title="What is HTTP?" subtitle="The foundation of data communication on the web">
		<div class="prose prose-invert max-w-none">
			<p class="text-gray-300 leading-relaxed">
				HTTP (HyperText Transfer Protocol) is the foundation of data communication on the World Wide Web.
				When you visit a website, your browser sends an <strong class="text-accent-blue">HTTP request</strong> to a server,
				which processes it and sends back an <strong class="text-accent-green">HTTP response</strong>.
			</p>
			<p class="text-gray-400 mt-4">
				This request-response cycle is the core of how web applications work. Understanding it deeply
				will help you debug issues, optimize performance, and design better APIs.
			</p>
		</div>
	</Section>

	<!-- Request/Response Animation -->
	<Section title="Request-Response Cycle" subtitle="How client and server communicate">
		<DiagramContainer
			title="HTTP Request-Response Flow"
			description="Watch how data flows between client and server"
		>
			<RequestResponse />
		</DiagramContainer>
	</Section>

	<!-- HTTP Methods -->
	<Section title="HTTP Methods" subtitle="Different types of requests for different operations">
		<DiagramContainer
			title="CRUD Operations Mapping"
			description="Each method serves a specific purpose in RESTful APIs"
		>
			<HttpMethods />
		</DiagramContainer>
	</Section>

	<!-- Status Codes -->
	<Section title="Status Codes" subtitle="Server responses categorized by meaning">
		<StatusCodes />
	</Section>

	<!-- HTTP Headers -->
	<Section title="Common Headers" subtitle="Metadata that controls request and response behavior">
		<HttpHeaders />
	</Section>

	<!-- TLS Handshake -->
	<Section title="TLS/SSL Handshake" subtitle="How HTTPS establishes a secure connection">
		<DiagramContainer
			title="The TLS Handshake Process"
			description="Before any HTTP data is sent, client and server establish encryption"
		>
			<TlsHandshake />
		</DiagramContainer>
	</Section>

	<!-- Key Terms -->
	<Section title="Key Terms to Remember" subtitle="Master these terms for technical interviews">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
			{#each keyTerms as { term, definition, color }}
				<KeyTerm {term} {definition} {color} />
			{/each}
		</div>
	</Section>
</div>
