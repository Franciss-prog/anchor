import { supabase } from '$lib/supabaseClient';
import { get } from 'svelte/store';
import { itemHistory } from '$lib';
import { toast } from 'svelte-sonner';

export const clearHistory = async () => {
	// optimistic ui

	// set the prev history in store
	const prevHistory = get(itemHistory);
	itemHistory.set([]);

	// delete the data from the database
	const { error } = await supabase.from('item_history').delete().neq('id', 0);

	// if there is an error, add the removed item back to the list
	if (error) {
		toast.error(error.message);
		// return the fallback store
		itemHistory.set(prevHistory);
		return;
	}
	toast.success('History cleared', { duration: 1200 });
};
