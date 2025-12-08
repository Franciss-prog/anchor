<script>
	import { MapPin, Clock } from 'lucide-svelte';
	import { page } from '$app/state';

	let searchQuery = '';
	let items = [
		{ id: 1, name: 'Car Keys', location: 'Kitchen counter', updatedAt: '2 hours ago' },
		{ id: 2, name: 'Wallet', location: 'Bedroom dresser', updatedAt: '5 hours ago' },
		{ id: 3, name: 'Headphones', location: 'Living room couch', updatedAt: '1 day ago' }
	];

	$: filteredItems = items.filter(
		(item) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.location.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<section class="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-5 sm:py-6 flex flex-col gap-4">
	<span class="text-3xl"
		>{page.data.user}, incase you forgot here is the list of items you often leave behind</span
	>
	<!-- Main Content -->
	<main>
		<!-- Items List -->
		<div class="space-y-3">
			<h2 class="text-sm text-dark/50 font-light mb-6">
				{filteredItems.length}
				{filteredItems.length === 1 ? 'item' : 'items'}
			</h2>

			{#if filteredItems.length === 0}
				<div class="py-20 text-center">
					<p class="text-sm text-dark/40 font-light">No items found</p>
				</div>
			{:else}
				{#each filteredItems as item (item.id)}
					<div
						class="border border-dark/10 p-5 hover:border-dark/20 transition-all duration-300 group cursor-pointer"
					>
						<div class="flex items-start justify-between gap-4">
							<div class="flex-1 min-w-0">
								<h3 class="text-base font-medium mb-2">{item.name}</h3>
								<div class="flex items-center gap-2 text-sm text-dark/50 font-light">
									<MapPin size={14} strokeWidth={1.5} class="flex-shrink-0" />
									<span class="truncate">{item.location}</span>
								</div>
							</div>
							<div class="flex items-center gap-1.5 text-xs text-dark/40 font-light flex-shrink-0">
								<Clock size={12} strokeWidth={1.5} />
								<span>{item.updatedAt}</span>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</main>
</section>
