<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	interface Example {
		id: number;
		title: string;
		code: string;
		output: string[];
		explanation: string;
	}

	const examples: Example[] = [
		{
			id: 1,
			title: 'Basic Promise vs setTimeout',
			code: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');`,
			output: ['1', '4', '3', '2'],
			explanation: 'Sync code (1, 4) runs first. Then microtasks (Promise: 3). Then macrotasks (setTimeout: 2).'
		},
		{
			id: 2,
			title: 'Nested Promises',
			code: `Promise.resolve().then(() => {
  console.log('1');
  Promise.resolve().then(() => {
    console.log('2');
  });
}).then(() => {
  console.log('3');
});

Promise.resolve().then(() => {
  console.log('4');
});`,
			output: ['1', '4', '2', '3'],
			explanation: 'First .then callbacks (1, 4) run. Inner Promise adds 2 to queue. Outer .then chain adds 3. Queue processes: 2, then 3.'
		},
		{
			id: 3,
			title: 'async/await',
			code: `async function foo() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}

console.log('3');
foo();
console.log('4');`,
			output: ['3', '1', '4', '2'],
			explanation: '3 runs, foo starts (1 runs), await pauses foo (rest becomes microtask), 4 runs, then microtask 2 runs.'
		},
		{
			id: 4,
			title: 'Mixed Async Operations',
			code: `console.log('start');

setTimeout(() => console.log('timeout1'), 0);
setTimeout(() => console.log('timeout2'), 0);

Promise.resolve()
  .then(() => console.log('promise1'))
  .then(() => console.log('promise2'));

console.log('end');`,
			output: ['start', 'end', 'promise1', 'promise2', 'timeout1', 'timeout2'],
			explanation: 'Sync first (start, end). All microtasks (promise1, promise2). Then macrotasks in order (timeout1, timeout2).'
		},
		{
			id: 5,
			title: 'queueMicrotask',
			code: `console.log('1');

queueMicrotask(() => console.log('2'));
Promise.resolve().then(() => console.log('3'));

setTimeout(() => console.log('4'), 0);

queueMicrotask(() => console.log('5'));

console.log('6');`,
			output: ['1', '6', '2', '3', '5', '4'],
			explanation: 'queueMicrotask and Promise.then both go to microtask queue (same priority). They run in order before setTimeout.'
		}
	];

	let selectedExample = 0;
	let showAnswer: Record<number, boolean> = {};

	function toggleAnswer(id: number) {
		showAnswer[id] = !showAnswer[id];
	}
</script>

<div class="space-y-6">
	<!-- Example Selector -->
	<div class="flex flex-wrap gap-2 justify-center">
		{#each examples as example, i}
			<button
				on:click={() => selectedExample = i}
				class="px-4 py-2 rounded-lg text-sm transition-all
					{selectedExample === i
						? 'bg-accent-yellow text-dark-900 font-medium'
						: 'bg-dark-700 text-gray-300 hover:bg-dark-600'}"
			>
				Example {example.id}
			</button>
		{/each}
	</div>

	<!-- Selected Example -->
	{#key selectedExample}
		<div in:fly={{ y: 20, duration: 300 }} class="space-y-4">
			<h3 class="text-lg font-medium text-white text-center">
				{examples[selectedExample].title}
			</h3>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<!-- Code -->
				<div class="rounded-lg bg-dark-800 border border-dark-700 overflow-hidden">
					<div class="px-4 py-2 bg-dark-700/50 border-b border-dark-700 flex items-center justify-between">
						<span class="text-sm font-medium text-gray-300">Code</span>
						<span class="text-xs text-gray-500">What's the output?</span>
					</div>
					<pre class="p-4 text-sm font-mono text-gray-300 overflow-x-auto"><code>{examples[selectedExample].code}</code></pre>
				</div>

				<!-- Answer Section -->
				<div class="space-y-4">
					<button
						on:click={() => toggleAnswer(examples[selectedExample].id)}
						class="w-full py-3 rounded-lg border-2 border-dashed transition-all
							{showAnswer[examples[selectedExample].id]
								? 'border-accent-green bg-accent-green/10 text-accent-green'
								: 'border-dark-600 bg-dark-800 text-gray-400 hover:border-dark-500'}"
					>
						{showAnswer[examples[selectedExample].id] ? 'Hide Answer' : 'Reveal Answer'}
					</button>

					{#if showAnswer[examples[selectedExample].id]}
						<div transition:slide class="space-y-4">
							<!-- Output -->
							<div class="rounded-lg bg-dark-900 border border-accent-green/30 overflow-hidden">
								<div class="px-4 py-2 bg-accent-green/10 border-b border-accent-green/30">
									<span class="text-sm font-medium text-accent-green">Console Output</span>
								</div>
								<div class="p-4 font-mono text-sm">
									{#each examples[selectedExample].output as line, i}
										<div
											class="text-gray-300"
											in:fly={{ x: -10, duration: 200, delay: i * 100 }}
										>
											<span class="text-gray-600">&gt;</span> {line}
										</div>
									{/each}
								</div>
							</div>

							<!-- Explanation -->
							<div class="rounded-lg bg-dark-800/50 border border-dark-700 p-4">
								<h4 class="text-sm font-medium text-white mb-2">Explanation</h4>
								<p class="text-sm text-gray-400">
									{examples[selectedExample].explanation}
								</p>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/key}

	<!-- Common Sources Reference -->
	<div class="mt-8 p-4 rounded-lg bg-dark-800 border border-dark-700">
		<h4 class="text-sm font-medium text-white mb-4">Quick Reference: What Goes Where?</h4>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<div class="text-sm font-medium text-accent-purple">Microtask Queue</div>
				<ul class="text-sm text-gray-400 space-y-1">
					<li class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-accent-purple"></span>
						Promise.then() / .catch() / .finally()
					</li>
					<li class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-accent-purple"></span>
						queueMicrotask()
					</li>
					<li class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-accent-purple"></span>
						MutationObserver callbacks
					</li>
					<li class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-accent-purple"></span>
						await (code after await)
					</li>
				</ul>
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium text-accent-blue">Task Queue (Macrotasks)</div>
				<ul class="text-sm text-gray-400 space-y-1">
					<li class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
						setTimeout() / setInterval()
					</li>
					<li class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
						setImmediate() (Node.js)
					</li>
					<li class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
						I/O operations
					</li>
					<li class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
						UI rendering events
					</li>
					<li class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
						requestAnimationFrame (before paint)
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Interview Tips -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="text-accent-yellow text-lg mb-2">1</div>
			<h4 class="text-sm font-medium text-white">Execution Order</h4>
			<p class="text-xs text-gray-400 mt-1">
				Sync code always runs first. Then all microtasks. Then one macrotask. Repeat.
			</p>
		</div>
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="text-accent-purple text-lg mb-2">2</div>
			<h4 class="text-sm font-medium text-white">Microtask Starvation</h4>
			<p class="text-xs text-gray-400 mt-1">
				If microtasks keep adding more microtasks, macrotasks (and rendering) get blocked indefinitely.
			</p>
		</div>
		<div class="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
			<div class="text-accent-blue text-lg mb-2">3</div>
			<h4 class="text-sm font-medium text-white">setTimeout(fn, 0)</h4>
			<p class="text-xs text-gray-400 mt-1">
				Doesn't run immediately! It schedules a macrotask that runs after sync code and all microtasks.
			</p>
		</div>
	</div>
</div>
