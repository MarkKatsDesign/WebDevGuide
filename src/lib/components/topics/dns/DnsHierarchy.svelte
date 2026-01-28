<script lang="ts">
	import { fly } from 'svelte/transition';

	let selectedLevel: string | null = null;

	const levels = [
		{
			id: 'root',
			name: 'Root',
			symbol: '.',
			color: 'orange',
			description: 'The root of DNS. 13 root server clusters worldwide (A through M). Managed by organizations like ICANN, Verisign, NASA.',
			examples: ['a.root-servers.net', 'b.root-servers.net', '...', 'm.root-servers.net']
		},
		{
			id: 'tld',
			name: 'Top-Level Domain (TLD)',
			symbol: '.com / .org / .uk',
			color: 'blue',
			description: 'Generic TLDs (gTLDs) like .com, .org, .net, and country-code TLDs (ccTLDs) like .uk, .de, .jp. Over 1,500 TLDs exist.',
			examples: ['.com', '.org', '.net', '.io', '.dev', '.uk', '.de']
		},
		{
			id: 'domain',
			name: 'Second-Level Domain',
			symbol: 'example.com',
			color: 'green',
			description: 'The domain name you register. This is what you buy from a registrar like GoDaddy, Namecheap, or Google Domains.',
			examples: ['google.com', 'github.com', 'amazon.co.uk']
		},
		{
			id: 'subdomain',
			name: 'Subdomain',
			symbol: 'www.example.com',
			color: 'cyan',
			description: 'Divisions of your domain you control. No extra registration needed. Can have multiple levels (api.v2.example.com).',
			examples: ['www.', 'api.', 'mail.', 'blog.', 'app.']
		}
	];

	const colorClasses: Record<string, string> = {
		orange: 'border-accent-orange bg-accent-orange/10 text-accent-orange',
		blue: 'border-accent-blue bg-accent-blue/10 text-accent-blue',
		green: 'border-accent-green bg-accent-green/10 text-accent-green',
		cyan: 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
	};
</script>

<div class="space-y-6">
	<!-- Visual Tree -->
	<div class="flex flex-col items-center gap-2">
		<!-- Root -->
		<button
			class="px-6 py-3 rounded-lg border-2 transition-all {selectedLevel === 'root' ? colorClasses.orange + ' scale-105' : 'border-dark-600 bg-dark-800 hover:border-dark-500'}"
			on:click={() => selectedLevel = selectedLevel === 'root' ? null : 'root'}
		>
			<span class="font-mono font-bold text-lg">.</span>
			<span class="text-xs text-gray-500 ml-2">(root)</span>
		</button>

		<div class="w-px h-4 bg-dark-600"></div>

		<!-- TLDs -->
		<div class="flex gap-3 flex-wrap justify-center">
			{#each ['.com', '.org', '.io', '.uk'] as tld}
				<button
					class="px-4 py-2 rounded-lg border-2 transition-all {selectedLevel === 'tld' ? colorClasses.blue + ' scale-105' : 'border-dark-600 bg-dark-800 hover:border-dark-500'}"
					on:click={() => selectedLevel = selectedLevel === 'tld' ? null : 'tld'}
				>
					<span class="font-mono text-sm">{tld}</span>
				</button>
			{/each}
		</div>

		<div class="flex gap-16">
			<div class="w-px h-4 bg-dark-600"></div>
			<div class="w-px h-4 bg-dark-600"></div>
		</div>

		<!-- Domains -->
		<div class="flex gap-4 flex-wrap justify-center">
			{#each ['google', 'github', 'example'] as domain}
				<button
					class="px-4 py-2 rounded-lg border-2 transition-all {selectedLevel === 'domain' ? colorClasses.green + ' scale-105' : 'border-dark-600 bg-dark-800 hover:border-dark-500'}"
					on:click={() => selectedLevel = selectedLevel === 'domain' ? null : 'domain'}
				>
					<span class="font-mono text-sm">{domain}.com</span>
				</button>
			{/each}
		</div>

		<div class="flex gap-24">
			<div class="w-px h-4 bg-dark-600"></div>
			<div class="w-px h-4 bg-dark-600"></div>
		</div>

		<!-- Subdomains -->
		<div class="flex gap-3 flex-wrap justify-center">
			{#each ['www', 'api', 'mail', 'blog'] as sub}
				<button
					class="px-3 py-1.5 rounded-lg border-2 transition-all {selectedLevel === 'subdomain' ? colorClasses.cyan + ' scale-105' : 'border-dark-600 bg-dark-800 hover:border-dark-500'}"
					on:click={() => selectedLevel = selectedLevel === 'subdomain' ? null : 'subdomain'}
				>
					<span class="font-mono text-xs">{sub}.example.com</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Level Details -->
	{#if selectedLevel}
		{@const level = levels.find(l => l.id === selectedLevel)}
		{#if level}
			<div
				class="p-4 rounded-lg border {colorClasses[level.color]}"
				in:fly={{ y: 10, duration: 200 }}
			>
				<h4 class="font-medium text-white">{level.name}</h4>
				<p class="text-sm text-gray-400 mt-2">{level.description}</p>
				<div class="flex flex-wrap gap-2 mt-3">
					{#each level.examples as example}
						<span class="px-2 py-1 rounded bg-dark-900/50 text-xs font-mono">{example}</span>
					{/each}
				</div>
			</div>
		{/if}
	{:else}
		<div class="text-center text-sm text-gray-500">
			Click on a level to learn more
		</div>
	{/if}

	<!-- Reading Direction -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<h4 class="text-sm font-medium text-white mb-3">How to Read a Domain Name</h4>
		<div class="flex items-center justify-center gap-1 flex-wrap font-mono text-sm">
			<span class="px-2 py-1 rounded bg-accent-cyan/20 text-accent-cyan">www</span>
			<span class="text-gray-500">.</span>
			<span class="px-2 py-1 rounded bg-accent-green/20 text-accent-green">example</span>
			<span class="text-gray-500">.</span>
			<span class="px-2 py-1 rounded bg-accent-blue/20 text-accent-blue">com</span>
			<span class="text-gray-500">.</span>
			<span class="px-2 py-1 rounded bg-accent-orange/20 text-accent-orange">(root)</span>
		</div>
		<div class="flex justify-center mt-2">
			<span class="text-xs text-gray-500">← Read right to left for hierarchy: root → TLD → domain → subdomain</span>
		</div>
	</div>

	<!-- Interview Tip -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-purple text-xl">🎯</div>
			<div>
				<h4 class="text-sm font-medium text-white">Interview Insight</h4>
				<p class="text-sm text-gray-400 mt-1">
					The trailing dot in <code class="text-accent-cyan">www.example.com.</code> represents the root.
					It's usually omitted but technically a fully qualified domain name (FQDN) includes it.
					This is why DNS is called a <strong class="text-gray-300">hierarchical</strong> system - each level
					delegates to the next.
				</p>
			</div>
		</div>
	</div>
</div>
