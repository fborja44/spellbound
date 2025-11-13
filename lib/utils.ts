import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LETTERS } from '@/constants/letters';
import words from '@/data/words_dictionary.json';
import { Cell, Letter } from './validators/game-state';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Precompute prefix sum
const letters = Object.values(LETTERS);
const weights = letters.map((l) => l.rarity);
const prefixSums = letters.map((_, i) =>
	letters.slice(0, i + 1).reduce((s, l) => s + l.rarity, 0)
);
const totalWeight = prefixSums[prefixSums.length - 1];

/**
 * Picks a random letter (weighted by rarity).
 * @param prevChar - The previous letter character to skip. Can be null or undefined.
 * @returns A randomly selected Letter object.
 */
export function pickRandomLetter(prevChar?: string): Letter {
	if (letters.length === 0) throw new Error('No letters available');
	if (letters.length === 1) return letters[0];

	const prevIndex = prevChar
		? letters.findIndex((l) => l.char === prevChar)
		: -1;

	// Adjusted total excludes previous letter’s weight
	const adjustedTotal =
		prevIndex >= 0 ? totalWeight - weights[prevIndex] : totalWeight;

	const r = Math.random() * adjustedTotal;

	let lo = 0;
	let hi = prefixSums.length - 1;

	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		const offset = prevIndex >= 0 && mid >= prevIndex ? weights[prevIndex] : 0;
		const adjustedPrefix = prefixSums[mid] - offset;
		if (r < adjustedPrefix) hi = mid;
		else lo = mid + 1;
	}

	// Safety check — if it somehow picks the same one
	if (lo === prevIndex) lo = (lo + 1) % letters.length;

	return letters[lo];
}

/**
 * Checks if a word is valid using the word list.
 * @param word - The word to validate.
 * @returns True if the word is valid, false otherwise.
 */
export function isValidWord(word: string) {
	return word.toLowerCase() in words;
}

/**
 * Calculates the score of a word based on its letters.
 * @param word - An array of Letter objects representing the word.
 * @returns The total score of the word.
 */
export function calculateScore(word: Cell[]) {
	return word.reduce((sum, cell) => sum + cell.letter.score, 0);
}
