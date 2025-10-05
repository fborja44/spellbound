export type Letter = {
	char: string;
	rarity: number;
	score: number;
};

export const LETTERS: Record<string, Letter> = {
	A: { char: 'A', rarity: 1, score: 1 },
	B: { char: 'B', rarity: 1, score: 4 },
	C: { char: 'C', rarity: 1, score: 5 },
	D: { char: 'D', rarity: 1, score: 3 },
	E: { char: 'E', rarity: 1, score: 1 },
	F: { char: 'F', rarity: 1, score: 5 },
	G: { char: 'G', rarity: 1, score: 3 },
	H: { char: 'H', rarity: 1, score: 4 },
	I: { char: 'I', rarity: 1, score: 1 },
	J: { char: 'J', rarity: 1, score: 7 },
	K: { char: 'K', rarity: 1, score: 6 },
	L: { char: 'L', rarity: 1, score: 3 },
	M: { char: 'M', rarity: 1, score: 4 },
	N: { char: 'N', rarity: 1, score: 2 },
	O: { char: 'O', rarity: 1, score: 1 },
	P: { char: 'P', rarity: 1, score: 4 },
	Q: { char: 'Q', rarity: 1, score: 8 },
	R: { char: 'R', rarity: 1, score: 2 },
	S: { char: 'S', rarity: 1, score: 2 },
	T: { char: 'T', rarity: 1, score: 2 },
	U: { char: 'U', rarity: 1, score: 4 },
	V: { char: 'V', rarity: 1, score: 5 },
	W: { char: 'W', rarity: 1, score: 5 },
	X: { char: 'X', rarity: 1, score: 7 },
	Y: { char: 'Y', rarity: 1, score: 4 },
	Z: { char: 'Z', rarity: 1, score: 8 },
};
