<script lang="ts">
	import { Section, KeyTerm, DiagramContainer } from '$lib/components/ui';
	import QueryMutation from './QueryMutation.svelte';
	import SchemaTypes from './SchemaTypes.svelte';
	import ResolverFlow from './ResolverFlow.svelte';
	import RestVsGraphql from './RestVsGraphql.svelte';
	import BestPractices from './BestPractices.svelte';

	const keyTerms = [
		{
			term: 'GraphQL',
			definition: 'A query language for APIs and a runtime for executing those queries. Developed by Facebook in 2012, open-sourced in 2015. Clients describe exactly what data they need, and the server returns only that data.',
			color: 'pink' as const
		},
		{
			term: 'Schema',
			definition: 'The contract between client and server. Written in Schema Definition Language (SDL), it defines all types, queries, mutations, and subscriptions available. Acts as documentation and validation layer.',
			color: 'blue' as const
		},
		{
			term: 'Resolver',
			definition: 'A function that populates data for a single field in the schema. Each field has a resolver that knows how to fetch its data from databases, REST APIs, or other sources. Signature: (parent, args, context, info).',
			color: 'orange' as const
		},
		{
			term: 'Query',
			definition: 'A read-only operation to fetch data. Analogous to GET in REST. Multiple queries can run in parallel. Clients specify the exact shape of the response they need.',
			color: 'green' as const
		},
		{
			term: 'Mutation',
			definition: 'An operation that modifies server-side data (create, update, delete). Analogous to POST/PUT/DELETE in REST. Mutations run sequentially to avoid race conditions.',
			color: 'yellow' as const
		},
		{
			term: 'Subscription',
			definition: 'A long-lived operation that listens for real-time updates from the server, typically over WebSockets. When the subscribed event occurs, the server pushes data to the client.',
			color: 'cyan' as const
		},
		{
			term: 'Over-fetching / Under-fetching',
			definition: 'Over-fetching: API returns more data than needed (wasted bandwidth). Under-fetching: API doesn\'t return enough data, requiring additional requests. GraphQL solves both by letting clients specify exact fields.',
			color: 'purple' as const
		},
		{
			term: 'Introspection',
			definition: 'GraphQL\'s built-in ability to query the schema itself. Tools like GraphiQL and Apollo Explorer use introspection to provide auto-complete, documentation, and query validation. Should be disabled in production.',
			color: 'pink' as const
		}
	];
</script>

<div class="space-y-12">
	<!-- Overview Section -->
	<Section title="What is GraphQL?" subtitle="A query language that puts clients in control of their data">
		<div class="prose prose-invert max-w-none">
			<p class="text-gray-300 leading-relaxed">
				<strong class="text-accent-pink">GraphQL</strong> is a query language for APIs that lets clients
				request <strong class="text-accent-cyan">exactly the data they need</strong>. Unlike REST, where each
				endpoint returns a fixed data structure, GraphQL exposes a single endpoint and lets the client
				describe the shape of the response.
			</p>
			<p class="text-gray-400 mt-4">
				All GraphQL requests go to a single endpoint (e.g., <code class="text-accent-green">POST /graphql</code>).
				The server has a <strong class="text-accent-blue">schema</strong> defining available types and operations,
				and <strong class="text-accent-orange">resolvers</strong> that know how to fetch data for each field.
			</p>
		</div>
	</Section>

	<!-- Queries & Mutations -->
	<Section title="Queries, Mutations & Subscriptions" subtitle="The three operation types in GraphQL">
		<DiagramContainer
			title="GraphQL Operations"
			description="Click each operation to see the query and response"
		>
			<QueryMutation />
		</DiagramContainer>
	</Section>

	<!-- Schema & Type System -->
	<Section title="Schema & Type System" subtitle="The strongly-typed contract between client and server">
		<DiagramContainer
			title="GraphQL Type Definitions"
			description="Click each type to see its SDL definition"
		>
			<SchemaTypes />
		</DiagramContainer>
	</Section>

	<!-- Resolver Execution -->
	<Section title="How Resolvers Work" subtitle="The execution engine behind every GraphQL query">
		<DiagramContainer
			title="Query Execution Flow"
			description="Watch how a query is parsed, validated, and resolved step by step"
		>
			<ResolverFlow />
		</DiagramContainer>
	</Section>

	<!-- REST vs GraphQL -->
	<Section title="REST vs GraphQL" subtitle="Understanding when to use each approach">
		<RestVsGraphql />
	</Section>

	<!-- Best Practices -->
	<Section title="Performance & Security" subtitle="Common pitfalls and production-ready patterns">
		<BestPractices />
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
