import type { Icon } from 'lucide-svelte';
import { Eye, Brain, MapPinned } from 'lucide-svelte';

// status config
export const statusConfig: Record<
	string,
	{ label: string; icon: typeof Icon; color: string; next: string }
> = {
	unnoticed: {
		label: 'Unnoticed',
		icon: Eye,
		color: 'text-dark/40 border-dark/10 hover:border-dark/20',
		next: 'remembered'
	},
	remembered: {
		label: 'Remembered',
		icon: Brain,
		color: 'text-blue-600 border-blue-200 hover:border-blue-300 bg-blue-50',
		next: 'find'
	},
	find: {
		label: 'Find!',
		icon: MapPinned,
		color: 'text-green-600 border-green-200 hover:border-green-300 bg-green-50',
		next: 'unnoticed'
	}
};
