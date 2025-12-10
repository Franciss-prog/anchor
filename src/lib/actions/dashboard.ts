import { supabase } from '$lib/supabaseClient';
import { toast } from 'svelte-sonner';
export interface ItemInterface {
	id?: number;
	name: string;
	location: string;
	updatedAt: string;
	status: 'unnoticed' | 'remembered' | 'find';
}

export const addItem = async ({ name, location, status }: ItemInterface) => {
	// insert data into supabase
	const { error } = await supabase.from('items').insert({ name, location, status });
	if (error) {
		toast.error(error.message);
	}
	toast.success(`${name} added successfully`, { duration: 1200 });
	return;
};

export const deleteItem = async ({ id, name }: ItemInterface) => {
	// delete data from supabase
	const { error } = await supabase.from('items').delete().eq('id', id);
	if (error) {
		toast.error(error.message);
	}
	toast.success(`${name} deleted successfully`, { duration: 1200 });
	return;
};
