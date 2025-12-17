import type { ItemInterface } from './dashboard';
import confetti from 'canvas-confetti';
import { toast } from 'svelte-sonner';
import { readableTimeFrame } from '$lib';

// function to celebrate the user
export const celebrateIfFoundUnder60Min = (item: ItemInterface) => {
	// get it when its created
	const createdAt = new Date(item.created_at);

	// get the current time
	const now = Date.now();

	// validate if the item was found under 60 min
	if (now - createdAt.getTime() <= 60 * 60 * 1000) {
		// toast the user
		toast.success(
			`Congratulations! You found ${item.name} in  ${readableTimeFrame(item.created_at)}`,
			{ duration: 1200 }
		);
		confetti({
			particleCount: 120,
			spread: 70,
			origin: { y: 0.6 }
		});
	}
};
