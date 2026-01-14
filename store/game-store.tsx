import { LETTERS } from '@/constants/letters';
import {
	Bonus,
	Cell,
	CellPosition,
	GameState,
	Word,
} from '@/lib/validators/game-state';
import { create } from 'zustand';
import {
	calculateScore,
	hasBonus,
	isValidWord,
	pickRandomLetter,
	randomizeBoard,
	randomizeBonusCoords,
} from '@/lib/utils';
import { DEFAULT_ENERGY, MAX_ENERGY, PROBABILITIES } from '@/constants/game';
import { setSeed as applySeed, generateSeed, random } from '@/lib/random';

// ZUSTAND STORE FOR SINGLE-PLAYER STATE MANAGEMENT

const initialSeed = generateSeed();

export interface GameActions {
	// Main actions
	newSeed: () => number;
	startNewGame: (maxRounds: number) => void;
	changeScore: (points: number) => void;
	changeEnergy: (energy: number) => void;
	incrementRound: () => void;
	addWord: (word: Word) => void;
	randomizeCell: (row: number, col: number, usePrev?: boolean) => void;
	randomizeBoard: (usePrev?: boolean) => void;
	changeBonus: (bonus: Bonus) => void;
	submitWord: () => {
		status: 'success' | 'error';
		message?: string;
		word?: Word;
	};

	// Getters
	getSelectedWord: () => Word;
	getBonusCoordinates: (bonus: Bonus) => CellPosition | null;

	// Setters
	setState: (state: Partial<GameState>) => void;
	setSeed: (seed: number | null) => void;
	setScore: (score: number) => void;
	setEnergy: (energy: number) => void;
	setCell: (row: number, col: number, cell: Cell) => void;
	setCellBonus: (row: number, col: number, bonus: Bonus | null) => void;
	setSelectedCells: (
		updater: CellPosition[] | ((prev: CellPosition[]) => CellPosition[])
	) => void;
	setWordHistory: (wordHistory: Word[]) => void;
	setIsCompleted: (isCompleted: boolean) => void;
	setIsSwapping: (isSwapping: boolean) => void;
}

export interface GameStore extends GameState {
	actions: GameActions;
}

const initialState: GameState = {
	seed: initialSeed,
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

const useGameStore = create<GameStore>()((set, get) => ({
	...initialState,
	actions: {
		// Main Actions
		newSeed: () => {
			// Generate a 32-bit integer range seed
			const seed = generateSeed();
			get().actions.setSeed(seed);
			return seed;
		},
		startNewGame: (maxRounds) => {
			set(({ board }) => {
				const newState = { ...initialState };
				newState.maxRounds = maxRounds;
				newState.board = randomizeBoard(board, true, false);
				return newState;
			});
			get().actions.newSeed();
		},
		changeScore: (points) =>
			set((state) => ({
				score: state.score + points,
			})),
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
		randomizeCell: (row, col, usePrev) => {
			set((state) => {
				const newBoard = state.board.map((r) => r.slice());
				newBoard[row][col] = {
					letter: pickRandomLetter(
						usePrev ? newBoard[row][col].letter.char : undefined
					),
					isCharged: random() < PROBABILITIES.ENERGY,
					bonus: newBoard[row][col].bonus,
				};
				return { board: newBoard };
			});
		},
		randomizeBoard: (usePrev) => {
			set((state) => ({
				board: randomizeBoard(state.board, usePrev),
			}));
		},
		changeBonus: (bonus: Bonus) => {
			const { setCellBonus, getBonusCoordinates } = get().actions;

			// Look for existing double word bonus and double letter bonus
			const otherCoords = getBonusCoordinates(bonus === 'TL' ? '2X' : 'TL');
			const prevCoords = getBonusCoordinates(bonus);

			// Get new bonus coords
			const { row, col } = randomizeBonusCoords(otherCoords ?? undefined);

			// Remove prev bonus
			if (prevCoords) {
				setCellBonus(prevCoords.row, prevCoords.col, null);
			}

			// Set bonus
			setCellBonus(row, col, bonus);
		},
		submitWord: () => {
			const { selectedCells, round, maxRounds, actions } = get();
			const {
				setSelectedCells,
				randomizeCell,
				changeEnergy,
				addWord,
				incrementRound,
				setIsCompleted,
				changeBonus,
			} = actions;

			const newWord = actions.getSelectedWord();

			// Check minimum length
			if (newWord.word.length < 3) {
				setSelectedCells([]);
				return { status: 'error', message: 'Word too short' };
			}

			// Check if in app dictionary
			if (!isValidWord(newWord.word)) {
				setSelectedCells([]);
				return { status: 'error', message: 'Invalid word' };
			}

			// Randomize used tiles
			selectedCells.forEach(({ row, col }) => {
				randomizeCell(row, col, true);
			});

			// Move bonuses if included in word
			if (hasBonus(newWord.tiles, 'TL')) {
				changeBonus('TL');
			}

			if (hasBonus(newWord.tiles, '2X')) {
				changeBonus('2X');
			}

			// Update state
			changeEnergy(newWord.energy);
			addWord(newWord);
			setSelectedCells([]);

			// Check if end of game
			if (round >= maxRounds) {
				setIsCompleted(true);
			} else {
				incrementRound();
			}

			return { status: 'success', word: newWord };
		},

		// Getters
		getSelectedWord: () => {
			const { board, selectedCells } = get();
			const tiles = selectedCells.map(({ row, col }) => board[row][col]);
			const word = tiles.map((t) => t.letter.char).join('');
			const score = calculateScore(tiles);
			const energy = tiles.reduce(
				(acc, tile) => acc + (tile.isCharged ? 1 : 0),
				0
			);
			return { word, score, energy, tiles };
		},
		getBonusCoordinates: (bonus) => {
			const { board } = get();
			for (let r = 0; r < board.length; r++) {
				for (let c = 0; c < board[r].length; c++) {
					if (board[r][c].bonus === bonus) {
						return {
							row: r,
							col: c,
						};
					}
				}
			}
			return null;
		},

		// Setters
		setState: (state) => set((prev) => ({ ...prev, ...state })),
		setScore: (score) => set(() => ({ score })),
		setSeed: (seed) => {
			applySeed(seed ?? initialSeed);
			set({ seed: seed ?? initialSeed });
		},
		setEnergy: (energy) =>
			set(() => ({ energy: Math.min(energy, MAX_ENERGY) })),
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
					typeof updater === 'function'
						? updater(state.selectedCells)
						: updater,
			})),
		setIsCompleted: (isCompleted) => {
			set(() => ({ isCompleted }));
		},
		setIsSwapping: (isSwapping) => {
			set(() => ({ isSwapping }));
		},
	},
}));

export default useGameStore;

// Selectors
export const useSeed = () => useGameStore((state) => state.seed);

export const useScore = () => useGameStore((state) => state.score);

export const useRound = () => useGameStore((state) => state.round);

export const useMaxRounds = () => useGameStore((state) => state.maxRounds);

export const useEnergy = () => useGameStore((state) => state.energy);

export const useBoard = () => useGameStore((state) => state.board);

export const useWordHistory = () => useGameStore((state) => state.wordHistory);

export const useSelectedCells = () =>
	useGameStore((state) => state.selectedCells);

export const useIsCompleted = () => useGameStore((state) => state.isCompleted);

export const useIsSwapping = () => useGameStore((state) => state.isSwapping);

export const useGameActions = () => useGameStore((state) => state.actions);
