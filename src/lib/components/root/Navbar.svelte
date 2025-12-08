<script>
	import { ArrowRight } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	// SvelteKit store auto-reacts with $page
	$: route = $page.url.pathname;
	let loading = false;
	// reactive checks
	$: isLoginRoute = route.includes('/login');
	$: isRegisterRoute = route.includes('/register');
	$: isDashboardRoute = route.includes('/dashboard');

	// function to logout
	const onLogout = async () => {
		loading = true;
		try {
			await supabase.auth.signOut();
			toast.success('Logout successful', { duration: 1200 });
			setTimeout(() => goto('/'), 1201);
		} catch (error) {
			toast.error('Logout failed', { duration: 1200 });
			return;
		} finally {
			loading = false;
		}
	};
</script>

<header class="border-b border-dark/10">
	<nav
		class="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-5 sm:py-6 flex justify-between items-center"
	>
		<div class="text-base sm:text-lg font-medium tracking-tight">Anchor</div>

		{#if isLoginRoute}
			<a
				href="/register"
				class="flex items-center gap-2 text-sm hover:opacity-90 transition-all duration-300"
			>
				Register
				<ArrowRight size={14} class="transition-transform duration-300 group-hover:translate-x-1" />
			</a>
		{:else if isRegisterRoute}
			<a
				href="/login"
				class="text-xs sm:text-sm hover:opacity-90 transition-opacity duration-300 flex items-center gap-1"
			>
				Login
				<ArrowRight size={14} class="transition-transform duration-300 group-hover:translate-x-1" />
			</a>
		{:else if isDashboardRoute}
			<button
				on:click={onLogout}
				class="text-xs sm:text-sm hover:opacity-90 transition-opacity duration-300 flex items-center gap-1"
			>
				{loading ? 'Logging out...' : 'Logout'}
				<ArrowRight size={14} class="transition-transform duration-300 group-hover:translate-x-1" />
			</button>
		{:else}
			<a
				href="/login"
				class="text-xs sm:text-sm hover:opacity-90 transition-opacity duration-300 flex items-center gap-1"
			>
				Get Started
				<ArrowRight size={14} class="transition-transform duration-300 group-hover:translate-x-1" />
			</a>
		{/if}
	</nav>
</header>
