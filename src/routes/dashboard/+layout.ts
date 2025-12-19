import { supabase } from '$lib/supabaseClient';
import { toast } from 'svelte-sonner';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	// get the email of the use
	const email = (await supabase.auth.getUser()).data.user?.email as string;
	// if the user is logged in gte the data of items table
	if (!email) {
		toast.error('You are not logged in', { duration: 1200 });
		return;
	}
	// get the user id from the supabase database who is loggedIn
	const uid = (await supabase.auth.getUser()).data.user?.id;
	// return the user
	return {
		user: email?.split('@')[0],
		items: (await supabase.from('items').select('*').eq('user_id', uid)).data
	};
};
