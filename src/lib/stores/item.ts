import { writable } from 'svelte/store';
import type { ItemInterface } from '$lib/actions/dashboard';
export const items = writable<ItemInterface[]>([]);
