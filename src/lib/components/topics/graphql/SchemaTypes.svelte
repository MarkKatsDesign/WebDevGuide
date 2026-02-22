<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface SchemaType {
		name: string;
		description: string;
		code: string;
		icon: string;
		color: string;
		bgColor: string;
	}

	const schemaTypes: SchemaType[] = [
		{
			name: 'Object Type',
			description: 'Represents an entity with fields. The building block of a GraphQL schema. Each field has a type and can have arguments.',
			code: `type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
}`,
			icon: '📦',
			color: 'text-accent-blue',
			bgColor: 'bg-accent-blue/10 border-accent-blue/30'
		},
		{
			name: 'Query Type',
			description: 'The entry point for read operations. Defines what data clients can fetch. Every GraphQL schema must have a Query type.',
			code: `type Query {
  user(id: ID!): User
  users(limit: Int = 10): [User!]!
  searchUsers(term: String!): [User!]!
}`,
			icon: '🔍',
			color: 'text-accent-green',
			bgColor: 'bg-accent-green/10 border-accent-green/30'
		},
		{
			name: 'Mutation Type',
			description: 'The entry point for write operations. Defines how clients can modify data. Returns the affected data.',
			code: `type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User
  deleteUser(id: ID!): Boolean!
}`,
			icon: '✏️',
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10 border-accent-orange/30'
		},
		{
			name: 'Input Type',
			description: 'Special type for arguments passed to queries and mutations. Keeps argument lists clean and reusable.',
			code: `input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}`,
			icon: '📥',
			color: 'text-accent-purple',
			bgColor: 'bg-accent-purple/10 border-accent-purple/30'
		},
		{
			name: 'Enum Type',
			description: 'A special scalar restricted to a set of allowed values. Useful for status fields, roles, and categories.',
			code: `enum Role {
  ADMIN
  EDITOR
  VIEWER
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}`,
			icon: '📋',
			color: 'text-accent-cyan',
			bgColor: 'bg-accent-cyan/10 border-accent-cyan/30'
		},
		{
			name: 'Interface & Union',
			description: 'Interface defines shared fields across types. Union represents a value that could be one of several types.',
			code: `interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
}

union SearchResult = User | Post | Comment`,
			icon: '🔗',
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10 border-accent-pink/30'
		}
	];

	let selectedType: SchemaType | null = null;
</script>

<div class="space-y-6">
	<!-- Type Grid -->
	<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
		{#each schemaTypes as schemaType, i}
			<button
				class="p-4 rounded-lg border transition-all duration-200 text-left
					{selectedType?.name === schemaType.name
						? schemaType.bgColor + ' scale-105'
						: 'bg-dark-800/50 border-dark-700 hover:border-dark-600'}"
				on:click={() => selectedType = selectedType?.name === schemaType.name ? null : schemaType}
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="text-2xl mb-2">{schemaType.icon}</div>
				<div class="font-medium text-sm {schemaType.color}">{schemaType.name}</div>
			</button>
		{/each}
	</div>

	<!-- Selected Details -->
	{#if selectedType}
		<div
			class="rounded-lg border {selectedType.bgColor} p-6"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="flex items-start gap-4">
				<span class="text-3xl">{selectedType.icon}</span>
				<div class="flex-1">
					<h4 class="font-bold text-lg {selectedType.color}">{selectedType.name}</h4>
					<p class="text-gray-300 mt-2">{selectedType.description}</p>
					<pre class="mt-4 p-3 rounded bg-dark-900 text-sm text-gray-300 overflow-x-auto"><code>{selectedType.code}</code></pre>
				</div>
			</div>
		</div>
	{:else}
		<div class="text-center py-6 text-gray-500 text-sm">
			Click on a type to see its definition
		</div>
	{/if}

	<!-- Scalar Types -->
	<div>
		<h4 class="text-sm font-medium text-gray-400 mb-4">Built-in Scalar Types</h4>
		<div class="grid grid-cols-2 md:grid-cols-5 gap-3">
			{#each [
				{ name: 'Int', desc: 'Signed 32-bit integer' },
				{ name: 'Float', desc: '64-bit floating point' },
				{ name: 'String', desc: 'UTF-8 text' },
				{ name: 'Boolean', desc: 'true or false' },
				{ name: 'ID', desc: 'Unique identifier' }
			] as scalar, i}
				<div
					class="p-3 rounded-lg bg-dark-800/50 border border-dark-700 text-center"
					in:fly={{ y: 10, delay: i * 50 }}
				>
					<span class="font-mono text-accent-yellow text-sm">{scalar.name}</span>
					<p class="text-xs text-gray-500 mt-1">{scalar.desc}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Type Modifiers -->
	<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
		<div class="flex items-start gap-3">
			<div class="text-accent-yellow text-xl">💡</div>
			<div>
				<h4 class="text-sm font-medium text-white">Type Modifiers</h4>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
					<div class="flex items-center gap-3">
						<code class="text-accent-pink font-mono text-sm">String!</code>
						<span class="text-sm text-gray-400">Non-nullable (required)</span>
					</div>
					<div class="flex items-center gap-3">
						<code class="text-accent-cyan font-mono text-sm">[String]</code>
						<span class="text-sm text-gray-400">List (nullable items)</span>
					</div>
					<div class="flex items-center gap-3">
						<code class="text-accent-orange font-mono text-sm">[String!]!</code>
						<span class="text-sm text-gray-400">Non-null list of non-null items</span>
					</div>
					<div class="flex items-center gap-3">
						<code class="text-accent-green font-mono text-sm">String</code>
						<span class="text-sm text-gray-400">Nullable (optional)</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
