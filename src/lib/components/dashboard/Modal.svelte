<script>
	export let showModal = false;
	export let addItem = () => {};
	export let newLocation = '';
	export let newName = '';
	export let isAddingItem = false;
</script>

{#if showModal}
	<div
		class="fixed inset-0 bg-dark/60 dark:bg-light/10 flex items-center justify-center backdrop-blur-sm z-50"
	>
		<div class="bg-subLight dark:bg-subDark border border-current/20 w-full max-w-md mx-4">
			<div class="p-6">
				<h2 class="text-sm font-medium mb-6 uppercase tracking-wider">Add Item</h2>
				<div class="space-y-3 mb-6">
					<input
						class="border border-current/20 w-full p-3 text-sm font-light focus:outline-none focus:border-current transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-transparent placeholder:opacity-40"
						placeholder="ITEM NAME"
						bind:value={newName}
						disabled={isAddingItem}
					/>
					<input
						class="border border-current/20 w-full p-3 text-sm font-light focus:outline-none focus:border-current transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-transparent placeholder:opacity-40"
						placeholder="LOCATION"
						bind:value={newLocation}
						disabled={isAddingItem}
					/>
				</div>
				<div class="flex justify-end gap-3 pt-4 border-t border-current/10">
					<button
						class="px-4 py-2 text-[11px] opacity-50 font-light hover:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
						on:click={() => (showModal = false)}
						disabled={isAddingItem}
					>
						Cancel
					</button>
					<button
						class="px-4 py-2 border border-current/20 text-[11px] font-light hover:border-current hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 uppercase tracking-wider"
						on:click={addItem}
						disabled={isAddingItem}
					>
						{#if isAddingItem}
							<span
								class="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"
							></span>
						{/if}
						<span>Add</span>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
