<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let step = 0;
	let isPlaying = true;
	let intervalId: ReturnType<typeof setInterval>;

	interface StackFrame {
		id: number;
		name: string;
		color: string;
	}

	const steps = [
		{
			id: 0,
			title: 'Script Starts',
			description: 'main() is pushed onto the call stack',
			code: 'main()',
			stack: [{ id: 1, name: 'main()', color: 'yellow' }],
			highlight: 0
		},
		{
			id: 1,
			title: 'Call first()',
			description: 'first() is called, pushed onto the stack',
			code: 'first()',
			stack: [
				{ id: 1, name: 'main()', color: 'yellow' },
				{ id: 2, name: 'first()', color: 'blue' }
			],
			highlight: 1
		},
		{
			id: 2,
			title: 'Call second()',
			description: 'first() calls second(), pushed onto the stack',
			code: 'second()',
			stack: [
				{ id: 1, name: 'main()', color: 'yellow' },
				{ id: 2, name: 'first()', color: 'blue' },
				{ id: 3, name: 'second()', color: 'green' }
			],
			highlight: 2
		},
		{
			id: 3,
			title: 'Call third()',
			description: 'second() calls third(), pushed onto the stack',
			code: 'third()',
			stack: [
				{ id: 1, name: 'main()', color: 'yellow' },
				{ id: 2, name: 'first()', color: 'blue' },
				{ id: 3, name: 'second()', color: 'green' },
				{ id: 4, name: 'third()', color: 'purple' }
			],
			highlight: 3
		},
		{
			id: 4,
			title: 'third() Returns',
			description: 'third() completes and is popped off the stack',
			code: 'return',
			stack: [
				{ id: 1, name: 'main()', color: 'yellow' },
				{ id: 2, name: 'first()', color: 'blue' },
				{ id: 3, name: 'second()', color: 'green' }
			],
			highlight: 2
		},
		{
			id: 5,
			title: 'second() Returns',
			description: 'second() completes and is popped off the stack',
			code: 'return',
			stack: [
				{ id: 1, name: 'main()', color: 'yellow' },
				{ id: 2, name: 'first()', color: 'blue' }
			],
			highlight: 1
		},
		{
			id: 6,
			title: 'first() Returns',
			description: 'first() completes and is popped off the stack',
			code: 'return',
			stack: [{ id: 1, name: 'main()', color: 'yellow' }],
			highlight: 0
		},
		{
			id: 7,
			title: 'main() Returns',
			description: 'main() completes, stack is empty',
			code: 'return',
			stack: [] as StackFrame[],
			highlight: -1
		}
	];

	function startAnimation() {
		intervalId = setInterval(() => {
			step = (step + 1) % steps.length;
		}, 2000);
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

	const codeLines = [
		{ line: 'function third() {', indent: 0 },
		{ line: '  console.log("third");', indent: 1 },
		{ line: '}', indent: 0 },
		{ line: '', indent: 0 },
		{ line: 'function second() {', indent: 0 },
		{ line: '  third();', indent: 1 },
		{ line: '}', indent: 0 },
		{ line: '', indent: 0 },
		{ line: 'function first() {', indent: 0 },
		{ line: '  second();', indent: 1 },
		{ line: '}', indent: 0 },
		{ line: '', indent: 0 },
		{ line: 'function main() {', indent: 0 },
		{ line: '  first();', indent: 1 },
		{ line: '}', indent: 0 },
		{ line: '', indent: 0 },
		{ line: 'main();', indent: 0 }
	];

	// Map step to highlighted code line
	$: highlightedLine = (() => {
		switch (step) {
			case 0: return 16; // main() call
			case 1: return 13; // first() call
			case 2: return 9;  // second() call
			case 3: return 5;  // third() call
			case 4: return 2;  // third() return
			case 5: return 6;  // second() return
			case 6: return 10; // first() return
			case 7: return 14; // main() return
			default: return -1;
		}
	})();
</script>

<div class="space-y-6">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Code Panel -->
		<div class="rounded-lg bg-dark-800 border border-dark-700 overflow-hidden">
			<div class="px-4 py-2 bg-dark-700/50 border-b border-dark-700">
				<span class="text-sm font-medium text-gray-300">Code Execution</span>
			</div>
			<div class="p-4 font-mono text-sm">
				{#each codeLines as { line, indent }, i}
					<div
						class="transition-colors duration-200 rounded px-1 -mx-1
							{highlightedLine === i ? 'bg-accent-yellow/20 text-white' : 'text-gray-400'}"
					>
						{#if line}
							<span class="text-gray-600 select-none mr-3">{String(i + 1).padStart(2, ' ')}</span>
							<span>{line}</span>
						{:else}
							<span class="text-gray-600 select-none mr-3">{String(i + 1).padStart(2, ' ')}</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Call Stack Visualization -->
		<div class="space-y-4">
			<div class="rounded-lg bg-dark-900/50 border border-dark-600 p-4">
				<h4 class="text-sm font-medium text-gray-300 mb-4 text-center">Call Stack (LIFO)</h4>

				<div class="relative min-h-[200px] flex flex-col-reverse gap-2 justify-start">
					{#if currentStep.stack.length === 0}
						<div class="text-gray-500 text-sm text-center py-8" in:fade>
							Stack is empty
						</div>
					{:else}
						{#each currentStep.stack as frame, i (frame.id)}
							<div
								class="px-4 py-3 rounded-lg border-2 text-center font-mono text-sm transition-all
									{i === currentStep.highlight ? 'scale-105' : ''}"
								style="border-color: var(--accent-{frame.color}); background-color: var(--accent-{frame.color})15"
								animate:flip={{ duration: 300 }}
								in:fly={{ y: -20, duration: 300 }}
								out:fly={{ y: -20, duration: 300 }}
							>
								<span style="color: var(--accent-{frame.color})">{frame.name}</span>
								{#if i === currentStep.stack.length - 1}
									<span class="ml-2 text-xs text-gray-500">(top)</span>
								{/if}
							</div>
						{/each}
					{/if}
				</div>

				<div class="mt-4 pt-4 border-t border-dark-700 flex justify-between text-xs text-gray-500">
					<span>Bottom of stack</span>
					<span>Top of stack (executes first)</span>
				</div>
			</div>

			<!-- Stack Operations -->
			<div class="grid grid-cols-2 gap-3">
				<div class="p-3 rounded-lg bg-dark-800 border border-dark-700 text-center">
					<div class="text-accent-green font-medium text-sm">Push</div>
					<div class="text-xs text-gray-500 mt-1">Function called = added to top</div>
				</div>
				<div class="p-3 rounded-lg bg-dark-800 border border-dark-700 text-center">
					<div class="text-accent-orange font-medium text-sm">Pop</div>
					<div class="text-xs text-gray-500 mt-1">Function returns = removed</div>
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
					{step === s.id ? 'bg-accent-yellow' : 'bg-dark-600 hover:bg-dark-500'}"
			></button>
		{/each}
	</div>

	<!-- Current Step Info -->
	{#key step}
		<div
			class="text-center p-4 rounded-lg bg-dark-800 border border-accent-yellow/30"
			in:fly={{ y: 10, duration: 200 }}
		>
			<div class="text-sm font-medium text-accent-yellow">
				{currentStep.title}
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

	<!-- Stack Overflow Note -->
	<div class="p-4 rounded-lg bg-accent-orange/10 border border-accent-orange/30">
		<div class="flex items-start gap-3">
			<div class="text-accent-orange text-xl">!</div>
			<div>
				<h4 class="text-sm font-medium text-white">Stack Overflow</h4>
				<p class="text-sm text-gray-400 mt-1">
					If functions keep calling other functions without returning, the stack grows until it exceeds
					the browser's limit (~10,000-50,000 frames), causing a <code class="text-accent-orange">Maximum call stack size exceeded</code> error.
					This commonly happens with infinite recursion.
				</p>
			</div>
		</div>
	</div>
</div>
