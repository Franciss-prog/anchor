<script>
	export let type = 'text';
	export let placeholder = '';
	export let value = '';
</script>

<input
	{type}
	{placeholder}
	bind:value
	class="w-full border bg-transparent outline-none focus:ring-0 focus:outline-none"
/>
