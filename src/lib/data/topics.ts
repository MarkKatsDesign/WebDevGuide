export interface Topic {
	slug: string;
	title: string;
	description: string;
	icon: string;
	color: string;
	category: string;
	implemented: boolean;
}

export interface TopicCategory {
	name: string;
	topics: Topic[];
}

export const topics: Topic[] = [
	// Phase 1: Foundation
	{
		slug: 'http',
		title: 'HTTP/HTTPS',
		description: 'Request/response cycle, methods, status codes, headers, and TLS encryption',
		icon: '🌐',
		color: 'blue',
		category: 'Foundation',
		implemented: true
	},
	{
		slug: 'dns',
		title: 'DNS',
		description: 'How domain names resolve to IP addresses, DNS hierarchy, and caching',
		icon: '🔍',
		color: 'cyan',
		category: 'Foundation',
		implemented: true
	},
	{
		slug: 'internet',
		title: 'How the Internet Works',
		description: 'TCP/IP stack, packets, routing, and network fundamentals',
		icon: '🌍',
		color: 'green',
		category: 'Foundation',
		implemented: true
	},

	// Phase 2: Browser & Rendering
	{
		slug: 'browser-rendering',
		title: 'Browser Rendering',
		description: 'DOM, CSSOM, render tree, layout, paint, and composite stages',
		icon: '🖥️',
		color: 'purple',
		category: 'Browser',
		implemented: true
	},
	{
		slug: 'event-loop',
		title: 'JavaScript Event Loop',
		description: 'Call stack, task queue, microtasks, and async execution',
		icon: '🔄',
		color: 'yellow',
		category: 'Browser',
		implemented: true
	},

	// Phase 3: APIs
	{
		slug: 'rest-api',
		title: 'REST APIs',
		description: 'Resources, endpoints, CRUD operations, and best practices',
		icon: '📡',
		color: 'orange',
		category: 'APIs',
		implemented: false
	},
	{
		slug: 'websockets',
		title: 'WebSockets',
		description: 'Real-time bi-directional communication and handshake process',
		icon: '⚡',
		color: 'pink',
		category: 'APIs',
		implemented: false
	},
	{
		slug: 'graphql',
		title: 'GraphQL',
		description: 'Queries, mutations, schemas, and comparison with REST',
		icon: '◈',
		color: 'pink',
		category: 'APIs',
		implemented: false
	},

	// Phase 4: Security
	{
		slug: 'authentication',
		title: 'Authentication',
		description: 'Sessions, cookies, JWT tokens, and OAuth 2.0 flows',
		icon: '🔐',
		color: 'purple',
		category: 'Security',
		implemented: false
	},
	{
		slug: 'web-security',
		title: 'Web Security',
		description: 'CORS, XSS, CSRF, CSP headers, and common vulnerabilities',
		icon: '🛡️',
		color: 'orange',
		category: 'Security',
		implemented: false
	},

	// Phase 5: Architecture
	{
		slug: 'caching',
		title: 'Caching Strategies',
		description: 'Browser cache, CDN, server-side caching, and cache headers',
		icon: '💾',
		color: 'cyan',
		category: 'Architecture',
		implemented: false
	},
	{
		slug: 'databases',
		title: 'Database Fundamentals',
		description: 'SQL vs NoSQL, indexing, transactions, and ACID properties',
		icon: '🗄️',
		color: 'green',
		category: 'Architecture',
		implemented: false
	},
	{
		slug: 'server-architecture',
		title: 'Server Architecture',
		description: 'Load balancing, scaling, microservices, and deployment',
		icon: '🏗️',
		color: 'blue',
		category: 'Architecture',
		implemented: false
	}
];

export const categories = ['Foundation', 'Browser', 'APIs', 'Security', 'Architecture'];

export function getTopicBySlug(slug: string): Topic | undefined {
	return topics.find(t => t.slug === slug);
}

export function getTopicsByCategory(category: string): Topic[] {
	return topics.filter(t => t.category === category);
}

export function getImplementedTopics(): Topic[] {
	return topics.filter(t => t.implemented);
}
