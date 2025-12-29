<script lang="ts">
	import './layout.css';
	import logo from '$lib/assets/logo.jpg';
	import { Toaster } from 'svelte-sonner';
	import { isDarkMode } from '$lib';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://db.onlinewebfonts.com/c/d7a74ed36ff0603a3e41b6da32c47f03?family=Ndot+57+Aligned"
		rel="stylesheet"
	/>
</svelte:head>

{#if isDarkMode()}
	<Toaster theme="dark" toastOptions={{ style: 'background-color: var(--color-subDark);' }} />
{:else}
	<Toaster theme="light" toastOptions={{ style: 'background-color: var(--color-subLight);' }} />
{/if}
<main class="h-screen">
	<section class="h-full w-full p-6">
		{@render children()}
	</section>
</main>
