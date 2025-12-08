import { supabase } from '$lib/supabaseClient';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	// get the email of the user
	const email = (await supabase.auth.getUser()).data.user?.email as string;

	// return the user
	return {
		user: email?.split('@')[0]
	};
};
