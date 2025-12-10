<script>
	import { MapPin, Search, Smartphone, ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let email = '';
	let isVisible = false;

	onMount(() => {
		setTimeout(() => (isVisible = true), 100);
	});
</script>

<!-- Hero -->
<section
	class="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-28 md:pb-32"
>
	<h1
		class="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight mb-5 sm:mb-6 fade-in"
		class:visible={isVisible}
	>
		Remember where you left your things
	</h1>
	<p
		class="text-base sm:text-lg text-dark/50 max-w-xl mb-8 sm:mb-12 leading-relaxed font-light fade-in delay-1"
		class:visible={isVisible}
	>
		A simple app to track your belongings. No clutter, no complexity.
	</p>
</section>

<!-- Features -->
<section
	class="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-20 md:py-24 border-t border-dark/10"
>
	<div class="grid sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-14 md:gap-16">
		<div class="fade-in delay-1" class:visible={isVisible}>
			<div class="w-10 h-10 mb-5 text-dark/60 transition-colors duration-300 hover:text-dark">
				<MapPin size={24} strokeWidth={1.5} />
			</div>
			<h3 class="text-base font-medium mb-3">Track items</h3>
			<p class="text-sm text-dark/50 leading-relaxed font-light">
				Add items you want to remember. Update their location when you move them.
			</p>
		</div>

		<div class="fade-in delay-2" class:visible={isVisible}>
			<div class="w-10 h-10 mb-5 text-dark/60 transition-colors duration-300 hover:text-dark">
				<Search size={24} strokeWidth={1.5} />
			</div>
			<h3 class="text-base font-medium mb-3">Search instantly</h3>
			<p class="text-sm text-dark/50 leading-relaxed font-light">
				Find any item in seconds. See where you last placed it.
			</p>
		</div>

		<div class="fade-in delay-3" class:visible={isVisible}>
			<div class="w-10 h-10 mb-5 text-dark/60 transition-colors duration-300 hover:text-dark">
				<Smartphone size={24} strokeWidth={1.5} />
			</div>
			<h3 class="text-base font-medium mb-3">Works everywhere</h3>
			<p class="text-sm text-dark/50 leading-relaxed font-light">
				Built for mobile. Access from any device, anytime you need it.
			</p>
		</div>
	</div>
</section>

<!-- How it works -->
<section
	class="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-20 md:py-24 border-t border-dark/10"
>
	<h2 class="text-xl sm:text-2xl font-light mb-12 sm:mb-16">How it works</h2>

	<div class="grid sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
		<div class="group">
			<div class="flex items-start gap-4 mb-3">
				<div
					class="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center text-sm font-light flex-shrink-0 transition-colors duration-300 group-hover:border-dark/40"
				>
					1
				</div>
				<h3 class="text-base font-medium pt-1">Add your items</h3>
			</div>
			<p class="text-sm text-dark/50 leading-relaxed font-light pl-12">
				Create entries for things you frequently misplace.
			</p>
		</div>

		<div class="group">
			<div class="flex items-start gap-4 mb-3">
				<div
					class="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center text-sm font-light flex-shrink-0 transition-colors duration-300 group-hover:border-dark/40"
				>
					2
				</div>
				<h3 class="text-base font-medium pt-1">Update locations</h3>
			</div>
			<p class="text-sm text-dark/50 leading-relaxed font-light pl-12">
				Log where you place items. It takes a few seconds.
			</p>
		</div>

		<div class="group">
			<div class="flex items-start gap-4 mb-3">
				<div
					class="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center text-sm font-light flex-shrink-0 transition-colors duration-300 group-hover:border-dark/40"
				>
					3
				</div>
				<h3 class="text-base font-medium pt-1">Search when needed</h3>
			</div>
			<p class="text-sm text-dark/50 leading-relaxed font-light pl-12">
				Pull up any item to see its last known location.
			</p>
		</div>
	</div>
</section>
