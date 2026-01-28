<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface Layer {
		name: string;
		number: number;
		protocols: string[];
		description: string;
		dataUnit: string;
		color: string;
		example: string;
	}

	const layers: Layer[] = [
		{
			name: 'Application',
			number: 4,
			protocols: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'SSH'],
			description: 'Where user applications interact with the network. Handles high-level protocols for specific services.',
			dataUnit: 'Data/Message',
			color: 'blue',
			example: 'Your browser making an HTTP request to load a webpage'
		},
		{
			name: 'Transport',
			number: 3,
			protocols: ['TCP', 'UDP'],
			description: 'Provides end-to-end communication. TCP ensures reliable, ordered delivery. UDP is faster but unreliable.',
			dataUnit: 'Segment (TCP) / Datagram (UDP)',
			color: 'green',
			example: 'TCP breaking data into segments and ensuring they all arrive correctly'
		},
		{
			name: 'Internet',
			number: 2,
			protocols: ['IP', 'ICMP', 'ARP'],
			description: 'Handles addressing and routing. IP addresses identify devices. Routers use this layer to forward packets.',
			dataUnit: 'Packet',
			color: 'purple',
			example: 'IP adding source/destination addresses and routers forwarding packets'
		},
		{
			name: 'Network Access',
			number: 1,
			protocols: ['Ethernet', 'Wi-Fi', 'PPP'],
			description: 'Physical transmission of data. Handles hardware addressing (MAC), electrical signals, and physical media.',
			dataUnit: 'Frame',
			color: 'orange',
			example: 'Your Wi-Fi card converting data to radio waves'
		}
	];

	let selectedLayer: number | null = null;

	const colorClasses: Record<string, string> = {
		blue: 'border-accent-blue bg-accent-blue/10 hover:bg-accent-blue/20',
		green: 'border-accent-green bg-accent-green/10 hover:bg-accent-green/20',
		purple: 'border-accent-purple bg-accent-purple/10 hover:bg-accent-purple/20',
		orange: 'border-accent-orange bg-accent-orange/10 hover:bg-accent-orange/20'
	};

	const selectedColorClasses: Record<string, string> = {
		blue: 'border-accent-blue bg-accent-blue/20',
		green: 'border-accent-green bg-accent-green/20',
		purple: 'border-accent-purple bg-accent-purple/20',
		orange: 'border-accent-orange bg-accent-orange/20'
	};
</script>

<div class="space-y-6">
	<!-- Stack Visualization -->
	<div class="flex flex-col gap-2">
		{#each layers as layer, i}
			<button
				class="p-4 rounded-lg border-2 transition-all text-left {selectedLayer === layer.number ? selectedColorClasses[layer.color] + ' scale-[1.02]' : colorClasses[layer.color]}"
				on:click={() => selectedLayer = selectedLayer === layer.number ? null : layer.number}
				in:fly={{ x: -20, delay: i * 50 }}
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-4">
						<span class="w-8 h-8 rounded-full bg-dark-900/50 flex items-center justify-center text-sm font-bold">
							{layer.number}
						</span>
						<div>
							<span class="font-semibold text-white">{layer.name} Layer</span>
							<div class="flex gap-2 mt-1 flex-wrap">
								{#each layer.protocols.slice(0, 4) as protocol}
									<span class="px-2 py-0.5 rounded text-xs bg-dark-900/50 font-mono">{protocol}</span>
								{/each}
								{#if layer.protocols.length > 4}
									<span class="px-2 py-0.5 rounded text-xs bg-dark-900/50 text-gray-500">+{layer.protocols.length - 4}</span>
								{/if}
							</div>
						</div>
					</div>
					<div class="text-right hidden md:block">
						<span class="text-xs text-gray-500">Data Unit:</span>
						<span class="text-sm text-gray-300 ml-1">{layer.dataUnit}</span>
					</div>
				</div>

				{#if selectedLayer === layer.number}
					<div transition:slide={{ duration: 200 }} class="mt-4 pt-4 border-t border-dark-700/50">
						<p class="text-sm text-gray-400">{layer.description}</p>
						<div class="mt-3 p-3 rounded bg-dark-900/50">
							<span class="text-xs text-gray-500">Example: </span>
							<span class="text-sm text-gray-300">{layer.example}</span>
						</div>
					</div>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Data Flow Arrow -->
	<div class="flex items-center justify-center gap-4 py-4">
		<div class="flex flex-col items-center">
			<span class="text-xs text-gray-500 mb-2">Sending</span>
			<div class="flex flex-col items-center gap-1">
				<span class="text-accent-blue">Application</span>
				<span class="text-gray-500">↓</span>
				<span class="text-accent-green">Transport</span>
				<span class="text-gray-500">↓</span>
				<span class="text-accent-purple">Internet</span>
				<span class="text-gray-500">↓</span>
				<span class="text-accent-orange">Network</span>
			</div>
		</div>
		<div class="text-4xl text-gray-600 px-8">→</div>
		<div class="text-center text-gray-500 text-sm">
			Physical<br/>Transmission
		</div>
		<div class="text-4xl text-gray-600 px-8">→</div>
		<div class="flex flex-col items-center">
			<span class="text-xs text-gray-500 mb-2">Receiving</span>
			<div class="flex flex-col items-center gap-1">
				<span class="text-accent-orange">Network</span>
				<span class="text-gray-500">↓</span>
				<span class="text-accent-purple">Internet</span>
				<span class="text-gray-500">↓</span>
				<span class="text-accent-green">Transport</span>
				<span class="text-gray-500">↓</span>
				<span class="text-accent-blue">Application</span>
			</div>
		</div>
	</div>

	<!-- Encapsulation -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-cyan text-xl">📦</div>
			<div>
				<h4 class="text-sm font-medium text-white">Encapsulation</h4>
				<p class="text-sm text-gray-400 mt-1">
					As data moves down the stack, each layer adds its own header (and sometimes trailer).
					This is called <strong class="text-gray-300">encapsulation</strong>. On the receiving end,
					each layer removes its header - this is <strong class="text-gray-300">decapsulation</strong>.
				</p>
				<div class="mt-3 font-mono text-xs flex flex-wrap gap-1">
					<span class="px-2 py-1 rounded bg-accent-orange/20 text-accent-orange">Frame Header</span>
					<span class="px-2 py-1 rounded bg-accent-purple/20 text-accent-purple">IP Header</span>
					<span class="px-2 py-1 rounded bg-accent-green/20 text-accent-green">TCP Header</span>
					<span class="px-2 py-1 rounded bg-accent-blue/20 text-accent-blue">HTTP Data</span>
				</div>
			</div>
		</div>
	</div>
</div>
