<script lang="ts">
	import { Section, KeyTerm, DiagramContainer } from '$lib/components/ui';
	import HandshakeProcess from './HandshakeProcess.svelte';
	import MessageFlow from './MessageFlow.svelte';
	import ConnectionLifecycle from './ConnectionLifecycle.svelte';
	import ComparisonTable from './ComparisonTable.svelte';
	import UseCases from './UseCases.svelte';

	const keyTerms = [
		{
			term: 'WebSocket',
			definition: 'A communication protocol providing full-duplex (bi-directional) communication channels over a single TCP connection. Unlike HTTP, both client and server can send messages independently at any time without waiting for a request.',
			color: 'pink' as const
		},
		{
			term: 'Full-Duplex',
			definition: 'Communication where both parties can send and receive data simultaneously. Unlike half-duplex (walkie-talkie) or simplex (one-way), full-duplex allows truly real-time bi-directional data flow.',
			color: 'blue' as const
		},
		{
			term: 'WebSocket Handshake',
			definition: 'The initial HTTP request with Upgrade: websocket header that switches the protocol from HTTP to WebSocket. Server responds with 101 Switching Protocols to confirm the upgrade.',
			color: 'green' as const
		},
		{
			term: 'Frame',
			definition: 'The smallest unit of data in WebSocket protocol. Each frame has an opcode (text, binary, ping, pong, close), payload length, optional masking key, and payload data. Frames are lightweight (2-14 bytes overhead).',
			color: 'cyan' as const
		},
		{
			term: 'ws:// and wss://',
			definition: 'WebSocket URL schemes. ws:// is unencrypted (like HTTP), wss:// is encrypted with TLS (like HTTPS). Always use wss:// in production for security. Default ports are 80 (ws) and 443 (wss).',
			color: 'purple' as const
		},
		{
			term: 'Heartbeat (Ping/Pong)',
			definition: 'Control frames used to keep the connection alive and detect broken connections. One side sends a Ping frame, the other must respond with Pong. If no Pong is received, the connection is considered dead.',
			color: 'yellow' as const
		},
		{
			term: 'Socket.IO',
			definition: 'A popular library built on top of WebSockets that adds features like automatic reconnection, room-based broadcasting, fallback to HTTP long-polling, and event-based messaging. Not a WebSocket implementation itself.',
			color: 'orange' as const
		},
		{
			term: 'Connection Multiplexing',
			definition: 'Technique of running multiple logical channels over a single WebSocket connection. Reduces resource usage compared to opening multiple connections. Often implemented with channel IDs in message payloads.',
			color: 'pink' as const
		}
	];
</script>

<div class="space-y-12">
	<!-- Overview Section -->
	<Section title="What are WebSockets?" subtitle="Real-time bi-directional communication for the modern web">
		<div class="prose prose-invert max-w-none">
			<p class="text-gray-300 leading-relaxed">
				<strong class="text-accent-pink">WebSockets</strong> provide a persistent, full-duplex communication
				channel between a client and server over a single TCP connection. Unlike HTTP's request-response model,
				WebSockets allow both sides to send messages <strong class="text-accent-cyan">independently and simultaneously</strong>.
			</p>
			<p class="text-gray-400 mt-4">
				A WebSocket connection starts as a regular HTTP request with an
				<code class="text-accent-green">Upgrade: websocket</code> header. Once the server agrees,
				the protocol switches from HTTP to WebSocket, and both sides can exchange
				<strong class="text-accent-blue">lightweight frames</strong> with minimal overhead (as low as 2 bytes per frame).
			</p>
		</div>
	</Section>

	<!-- Handshake Process -->
	<Section title="The WebSocket Handshake" subtitle="How an HTTP connection upgrades to WebSocket">
		<DiagramContainer
			title="WebSocket Opening Handshake"
			description="Watch the upgrade from HTTP to WebSocket protocol"
		>
			<HandshakeProcess />
		</DiagramContainer>
	</Section>

	<!-- Message Flow -->
	<Section title="Bi-Directional Message Flow" subtitle="Real-time data exchange between client and server">
		<DiagramContainer
			title="Live Message Stream"
			description="Watch messages flow between client and server in real-time"
		>
			<MessageFlow />
		</DiagramContainer>
	</Section>

	<!-- Connection Lifecycle -->
	<Section title="Connection Lifecycle" subtitle="WebSocket API events, ready states, and close codes">
		<ConnectionLifecycle />
	</Section>

	<!-- Comparison -->
	<Section title="WebSockets vs Alternatives" subtitle="Choosing the right real-time communication approach">
		<DiagramContainer
			title="Real-Time Communication Approaches"
			description="Compare polling, long polling, SSE, and WebSockets"
		>
			<ComparisonTable />
		</DiagramContainer>
	</Section>

	<!-- Use Cases -->
	<Section title="Common Use Cases" subtitle="When WebSockets are the right tool for the job">
		<UseCases />
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
