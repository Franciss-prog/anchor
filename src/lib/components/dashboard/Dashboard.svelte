<script lang="ts">
	import Modal from './Modal.svelte';
	import { page } from '$app/state';
	import { readableTimeFrame } from '$lib/actions/time';
	import { toast } from 'svelte-sonner';
	import { supabase } from '$lib/supabaseClient';
	import { statusConfig } from '$lib/data/status';
	import { Clock, ChevronDown, Trash, MapPin } from 'lucide-svelte';
	import { items } from '$lib/stores/item';
	import { onMount } from 'svelte';
	import { addItem, updateStatus, type ItemStatus } from '$lib/actions/dashboard';

	// store data once
	onMount(() => {
		items.set(page.data.items);
	});
	// get the user
	const user = page.data.user ?? '';

	// states
	let showModal = false;
	let newName = '';
	let newLocation = '';
	let openDropdownId: number | null = null;

	// function to toggle dropdown
	const toggleDropdown = (itemId: number) => {
		openDropdownId = openDropdownId === itemId ? null : itemId;
	};

	// function to handle click outside
	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (!target.closest('.dropdown-container')) {
			openDropdownId = null;
		}
	};

	const handleItemDelete = async (itemId: number, userId: string) => {
		if (!userId) return;

		// specify what item to removed
		let removed: any;

		items.update((list) => {
			// update the removed variable to specify what to remove
			removed = list.find((item) => item.id === itemId);
			// remove the item
			return list.filter((item) => item.id !== itemId);
		});

		// perform the deletion on backend...
		const { error } = await supabase.from('items').delete().eq('id', itemId);

		// if there is an error, add the removed item back to the list
		if (error && removed) {
			items.update((list) => [...list, removed]);
			toast.error(error.message);
			return;
		}
	};
</script>

<svelte:window on:click={handleClickOutside} />

<section class="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-5 sm:py-6 flex flex-col gap-4">
	<span class="text-3xl">
		{user}, incase you forgot here is the list of items you often leave behind
	</span>

	<main class="flex flex-col gap-6">
		<div class="text-sm text-dark/50 font-light mb-4">
			<span>{$items.length}</span>
			<span>{$items.length === 1 ? 'item' : 'items'}</span>
		</div>

		<div class="space-y-3">
			{#each $items as item (item.id)}
				<div
					class="border border-dark/10 p-5 hover:border-dark/20 transition-all duration-300 group"
				>
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1 min-w-0">
							<h3 class="text-base font-medium mb-2">{item.name}</h3>
							<div class="flex items-center gap-2 text-sm text-dark/50 font-light">
								<MapPin size={14} strokeWidth={1.5} />
								<span class="truncate">{item.location}</span>
							</div>
						</div>

						<div class="flex items-center gap-3 flex-shrink-0">
							<div class="flex items-center gap-1.5 text-xs text-dark/40 font-light">
								<Clock size={12} strokeWidth={1.5} />
								<span>{readableTimeFrame(item.created_at ?? '')}</span>
							</div>

							<div class="relative dropdown-container">
								<button
									on:click|stopPropagation={() => toggleDropdown(item.id)}
									class="px-3 py-1.5 border text-xs font-light flex items-center gap-1.5 {statusConfig[
										item.status
									].color}"
								>
									<svelte:component this={statusConfig[item.status].icon} size={14} />
									<span>{statusConfig[item.status].label}</span>
									<ChevronDown size={12} />
								</button>

								{#if openDropdownId === item.id}
									<div
										class="absolute right-0 top-full mt-1 border border-dark/10 bg-white shadow-sm z-10 min-w-[140px]"
									>
										{#each Object.keys(statusConfig) as key}
											{@const status = key as ItemStatus}
											<button
												on:click|stopPropagation={() => {
													updateStatus(item.id, status, user);
													openDropdownId = null;
												}}
												class="w-full px-3 py-2 text-xs text-left flex items-center gap-2 hover:bg-dark/5 {status ===
												item.status
													? 'bg-dark/5'
													: ''}"
											>
												<svelte:component this={statusConfig[status].icon} size={14} />
												<span>{statusConfig[status].label}</span>
											</button>
										{/each}
									</div>
								{/if}
							</div>

							{#if item.status === 'find'}
								<button
									on:click|stopPropagation={() => handleItemDelete(item.id, user)}
									class="px-3 py-1.5 border text-xs flex items-center gap-1.5 text-red-600 border-red-200 bg-red-50"
								>
									<Trash size={14} />
									<span>Remove</span>
								</button>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<Modal
			bind:showModal
			bind:newName
			bind:newLocation
			addItem={() => {
				addItem({ name: newName, location: newLocation });
				showModal = false;
			}}
		/>

		<button
			on:click={() => (showModal = true)}
			class="fixed bottom-8 right-8 px-5 py-2.5 border border-dark/10 bg-white shadow-sm"
		>
			Add item
		</button>
	</main>
</section>
