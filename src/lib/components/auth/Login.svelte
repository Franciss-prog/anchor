<!-- Login.svelte -->
<script>
	import { ArrowRight, Mail, Lock } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	let email = '';
	let password = '';
	let isVisible = false;
	let loading = false;
	onMount(() => {
		setTimeout(() => (isVisible = true), 100);
	});

	const onLogin = async () => {
		loading = true;
		// form validation
		if (!email || !password) {
			toast.error('Email and password are required', { duration: 1200 });
			return;
		}
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			toast.error(error.message, { duration: 1200 });
			loading = false;
			return;
		}
		toast.success('Login successful', { duration: 1200 });
		loading = false;
		setTimeout(() => goto('/dashboard'), 1201);
	};
</script>

<div class="min-h-screen bg-light text-dark flex items-center justify-center px-6 sm:px-8">
	<div class="w-full max-w-md fade-in" class:visible={isVisible}>
		<!-- Logo/Brand -->
		<div class="text-center mb-12">
			<h1 class="text-2xl font-medium tracking-tight mb-2">Anchor</h1>
			<p class="text-sm text-dark/50 font-light">Welcome back</p>
		</div>

		<!-- Login Form -->
		<form on:submit|preventDefault={onLogin} class="space-y-5">
			<div>
				<label for="email" class="block text-sm font-light mb-2 text-dark/60">
					Email address
				</label>
				<div class="relative">
					<div class="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40">
						<Mail size={18} strokeWidth={1.5} />
					</div>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						class="w-full pl-10 pr-4 py-3 bg-transparent border border-dark/20 text-sm focus:outline-none focus:border-dark/40 transition-all duration-300 placeholder:text-dark/30"
						placeholder="you@example.com"
					/>
				</div>
			</div>

			<div>
				<label for="password" class="block text-sm font-light mb-2 text-dark/60"> Password </label>
				<div class="relative">
					<div class="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40">
						<Lock size={18} strokeWidth={1.5} />
					</div>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						class="w-full pl-10 pr-4 py-3 bg-transparent border border-dark/20 text-sm focus:outline-none focus:border-dark/40 transition-all duration-300 placeholder:text-dark/30"
						placeholder="••••••••"
					/>
				</div>
			</div>

			<div class="flex items-center justify-between text-sm">
				<label class="flex items-center gap-2 cursor-pointer group">
					<input
						type="checkbox"
						class="w-4 h-4 border border-dark/20 bg-transparent focus:outline-none focus:border-dark/40 transition-all duration-300 checked:bg-dark
"
					/>
					<span class="font-light text-dark/60 group-hover:text-dark transition-colors duration-300"
						>Remember me</span
					>
				</label>
				<a
					href="/forgot-password"
					class="font-light text-dark/60 hover:text-dark transition-colors duration-300"
				>
					Forgot password?
				</a>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="w-full px-4 py-3 bg-dark text-light text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
			>
				{#if loading}
					<div class="loader"></div>
					<span>Logging in account...</span>
				{:else}
					Login
					<ArrowRight
						size={16}
						class="transition-transform duration-300 group-hover:translate-x-1"
					/>
				{/if}
			</button>
		</form>

		<!-- Sign up link -->
		<p class="text-center text-sm text-dark/60 font-light mt-8">
			Don't have an account?
			<a
				href="/register"
				class="text-dark hover:opacity-60 transition-opacity duration-300 font-medium"
			>
				Sign up
			</a>
		</p>
	</div>
</div>
