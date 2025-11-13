import { LETTERS } from '@/constants/letters';
import { Cell, CellPosition, GameState } from '@/lib/validators/game-state';
import { create } from 'zustand';
import { pickRandomLetter } from '@/lib/utils';
import { PROBABILITIES } from '@/constants/game';

export interface GameStore extends GameState {
	setState: (state: Partial<GameState>) => void;
	setCell: (row: number, col: number, cell: Cell) => void;
	setSelectedCells: (
		updater: CellPosition[] | ((prev: CellPosition[]) => CellPosition[])
	) => void;
	randomizeCell: (row: number, col: number, usePrev?: boolean) => void;
	randomizeBoard: (usePrev?: boolean) => void;
}

const initialState: GameState = {
	board: new Array(5).fill(null).map(() =>
		new Array(5).fill({
			letter: LETTERS['?'],
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
	setSelectedCells: (updater) =>
		set((state) => ({
			selectedCells:
				typeof updater === 'function' ? updater(state.selectedCells) : updater,
		})),
	randomizeCell: (row, col, usePrev) => {
		set((state) => {
			const newBoard = state.board.map((r) => r.slice());
			newBoard[row][col] = {
				letter: pickRandomLetter(
					usePrev ? newBoard[row][col].letter.char : undefined
				),
				isCharged: Math.random() < PROBABILITIES.ENERGY,
			};
			return { board: newBoard };
		});
	},
	randomizeBoard: (usePrev) => {
		set((state) => {
			const newBoard = state.board.map((row) =>
				row.map((letter) => ({
					letter: pickRandomLetter(usePrev ? letter.letter.char : undefined),
					isCharged: Math.random() < PROBABILITIES.ENERGY,
				}))
			);
			return { board: newBoard };
		});
	},
}));

export default useGameStore;
