<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	const stages = [
		{
			id: 0,
			title: 'Check Call Stack',
			description: 'Event loop first checks if the call stack has any frames to execute',
			highlight: ['callstack'],
			arrow: 'stack',
			color: 'yellow'
		},
		{
			id: 1,
			title: 'Execute Stack',
			description: 'If call stack is not empty, execute the top frame until it returns',
			highlight: ['callstack'],
			arrow: 'stack',
			color: 'yellow'
		},
		{
			id: 2,
			title: 'Check Microtasks',
			description: 'After stack is empty, process ALL microtasks (Promises, queueMicrotask)',
			highlight: ['microtask'],
			arrow: 'micro',
			color: 'purple'
		},
		{
			id: 3,
			title: 'Process Microtasks',
			description: 'Each microtask callback is pushed to call stack and executed',
			highlight: ['microtask', 'callstack'],
			arrow: 'micro-to-stack',
			color: 'purple'
		},
		{
			id: 4,
			title: 'Render (if needed)',
			description: 'Browser may perform rendering updates (layout, paint) at ~60fps',
			highlight: ['render'],
			arrow: 'render',
			color: 'cyan'
		},
		{
			id: 5,
			title: 'Check Task Queue',
			description: 'Take ONE task from the macrotask queue (setTimeout, events, I/O)',
			highlight: ['taskqueue'],
			arrow: 'task',
			color: 'blue'
		},
		{
			id: 6,
			title: 'Process Task',
			description: 'Push the task callback to call stack and execute it',
			highlight: ['taskqueue', 'callstack'],
			arrow: 'task-to-stack',
			color: 'blue'
		},
		{
			id: 7,
			title: 'Loop Continues',
			description: 'Return to step 1 - the event loop never stops while the page is open',
			highlight: ['loop'],
			arrow: 'loop',
			color: 'orange'
		}
	];

	function startAnimation() {
		intervalId = setInterval(() => {
			step = (step + 1) % stages.length;
		}, 2500);
	}

	function togglePlay() {
		isPlaying = !isPlaying;
		if (isPlaying) {
			startAnimation();
		} else {
			clearInterval(intervalId);
		}
	}

	function goToStep(s: number) {
		step = s;
		if (isPlaying) {
			clearInterval(intervalId);
			startAnimation();
		}
	}

	onMount(() => {
		startAnimation();
		return () => clearInterval(intervalId);
	});

	$: currentStage = stages[step];
</script>

<div class="space-y-6">
	<!-- Main Diagram -->
	<div class="relative bg-dark-900/50 rounded-xl p-6">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<!-- Left Column: Web APIs -->
			<div class="space-y-4">
				<h4 class="text-sm font-medium text-gray-400 text-center">Web APIs (Browser)</h4>
				<div class="bg-dark-800 rounded-lg border border-dark-600 p-4 min-h-[120px]">
					<div class="space-y-2">
						<div class="flex items-center gap-2 text-xs">
							<span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
							<span class="text-gray-400">setTimeout()</span>
						</div>
						<div class="flex items-center gap-2 text-xs">
							<span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
							<span class="text-gray-400">fetch()</span>
						</div>
						<div class="flex items-center gap-2 text-xs">
							<span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
							<span class="text-gray-400">DOM Events</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Middle Column: Call Stack + Heap -->
			<div class="space-y-4">
				<h4 class="text-sm font-medium text-gray-400 text-center">JavaScript Engine</h4>
				<div class="grid grid-cols-2 gap-3">
					<!-- Call Stack -->
					<div
						class="rounded-lg border-2 p-3 transition-all duration-300 min-h-[120px]
							{currentStage.highlight.includes('callstack') ? 'border-accent-yellow bg-accent-yellow/10' : 'border-dark-600 bg-dark-800'}"
					>
						<div class="text-xs font-medium text-center mb-2 text-gray-300">Call Stack</div>
						<div class="space-y-1">
							{#if currentStage.id === 1 || currentStage.id === 3 || currentStage.id === 6}
								<div class="bg-accent-yellow/20 border border-accent-yellow/40 rounded px-2 py-1 text-xs text-center" in:fly={{ y: -10, duration: 200 }}>
									{currentStage.id === 3 ? 'Promise.then()' : currentStage.id === 6 ? 'setTimeout cb' : 'main()'}
								</div>
							{/if}
						</div>
					</div>

					<!-- Heap -->
					<div class="bg-dark-800 rounded-lg border border-dark-600 p-3 min-h-[120px]">
						<div class="text-xs font-medium text-center mb-2 text-gray-300">Heap</div>
						<div class="flex flex-wrap gap-1 justify-center">
							<div class="w-6 h-6 rounded bg-accent-green/20 border border-accent-green/40"></div>
							<div class="w-8 h-6 rounded bg-accent-green/20 border border-accent-green/40"></div>
							<div class="w-5 h-6 rounded bg-accent-green/20 border border-accent-green/40"></div>
						</div>
						<div class="text-xs text-gray-500 text-center mt-2">Objects</div>
					</div>
				</div>

				<!-- Event Loop Indicator -->
				<div
					class="flex items-center justify-center gap-2 py-2 rounded-lg border-2 transition-all duration-300
						{currentStage.highlight.includes('loop') ? 'border-accent-orange bg-accent-orange/10' : 'border-dark-600 bg-dark-800'}"
				>
					<div class="w-3 h-3 rounded-full bg-accent-orange animate-pulse"></div>
					<span class="text-sm font-medium text-accent-orange">Event Loop</span>
				</div>
			</div>

			<!-- Right Column: Queues -->
			<div class="space-y-4">
				<h4 class="text-sm font-medium text-gray-400 text-center">Callback Queues</h4>

				<!-- Microtask Queue -->
				<div
					class="rounded-lg border-2 p-3 transition-all duration-300
						{currentStage.highlight.includes('microtask') ? 'border-accent-purple bg-accent-purple/10' : 'border-dark-600 bg-dark-800'}"
				>
					<div class="text-xs font-medium mb-2 text-accent-purple">Microtask Queue (Priority)</div>
					<div class="flex gap-1">
						{#if currentStage.id <= 3}
							<div class="px-2 py-1 rounded bg-accent-purple/20 border border-accent-purple/40 text-xs">
								Promise
							</div>
						{/if}
					</div>
					<div class="text-xs text-gray-500 mt-2">Promises, queueMicrotask</div>
				</div>

				<!-- Task Queue -->
				<div
					class="rounded-lg border-2 p-3 transition-all duration-300
						{currentStage.highlight.includes('taskqueue') ? 'border-accent-blue bg-accent-blue/10' : 'border-dark-600 bg-dark-800'}"
				>
					<div class="text-xs font-medium mb-2 text-accent-blue">Task Queue (Macrotasks)</div>
					<div class="flex gap-1">
						{#if currentStage.id <= 6}
							<div class="px-2 py-1 rounded bg-accent-blue/20 border border-accent-blue/40 text-xs">
								setTimeout
							</div>
						{/if}
						<div class="px-2 py-1 rounded bg-accent-blue/20 border border-accent-blue/40 text-xs">
							click
						</div>
					</div>
					<div class="text-xs text-gray-500 mt-2">setTimeout, setInterval, I/O</div>
				</div>

				<!-- Render -->
				<div
					class="rounded-lg border-2 p-2 transition-all duration-300
						{currentStage.highlight.includes('render') ? 'border-accent-cyan bg-accent-cyan/10' : 'border-dark-600 bg-dark-800'}"
				>
					<div class="text-xs font-medium text-center text-accent-cyan">Render Steps</div>
					<div class="text-xs text-gray-500 text-center">Style, Layout, Paint</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Step Progress -->
	<div class="flex justify-center gap-1 flex-wrap">
		{#each stages as s}
			<button
				on:click={() => goToStep(s.id)}
				class="w-6 h-2 rounded-full transition-all"
				style={step === s.id ? `background-color: var(--accent-${currentStage.color})` : ''}
				class:bg-dark-600={step !== s.id}
				class:hover:bg-dark-500={step !== s.id}
			></button>
		{/each}
	</div>

	<!-- Current Step Info -->
	{#key step}
		<div
			class="text-center p-4 rounded-lg bg-dark-800 border transition-colors"
			style="border-color: var(--accent-{currentStage.color}, #4f46e5)30"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="text-sm font-medium" style="color: var(--accent-{currentStage.color}, #8b5cf6)">
				Step {step + 1}: {currentStage.title}
			</div>
			<p class="text-gray-400 mt-1">{currentStage.description}</p>
		</div>
	{/key}

	<!-- Controls -->
	<div class="flex justify-center">
		<button
			on:click={togglePlay}
			class="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors text-sm"
		>
			{#if isPlaying}
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
				</svg>
				Pause
			{:else}
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
				</svg>
				Play
			{/if}
		</button>
	</div>

	<!-- Key Insights -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-start gap-3">
				<div class="text-accent-purple text-xl">1</div>
				<div>
					<h4 class="text-sm font-medium text-white">Microtasks First</h4>
					<p class="text-sm text-gray-400 mt-1">
						<strong class="text-gray-300">All</strong> microtasks run before the next macrotask.
						Promises always resolve before setTimeout, even with 0ms delay.
					</p>
				</div>
			</div>
		</div>
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="flex items-start gap-3">
				<div class="text-accent-blue text-xl">2</div>
				<div>
					<h4 class="text-sm font-medium text-white">One Task at a Time</h4>
					<p class="text-sm text-gray-400 mt-1">
						Only <strong class="text-gray-300">one</strong> macrotask is processed per loop iteration.
						This allows rendering updates between tasks.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
