import { GRID_HEIGHT, GRID_WIDTH, MAX_ENERGY } from '@/constants/game';
import { z } from 'zod';

export const LetterSchema = z.object({
	char: z.string().min(1).max(1),
	rarity: z.number().min(1),
	score: z.number().min(1),
});

export type Letter = z.infer<typeof LetterSchema>;

export const CellSchema = z.object({
	letter: LetterSchema,
	isCharged: z.boolean().default(false),
	bonus: z.enum(['DL', '2X']).optional(),
});
export type Cell = z.infer<typeof CellSchema>;

export const CellPositionSchema = z.object({
	row: z
		.number()
		.min(0)
		.max(GRID_WIDTH - 1),
	col: z
		.number()
		.min(0)
		.max(GRID_HEIGHT - 1),
});
export type CellPosition = z.infer<typeof CellPositionSchema>;

export const GameStateSchema = z
	.object({
		score: z.number().min(0).default(0),
		round: z.number().min(1).default(1),
		energy: z.number().min(0).max(MAX_ENERGY),
		board: z.array(z.array(CellSchema).length(5)).length(5),
		selectedCells: z.array(CellPositionSchema).max(5),
	})
	.strict();

export type GameState = z.infer<typeof GameStateSchema>;
