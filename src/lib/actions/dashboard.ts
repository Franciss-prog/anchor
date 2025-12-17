import { supabase } from '$lib/supabaseClient';
import { toast } from 'svelte-sonner';
import { items } from '$lib';
export interface ItemInterface {
	id: number;
	name: string;
	location: string;
	updated_at: string;
	newStatus: string;
	created_at: string;
	status: 'unnoticed' | 'remembered' | 'find';
}
export type ItemStatus = 'unnoticed' | 'remembered' | 'find'; // events

export const addItem = async ({ name, location }: Pick<ItemInterface, 'name' | 'location'>) => {
	// validate the inputs
	if (!name || !location) {
		toast.error('Please fill in all the fields', { duration: 1200 });
		return;
	}
	// structure the data before  optimistic update
	const optimisticItem: ItemInterface = {
		id: -Date.now(),
		name,
		location,
		updated_at: new Date().toISOString(),
		newStatus: 'unnoticed',
		created_at: new Date().toISOString(),
		status: 'unnoticed'
	};

	// add the item to the store
	items.update((list) => [...list, optimisticItem]);

	// insert the item to the database
	const { data, error } = await supabase.from('items').insert({ name, location }).select().single();

	// if there is an error, remove the item from the store
	if (error) {
		items.update((list) => list.filter((item) => item.id !== optimisticItem.id));
		toast.error(error.message);
		return;
	}
	// replace the temp with real row
	items.update((list) => list.map((item) => (item.id === optimisticItem.id ? data : item)));
};

export const updateStatus = async (itemId: number, newStatus: ItemStatus, userId: string) => {
	if (!userId) return;

	let prevItem: any;

	items.update((list) =>
		list.map((item) => {
			if (item.id !== itemId) return item;
			if (item.status === newStatus) return item;
			prevItem = item;
			return { ...item, status: newStatus };
		})
	);

	const { error } = await supabase.from('items').update({ status: newStatus }).eq('id', itemId);

	if (error && prevItem) {
		items.update((list) => list.map((i) => (i.id === itemId ? prevItem : i)));
		toast.error(error.message);
		return;
	}
};

export const deleteItem = async (itemId: number, userId: string) => {
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
