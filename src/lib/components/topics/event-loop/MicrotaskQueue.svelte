<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	interface QueueItem {
		id: number;
		label: string;
		type: 'micro' | 'macro';
	}

	const steps = [
		{
			id: 0,
			title: 'Initial State',
			description: 'Code schedules async tasks: setTimeout and Promise.resolve()',
			microtasks: [{ id: 1, label: 'Promise.then', type: 'micro' as const }],
			macrotasks: [{ id: 2, label: 'setTimeout', type: 'macro' as const }],
			executing: null as string | null,
			output: [] as string[]
		},
		{
			id: 1,
			title: 'Sync Code Runs',
			description: 'console.log("start") executes synchronously',
			microtasks: [{ id: 1, label: 'Promise.then', type: 'micro' as const }],
			macrotasks: [{ id: 2, label: 'setTimeout', type: 'macro' as const }],
			executing: 'sync',
			output: ['start']
		},
		{
			id: 2,
			title: 'More Sync Code',
			description: 'console.log("end") executes - still synchronous',
			microtasks: [{ id: 1, label: 'Promise.then', type: 'micro' as const }],
			macrotasks: [{ id: 2, label: 'setTimeout', type: 'macro' as const }],
			executing: 'sync',
			output: ['start', 'end']
		},
		{
			id: 3,
			title: 'Microtask Phase',
			description: 'Stack empty! Process ALL microtasks before any macrotask',
			microtasks: [] as QueueItem[],
			macrotasks: [{ id: 2, label: 'setTimeout', type: 'macro' as const }],
			executing: 'promise',
			output: ['start', 'end', 'promise']
		},
		{
			id: 4,
			title: 'Macrotask Phase',
			description: 'All microtasks done, now process ONE macrotask',
			microtasks: [] as QueueItem[],
			macrotasks: [] as QueueItem[],
			executing: 'timeout',
			output: ['start', 'end', 'promise', 'timeout']
		},
		{
			id: 5,
			title: 'Complete',
			description: 'All queues empty, event loop waits for new tasks',
			microtasks: [] as QueueItem[],
			macrotasks: [] as QueueItem[],
			executing: null,
			output: ['start', 'end', 'promise', 'timeout']
		}
	];

	function startAnimation() {
		intervalId = setInterval(() => {
			step = (step + 1) % steps.length;
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

	$: currentStep = steps[step];
</script>

<div class="space-y-6">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Code Example -->
		<div class="space-y-4">
			<div class="rounded-lg bg-dark-800 border border-dark-700 overflow-hidden">
				<div class="px-4 py-2 bg-dark-700/50 border-b border-dark-700">
					<span class="text-sm font-medium text-gray-300">Example Code</span>
				</div>
				<pre class="p-4 text-sm font-mono overflow-x-auto"><code><span class="text-gray-500">// Synchronous</span>
<span class="{currentStep.executing === 'sync' && currentStep.output.includes('start') ? 'bg-accent-yellow/30' : ''}">console.log(<span class="text-accent-green">'start'</span>);</span>

<span class="text-gray-500">// Macrotask (Task Queue)</span>
<span class="{currentStep.executing === 'timeout' ? 'bg-accent-blue/30' : ''}">setTimeout(() =&gt; {'{'}
  console.log(<span class="text-accent-green">'timeout'</span>);
{'}'}, 0);</span>

<span class="text-gray-500">// Microtask (higher priority)</span>
<span class="{currentStep.executing === 'promise' ? 'bg-accent-purple/30' : ''}">Promise.resolve().then(() =&gt; {'{'}
  console.log(<span class="text-accent-green">'promise'</span>);
{'}'});</span>

<span class="text-gray-500">// Synchronous</span>
<span class="{currentStep.executing === 'sync' && currentStep.output.includes('end') ? 'bg-accent-yellow/30' : ''}">console.log(<span class="text-accent-green">'end'</span>);</span></code></pre>
			</div>

			<!-- Console Output -->
			<div class="rounded-lg bg-dark-900 border border-dark-700 overflow-hidden">
				<div class="px-4 py-2 bg-dark-700/50 border-b border-dark-700 flex items-center gap-2">
					<span class="text-sm font-medium text-gray-300">Console Output</span>
				</div>
				<div class="p-4 font-mono text-sm min-h-[100px]">
					{#each currentStep.output as line, i}
						<div
							class="text-gray-300"
							in:fly={{ x: -10, duration: 200, delay: i * 50 }}
						>
							<span class="text-gray-600">&gt;</span> {line}
						</div>
					{/each}
					{#if currentStep.output.length === 0}
						<span class="text-gray-600">Waiting...</span>
					{/if}
				</div>
			</div>
		</div>

		<!-- Queue Visualization -->
		<div class="space-y-4">
			<!-- Priority Indicator -->
			<div class="rounded-lg bg-dark-800/50 border border-dark-700 p-4">
				<h4 class="text-sm font-medium text-white mb-3">Execution Priority</h4>
				<div class="flex items-center gap-2">
					<div class="flex-1 h-2 rounded-full bg-accent-yellow/30 relative overflow-hidden">
						<div class="absolute inset-y-0 left-0 w-1/3 bg-accent-yellow"></div>
					</div>
					<span class="text-xs text-gray-400">Sync</span>
				</div>
				<div class="flex items-center gap-2 mt-2">
					<div class="flex-1 h-2 rounded-full bg-accent-purple/30 relative overflow-hidden">
						<div class="absolute inset-y-0 left-0 w-2/3 bg-accent-purple"></div>
					</div>
					<span class="text-xs text-gray-400">Microtasks</span>
				</div>
				<div class="flex items-center gap-2 mt-2">
					<div class="flex-1 h-2 rounded-full bg-accent-blue/30 relative overflow-hidden">
						<div class="absolute inset-y-0 left-0 w-full bg-accent-blue"></div>
					</div>
					<span class="text-xs text-gray-400">Macrotasks</span>
				</div>
			</div>

			<!-- Microtask Queue -->
			<div
				class="rounded-lg border-2 p-4 transition-all duration-300
					{currentStep.executing === 'promise' ? 'border-accent-purple bg-accent-purple/10' : 'border-dark-600 bg-dark-800'}"
			>
				<div class="flex items-center justify-between mb-3">
					<h4 class="text-sm font-medium text-accent-purple">Microtask Queue</h4>
					<span class="text-xs px-2 py-0.5 rounded bg-accent-purple/20 text-accent-purple">HIGH PRIORITY</span>
				</div>
				<div class="flex gap-2 min-h-[40px]">
					{#each currentStep.microtasks as task (task.id)}
						<div
							class="px-3 py-2 rounded bg-accent-purple/20 border border-accent-purple/40 text-xs text-accent-purple"
							in:fly={{ x: 20, duration: 200 }}
							out:fly={{ x: -20, duration: 200 }}
						>
							{task.label}
						</div>
					{/each}
					{#if currentStep.microtasks.length === 0}
						<span class="text-gray-600 text-xs" in:fade>Empty</span>
					{/if}
				</div>
				<div class="mt-2 text-xs text-gray-500">
					Promise.then(), queueMicrotask(), MutationObserver
				</div>
			</div>

			<!-- Macrotask Queue -->
			<div
				class="rounded-lg border-2 p-4 transition-all duration-300
					{currentStep.executing === 'timeout' ? 'border-accent-blue bg-accent-blue/10' : 'border-dark-600 bg-dark-800'}"
			>
				<div class="flex items-center justify-between mb-3">
					<h4 class="text-sm font-medium text-accent-blue">Task Queue (Macrotasks)</h4>
					<span class="text-xs px-2 py-0.5 rounded bg-accent-blue/20 text-accent-blue">LOW PRIORITY</span>
				</div>
				<div class="flex gap-2 min-h-[40px]">
					{#each currentStep.macrotasks as task (task.id)}
						<div
							class="px-3 py-2 rounded bg-accent-blue/20 border border-accent-blue/40 text-xs text-accent-blue"
							in:fly={{ x: 20, duration: 200 }}
							out:fly={{ x: -20, duration: 200 }}
						>
							{task.label}
						</div>
					{/each}
					{#if currentStep.macrotasks.length === 0}
						<span class="text-gray-600 text-xs" in:fade>Empty</span>
					{/if}
				</div>
				<div class="mt-2 text-xs text-gray-500">
					setTimeout(), setInterval(), I/O, UI events
				</div>
			</div>
		</div>
	</div>

	<!-- Step Progress -->
	<div class="flex justify-center gap-1 flex-wrap">
		{#each steps as s}
			<button
				on:click={() => goToStep(s.id)}
				class="w-6 h-2 rounded-full transition-all
					{step === s.id ? 'bg-accent-orange' : 'bg-dark-600 hover:bg-dark-500'}"
			></button>
		{/each}
	</div>

	<!-- Current Step Info -->
	{#key step}
		<div
			class="text-center p-4 rounded-lg bg-dark-800 border border-accent-orange/30"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="text-sm font-medium text-accent-orange">
				Step {step + 1}: {currentStep.title}
			</div>
			<p class="text-gray-400 mt-1">{currentStep.description}</p>
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

	<!-- Key Takeaway -->
	<div class="p-4 rounded-lg bg-accent-purple/10 border border-accent-purple/30">
		<div class="flex items-start gap-3">
			<div class="text-accent-purple text-xl">!</div>
			<div>
				<h4 class="text-sm font-medium text-white">The Golden Rule</h4>
				<p class="text-sm text-gray-400 mt-1">
					<strong class="text-white">Microtasks always run before macrotasks.</strong>
					Even if setTimeout has 0ms delay, Promise.then() callbacks execute first because
					they're in the microtask queue. This is why the output is: start, end, promise, timeout.
				</p>
			</div>
		</div>
	</div>
</div>
