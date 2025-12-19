import type { PageLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import { toast } from 'svelte-sonner';
import { itemHistory } from '$lib';
export const load: PageLoad = async ({ parent }) => {
	const { data, error } = await supabase
		.from('item_history')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		toast.error(error.message);
		throw error.message;
	}

	// store the data in the store
	itemHistory.set(data);

	return {
		data: await parent()
	};
};
