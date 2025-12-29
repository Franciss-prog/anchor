<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { toast } from 'svelte-sonner';
	import { loading, Input, Button } from '$lib';
	// form fields
	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	const onRegister = async () => {
		// add loading state
		loading.set(true);

		// form validation
		if (!name || !email || !password || !confirmPassword) {
			toast.error('All fields are required', { duration: 1200 });
			setTimeout(() => loading.set(false), 1200);
			return;
		}

		// check if the password and confirm password match
		if (password !== confirmPassword) {
			toast.error('Passwords do not match', { duration: 1200 });
			// clear the confirm password field
			confirmPassword = '';
			loading.set(false);
			return;
		}

		const { error } = await supabase.auth.signUp({
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
			setTimeout(() => loading.set(false), 1200);
			return;
		}

		// return success message
		toast.success('Account created successfully', { duration: 1200 });
		loading.set(false);
		// go to dashboard page
		setTimeout(() => goto('/dashboard'), 1201);
	};
</script>

<form class="flex h-full flex-col justify-between" on:submit={onRegister}>
	<div class="space-y-4">
		<Input placeholder="Username" bind:value={name} type="text" />
		<Input placeholder="Email" bind:value={email} type="text" />
		<Input placeholder="Password" bind:value={password} type="password" />
		<span>Already have an account? <a href="/login" class="underline">Login Here</a></span>
	</div>
	<div class="flex items-center justify-between">
		<Button>Register</Button>
		<div>
			<a class="text-6xl" href="/">Anchor</a>
		</div>
	</div>
</form>
