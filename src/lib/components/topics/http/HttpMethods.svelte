<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Method {
		name: string;
		crud: string;
		description: string;
		color: string;
		bgColor: string;
		idempotent: boolean;
		hasBody: boolean;
		example: string;
	}

	const methods: Method[] = [
		{
			name: 'GET',
			crud: 'Read',
			description: 'Retrieve a resource. Should not modify server state.',
			color: 'text-accent-green',
			bgColor: 'bg-accent-green/10 border-accent-green/30',
			idempotent: true,
			hasBody: false,
			example: 'GET /api/users/123'
		},
		{
			name: 'POST',
			crud: 'Create',
			description: 'Create a new resource. Each call may create a new resource.',
			color: 'text-accent-blue',
			bgColor: 'bg-accent-blue/10 border-accent-blue/30',
			idempotent: false,
			hasBody: true,
			example: 'POST /api/users'
		},
		{
			name: 'PUT',
			crud: 'Update/Replace',
			description: 'Replace an entire resource. Creates if it does not exist.',
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10 border-accent-orange/30',
			idempotent: true,
			hasBody: true,
			example: 'PUT /api/users/123'
		},
		{
			name: 'PATCH',
			crud: 'Partial Update',
			description: 'Partially modify a resource. Only sends changed fields.',
			color: 'text-accent-yellow',
			bgColor: 'bg-accent-yellow/10 border-accent-yellow/30',
			idempotent: false,
			hasBody: true,
			example: 'PATCH /api/users/123'
		},
		{
			name: 'DELETE',
			crud: 'Delete',
			description: 'Remove a resource. Subsequent calls return 404.',
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10 border-accent-pink/30',
			idempotent: true,
			hasBody: false,
			example: 'DELETE /api/users/123'
		}
	];

	let selectedMethod: Method | null = null;
</script>

<div class="space-y-6">
	<!-- Method Cards -->
	<div class="grid grid-cols-2 md:grid-cols-5 gap-3">
		{#each methods as method, i}
			<button
				class="p-4 rounded-lg border transition-all duration-200 text-left
					{selectedMethod?.name === method.name
						? method.bgColor + ' scale-105'
						: 'bg-dark-800/50 border-dark-700 hover:border-dark-600'}"
				on:click={() => selectedMethod = selectedMethod?.name === method.name ? null : method}
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="font-mono font-bold {method.color}">{method.name}</div>
				<div class="text-xs text-gray-500 mt-1">{method.crud}</div>
			</button>
		{/each}
	</div>

	<!-- Selected Method Details -->
	{#if selectedMethod}
		<div
			class="rounded-lg border {selectedMethod.bgColor} p-6"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div class="flex-1 min-w-[200px]">
					<h4 class="font-mono text-xl font-bold {selectedMethod.color}">{selectedMethod.name}</h4>
					<p class="text-gray-300 mt-2">{selectedMethod.description}</p>

					<!-- Example -->
					<div class="mt-4">
						<span class="text-xs text-gray-500 uppercase tracking-wide">Example:</span>
						<code class="block mt-1 text-sm font-mono text-gray-300">{selectedMethod.example}</code>
					</div>
				</div>

				<!-- Properties -->
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-2">
						<span class="text-xs text-gray-500 w-20">Idempotent:</span>
						{#if selectedMethod.idempotent}
							<span class="px-2 py-0.5 rounded text-xs bg-accent-green/20 text-accent-green">Yes</span>
						{:else}
							<span class="px-2 py-0.5 rounded text-xs bg-accent-pink/20 text-accent-pink">No</span>
						{/if}
					</div>
					<div class="flex items-center gap-2">
						<span class="text-xs text-gray-500 w-20">Has Body:</span>
						{#if selectedMethod.hasBody}
							<span class="px-2 py-0.5 rounded text-xs bg-accent-blue/20 text-accent-blue">Yes</span>
						{:else}
							<span class="px-2 py-0.5 rounded text-xs bg-dark-600 text-gray-400">No</span>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="text-center py-6 text-gray-500 text-sm">
			Click on a method to see details
		</div>
	{/if}

	<!-- CRUD Mapping Visual -->
	<div class="mt-8">
		<h4 class="text-sm font-medium text-gray-400 mb-4">CRUD to HTTP Methods Mapping</h4>
		<div class="grid grid-cols-4 gap-2 text-center text-sm">
			<div class="p-3 rounded-lg bg-accent-blue/10 border border-accent-blue/30">
				<div class="text-accent-blue font-medium">Create</div>
				<div class="text-xs text-gray-500 mt-1">POST</div>
			</div>
			<div class="p-3 rounded-lg bg-accent-green/10 border border-accent-green/30">
				<div class="text-accent-green font-medium">Read</div>
				<div class="text-xs text-gray-500 mt-1">GET</div>
			</div>
			<div class="p-3 rounded-lg bg-accent-orange/10 border border-accent-orange/30">
				<div class="text-accent-orange font-medium">Update</div>
				<div class="text-xs text-gray-500 mt-1">PUT / PATCH</div>
			</div>
			<div class="p-3 rounded-lg bg-accent-pink/10 border border-accent-pink/30">
				<div class="text-accent-pink font-medium">Delete</div>
				<div class="text-xs text-gray-500 mt-1">DELETE</div>
			</div>
		</div>
	</div>

	<!-- Idempotency Explanation -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">Why does idempotency matter?</h4>
				<p class="text-sm text-gray-400 mt-1">
					Idempotent methods are <strong class="text-gray-300">safe to retry</strong>. If a network error occurs,
					you can safely resend a GET, PUT, or DELETE request without causing duplicates.
					POST is not idempotent - retrying might create duplicate records.
				</p>
			</div>
		</div>
	</div>
</div>
