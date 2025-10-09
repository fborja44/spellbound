import { LETTERS } from '@/constants/letters';
import { Cell, GameState } from '@/lib/validators/game-state';
import { create } from 'zustand';
import { pickRandomLetter } from '@/lib/utils';

export interface GameStore extends GameState {
	setState: (state: Partial<GameState>) => void;
	setCell: (row: number, col: number, cell: Cell) => void;
	randomizeBoard: () => void;
}

const initialState: GameState = {
	board: new Array(5).fill(null).map(() =>
		new Array(5).fill({
			letter: LETTERS.A,
			isSelected: false,
			isCharged: false,
		})
	),
	selectedCells: [],
};

const useGameStore = create<GameStore>()((set) => ({
	...initialState,
	setState: (state) => set((prev) => ({ ...prev, ...state })),
	setCell: (row, col, cell) =>
		set((state) => {
			const newBoard = state.board.map((r) => r.slice());
			newBoard[row][col] = cell;
			return { board: newBoard };
		}),
	randomizeBoard: () => {
		set((state) => {
			const newBoard = state.board.map((row) =>
				row.map(() => ({
					letter: pickRandomLetter(),
					isCharged: Math.random() < 0.2,
				}))
			);
			return { board: newBoard };
		});
	},
}));

export default useGameStore;
