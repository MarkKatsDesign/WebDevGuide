<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface Device {
		name: string;
		icon: string;
		layer: string;
		description: string;
		function: string;
		example: string;
		color: string;
	}

	const devices: Device[] = [
		{
			name: 'Hub',
			icon: '🔌',
			layer: 'Physical (Layer 1)',
			description: 'Broadcasts data to all connected devices. No intelligence - just repeats signals.',
			function: 'Signal repeater',
			example: 'Rarely used today, replaced by switches',
			color: 'gray'
		},
		{
			name: 'Switch',
			icon: '🔀',
			layer: 'Data Link (Layer 2)',
			description: 'Forwards data only to the intended device using MAC addresses. Creates separate collision domains.',
			function: 'MAC address routing',
			example: 'Office network switch connecting computers',
			color: 'blue'
		},
		{
			name: 'Router',
			icon: '📡',
			layer: 'Network (Layer 3)',
			description: 'Forwards packets between different networks using IP addresses. Makes routing decisions.',
			function: 'IP routing between networks',
			example: 'Home router, ISP backbone routers',
			color: 'green'
		},
		{
			name: 'Modem',
			icon: '📶',
			layer: 'Physical (Layer 1)',
			description: 'Modulates/demodulates signals. Converts digital data to analog (and vice versa) for transmission.',
			function: 'Signal conversion',
			example: 'Cable modem, DSL modem',
			color: 'purple'
		},
		{
			name: 'Firewall',
			icon: '🛡️',
			layer: 'Multiple layers',
			description: 'Filters traffic based on rules. Can inspect packets at various layers for security.',
			function: 'Security filtering',
			example: 'Hardware firewall, Windows Defender',
			color: 'orange'
		},
		{
			name: 'Load Balancer',
			icon: '⚖️',
			layer: 'Application (Layer 7)',
			description: 'Distributes traffic across multiple servers. Improves performance and availability.',
			function: 'Traffic distribution',
			example: 'AWS ELB, nginx, HAProxy',
			color: 'cyan'
		}
	];

	let selectedDevice: string | null = null;

	const colorClasses: Record<string, string> = {
		gray: 'border-gray-500/30 bg-gray-500/5',
		blue: 'border-accent-blue/30 bg-accent-blue/5',
		green: 'border-accent-green/30 bg-accent-green/5',
		purple: 'border-accent-purple/30 bg-accent-purple/5',
		orange: 'border-accent-orange/30 bg-accent-orange/5',
		cyan: 'border-accent-cyan/30 bg-accent-cyan/5'
	};
</script>

<div class="space-y-6">
	<!-- Device Grid -->
	<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
		{#each devices as device, i}
			<button
				class="p-4 rounded-lg border-2 text-left transition-all hover:scale-105 {selectedDevice === device.name ? colorClasses[device.color] : 'border-dark-700 bg-dark-800/50'}"
				on:click={() => selectedDevice = selectedDevice === device.name ? null : device.name}
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="text-2xl mb-2">{device.icon}</div>
				<div class="font-medium text-white">{device.name}</div>
				<div class="text-xs text-gray-500 mt-1">{device.layer}</div>
			</button>
		{/each}
	</div>

	<!-- Selected Device Details -->
	{#if selectedDevice}
		{@const device = devices.find(d => d.name === selectedDevice)}
		{#if device}
			<div
				class="p-5 rounded-lg border {colorClasses[device.color]}"
				in:fly={{ y: 10, duration: 200 }}
			>
				<div class="flex items-start gap-4">
					<span class="text-4xl">{device.icon}</span>
					<div class="flex-1">
						<h4 class="text-lg font-medium text-white">{device.name}</h4>
						<span class="text-xs text-gray-500">{device.layer}</span>
						<p class="text-sm text-gray-400 mt-2">{device.description}</p>

						<div class="grid grid-cols-2 gap-4 mt-4">
							<div class="p-3 rounded bg-dark-900/50">
								<div class="text-xs text-gray-500">Primary Function</div>
								<div class="text-sm text-white mt-1">{device.function}</div>
							</div>
							<div class="p-3 rounded bg-dark-900/50">
								<div class="text-xs text-gray-500">Example</div>
								<div class="text-sm text-white mt-1">{device.example}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<div class="text-center py-4 text-gray-500 text-sm">
			Click on a device to learn more
		</div>
	{/if}

	<!-- Home Network Diagram -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<h4 class="text-sm font-medium text-white mb-4">Typical Home Network</h4>
		<div class="flex items-center justify-center gap-4 flex-wrap text-sm">
			<div class="flex flex-col items-center">
				<div class="w-12 h-12 rounded-lg bg-dark-700 flex items-center justify-center">📱💻🖥️</div>
				<span class="text-xs text-gray-500 mt-1">Devices</span>
			</div>
			<span class="text-gray-600">→</span>
			<div class="flex flex-col items-center">
				<div class="w-12 h-12 rounded-lg bg-accent-green/20 border border-accent-green/30 flex items-center justify-center">📡</div>
				<span class="text-xs text-accent-green mt-1">Router</span>
			</div>
			<span class="text-gray-600">→</span>
			<div class="flex flex-col items-center">
				<div class="w-12 h-12 rounded-lg bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center">📶</div>
				<span class="text-xs text-accent-purple mt-1">Modem</span>
			</div>
			<span class="text-gray-600">→</span>
			<div class="flex flex-col items-center">
				<div class="w-12 h-12 rounded-lg bg-dark-700 flex items-center justify-center text-xs">ISP</div>
				<span class="text-xs text-gray-500 mt-1">Internet</span>
			</div>
		</div>
		<p class="text-xs text-gray-500 text-center mt-4">
			Most home "routers" are actually a router + switch + wireless access point + modem combined
		</p>
	</div>

	<!-- OSI vs TCP/IP Note -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">OSI vs TCP/IP Model</h4>
				<p class="text-sm text-gray-400 mt-1">
					You might see references to 7 OSI layers vs 4 TCP/IP layers. OSI is a theoretical model;
					TCP/IP is what the internet actually uses. Key mapping:
				</p>
				<div class="flex gap-4 mt-2 text-xs">
					<span class="text-gray-500">OSI Layer 7,6,5</span>
					<span class="text-gray-400">→</span>
					<span class="text-accent-blue">TCP/IP Application</span>
				</div>
				<div class="flex gap-4 text-xs">
					<span class="text-gray-500">OSI Layer 4</span>
					<span class="text-gray-400">→</span>
					<span class="text-accent-green">TCP/IP Transport</span>
				</div>
				<div class="flex gap-4 text-xs">
					<span class="text-gray-500">OSI Layer 3</span>
					<span class="text-gray-400">→</span>
					<span class="text-accent-purple">TCP/IP Internet</span>
				</div>
				<div class="flex gap-4 text-xs">
					<span class="text-gray-500">OSI Layer 2,1</span>
					<span class="text-gray-400">→</span>
					<span class="text-accent-orange">TCP/IP Network Access</span>
				</div>
			</div>
		</div>
	</div>
</div>
