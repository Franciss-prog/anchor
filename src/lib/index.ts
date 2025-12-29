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
export { default as Link } from '$lib/components/root/Link.svelte';
export { default as Input } from '$lib/components/root/Input.svelte';
export { default as Button } from '$lib/components/root/Button.svelte';

// STORES
export const items = writable<ItemInterface[]>([]);
export const itemHistory = writable<HistoryInterface[]>([]);
export const loading = writable(false);

// DATA
export { statusConfig };

// TYPES
export interface HistoryInterface extends Pick<
	ItemInterface,
	'location' | 'status' | 'created_at'
> {
	item_name: string;
}

// UTILS
export const isDarkMode = () => {
	return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
};
export const lowercaseEmail = (email: string) => email.toLowerCase();
