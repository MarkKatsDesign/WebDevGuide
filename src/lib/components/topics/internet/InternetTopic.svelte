<script lang="ts">
	import { Section, KeyTerm, DiagramContainer } from '$lib/components/ui';
	import TcpIpStack from './TcpIpStack.svelte';
	import PacketJourney from './PacketJourney.svelte';
	import IpAddressing from './IpAddressing.svelte';
	import TcpVsUdp from './TcpVsUdp.svelte';
	import NetworkDevices from './NetworkDevices.svelte';

	const keyTerms = [
		{
			term: 'Internet',
			definition: 'A global network of interconnected networks using standardized protocols (TCP/IP). Not the same as the World Wide Web - the web is just one service that runs on the internet.',
			color: 'green' as const
		},
		{
			term: 'Protocol',
			definition: 'A set of rules that define how data is formatted and transmitted. Like a language that computers agree to speak. Examples: HTTP, TCP, IP, UDP, FTP, SMTP.',
			color: 'blue' as const
		},
		{
			term: 'Packet',
			definition: 'A small unit of data transmitted over a network. Large data is split into packets, sent independently (possibly via different routes), and reassembled at the destination.',
			color: 'cyan' as const
		},
		{
			term: 'IP Address',
			definition: 'A unique numerical identifier for a device on a network. IPv4: 32-bit (e.g., 192.168.1.1). IPv6: 128-bit (e.g., 2001:db8::1). Like a postal address for computers.',
			color: 'purple' as const
		},
		{
			term: 'Port',
			definition: 'A number (0-65535) that identifies a specific process or service on a device. IP address = building address, port = apartment number. Common: 80 (HTTP), 443 (HTTPS), 22 (SSH).',
			color: 'orange' as const
		},
		{
			term: 'Router',
			definition: 'A device that forwards packets between networks. Examines destination IP and determines the best path. Your home router connects your local network to your ISP.',
			color: 'yellow' as const
		},
		{
			term: 'ISP (Internet Service Provider)',
			definition: 'Company that provides internet access. Connects your network to the broader internet. Examples: Comcast, AT&T, BT, Vodafone. They peer with other ISPs to form the internet.',
			color: 'pink' as const
		},
		{
			term: 'Latency',
			definition: 'The time delay for data to travel from source to destination. Measured in milliseconds (ms). Affected by physical distance, network congestion, and routing. Lower is better.',
			color: 'green' as const
		}
	];
</script>

<div class="space-y-12">
	<!-- Overview Section -->
	<Section title="What is the Internet?" subtitle="A network of networks">
		<div class="prose prose-invert max-w-none">
			<p class="text-gray-300 leading-relaxed">
				The Internet is a <strong class="text-accent-green">global network of interconnected computer networks</strong>
				that communicate using standardized protocols. It's not controlled by any single organization -
				it's a decentralized system where thousands of networks voluntarily interconnect.
			</p>
			<p class="text-gray-400 mt-4">
				When you send data over the internet, it's broken into small <strong class="text-accent-cyan">packets</strong>
				that travel independently through multiple networks, potentially taking different routes,
				before being reassembled at the destination.
			</p>
		</div>
	</Section>

	<!-- TCP/IP Stack -->
	<Section title="The TCP/IP Model" subtitle="The layered architecture of internet communication">
		<DiagramContainer
			title="Four Layers of TCP/IP"
			description="Each layer has a specific responsibility and communicates with adjacent layers"
		>
			<TcpIpStack />
		</DiagramContainer>
	</Section>

	<!-- Packet Journey -->
	<Section title="Journey of a Packet" subtitle="How data travels across the internet">
		<DiagramContainer
			title="From Your Computer to a Server"
			description="Follow a packet as it hops through the network"
		>
			<PacketJourney />
		</DiagramContainer>
	</Section>

	<!-- IP Addressing -->
	<Section title="IP Addressing" subtitle="How devices are identified on the network">
		<IpAddressing />
	</Section>

	<!-- TCP vs UDP -->
	<Section title="TCP vs UDP" subtitle="Two transport protocols with different trade-offs">
		<TcpVsUdp />
	</Section>

	<!-- Network Devices -->
	<Section title="Network Devices" subtitle="The hardware that makes the internet work">
		<NetworkDevices />
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
