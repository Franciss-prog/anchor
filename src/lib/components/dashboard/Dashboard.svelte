<script lang="ts">
	// imported actions and components
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { Clock, ChevronDown, Trash2, MapPin, Plus, Archive } from 'lucide-svelte';
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

<section class="min-h-screen w-full">
	<div class="max-w-4xl mx-auto px-6 py-8">
		<!-- Header -->
		<header class="mb-12">
			<div class="flex items-end justify-between mb-2">
				<h1 class="text-[32px] tracking-tight">
					{user}
				</h1>
				<a
					href="/dashboard/history"
					class="flex items-center gap-2 px-3 py-1.5 text-xs font-light opacity-60 hover:opacity-100 transition-opacity border border-current/10"
				>
					<Archive size={14} strokeWidth={1.5} />
					<span>HISTORY</span>
				</a>
			</div>
			<div class="h-px w-full bg-current opacity-10"></div>
			<div class="flex items-center justify-between mt-3">
				<p class="text-xs font-light opacity-50 tracking-wider uppercase">
					{$items.length}
					{$items.length === 1 ? 'Item' : 'Items'}
				</p>
			</div>
		</header>

		<!-- Items Grid -->
		<div class="space-y-2">
			{#each $items as item (item.id)}
				<article
					class="group relative bg-transparent border border-current/10 hover:border-current/30 transition-all"
				>
					<div class="p-4">
						<!-- Mobile Layout -->
						<div class="flex flex-col gap-3 sm:hidden">
							<div>
								<h3 class="text-sm font-medium mb-1.5 tracking-tight">
									{item.name}
								</h3>
								<div class="flex items-center gap-1.5 text-[10px] opacity-40">
									<MapPin size={10} strokeWidth={1.5} />
									<span class="font-light uppercase tracking-wider">{item.location}</span>
								</div>
							</div>

							<div class="flex items-center justify-between pt-2 border-t border-current/5">
								<div class="flex items-center gap-1.5 text-[10px] opacity-30">
									<Clock size={10} strokeWidth={1.5} />
									<span class="font-light uppercase tracking-wider"
										>{readableTimeFrame(item.created_at ?? '')}</span
									>
								</div>

								<div class="flex items-center gap-2">
									<div class="relative dropdown-container">
										<button
											on:click|stopPropagation={() => toggleDropdown(item.id)}
											class="px-3 py-1.5 text-[10px] font-light flex items-center gap-1.5 border border-current/30 hover:border-current hover:bg-current/5 transition-all uppercase tracking-wider"
										>
											<svelte:component
												this={statusConfig[item.status].icon}
												size={10}
												strokeWidth={1.5}
											/>
											<span>{statusConfig[item.status].label}</span>
											<ChevronDown size={8} strokeWidth={1.5} />
										</button>
										{#if openDropdownId === item.id}
											<div
												class="absolute right-0 top-full mt-1 bg-light dark:bg-dark border border-current/30 shadow-lg z-10 min-w-[120px]"
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
														class="w-full px-3 py-2 text-[10px] text-left flex items-center gap-2 hover:bg-current/10 transition-colors uppercase tracking-wider border-b border-current/5 last:border-b-0 {status ===
														item.status
															? 'bg-current/10'
															: ''}"
													>
														<svelte:component
															this={statusConfig[status].icon}
															size={10}
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
											class="p-1.5 border border-current/30 hover:border-red-500 hover:bg-red-500/10 transition-all"
										>
											<Trash2 size={10} strokeWidth={1.5} />
										</button>
									{/if}
								</div>
							</div>
						</div>

						<!-- Desktop Layout -->
						<div class="hidden sm:flex items-center justify-between gap-6">
							<div class="flex-1 min-w-0">
								<h3 class="text-base font-medium mb-2 tracking-tight">
									{item.name}
								</h3>
								<div class="flex items-center gap-4 text-[11px] opacity-40">
									<div class="flex items-center gap-1.5">
										<MapPin size={11} strokeWidth={1.5} />
										<span class="font-light uppercase tracking-wider">{item.location}</span>
									</div>
									<div class="flex items-center gap-1.5 opacity-75">
										<Clock size={11} strokeWidth={1.5} />
										<span class="font-light uppercase tracking-wider"
											>{readableTimeFrame(item.created_at ?? '')}</span
										>
									</div>
								</div>
							</div>

							<div class="flex items-center gap-2 flex-shrink-0">
								<div class="relative dropdown-container">
									<button
										on:click|stopPropagation={() => toggleDropdown(item.id)}
										class="px-3 py-1.5 text-[11px] font-light flex items-center gap-2 border border-current/30 hover:border-current hover:bg-current/5 transition-all uppercase tracking-wider"
									>
										<svelte:component
											this={statusConfig[item.status].icon}
											size={11}
											strokeWidth={1.5}
										/>
										<span>{statusConfig[item.status].label}</span>
										<ChevronDown size={9} strokeWidth={1.5} />
									</button>
									{#if openDropdownId === item.id}
										<div
											class="absolute right-0 top-full mt-1 bg-light dark:bg-dark border border-current/30 shadow-lg z-10 min-w-[130px]"
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
													class="w-full px-3 py-2.5 text-[11px] text-left flex items-center gap-2 hover:bg-current/10 transition-colors uppercase tracking-wider border-b border-current/5 last:border-b-0 {status ===
													item.status
														? 'bg-current/10'
														: ''}"
												>
													<svelte:component
														this={statusConfig[status].icon}
														size={11}
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
										class="px-3 py-1.5 text-[11px] flex items-center gap-1.5 border border-current/30 hover:border-red-500 hover:bg-red-500/10 transition-all uppercase tracking-wider"
									>
										<Trash2 size={11} strokeWidth={1.5} />
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
			class="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50
	       flex h-14 w-14 items-center justify-center
	       border border-current/30
	       transition-all hover:border-current hover:bg-current/5"
		>
			<Plus size={20} strokeWidth={1.5} />
		</button>
	</div>
</section>
