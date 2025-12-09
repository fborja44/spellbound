import seedrandom from 'seedrandom';

let rng: () => number = Math.random;

/**
 * Initializes the global RNG with a seed (or reset to default random)
 * @param seed The seed to initialize the RNG with.
 */
export function setSeed(seed?: string | number) {
	rng = seed ? seedrandom(String(seed)) : Math.random;
}

/**
 * Returns a random number between 0 (inclusive) and 1 (exclusive).
 * @returns A random number.
 */
export function random() {
	return rng();
}

/**
 * Returns a random integer between 0 (inclusive) and n (exclusive).
 * @param n The upper bound (exclusive).
 * @returns A random integer.
 */
export function randomInt(n: number) {
	return Math.floor(rng() * n);
}

/**
 * Generates a 32-bit integer range seed
 * @returns A random seed as a number.
 */
export function generateSeed() {
	return Math.floor(Math.random() * 2 ** 31);
}
