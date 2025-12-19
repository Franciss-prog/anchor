<script lang="ts">
	// imported actions and components
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { Clock, ChevronDown, Trash, MapPin, Paperclip } from 'lucide-svelte';
	import { celebrateIfFoundUnder60Min, items } from '$lib';
	import {
		addItem,
		readableTimeFrame,
		updateStatus,
		deleteItem,
		type ItemStatus,
		Modal,
		statusConfig
	} from '$lib';

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
</script>

<svelte:window on:click={handleClickOutside} />

<section class="min-h-screen bg-light w-full">
	<div class="max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
		<!-- Header -->
		<header class="mb-12 sm:mb-16">
			<h1 class="text-2xl sm:text-3xl lg:text-4xl font-light text-dark mb-3 tracking-tight">
				{user}
			</h1>
			<p class="text-sm sm:text-base text-dark/60 font-light">Items you often leave behind</p>
		</header>

		<!-- Meta Info -->
		<div class="flex items-center justify-between mb-8 pb-6 border-b border-dark/10">
			<span class="text-xs sm:text-sm text-dark/50 font-light tracking-wide uppercase">
				{$items.length}
				{$items.length === 1 ? 'Item' : 'Items'}
			</span>
			<a
				href="/dashboard/history"
				class="flex items-center gap-1.5 text-xs sm:text-sm text-dark/60 hover:text-dark transition-colors"
			>
				<Paperclip size={14} strokeWidth={1.5} />
				<span class="font-light">History</span>
			</a>
		</div>

		<!-- Items List -->
		<div class="space-y-3 sm:space-y-4 mb-24">
			{#each $items as item (item.id)}
				<article
					class="bg-white border border-dark/5 hover:border-dark/15 transition-all duration-200"
				>
					<div class="p-4 sm:p-6">
						<!-- Mobile Layout -->
						<div class="flex flex-col gap-4 sm:hidden">
							<div class="flex items-start justify-between gap-3">
								<div class="flex-1 min-w-0">
									<h3 class="text-base font-normal text-dark mb-2 tracking-tight">
										{item.name}
									</h3>
									<div class="flex items-center gap-1.5 text-xs text-dark/50">
										<MapPin size={12} strokeWidth={1.5} />
										<span class="truncate font-light">{item.location}</span>
									</div>
								</div>
							</div>

							<div class="flex items-center justify-between gap-3 pt-2 border-t border-dark/5">
								<div class="flex items-center gap-1.5 text-xs text-dark/40">
									<Clock size={12} strokeWidth={1.5} />
									<span class="font-light">{readableTimeFrame(item.created_at ?? '')}</span>
								</div>

								<div class="flex items-center gap-2">
									<div class="relative dropdown-container">
										<button
											on:click|stopPropagation={() => toggleDropdown(item.id)}
											class="px-3 py-1.5 text-xs font-light flex items-center gap-1.5 bg-white border border-dark/10 hover:border-dark/20 transition-colors {statusConfig[
												item.status
											].color}"
										>
											<svelte:component
												this={statusConfig[item.status].icon}
												size={12}
												strokeWidth={1.5}
											/>
											<span>{statusConfig[item.status].label}</span>
											<ChevronDown size={10} strokeWidth={1.5} />
										</button>
										{#if openDropdownId === item.id}
											<div
												class="absolute right-0 top-full mt-1 bg-white border border-dark/10 shadow-lg z-10 min-w-[140px]"
											>
												{#each Object.keys(statusConfig) as key}
													{@const status = key as ItemStatus}
													<button
														on:click|stopPropagation={() => {
															updateStatus(item.id, status, user);
															if (status === 'find') {
																celebrateIfFoundUnder60Min(item);
															}
															openDropdownId = null;
														}}
														class="w-full px-4 py-2.5 text-xs text-left flex items-center gap-2 hover:bg-dark/5 transition-colors {status ===
														item.status
															? 'bg-dark/5'
															: ''}"
													>
														<svelte:component
															this={statusConfig[status].icon}
															size={12}
															strokeWidth={1.5}
														/>
														<span class="font-light">{statusConfig[status].label}</span>
													</button>
												{/each}
											</div>
										{/if}
									</div>

									{#if item.status === 'find'}
										<button
											on:click|stopPropagation={() => deleteItem(item.id, user)}
											class="px-3 py-1.5 text-xs flex items-center gap-1.5 bg-white border border-dark/10 hover:border-red-300 hover:bg-red-50 text-dark/60 hover:text-red-600 transition-all"
										>
											<Trash size={12} strokeWidth={1.5} />
										</button>
									{/if}
								</div>
							</div>
						</div>

						<!-- Desktop Layout -->
						<div class="hidden sm:flex items-start justify-between gap-8">
							<div class="flex-1 min-w-0">
								<h3 class="text-lg font-normal text-dark mb-3 tracking-tight">
									{item.name}
								</h3>
								<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-dark/50">
									<div class="flex items-center gap-1.5">
										<MapPin size={14} strokeWidth={1.5} />
										<span class="font-light">{item.location}</span>
									</div>
									<div class="flex items-center gap-1.5 text-dark/40">
										<Clock size={14} strokeWidth={1.5} />
										<span class="font-light">{readableTimeFrame(item.created_at ?? '')}</span>
									</div>
								</div>
							</div>

							<div class="flex items-center gap-3 flex-shrink-0">
								<div class="relative dropdown-container">
									<button
										on:click|stopPropagation={() => toggleDropdown(item.id)}
										class="px-4 py-2 text-sm font-light flex items-center gap-2 bg-white border border-dark/10 hover:border-dark/20 transition-colors {statusConfig[
											item.status
										].color}"
									>
										<svelte:component
											this={statusConfig[item.status].icon}
											size={14}
											strokeWidth={1.5}
										/>
										<span>{statusConfig[item.status].label}</span>
										<ChevronDown size={12} strokeWidth={1.5} />
									</button>
									{#if openDropdownId === item.id}
										<div
											class="absolute right-0 top-full mt-1 bg-white border border-dark/10 shadow-lg z-10 min-w-[150px]"
										>
											{#each Object.keys(statusConfig) as key}
												{@const status = key as ItemStatus}
												<button
													on:click|stopPropagation={() => {
														updateStatus(item.id, status, user);
														if (status === 'find') {
															celebrateIfFoundUnder60Min(item);
														}
														openDropdownId = null;
													}}
													class="w-full px-4 py-3 text-sm text-left flex items-center gap-2 hover:bg-dark/5 transition-colors {status ===
													item.status
														? 'bg-dark/5'
														: ''}"
												>
													<svelte:component
														this={statusConfig[status].icon}
														size={14}
														strokeWidth={1.5}
													/>
													<span class="font-light">{statusConfig[status].label}</span>
												</button>
											{/each}
										</div>
									{/if}
								</div>

								{#if item.status === 'find'}
									<button
										on:click|stopPropagation={() => deleteItem(item.id, user)}
										class="px-4 py-2 text-sm flex items-center gap-2 bg-white border border-dark/10 hover:border-red-300 hover:bg-red-50 text-dark/60 hover:text-red-600 transition-all"
									>
										<Trash size={14} strokeWidth={1.5} />
										<span class="font-light">Remove</span>
									</button>
								{/if}
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<!-- Modal -->
		<Modal
			bind:showModal
			bind:newName
			bind:newLocation
			addItem={() => {
				addItem({ name: newName, location: newLocation });
				newName = '';
				newLocation = '';
				showModal = false;
			}}
		/>

		<!-- Add Button -->
		<button
			on:click={() => (showModal = true)}
			class="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 px-5 sm:px-6 py-2.5 sm:py-3 bg-dark text-light text-xs sm:text-sm font-light tracking-wide uppercase hover:bg-dark/90 transition-all shadow-lg hover:shadow-xl"
		>
			Add Item
		</button>
	</div>
</section>
