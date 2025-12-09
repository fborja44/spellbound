import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LETTERS } from '@/constants/letters';
import words from '@/data/words_dictionary.json';
import {
	Board,
	Bonus,
	Cell,
	CellPosition,
	Letter,
} from './validators/game-state';
import { PROBABILITIES } from '@/constants/game';
import { random, randomInt } from './random';

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

	const r = randomInt(adjustedTotal);

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
 * Calculates the score of a single cell.
 * @param letter - The letter to calculate the score for.
 * @param bonus - The bonus applied to the letter, if any.
 * @returns The score of the cell.
 */
export function calculateLetterScore(letter: Letter, bonus?: Bonus) {
	const letterMultiplier = bonus === 'TL' ? 3 : 1;
	return letter.score * letterMultiplier;
}

/**
 * Calculates the score of a word based on its letters.
 * @param word - An array of Cell objects representing the word.
 * @returns The total score of the word.
 */
export function calculateScore(word: Cell[]) {
	let hasDoubleWord = false;

	const baseScore = word.reduce((sum, cell) => {
		if (cell.bonus === '2X') hasDoubleWord = true;
		return sum + calculateLetterScore(cell.letter, cell.bonus);
	}, 0);

	return hasDoubleWord ? baseScore * 2 : baseScore;
}

/**
 * Randomizes a board.
 * @param board - The board to randomize.
 * @param usePrev - Whether to avoid repeating previous letters.
 * @param saveBonus - Whether to keep existing bonuses.
 * @returns The randomized board.
 */
export function randomizeBoard(
	board: Board,
	usePrev?: boolean,
	saveBonus: boolean = true
): Board {
	return board.map((row, r) =>
		row.map((letter, c) => ({
			letter: pickRandomLetter(usePrev ? letter.letter.char : undefined),
			isCharged: random() < PROBABILITIES.ENERGY,
			bonus: saveBonus ? board[r][c].bonus : null,
		}))
	);
}

/**
 * Picks a random coordinate in the 5x5 grid.
 * Excludes the specified cootdinate if provided.
 * @param excludeCoords? - The coordinates to exclude
 * @returns The selected row and column as a pair.
 */
export function randomizeBonusCoords(
	excludeCoords?: CellPosition
): CellPosition {
	const options: Array<CellPosition> = [];
	const { row: excludeRow, col: excludeCol } = excludeCoords ?? {};

	for (let r = 0; r < 5; r++) {
		for (let c = 0; c < 5; c++) {
			const isExcluded =
				excludeRow !== undefined &&
				excludeCol !== undefined &&
				r === excludeRow &&
				c === excludeCol;

			if (!isExcluded) {
				options.push({
					row: r,
					col: c,
				});
			}
		}
	}

	const choice = randomInt(options.length);
	return options[choice];
}

/**
 * Checks if any of the given tiles has the specified bonus.
 * @param tiles - The tiles to check.
 * @param bonus - The bonus to look for.
 * @returns True if any tile has the bonus, false otherwise.
 */
export function hasBonus(tiles: Cell[], bonus: Bonus) {
	return tiles.some((cell) => cell.bonus === bonus);
}
