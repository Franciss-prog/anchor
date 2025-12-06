<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { ArrowRight, Mail, Lock, User } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	// form fields
	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	// ui states
	let isVisible = false;
	let loading = false;

	onMount(() => {
		setTimeout(() => (isVisible = true), 100);
	});

	const onRegister = async () => {
		// add loading state
		loading = true;
		// form validation
		if (!name || !email || !password || !confirmPassword) {
			toast.error('All fields are required', { duration: 1200 });
			return;
		}

		// check if the password and confirm password match
		if (password !== confirmPassword) {
			toast.error('Passwords do not match', { duration: 1200 });
			// clrear the confirm password field
			confirmPassword = '';
			return;
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name
				}
			}
		});

		// error handling
		if (error) {
			toast.error(error.message, { duration: 1200 });
			return;
		}
		// return success message
		toast.success('Account created successfully', { duration: 1200 });
		loading = false;
		// go to dashboard page
		setTimeout(() => goto('/dashboard'), 1201);
	};
</script>

<div class="min-h-screen bg-light text-dark flex items-center justify-center px-6 sm:px-8 py-12">
	<div class="w-full max-w-md fade-in" class:visible={isVisible}>
		<!-- Logo/Brand -->
		<div class="text-center mb-12">
			<h1 class="text-2xl font-medium tracking-tight mb-2">Anchor</h1>
			<p class="text-sm text-dark/50 font-light">Create your account</p>
		</div>

		<!-- Register Form -->
		<form on:submit|preventDefault={onRegister} class="space-y-5">
			<div>
				<label for="name" class="block text-sm font-light mb-2 text-dark/60"> Full name </label>
				<div class="relative">
					<div class="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40">
						<User size={18} strokeWidth={1.5} />
					</div>
					<input
						id="name"
						type="text"
						bind:value={name}
						required
						class="w-full pl-10 pr-4 py-3 bg-transparent border border-dark/20 text-sm focus:outline-none focus:border-dark/40 transition-all duration-300 placeholder:text-dark/30"
						placeholder="John Doe"
					/>
				</div>
			</div>

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

			<div>
				<label for="confirm-password" class="block text-sm font-light mb-2 text-dark/60">
					Confirm password
				</label>
				<div class="relative">
					<div class="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40">
						<Lock size={18} strokeWidth={1.5} />
					</div>
					<input
						id="confirm-password"
						type="password"
						bind:value={confirmPassword}
						required
						class="w-full pl-10 pr-4 py-3 bg-transparent border border-dark/20 text-sm focus:outline-none focus:border-dark/40 transition-all duration-300 placeholder:text-dark/30"
						placeholder="••••••••"
					/>
				</div>
			</div>

			<div class="text-sm">
				<label class="flex items-start gap-2 cursor-pointer group">
					<input
						type="checkbox"
						required
						class="w-4 h-4 mt-0.5 border border-dark/20 bg-transparent focus:outline-none focus:border-dark/40 transition-all duration-300 checked:bg-dark"
					/>
					<span class="font-light text-dark/60 leading-relaxed">
						I agree to the
						<a href="/terms" class="text-dark hover:opacity-60 transition-opacity duration-300"
							>Terms of Service</a
						>
						and
						<a href="/privacy" class="text-dark hover:opacity-60 transition-opacity duration-300"
							>Privacy Policy</a
						>
					</span>
				</label>
			</div>
			<button
				type="submit"
				class="w-full px-4 py-3 bg-dark text-light text-sm font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group mt-6"
				disabled={loading}
			>
				{#if loading}
					<div class="loader"></div>
				{:else}
					Create account
					<ArrowRight
						size={16}
						class="transition-transform duration-300 group-hover:translate-x-1"
					/>
				{/if}
			</button>
		</form>

		<!-- Sign in link -->
		<p class="text-center text-sm text-dark/60 font-light mt-8">
			Already have an account?
			<a
				href="/login"
				class="text-dark hover:opacity-60 transition-opacity duration-300 font-medium"
			>
				Sign in
			</a>
		</p>
	</div>
</div>
