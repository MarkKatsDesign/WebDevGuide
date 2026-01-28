<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	let showIPv6 = false;

	const ipv4Classes = [
		{ class: 'A', range: '1.0.0.0 - 126.255.255.255', use: 'Large networks', networks: '128', hosts: '16 million' },
		{ class: 'B', range: '128.0.0.0 - 191.255.255.255', use: 'Medium networks', networks: '16,384', hosts: '65,534' },
		{ class: 'C', range: '192.0.0.0 - 223.255.255.255', use: 'Small networks', networks: '2 million', hosts: '254' }
	];

	const privateRanges = [
		{ range: '10.0.0.0/8', addresses: '10.0.0.0 - 10.255.255.255', use: 'Large private networks' },
		{ range: '172.16.0.0/12', addresses: '172.16.0.0 - 172.31.255.255', use: 'Medium private networks' },
		{ range: '192.168.0.0/16', addresses: '192.168.0.0 - 192.168.255.255', use: 'Home/small office (most common)' }
	];

	const specialAddresses = [
		{ address: '127.0.0.1', name: 'Localhost', description: 'Loopback - refers to your own machine' },
		{ address: '0.0.0.0', name: 'All interfaces', description: 'Listen on all network interfaces' },
		{ address: '255.255.255.255', name: 'Broadcast', description: 'Send to all devices on network' },
		{ address: '8.8.8.8', name: 'Google DNS', description: 'Public DNS resolver' }
	];
</script>

<div class="space-y-6">
	<!-- IPv4 vs IPv6 Toggle -->
	<div class="flex justify-center">
		<div class="inline-flex rounded-lg bg-dark-800 p-1">
			<button
				class="px-4 py-2 rounded-md text-sm transition-colors {!showIPv6 ? 'bg-accent-green text-white' : 'text-gray-400 hover:text-white'}"
				on:click={() => showIPv6 = false}
			>
				IPv4
			</button>
			<button
				class="px-4 py-2 rounded-md text-sm transition-colors {showIPv6 ? 'bg-accent-purple text-white' : 'text-gray-400 hover:text-white'}"
				on:click={() => showIPv6 = true}
			>
				IPv6
			</button>
		</div>
	</div>

	{#if !showIPv6}
		<!-- IPv4 Section -->
		<div class="space-y-6" in:fly={{ x: -20, duration: 200 }}>
			<!-- IPv4 Format -->
			<div class="p-4 rounded-lg bg-dark-800 border border-accent-green/30">
				<h4 class="text-sm font-medium text-white mb-3">IPv4 Address Format</h4>
				<div class="flex items-center justify-center gap-1 font-mono text-lg">
					<span class="px-3 py-2 rounded bg-accent-green/20 text-accent-green">192</span>
					<span class="text-gray-500">.</span>
					<span class="px-3 py-2 rounded bg-accent-blue/20 text-accent-blue">168</span>
					<span class="text-gray-500">.</span>
					<span class="px-3 py-2 rounded bg-accent-purple/20 text-accent-purple">1</span>
					<span class="text-gray-500">.</span>
					<span class="px-3 py-2 rounded bg-accent-orange/20 text-accent-orange">100</span>
				</div>
				<div class="text-center mt-3 text-xs text-gray-500">
					4 octets (8 bits each) = 32 bits total = ~4.3 billion addresses
				</div>
			</div>

			<!-- Private IP Ranges -->
			<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
				<h4 class="text-sm font-medium text-white mb-3">Private IP Ranges (RFC 1918)</h4>
				<p class="text-xs text-gray-400 mb-3">
					These addresses are not routable on the public internet. Used for internal networks.
				</p>
				<div class="space-y-2">
					{#each privateRanges as range, i}
						<div class="flex items-center gap-3 p-2 rounded bg-dark-900/50" in:fly={{ y: 10, delay: i * 50 }}>
							<code class="text-accent-cyan font-mono text-sm w-32">{range.range}</code>
							<span class="text-xs text-gray-400">{range.use}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Special Addresses -->
			<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
				<h4 class="text-sm font-medium text-white mb-3">Special Addresses</h4>
				<div class="grid grid-cols-2 gap-2">
					{#each specialAddresses as addr, i}
						<div class="p-3 rounded bg-dark-900/50" in:fly={{ y: 10, delay: i * 50 }}>
							<code class="text-accent-yellow font-mono text-sm">{addr.address}</code>
							<div class="text-xs text-gray-400 mt-1">{addr.name}</div>
							<div class="text-xs text-gray-500">{addr.description}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<!-- IPv6 Section -->
		<div class="space-y-6" in:fly={{ x: 20, duration: 200 }}>
			<!-- IPv6 Format -->
			<div class="p-4 rounded-lg bg-dark-800 border border-accent-purple/30">
				<h4 class="text-sm font-medium text-white mb-3">IPv6 Address Format</h4>
				<div class="font-mono text-sm text-center overflow-x-auto">
					<span class="text-accent-purple">2001</span><span class="text-gray-500">:</span>
					<span class="text-accent-blue">0db8</span><span class="text-gray-500">:</span>
					<span class="text-accent-cyan">85a3</span><span class="text-gray-500">:</span>
					<span class="text-accent-green">0000</span><span class="text-gray-500">:</span>
					<span class="text-accent-yellow">0000</span><span class="text-gray-500">:</span>
					<span class="text-accent-orange">8a2e</span><span class="text-gray-500">:</span>
					<span class="text-accent-pink">0370</span><span class="text-gray-500">:</span>
					<span class="text-accent-purple">7334</span>
				</div>
				<div class="text-center mt-3 text-xs text-gray-500">
					8 groups of 4 hex digits = 128 bits = 340 undecillion addresses
				</div>
			</div>

			<!-- IPv6 Shorthand -->
			<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
				<h4 class="text-sm font-medium text-white mb-3">Shorthand Rules</h4>
				<div class="space-y-3">
					<div class="p-3 rounded bg-dark-900/50">
						<div class="text-xs text-gray-500">Leading zeros can be omitted:</div>
						<div class="font-mono text-sm mt-1">
							<span class="text-gray-500">2001:</span><span class="text-accent-pink line-through">00</span><span class="text-accent-purple">db8</span>
							<span class="text-gray-400"> → </span>
							<span class="text-gray-500">2001:</span><span class="text-accent-purple">db8</span>
						</div>
					</div>
					<div class="p-3 rounded bg-dark-900/50">
						<div class="text-xs text-gray-500">Consecutive zeros can be replaced with :: (once):</div>
						<div class="font-mono text-sm mt-1">
							<span class="text-accent-purple">2001:db8:</span><span class="text-accent-pink line-through">0000:0000:0000:</span><span class="text-accent-purple">1</span>
							<span class="text-gray-400"> → </span>
							<span class="text-accent-purple">2001:db8::1</span>
						</div>
					</div>
				</div>
			</div>

			<!-- IPv6 Special Addresses -->
			<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
				<h4 class="text-sm font-medium text-white mb-3">Special IPv6 Addresses</h4>
				<div class="space-y-2 font-mono text-sm">
					<div class="flex justify-between p-2 rounded bg-dark-900/50">
						<span class="text-accent-cyan">::1</span>
						<span class="text-gray-400 text-xs">Localhost (like 127.0.0.1)</span>
					</div>
					<div class="flex justify-between p-2 rounded bg-dark-900/50">
						<span class="text-accent-cyan">::</span>
						<span class="text-gray-400 text-xs">All zeros (like 0.0.0.0)</span>
					</div>
					<div class="flex justify-between p-2 rounded bg-dark-900/50">
						<span class="text-accent-cyan">fe80::/10</span>
						<span class="text-gray-400 text-xs">Link-local addresses</span>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- NAT Explanation -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">🔄</div>
			<div>
				<h4 class="text-sm font-medium text-white">NAT (Network Address Translation)</h4>
				<p class="text-sm text-gray-400 mt-1">
					Your router uses NAT to share one public IP among all your devices. Devices get private IPs
					(like 192.168.1.x), and the router translates between private and public addresses.
					This is why IPv4 hasn't run out yet - but IPv6 eliminates the need for NAT.
				</p>
			</div>
		</div>
	</div>

	<!-- Interview Tip -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-purple text-xl">🎯</div>
			<div>
				<h4 class="text-sm font-medium text-white">Common Interview Question</h4>
				<p class="text-sm text-gray-400 mt-1">
					<strong class="text-gray-300">"What happens when you type a URL?"</strong><br />
					Part of the answer involves IP addressing: your device needs to resolve the domain to an IP (DNS),
					then packets are addressed with source IP (your public IP via NAT) and destination IP (server's IP).
				</p>
			</div>
		</div>
	</div>
</div>
