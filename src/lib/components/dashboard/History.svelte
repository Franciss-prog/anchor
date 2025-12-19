<script lang="ts">
	import { Clock, CornerUpLeft, MapPin } from 'lucide-svelte';
	import { readableTimeFrame, itemHistory, clearHistory } from '$lib';
</script>

<section class="min-h-screen bg-light w-full">
	<div class="max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
		<!-- Header -->
		<header class="mb-12 sm:mb-16 flex items-center justify-between">
			<div>
				<h1 class="text-2xl sm:text-3xl lg:text-4xl font-light text-dark mb-3 tracking-tight">
					History
				</h1>
				<p class="text-sm sm:text-base text-dark/60 font-light">Track of your items over time</p>
			</div>

			<a href="/dashboard" class="text-dark/50 hover:text-dark flex transition-all">
				<CornerUpLeft />Go To Dashboard</a
			>
		</header>

		<!-- Meta Info -->
		<div class="flex items-center mb-8 pb-6 border-b border-dark/10 justify-between text-dark/50">
			<span class="text-xs sm:text-sm font-light tracking-wide uppercase">
				{$itemHistory.length}
				{$itemHistory.length === 1 ? 'Entry' : 'Entries'}
			</span>
			<button
				class="px-3 py-1.5 text-xs flex items-center gap-1.5 bg-white border border-dark/10 hover:border-red-300 hover:bg-red-50 text-dark/60 hover:text-red-600 transition-all"
				on:click={clearHistory}>Clear History</button
			>
		</div>

		<!-- History List -->
		<div class="space-y-3 sm:space-y-4">
			{#each $itemHistory as item}
				<article class="bg-white border border-dark/5">
					<div class="p-4 sm:p-6">
						<!-- Mobile Layout -->
						<div class="flex flex-col gap-4 sm:hidden">
							<div class="flex items-start justify-between gap-3">
								<div class="flex-1 min-w-0">
									<h3 class="text-base font-normal text-dark mb-2 tracking-tight">
										{item.item_name}
									</h3>
									<div class="flex items-center gap-1.5 text-xs text-dark/50">
										<MapPin size={12} strokeWidth={1.5} />
										<span class="truncate font-light">{item.location}</span>
									</div>
								</div>
								<span
									class="px-2 py-1 text-xs font-light bg-dark/5 text-dark/60 tracking-tight uppercase"
								>
									{item.status}
								</span>
							</div>

							<div
								class="flex items-center gap-1.5 pt-2 border-t border-dark/5 text-xs text-dark/40"
							>
								<Clock size={12} strokeWidth={1.5} />
								<span class="font-light">{readableTimeFrame(item.created_at)}</span>
							</div>
						</div>

						<!-- Desktop Layout -->
						<div class="hidden sm:flex items-start justify-between gap-8">
							<div class="flex-1 min-w-0">
								<h3 class="text-lg font-normal text-dark mb-3 tracking-tight">
									{item.item_name}
								</h3>
								<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-dark/50">
									<div class="flex items-center gap-1.5">
										<MapPin size={14} strokeWidth={1.5} />
										<span class="font-light">{item.location}</span>
									</div>
									<div class="flex items-center gap-1.5 text-dark/40">
										<Clock size={14} strokeWidth={1.5} />
										<span class="font-light">{readableTimeFrame(item.created_at)}</span>
									</div>
								</div>
							</div>

							<span
								class="px-3 py-1.5 text-sm font-light bg-dark/5 text-dark/60 tracking-tight uppercase flex-shrink-0"
							>
								{item.status}
							</span>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
