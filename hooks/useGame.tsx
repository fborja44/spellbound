import {
	calculateScore,
	hasBonus,
	isValidWord,
	randomizeBonusCoords,
} from '@/lib/utils';
import { Bonus, CellPosition, Word } from '@/lib/validators/game-state';
import useGameStore from '@/store/game-store';
import { toast } from 'sonner';

const useGame = () => {
	const round = useGameStore((state) => state.round);
	const maxRounds = useGameStore((state) => state.maxRounds);
	const board = useGameStore((state) => state.board);
	const setCellBonus = useGameStore((state) => state.setCellBonus);
	const selectedCells = useGameStore((state) => state.selectedCells);
	const setSelectedCells = useGameStore((state) => state.setSelectedCells);
	const randomizeCell = useGameStore((state) => state.randomizeCell);
	const changeEnergy = useGameStore((state) => state.changeEnergy);
	const incrementRound = useGameStore((state) => state.incrementRound);
	const addWord = useGameStore((state) => state.addWord);
	const setIsCompleted = useGameStore((state) => state.setIsCompleted);

	/**
	 * Handles the submission of a word.
	 */
	const submitWord = () => {
		const tiles = selectedCells.map(({ row, col }) => board[row][col]);
		const word = tiles.reduce((word, tile) => word + tile.letter.char, '');
		const score = calculateScore(selectedCells.map((c) => board[c.row][c.col]));
		const energy = selectedCells.reduce(
			(acc, c) => acc + (board[c.row][c.col].isCharged ? 1 : 0),
			0
		);

		// Minimum word length
		if (word.length < 3) {
			toast('Word too short');
			setSelectedCells([]);
			return;
		}

		// Check if valid word
		if (isValidWord(word)) {
			const newWord: Word = { word, score, energy, tiles };

			selectedCells.forEach((c) => {
				randomizeCell(c.row, c.col, true);
			});

			// If word contains a bonus, move it
			if (hasBonus(tiles, 'TL')) {
				setDoubleLetterBonus();
			}
			if (hasBonus(tiles, '2X')) {
				setDoubleWordBonus();
			}

			changeEnergy(energy);
			addWord(newWord);
			toast(
				<div className='container-row gap-4'>
					<span>{word}</span>
					<span className='text-yellow-200'>+{score}</span>
				</div>
			);

			if (round === maxRounds) {
				// If last round, then set completed
				console.log('completed');
				setIsCompleted(true);
			} else {
				// Otherwise, just increment
				incrementRound();
			}
		} else {
			toast('Invalid word');
		}

		setSelectedCells([]);
	};

	/**
	 * Finds the coordinates of a bonus tile, if it exists.
	 * @param bonus The bonus to look for.
	 * @returns A pair of the coordinates if found, otherwise null.
	 */
	const getBonusCoordinates = (bonus: Bonus): CellPosition | null => {
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
	};

	const setDoubleLetterBonus = () => {
		// Look for existing double word bonus and double letter bonus
		const otherCoords = getBonusCoordinates('2X');
		const prevCoords = getBonusCoordinates('TL');

		// Get new bonus coords
		const { row, col } = randomizeBonusCoords(otherCoords ?? undefined);

		// Remove prev bonus
		if (prevCoords) {
			setCellBonus(prevCoords.row, prevCoords.col, null);
		}

		// Set bonus
		setCellBonus(row, col, 'TL');
	};

	const setDoubleWordBonus = () => {
		// Look for existing double word bonus and double letter bonus
		const otherCoords = getBonusCoordinates('TL');
		const prevCoords = getBonusCoordinates('2X');

		// Get new bonus coords
		const { row, col } = randomizeBonusCoords(otherCoords ?? undefined);

		// Remove prev bonus
		if (prevCoords) {
			setCellBonus(prevCoords.row, prevCoords.col, null);
		}

		// Set bonus
		setCellBonus(row, col, '2X');
	};

	return {
		submitWord,
		setDoubleLetterBonus,
		setDoubleWordBonus,
	};
};

export default useGame;
