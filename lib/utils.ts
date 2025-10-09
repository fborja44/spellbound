import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LETTERS } from '@/constants/letters';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const letters = Object.values(LETTERS);
const prefixSums = letters.map((_, i) =>
	letters.slice(0, i + 1).reduce((s, l) => s + l.rarity, 0)
);
const totalWeight = prefixSums[prefixSums.length - 1];

export function pickRandomLetter() {
	// Use prefix sums + binary search for O(log n) selection
	const r = Math.random() * totalWeight;

	let lo = 0;
	let hi = prefixSums.length - 1;

	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (r < prefixSums[mid]) {
			hi = mid;
		} else {
			lo = mid + 1;
		}
	}

	// Defensive fallback
	return letters[lo] ?? letters[letters.length - 1];
}
