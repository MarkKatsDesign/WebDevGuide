<script lang="ts">
	import { Section, KeyTerm, DiagramContainer } from '$lib/components/ui';
	import RestPrinciples from './RestPrinciples.svelte';
	import ResourceEndpoints from './ResourceEndpoints.svelte';
	import ApiVersioning from './ApiVersioning.svelte';
	import BestPractices from './BestPractices.svelte';
	import ErrorHandling from './ErrorHandling.svelte';

	const keyTerms = [
		{
			term: 'REST (Representational State Transfer)',
			definition: 'An architectural style for designing networked applications. Uses HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources identified by URLs. REST is stateless, cacheable, and uses a uniform interface.',
			color: 'orange' as const
		},
		{
			term: 'Resource',
			definition: 'Any information that can be named and addressed. Resources are identified by URIs (e.g., /users, /users/123). A resource can be a document, image, service, or collection of other resources.',
			color: 'blue' as const
		},
		{
			term: 'Endpoint',
			definition: 'A specific URL where an API can be accessed. Each endpoint represents a resource or collection. Example: GET /api/users is an endpoint that returns a list of users.',
			color: 'green' as const
		},
		{
			term: 'CRUD',
			definition: 'Create, Read, Update, Delete - the four basic operations of persistent storage. Maps to HTTP methods: POST (Create), GET (Read), PUT/PATCH (Update), DELETE (Delete).',
			color: 'cyan' as const
		},
		{
			term: 'Idempotent',
			definition: 'An operation that produces the same result regardless of how many times it is executed. GET, PUT, DELETE are idempotent. POST is NOT idempotent - each call may create a new resource.',
			color: 'yellow' as const
		},
		{
			term: 'Stateless',
			definition: 'Each request from client to server must contain all information needed to understand the request. The server does not store client session state between requests. Authentication tokens must be sent with every request.',
			color: 'purple' as const
		},
		{
			term: 'Content Negotiation',
			definition: 'Mechanism for serving different representations of a resource at the same URI. Client specifies preferred format using Accept header (e.g., Accept: application/json). Server responds with Content-Type header.',
			color: 'pink' as const
		},
		{
			term: 'HATEOAS',
			definition: 'Hypermedia As The Engine Of Application State. A REST constraint where responses include links to related resources and possible actions. Clients navigate the API by following these links rather than hardcoding URLs.',
			color: 'cyan' as const
		}
	];
</script>

<div class="space-y-12">
	<!-- Overview Section -->
	<Section title="What is a REST API?" subtitle="The most common architectural style for web APIs">
		<div class="prose prose-invert max-w-none">
			<p class="text-gray-300 leading-relaxed">
				REST (Representational State Transfer) is an architectural style for designing networked applications.
				A <strong class="text-accent-orange">REST API</strong> uses HTTP methods to perform operations on
				<strong class="text-accent-blue">resources</strong> identified by URLs.
			</p>
			<p class="text-gray-400 mt-4">
				When you call an API endpoint like <code class="text-accent-green">GET /api/users/123</code>,
				you're requesting a representation of the user resource. The API returns data (usually JSON)
				along with metadata in HTTP headers.
			</p>
		</div>
	</Section>

	<!-- REST Principles -->
	<Section title="REST Principles" subtitle="The six architectural constraints defined by Roy Fielding">
		<DiagramContainer
			title="REST Architectural Constraints"
			description="Click each principle to learn more"
		>
			<RestPrinciples />
		</DiagramContainer>
	</Section>

	<!-- Resource Endpoints -->
	<Section title="Resources & Endpoints" subtitle="How to design URLs for your API resources">
		<DiagramContainer
			title="RESTful URL Patterns"
			description="Click each endpoint to see request and response examples"
		>
			<ResourceEndpoints />
		</DiagramContainer>
	</Section>

	<!-- Best Practices -->
	<Section title="API Design Best Practices" subtitle="Industry-standard conventions for RESTful APIs">
		<BestPractices />
	</Section>

	<!-- API Versioning -->
	<Section title="API Versioning" subtitle="Strategies for evolving your API without breaking clients">
		<DiagramContainer
			title="Versioning Strategies"
			description="Compare different approaches to API versioning"
		>
			<ApiVersioning />
		</DiagramContainer>
	</Section>

	<!-- Error Handling -->
	<Section title="Error Handling" subtitle="HTTP status codes and error response best practices">
		<ErrorHandling />
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
