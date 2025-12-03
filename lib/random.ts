import seedrandom from 'seedrandom';

let rng: () => number = Math.random;

/** Initialize the global RNG with a seed (or reset to default random). */
export function setSeed(seed?: string | number) {
	rng = seed ? seedrandom(String(seed)) : Math.random;
}

export function random() {
	return rng();
}

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
