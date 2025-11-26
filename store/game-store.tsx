import { LETTERS } from '@/constants/letters';
import {
	Bonus,
	Cell,
	CellPosition,
	GameState,
	Word,
} from '@/lib/validators/game-state';
import { create } from 'zustand';
import { pickRandomLetter, randomizeBoard } from '@/lib/utils';
import { DEFAULT_ENERGY, MAX_ENERGY, PROBABILITIES } from '@/constants/game';

export interface GameStore extends GameState {
	setState: (state: Partial<GameState>) => void;
	setScore: (score: number) => void;
	startNewGame: (maxRounds: number) => void;
	changeScore: (points: number) => void;
	setEnergy: (energy: number) => void;
	changeEnergy: (energy: number) => void;
	incrementRound: () => void;
	setWordHistory: (wordHistory: Word[]) => void;
	addWord: (word: Word) => void;
	setCell: (row: number, col: number, cell: Cell) => void;
	setCellBonus: (row: number, col: number, bonus: Bonus | null) => void;
	setSelectedCells: (
		updater: CellPosition[] | ((prev: CellPosition[]) => CellPosition[])
	) => void;
	randomizeCell: (row: number, col: number, usePrev?: boolean) => void;
	randomizeBoard: (usePrev?: boolean) => void;
	setIsCompleted: (isCompleted: boolean) => void;
	setIsSwapping: (isSwapping: boolean) => void;
}

const initialState: GameState = {
	score: 0,
	round: 1,
	maxRounds: 5,
	energy: DEFAULT_ENERGY,
	board: new Array(5).fill(null).map(() =>
		new Array(5).fill({
			letter: LETTERS['?'],
			isSelected: false,
			isCharged: false,
		})
	),
	wordHistory: [],
	selectedCells: [],
	isCompleted: false,
	isSwapping: false,
};

const useGameStore = create<GameStore>()((set) => ({
	...initialState,
	setState: (state) => set((prev) => ({ ...prev, ...state })),
	setScore: (score) => set(() => ({ score })),
	startNewGame: (maxRounds) =>
		set(({ board }) => {
			const newState = { ...initialState };
			newState.maxRounds = maxRounds;
			newState.board = randomizeBoard(board, true);
			return newState;
		}),
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
	setWordHistory: (wordHistory) =>
		set(() => ({
			wordHistory,
		})),
	addWord: (word) =>
		set(({ wordHistory }) => ({
			wordHistory: [...wordHistory, word],
		})),
	setCell: (row, col, cell) =>
		set((state) => {
			const newBoard = state.board.map((r) => r.slice());
			newBoard[row][col] = cell;
			return { board: newBoard };
		}),
	setCellBonus: (row, col, bonus) =>
		set((state) => {
			const newBoard = state.board.map((r) => r.slice());
			const cell = newBoard[row][col];
			newBoard[row][col] = {
				...cell,
				bonus,
			};
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
				bonus: newBoard[row][col].bonus,
			};
			return { board: newBoard };
		});
	},
	randomizeBoard: (usePrev) => {
		set((state) => {
			const newBoard = randomizeBoard(state.board, usePrev);
			return { board: newBoard };
		});
	},
	setIsCompleted: (isCompleted) => {
		set(() => ({ isCompleted }));
	},
	setIsSwapping: (isSwapping) => {
		set(() => ({ isSwapping }));
	},
}));

export default useGameStore;
