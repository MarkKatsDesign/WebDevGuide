<script lang="ts">
	import { Section, KeyTerm, DiagramContainer } from '$lib/components/ui';
	import EventLoopAnimation from './EventLoopAnimation.svelte';
	import CallStack from './CallStack.svelte';
	import MicrotaskQueue from './MicrotaskQueue.svelte';
	import AsyncExamples from './AsyncExamples.svelte';

	const keyTerms = [
		{
			term: 'Call Stack',
			definition: 'A LIFO (Last In, First Out) data structure that tracks function execution. When a function is called, it\'s pushed onto the stack. When it returns, it\'s popped off. JavaScript is single-threaded, meaning only one thing can execute at a time.',
			color: 'yellow' as const
		},
		{
			term: 'Heap',
			definition: 'A region of memory where objects are allocated. Unlike the stack which handles function execution, the heap stores reference types like objects and arrays. Memory is managed by garbage collection.',
			color: 'green' as const
		},
		{
			term: 'Task Queue (Macrotask Queue)',
			definition: 'A queue holding callbacks from setTimeout, setInterval, I/O operations, and UI rendering events. Tasks are processed one at a time, and the next task only runs after the call stack is empty and all microtasks are complete.',
			color: 'blue' as const
		},
		{
			term: 'Microtask Queue',
			definition: 'A higher-priority queue for Promise callbacks (.then, .catch, .finally), queueMicrotask(), and MutationObserver. All microtasks are processed before the next macrotask, which is why Promises resolve before setTimeout callbacks.',
			color: 'purple' as const
		},
		{
			term: 'Event Loop',
			definition: 'The mechanism that coordinates execution between the call stack, microtask queue, and task queue. It continuously checks: 1) Execute call stack until empty, 2) Process all microtasks, 3) Process one macrotask, 4) Repeat.',
			color: 'orange' as const
		},
		{
			term: 'Web APIs',
			definition: 'Browser-provided APIs (setTimeout, fetch, DOM events) that run outside the main JavaScript thread. When their operations complete, they push callbacks to the appropriate queue. This enables non-blocking async operations.',
			color: 'cyan' as const
		},
		{
			term: 'Blocking vs Non-Blocking',
			definition: 'Blocking code occupies the call stack, freezing the UI. Non-blocking code (async operations) offloads work to Web APIs, keeping the main thread free. Long synchronous loops block; setTimeout/Promises don\'t.',
			color: 'pink' as const
		},
		{
			term: 'Run-to-Completion',
			definition: 'A JavaScript guarantee that once a function starts executing, it runs until it returns - no other code can interrupt mid-execution. This simplifies reasoning about code but means long tasks block everything else.',
			color: 'yellow' as const
		}
	];
</script>

<div class="space-y-12">
	<!-- Overview Section -->
	<Section title="The JavaScript Event Loop" subtitle="Understanding async execution in a single-threaded environment">
		<div class="prose prose-invert max-w-none">
			<p class="text-gray-300 leading-relaxed">
				JavaScript is <strong class="text-accent-yellow">single-threaded</strong>, meaning it can only execute one piece of code at a time.
				Yet it handles async operations like network requests, timers, and user interactions smoothly.
				The secret? The <strong class="text-accent-orange">Event Loop</strong>.
			</p>
			<p class="text-gray-400 mt-4">
				Understanding the event loop is crucial for writing performant JavaScript and predicting the order of async operations.
				It's also a favorite topic in technical interviews when discussing concepts like
				<strong class="text-accent-purple">Promises</strong>, <strong class="text-accent-blue">setTimeout</strong>,
				and why certain code executes in unexpected orders.
			</p>
		</div>
	</Section>

	<!-- Main Event Loop Animation -->
	<Section title="How the Event Loop Works" subtitle="The continuous cycle of checking and executing">
		<DiagramContainer
			title="Event Loop Cycle"
			description="Watch how JavaScript coordinates between the call stack, microtasks, and macrotasks"
		>
			<EventLoopAnimation />
		</DiagramContainer>
	</Section>

	<!-- Call Stack -->
	<Section title="The Call Stack" subtitle="Tracking function execution in LIFO order">
		<DiagramContainer
			title="Call Stack Visualization"
			description="See how functions are pushed and popped from the stack"
		>
			<CallStack />
		</DiagramContainer>
	</Section>

	<!-- Microtask vs Macrotask -->
	<Section title="Microtasks vs Macrotasks" subtitle="Understanding queue priorities">
		<DiagramContainer
			title="Queue Priority"
			description="Microtasks always run before the next macrotask"
		>
			<MicrotaskQueue />
		</DiagramContainer>
	</Section>

	<!-- Async Examples -->
	<Section title="Execution Order Examples" subtitle="Predict the output of async code">
		<DiagramContainer
			title="Common Interview Questions"
			description="Test your understanding of event loop execution order"
		>
			<AsyncExamples />
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
