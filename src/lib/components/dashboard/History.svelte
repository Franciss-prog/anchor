<script lang="ts">
	import { Clock, CornerUpLeft, MapPin } from 'lucide-svelte';
	import { readableTimeFrame, itemHistory, clearHistory } from '$lib';
</script>

<section class="min-h-screen w-full">
	<div class="max-w-4xl mx-auto px-6 py-8">
		<!-- Header -->
		<header class="mb-12">
			<div class="flex items-end justify-between mb-2">
				<h1 class="text-[32px] tracking-tight">History</h1>
				<a
					href="/dashboard"
					class="flex items-center gap-2 px-3 py-1.5 text-xs font-light opacity-60 hover:opacity-100 transition-opacity border border-current/10"
				>
					<CornerUpLeft size={14} strokeWidth={1.5} />
					<span class="uppercase tracking-wider">Back</span>
				</a>
			</div>
			<div class="h-px w-full bg-current opacity-10"></div>
			<div class="flex items-center justify-between mt-3">
				<p class="text-xs font-light opacity-50 tracking-wider uppercase">
					{$itemHistory.length}
					{$itemHistory.length === 1 ? 'Entry' : 'Entries'}
				</p>
				<button
					class="px-3 py-1.5 text-[10px] font-light flex items-center gap-1.5 border border-current/30 hover:border-current hover:bg-current/5 transition-all uppercase tracking-wider"
					on:click={clearHistory}
				>
					Clear History
				</button>
			</div>
		</header>

		<!-- History List -->
		<div class="space-y-2">
			{#each $itemHistory as item}
				<article
					class="bg-transparent border border-current/10 hover:border-current/30 transition-all"
				>
					<div class="p-4">
						<!-- Mobile Layout -->
						<div class="flex flex-col gap-3 sm:hidden">
							<div class="flex items-start justify-between gap-3">
								<div class="flex-1 min-w-0">
									<h3 class="text-sm font-medium mb-1.5 tracking-tight">
										{item.item_name}
									</h3>
									<div class="flex items-center gap-1.5 text-[10px] opacity-40">
										<MapPin size={10} strokeWidth={1.5} />
										<span class="truncate font-light uppercase tracking-wider">{item.location}</span
										>
									</div>
								</div>
								<span
									class="px-2 py-1 text-[9px] font-light tracking-wider uppercase opacity-60 border border-current/20"
								>
									{item.status}
								</span>
							</div>
							<div
								class="flex items-center gap-1.5 pt-2 border-t border-current/5 text-[10px] opacity-30"
							>
								<Clock size={10} strokeWidth={1.5} />
								<span class="font-light uppercase tracking-wider"
									>{readableTimeFrame(item.created_at)}</span
								>
							</div>
						</div>

						<!-- Desktop Layout -->
						<div class="hidden sm:flex items-center justify-between gap-6">
							<div class="flex-1 min-w-0">
								<h3 class="text-base font-medium mb-2 tracking-tight">
									{item.item_name}
								</h3>
								<div class="flex items-center gap-4 text-[11px] opacity-40">
									<div class="flex items-center gap-1.5">
										<MapPin size={11} strokeWidth={1.5} />
										<span class="font-light uppercase tracking-wider">{item.location}</span>
									</div>
									<div class="flex items-center gap-1.5 opacity-75">
										<Clock size={11} strokeWidth={1.5} />
										<span class="font-light uppercase tracking-wider"
											>{readableTimeFrame(item.created_at)}</span
										>
									</div>
								</div>
							</div>
							<span
								class="px-3 py-1.5 text-[10px] font-light tracking-wider uppercase flex-shrink-0 opacity-60 border border-current/20"
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
