<script lang="ts">
	import { Section, KeyTerm, DiagramContainer } from '$lib/components/ui';
	import DnsResolution from './DnsResolution.svelte';
	import DnsHierarchy from './DnsHierarchy.svelte';
	import DnsRecords from './DnsRecords.svelte';
	import DnsCaching from './DnsCaching.svelte';

	const keyTerms = [
		{
			term: 'DNS (Domain Name System)',
			definition: 'A hierarchical, distributed database that translates human-readable domain names (like google.com) into IP addresses (like 142.250.80.46). Often called the "phonebook of the internet."',
			color: 'cyan' as const
		},
		{
			term: 'Domain Name',
			definition: 'A human-readable address for a website (e.g., www.example.com). Consists of labels separated by dots, read right to left: TLD (com), domain (example), subdomain (www).',
			color: 'blue' as const
		},
		{
			term: 'IP Address',
			definition: 'A numerical label assigned to each device on a network. IPv4 uses 32 bits (e.g., 192.168.1.1), IPv6 uses 128 bits (e.g., 2001:0db8:85a3::8a2e:0370:7334).',
			color: 'green' as const
		},
		{
			term: 'DNS Resolver (Recursive Resolver)',
			definition: 'A server that receives DNS queries from clients and performs the full lookup by querying other DNS servers. Usually provided by your ISP or services like 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare).',
			color: 'purple' as const
		},
		{
			term: 'Authoritative Name Server',
			definition: 'The final authority for a domain. Contains the actual DNS records and provides definitive answers. When you update DNS records, you update them on the authoritative server.',
			color: 'orange' as const
		},
		{
			term: 'TTL (Time To Live)',
			definition: 'The duration (in seconds) that a DNS record can be cached before it must be refreshed. Lower TTL = faster propagation but more DNS queries. Higher TTL = better performance but slower updates.',
			color: 'yellow' as const
		},
		{
			term: 'DNS Propagation',
			definition: 'The time it takes for DNS changes to spread across all DNS servers worldwide. Can take 24-48 hours due to caching at various levels. Not instant because of TTL values.',
			color: 'pink' as const
		},
		{
			term: 'FQDN (Fully Qualified Domain Name)',
			definition: 'The complete domain name including all labels up to the root. Example: "www.example.com." (note the trailing dot representing the root). Unambiguous and absolute.',
			color: 'cyan' as const
		}
	];
</script>

<div class="space-y-12">
	<!-- Overview Section -->
	<Section title="What is DNS?" subtitle="The phonebook of the internet">
		<div class="prose prose-invert max-w-none">
			<p class="text-gray-300 leading-relaxed">
				DNS (Domain Name System) translates human-friendly domain names like
				<code class="text-accent-cyan">www.google.com</code> into IP addresses like
				<code class="text-accent-green">142.250.80.46</code> that computers use to identify each other.
			</p>
			<p class="text-gray-400 mt-4">
				Without DNS, you'd need to memorize IP addresses for every website you visit. DNS makes the
				internet usable by letting us use memorable names instead of numbers.
			</p>
		</div>
	</Section>

	<!-- DNS Resolution Animation -->
	<Section title="DNS Resolution Process" subtitle="What happens when you type a URL">
		<DiagramContainer
			title="DNS Lookup Journey"
			description="Follow the query as it travels through the DNS hierarchy"
		>
			<DnsResolution />
		</DiagramContainer>
	</Section>

	<!-- DNS Hierarchy -->
	<Section title="DNS Hierarchy" subtitle="The tree structure of domain names">
		<DiagramContainer
			title="DNS Tree Structure"
			description="Understanding how domains are organized hierarchically"
		>
			<DnsHierarchy />
		</DiagramContainer>
	</Section>

	<!-- DNS Records -->
	<Section title="DNS Record Types" subtitle="Different records serve different purposes">
		<DnsRecords />
	</Section>

	<!-- DNS Caching -->
	<Section title="DNS Caching" subtitle="How caching improves performance">
		<DiagramContainer
			title="Caching Layers"
			description="DNS responses are cached at multiple levels to reduce lookup time"
		>
			<DnsCaching />
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
