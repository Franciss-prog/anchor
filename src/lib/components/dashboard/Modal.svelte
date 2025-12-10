<script>
	export let showModal = false;
	export let addItem = () => {};
	export let newLocation = '';
	export let newName = '';
</script>

{#if showModal}
	<div class="fixed inset-0 bg-dark/5 flex items-center justify-center backdrop-blur-sm">
		<div class="bg-white border border-dark/10 p-8 w-full max-w-md">
			<h2 class="text-base font-medium mb-6">Add Item</h2>
			<div class="space-y-4 mb-6">
				<input
					class="border border-dark/10 w-full p-3 text-sm font-light focus:outline-none focus:border-dark/20 transition-colors"
					placeholder="Item name"
					bind:value={newName}
				/>
				<input
					class="border border-dark/10 w-full p-3 text-sm font-light focus:outline-none focus:border-dark/20 transition-colors"
					placeholder="Location"
					bind:value={newLocation}
				/>
			</div>
			<div class="flex justify-end gap-3">
				<button
					class="text-sm text-dark/50 font-light hover:text-dark transition-colors"
					on:click={() => (showModal = false)}
				>
					Cancel
				</button>
				<button
					class="px-4 py-2 border border-dark/10 text-sm font-light hover:border-dark/20 transition-all duration-300"
					on:click={addItem}
				>
					Save
				</button>
			</div>
		</div>
	</div>
{/if}
