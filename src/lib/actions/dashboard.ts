import { supabase } from '$lib/supabaseClient';
import { toast } from 'svelte-sonner';
export interface ItemInterface {
	id: number;
	name: string;
	location: string;
	updatedAt: string;
	status: 'unnoticed' | 'remembered' | 'find';
	user_id: string;
}

export const addItem = async ({ name, location, user_id }: ItemInterface) => {
	// validate data
	if (!name || !location) {
		toast.error('Please fill in all the fields', { duration: 1200 });
		return;
	}
	const status = 'unnoticed';
	// insert data into supabase
	const { error } = await supabase.from('items').insert({ name, location, status, user_id });
	if (error) {
		toast.error(error.message);
	}
	toast.success(`${name} added successfully`, { duration: 1200 });
	return;
};

export const deleteItem = async ({ id, name, user_id }: ItemInterface) => {
	// delete data from supabase
	const { error } = await supabase.from('items').delete().eq('id', id).eq('user_id', user_id);
	if (error) {
		toast.error(error.message);
	}
	toast.success(`${name} deleted successfully`, { duration: 1200 });
	return;
};

export const updateItemStatus = async ({ id, status, user_id }: ItemInterface) => {
	// update data from supabase
	const { error } = await supabase
		.from('items')
		.update({ status })
		.eq('id', id)
		.eq('user_id', user_id);
	if (error) {
		toast.error(error.message);
		return;
	}
};
