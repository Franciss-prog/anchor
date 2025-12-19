import { supabase } from './supabaseClient';
import { readableTimeFrame } from './actions/time';
import {
	addItem,
	deleteItem,
	updateStatus,
	type ItemStatus,
	type ItemInterface
} from './actions/dashboard';
import { celebrateIfFoundUnder60Min } from './actions/confetti';
import { clearHistory } from './actions/history';
import { statusConfig } from './data/status';
import { writable } from 'svelte/store';

// supabase functions
export const getUser = await supabase?.auth?.getUser();

// ACTIONS
export {
	readableTimeFrame,
	addItem,
	deleteItem,
	updateStatus,
	type ItemStatus,
	celebrateIfFoundUnder60Min,
	clearHistory
};

// COMPONENTS
export { default as Dashboard } from '$lib/components/dashboard/Dashboard.svelte';
export { default as Modal } from '$lib/components/dashboard/Modal.svelte';
export { default as History } from '$lib/components/dashboard/History.svelte';

// STORES
export const items = writable<ItemInterface[]>([]);
export const itemHistory = writable<HistoryInterface[]>([]);
// DATA
export { statusConfig };

// TYPES
export interface HistoryInterface extends Pick<
	ItemInterface,
	'location' | 'status' | 'created_at'
> {
	item_name: string;
}
