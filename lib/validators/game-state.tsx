import { GRID_HEIGHT, GRID_WIDTH, MAX_ENERGY } from '@/constants/game';
import { z } from 'zod';

export const LetterSchema = z.object({
	char: z.string().min(1).max(1),
	rarity: z.number().min(1),
	score: z.number().int().min(1),
});

export type Letter = z.infer<typeof LetterSchema>;

export const WordSchema = z.object({
	word: z.string().min(1),
	score: z.number().int(),
	energy: z.number().int().min(0),
	// tiles: // TODO
});

export type Word = z.infer<typeof WordSchema>;

export const CellSchema = z.object({
	letter: LetterSchema,
	isCharged: z.boolean().default(false),
	bonus: z.enum(['DL', '2X']).nullable(),
});
export type Cell = z.infer<typeof CellSchema>;
export type Bonus = Cell['bonus'];

export const CellPositionSchema = z.object({
	row: z
		.number()
		.int()
		.min(0)
		.max(GRID_WIDTH - 1),
	col: z
		.number()
		.int()
		.min(0)
		.max(GRID_HEIGHT - 1),
});
export type CellPosition = z.infer<typeof CellPositionSchema>;

export const BoardSchema = z.array(z.array(CellSchema).length(5)).length(5);
export type Board = z.infer<typeof BoardSchema>;

export const GameStateSchema = z
	.object({
		score: z.number().min(0).default(0),
		round: z.number().min(1).default(1),
		maxRounds: z.number().min(1).default(5),
		energy: z.number().min(0).max(MAX_ENERGY),
		board: BoardSchema,
		wordHistory: z.array(WordSchema),
		selectedCells: z.array(CellPositionSchema).max(5),
		isCompleted: z.boolean().default(false),
		isSwapping: z.boolean().default(false),
	})
	.strict();

export type GameState = z.infer<typeof GameStateSchema>;
