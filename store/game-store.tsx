import { LETTERS } from '@/constants/letters';
import { Cell, CellPosition, GameState } from '@/lib/validators/game-state';
import { create } from 'zustand';
import { pickRandomLetter } from '@/lib/utils';
import { MAX_ENERGY, PROBABILITIES } from '@/constants/game';

export interface GameStore extends GameState {
	setState: (state: Partial<GameState>) => void;
	setScore: (score: number) => void;
	changeScore: (points: number) => void;
	setEnergy: (energy: number) => void;
	changeEnergy: (energy: number) => void;
	incrementRound: () => void;
	setCell: (row: number, col: number, cell: Cell) => void;
	setSelectedCells: (
		updater: CellPosition[] | ((prev: CellPosition[]) => CellPosition[])
	) => void;
	randomizeCell: (row: number, col: number, usePrev?: boolean) => void;
	randomizeBoard: (usePrev?: boolean) => void;
}

const initialState: GameState = {
	score: 0,
	round: 1,
	energy: 2,
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
	setScore: (score) => set(() => ({ score })),
	changeScore: (points) =>
		set((state) => ({
			score: state.score + points,
		})),
	setEnergy: (energy) => set(() => ({ energy: Math.min(energy, MAX_ENERGY) })),
	changeEnergy: (energy) =>
		set((state) => ({
			energy: Math.min(state.energy + energy, MAX_ENERGY),
		})),
	incrementRound: () =>
		set(({ round }) => ({
			round: round + 1,
		})),
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
