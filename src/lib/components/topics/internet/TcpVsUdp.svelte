<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Protocol {
		name: string;
		fullName: string;
		color: string;
		reliable: boolean;
		ordered: boolean;
		connectionType: string;
		speed: string;
		overhead: string;
		useCases: string[];
	}

	const protocols: Protocol[] = [
		{
			name: 'TCP',
			fullName: 'Transmission Control Protocol',
			color: 'green',
			reliable: true,
			ordered: true,
			connectionType: 'Connection-oriented',
			speed: 'Slower',
			overhead: 'Higher',
			useCases: ['HTTP/HTTPS', 'Email (SMTP)', 'File transfers (FTP)', 'SSH']
		},
		{
			name: 'UDP',
			fullName: 'User Datagram Protocol',
			color: 'orange',
			reliable: false,
			ordered: false,
			connectionType: 'Connectionless',
			speed: 'Faster',
			overhead: 'Lower',
			useCases: ['Video streaming', 'Online gaming', 'VoIP', 'DNS queries']
		}
	];

	const comparisons = [
		{ feature: 'Reliability', tcp: 'Guaranteed delivery', udp: 'Best effort (may lose packets)' },
		{ feature: 'Ordering', tcp: 'Packets arrive in order', udp: 'No ordering guarantee' },
		{ feature: 'Connection', tcp: '3-way handshake first', udp: 'Just send data' },
		{ feature: 'Error checking', tcp: 'Checksums + retransmission', udp: 'Checksums only' },
		{ feature: 'Flow control', tcp: 'Yes (prevents overwhelming receiver)', udp: 'No' },
		{ feature: 'Congestion control', tcp: 'Yes (adjusts to network)', udp: 'No' }
	];
</script>

<div class="space-y-6">
	<!-- Side by Side Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each protocols as protocol, i}
			<div
				class="p-5 rounded-xl border-2 {protocol.color === 'green' ? 'border-accent-green/30 bg-accent-green/5' : 'border-accent-orange/30 bg-accent-orange/5'}"
				in:fly={{ x: i === 0 ? -20 : 20, duration: 300, delay: i * 100 }}
			>
				<div class="flex items-center gap-3 mb-4">
					<span class="text-2xl font-bold {protocol.color === 'green' ? 'text-accent-green' : 'text-accent-orange'}">
						{protocol.name}
					</span>
					<span class="text-xs text-gray-500">{protocol.fullName}</span>
				</div>

				<div class="space-y-3">
					<div class="flex items-center gap-2">
						{#if protocol.reliable}
							<span class="text-accent-green">✓</span>
							<span class="text-sm text-gray-300">Reliable delivery</span>
						{:else}
							<span class="text-accent-orange">✗</span>
							<span class="text-sm text-gray-400">May lose packets</span>
						{/if}
					</div>
					<div class="flex items-center gap-2">
						{#if protocol.ordered}
							<span class="text-accent-green">✓</span>
							<span class="text-sm text-gray-300">Ordered delivery</span>
						{:else}
							<span class="text-accent-orange">✗</span>
							<span class="text-sm text-gray-400">No ordering</span>
						{/if}
					</div>
					<div class="text-sm text-gray-400">
						<span class="text-gray-500">Connection:</span> {protocol.connectionType}
					</div>
					<div class="text-sm text-gray-400">
						<span class="text-gray-500">Speed:</span> {protocol.speed}
					</div>
				</div>

				<div class="mt-4 pt-4 border-t border-dark-700/50">
					<div class="text-xs text-gray-500 mb-2">Common Uses:</div>
					<div class="flex flex-wrap gap-1">
						{#each protocol.useCases as useCase}
							<span class="px-2 py-1 rounded text-xs bg-dark-900/50">{useCase}</span>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- TCP 3-Way Handshake -->
	<div class="p-4 rounded-lg bg-dark-800 border border-accent-green/30">
		<h4 class="text-sm font-medium text-white mb-4">TCP 3-Way Handshake</h4>
		<div class="flex items-center justify-between max-w-md mx-auto">
			<div class="text-center">
				<div class="w-16 h-16 rounded-lg bg-dark-700 flex items-center justify-center mb-2">
					<span class="text-sm text-gray-400">Client</span>
				</div>
			</div>
			<div class="flex-1 px-4 space-y-2">
				<div class="flex items-center gap-2">
					<span class="text-accent-blue text-xs">1. SYN</span>
					<div class="flex-1 border-t border-dashed border-accent-blue"></div>
					<span class="text-accent-blue">→</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-accent-green">←</span>
					<div class="flex-1 border-t border-dashed border-accent-green"></div>
					<span class="text-accent-green text-xs">2. SYN-ACK</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-accent-purple text-xs">3. ACK</span>
					<div class="flex-1 border-t border-dashed border-accent-purple"></div>
					<span class="text-accent-purple">→</span>
				</div>
			</div>
			<div class="text-center">
				<div class="w-16 h-16 rounded-lg bg-dark-700 flex items-center justify-center mb-2">
					<span class="text-sm text-gray-400">Server</span>
				</div>
			</div>
		</div>
		<p class="text-xs text-gray-500 text-center mt-4">
			This happens before any data is sent. UDP skips this entirely.
		</p>
	</div>

	<!-- Comparison Table -->
	<div class="overflow-x-auto">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-dark-700">
					<th class="text-left py-2 px-3 text-gray-500 font-medium">Feature</th>
					<th class="text-left py-2 px-3 text-accent-green font-medium">TCP</th>
					<th class="text-left py-2 px-3 text-accent-orange font-medium">UDP</th>
				</tr>
			</thead>
			<tbody>
				{#each comparisons as row, i}
					<tr class="border-b border-dark-700/50" in:fly={{ y: 10, delay: i * 30 }}>
						<td class="py-2 px-3 text-gray-400">{row.feature}</td>
						<td class="py-2 px-3 text-gray-300">{row.tcp}</td>
						<td class="py-2 px-3 text-gray-300">{row.udp}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- When to Use -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="p-4 rounded-lg bg-accent-green/5 border border-accent-green/30">
			<h4 class="text-sm font-medium text-accent-green mb-2">Use TCP when:</h4>
			<ul class="text-sm text-gray-400 space-y-1">
				<li>• Data must arrive complete and correct</li>
				<li>• Order matters (loading a webpage)</li>
				<li>• You can tolerate some latency</li>
			</ul>
		</div>
		<div class="p-4 rounded-lg bg-accent-orange/5 border border-accent-orange/30">
			<h4 class="text-sm font-medium text-accent-orange mb-2">Use UDP when:</h4>
			<ul class="text-sm text-gray-400 space-y-1">
				<li>• Speed is critical (real-time apps)</li>
				<li>• Some packet loss is acceptable</li>
				<li>• You handle reliability yourself</li>
			</ul>
		</div>
	</div>
</div>
