import type { PageLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import { toast } from 'svelte-sonner';
import { redirect } from '@sveltejs/kit';
// TODO: add auth guard to this page
export const load: PageLoad = async () => {
	// if the usser is logged in, redirect to the dashboard
	const {
		data: { session }
	} = await supabase.auth.getSession();

	console.log(session);

	if (session) {
		toast.success('You are already logged in, Redirecting...', { duration: 1200 });
		throw redirect(302, '/dashboard');
	}
	return;
};
