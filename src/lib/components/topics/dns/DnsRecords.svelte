<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface DnsRecord {
		type: string;
		name: string;
		description: string;
		example: string;
		useCase: string;
		color: string;
	}

	const records: DnsRecord[] = [
		{
			type: 'A',
			name: 'Address Record',
			description: 'Maps a domain name to an IPv4 address (32-bit). The most common DNS record type.',
			example: 'example.com → 93.184.216.34',
			useCase: 'Pointing your domain to a web server',
			color: 'green'
		},
		{
			type: 'AAAA',
			name: 'IPv6 Address Record',
			description: 'Maps a domain name to an IPv6 address (128-bit). "Quad-A" for the four As.',
			example: 'example.com → 2606:2800:220:1:248:1893:25c8:1946',
			useCase: 'IPv6-enabled servers and future-proofing',
			color: 'green'
		},
		{
			type: 'CNAME',
			name: 'Canonical Name',
			description: 'Creates an alias from one domain to another. The target must be a domain, not an IP.',
			example: 'www.example.com → example.com',
			useCase: 'Aliasing www to root domain, CDN setup',
			color: 'blue'
		},
		{
			type: 'MX',
			name: 'Mail Exchange',
			description: 'Specifies mail servers for the domain. Includes priority (lower = higher priority).',
			example: 'example.com → mail.example.com (priority: 10)',
			useCase: 'Email routing (Gmail, Outlook, custom mail)',
			color: 'purple'
		},
		{
			type: 'TXT',
			name: 'Text Record',
			description: 'Stores arbitrary text. Used for verification, security policies, and configuration.',
			example: 'example.com → "v=spf1 include:_spf.google.com ~all"',
			useCase: 'SPF, DKIM, domain verification, site-verification',
			color: 'yellow'
		},
		{
			type: 'NS',
			name: 'Name Server',
			description: 'Delegates a subdomain or zone to other name servers. Points to authoritative servers.',
			example: 'example.com → ns1.provider.com',
			useCase: 'Delegating DNS management to a provider',
			color: 'orange'
		},
		{
			type: 'SOA',
			name: 'Start of Authority',
			description: 'Contains administrative info about a zone: primary NS, admin email, serial number, timers.',
			example: 'example.com → ns1.example.com admin.example.com (serial: 2024011501)',
			useCase: 'Zone configuration, DNS replication timing',
			color: 'pink'
		},
		{
			type: 'PTR',
			name: 'Pointer Record',
			description: 'Reverse DNS - maps an IP address back to a domain name. Used for verification.',
			example: '34.216.184.93.in-addr.arpa → example.com',
			useCase: 'Email spam prevention, IP verification',
			color: 'cyan'
		}
	];

	let expandedRecord: string | null = null;

	const colorClasses: Record<string, string> = {
		green: 'border-accent-green/30 bg-accent-green/5',
		blue: 'border-accent-blue/30 bg-accent-blue/5',
		purple: 'border-accent-purple/30 bg-accent-purple/5',
		yellow: 'border-accent-yellow/30 bg-accent-yellow/5',
		orange: 'border-accent-orange/30 bg-accent-orange/5',
		pink: 'border-accent-pink/30 bg-accent-pink/5',
		cyan: 'border-accent-cyan/30 bg-accent-cyan/5'
	};

	const badgeClasses: Record<string, string> = {
		green: 'bg-accent-green/20 text-accent-green',
		blue: 'bg-accent-blue/20 text-accent-blue',
		purple: 'bg-accent-purple/20 text-accent-purple',
		yellow: 'bg-accent-yellow/20 text-accent-yellow',
		orange: 'bg-accent-orange/20 text-accent-orange',
		pink: 'bg-accent-pink/20 text-accent-pink',
		cyan: 'bg-accent-cyan/20 text-accent-cyan'
	};
</script>

<div class="space-y-3">
	<!-- Records Grid -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
		{#each records as record, i}
			<button
				class="p-3 rounded-lg border text-center transition-all hover:scale-105 {expandedRecord === record.type ? colorClasses[record.color] : 'border-dark-700 bg-dark-800/50'}"
				on:click={() => expandedRecord = expandedRecord === record.type ? null : record.type}
				in:fly={{ y: 10, delay: i * 30 }}
			>
				<div class="font-mono font-bold text-lg {expandedRecord === record.type ? '' : 'text-gray-300'}">{record.type}</div>
				<div class="text-xs text-gray-500 mt-1">{record.name}</div>
			</button>
		{/each}
	</div>

	<!-- Expanded Record Details -->
	{#if expandedRecord}
		{@const record = records.find(r => r.type === expandedRecord)}
		{#if record}
			<div
				class="rounded-lg border p-5 {colorClasses[record.color]}"
				in:fly={{ y: 10, duration: 200 }}
			>
				<div class="flex items-start justify-between gap-4 mb-4">
					<div>
						<div class="flex items-center gap-2">
							<span class="font-mono font-bold text-xl text-white">{record.type}</span>
							<span class="text-gray-400">-</span>
							<span class="text-gray-300">{record.name}</span>
						</div>
						<p class="text-sm text-gray-400 mt-2">{record.description}</p>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
					<div class="p-3 rounded-lg bg-dark-900/50">
						<div class="text-xs text-gray-500 uppercase tracking-wide mb-1">Example</div>
						<code class="text-sm text-gray-300 font-mono">{record.example}</code>
					</div>
					<div class="p-3 rounded-lg bg-dark-900/50">
						<div class="text-xs text-gray-500 uppercase tracking-wide mb-1">Common Use Case</div>
						<span class="text-sm text-gray-300">{record.useCase}</span>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<div class="text-center py-4 text-gray-500 text-sm">
			Click on a record type to see details
		</div>
	{/if}

	<!-- Quick Reference -->
	<div class="mt-6 p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<h4 class="text-sm font-medium text-white mb-3">Quick Reference</h4>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
			<div class="flex items-center gap-2">
				<span class="px-2 py-0.5 rounded {badgeClasses.green} font-mono text-xs">A/AAAA</span>
				<span class="text-gray-400">Domain → IP address</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="px-2 py-0.5 rounded {badgeClasses.blue} font-mono text-xs">CNAME</span>
				<span class="text-gray-400">Domain → Another domain</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="px-2 py-0.5 rounded {badgeClasses.purple} font-mono text-xs">MX</span>
				<span class="text-gray-400">Domain → Mail server</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="px-2 py-0.5 rounded {badgeClasses.yellow} font-mono text-xs">TXT</span>
				<span class="text-gray-400">Domain → Text data</span>
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
					<strong class="text-gray-300">"What's the difference between A and CNAME records?"</strong><br />
					<strong class="text-accent-green">A record</strong> points directly to an IP address.
					<strong class="text-accent-blue">CNAME</strong> points to another domain name (which then resolves to an IP).
					CNAMEs can't be used at the zone apex (root domain) - you need an A record there.
				</p>
			</div>
		</div>
	</div>
</div>
