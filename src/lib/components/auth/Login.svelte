<!-- Login.svelte -->
<script>
	import { toast } from 'svelte-sonner';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { Input, Button, lowercaseEmail } from '$lib';
	import { loading } from '$lib';

	let email = '';
	let password = '';

	const onLogin = async () => {
		// set loading state
		loading.set(true);

		// trim to lowercase the email
		email = lowercaseEmail(email);
		// form validation
		if (!email || !password) {
			toast.error('Email and password are required', { duration: 1200 });
			// wait for 1.2 seconds before setting loading state to false
			setTimeout(() => loading.set(false), 1200);
			return;
		}
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			toast.error(error.message, { duration: 1200 });
			setTimeout(() => loading.set(false), 1200);
			return;
		}
		toast.success('Login successful', { duration: 1200 });
		loading.set(false);
		setTimeout(() => goto('/dashboard'), 1201);
	};
</script>

<form class="flex h-full flex-col justify-between" on:submit={onLogin}>
	<div class="space-y-4">
		<Input placeholder="Email" bind:value={email} type="email" />
		<Input placeholder="Password" bind:value={password} type="password" />
		<span>Doesn't have an account? <a href="/register" class="underline">Register Here</a></span>
	</div>
	<div class="flex items-center justify-between">
		<Button>Login</Button>
		<div>
			<a class="text-6xl" href="/">Anchor</a>
		</div>
	</div>
</form>
