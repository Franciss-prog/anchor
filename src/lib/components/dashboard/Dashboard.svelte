<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import { MapPin, Clock, Eye, Brain, MapPinned, Trash, ChevronDown } from 'lucide-svelte';
	import Modal from './Modal.svelte';
	import { page } from '$app/state';
	import { readableTimeFrame } from '$lib/actions/time';
	import { updateItemStatus } from '$lib/actions/dashboard';
	import { toast } from 'svelte-sonner';
	const items = page.data.items ?? [];
	const length = items.length;
	const statusConfig: Record<
		string,
		{ label: string; icon: typeof Icon; color: string; next: string }
	> = {
		unnoticed: {
			label: 'Unnoticed',
			icon: Eye,
			color: 'text-dark/40 border-dark/10 hover:border-dark/20',
			next: 'remembered'
		},
		remembered: {
			label: 'Remembered',
			icon: Brain,
			color: 'text-blue-600 border-blue-200 hover:border-blue-300 bg-blue-50',
			next: 'find'
		},
		find: {
			label: 'Find!',
			icon: MapPinned,
			color: 'text-green-600 border-green-200 hover:border-green-300 bg-green-50',
			next: 'unnoticed'
		}
	};
	// states
	let showModal = false;
	let newName = '';
	let newLocation = '';
	let openDropdownId: string | null = null;
	let loading = false;

	// events
	const toggleDropdown = (itemId: string) => {
		openDropdownId = openDropdownId === itemId ? null : itemId;
	};

	const handleStatusChange = async (itemId: number, newStatus: string, user_id: string) => {
		// find the item
		const foundItem = items.find((item: number) => item.id === itemId);
		// check if the new and prev is same just throw return
		if (!foundItem || foundItem.status === newStatus) return;

		// perform the update to ui
		const prevStatus = foundItem.status;

		// optimistic update
		foundItem.status = newStatus;
		openDropdownId = null;

		// perform the logic
		try {
			await updateItemStatus(itemId, newStatus, user_id);
		} catch (error) {
			// falback for optimistic update
			foundItem.status = prevStatus;
			// throw error
			toast.error('Something went wrong', { duration: 1200 });
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (!target.closest('.dropdown-container')) {
			openDropdownId = null;
		}
	};
	const handleItemDelete = (itemId: string, user_id: string) => {
		// Handle item deletion here
		// You'll need to implement the actual deletion logic here
	};
</script>

<svelte:window on:click={handleClickOutside} />

<section class="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-5 sm:py-6 flex flex-col gap-4">
	<span class="text-3xl">
		{page.data.user}, incase you forgot here is the list of items you often leave behind
	</span>
	<main class="flex flex-col gap-6">
		<div class="text-sm text-dark/50 font-light mb-4">
			<span>{length}</span>
			<span>{length === 1 ? 'item' : 'items'}</span>
		</div>
		<div class="space-y-3">
			{#each items as item (item.id)}
				<div
					class="border border-dark/10 p-5 hover:border-dark/20 transition-all duration-300 group"
				>
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1 min-w-0">
							<h3 class="text-base font-medium mb-2">{item.name}</h3>
							<div class="flex items-center gap-2 text-sm text-dark/50 font-light">
								<MapPin size={14} strokeWidth={1.5} class="flex-shrink-0" />
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
									class="px-3 py-1.5 border text-xs font-light transition-all duration-300 flex items-center gap-1.5 {statusConfig[
										item.status
									].color}"
								>
									<svelte:component
										this={statusConfig[item.status].icon}
										size={14}
										strokeWidth={1.5}
									/>
									<span>{statusConfig[item.status].label}</span>
									<ChevronDown size={12} strokeWidth={1.5} class="ml-0.5" />
								</button>
								{#if openDropdownId === item.id}
									<div
										class="absolute right-0 top-full mt-1 border border-dark/10 bg-white shadow-sm z-10 min-w-[140px]"
									>
										{#each Object.entries(statusConfig) as [value, config]}
											<button
												on:click|stopPropagation={() => handleStatusChange(item.id, value)}
												class="w-full px-3 py-2 text-xs font-light text-left hover:bg-dark/5 transition-colors duration-200 flex items-center gap-2 {value ===
												item.status
													? 'bg-dark/5'
													: ''}"
											>
												<svelte:component this={config.icon} size={14} strokeWidth={1.5} />
												<span>{config.label}</span>
											</button>
										{/each}
									</div>
								{/if}
							</div>
							{#if item.status === 'find'}
								<button
									class="px-3 py-1.5 border text-xs font-light transition-all duration-300 flex items-center gap-1.5 text-red-600 border-red-200 hover:border-red-300 bg-red-50"
								>
									<Trash size={14} strokeWidth={1.5} />
									<span>Remove</span>
								</button>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
		<Modal bind:showModal bind:newName bind:newLocation />
		<button
			on:click={() => (showModal = true)}
			class="fixed bottom-8 right-8 px-5 py-2.5 border border-dark/10 text-sm font-light hover:border-dark/20 transition-all duration-300 bg-white shadow-sm"
		>
			Add item
		</button>
	</main>
</section>
