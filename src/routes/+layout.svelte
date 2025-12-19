<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/root/Navbar.svelte';
	import Footer from '$lib/components/root/Footer.svelte';
	import { Toaster } from 'svelte-sonner';
	import { page } from '$app/state';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="min-h-screen bg-light text-dark w-screen">
	<Toaster richColors />
	<Navbar />
	{@render children()}
	{#if page.url.pathname !== '/dashboard'}
		<Footer />
	{/if}
</main>
