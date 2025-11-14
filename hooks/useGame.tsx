import { calculateScore, isValidWord } from '@/lib/utils';
import useGameStore from '@/store/game-store';
import { toast } from 'sonner';

const useGame = () => {
	const round = useGameStore((state) => state.round);
	const maxRounds = useGameStore((state) => state.maxRounds);
	const board = useGameStore((state) => state.board);
	const selectedCells = useGameStore((state) => state.selectedCells);
	const setSelectedCells = useGameStore((state) => state.setSelectedCells);
	const randomizeCell = useGameStore((state) => state.randomizeCell);
	const changeEnergy = useGameStore((state) => state.changeEnergy);
	const incrementRound = useGameStore((state) => state.incrementRound);
	const addWord = useGameStore((state) => state.addWord);
	const setCompleted = useGameStore((state) => state.setCompleted);

	const submitWord = () => {
		const word = selectedCells.reduce(
			(word, c) => word + board[c.row][c.col].letter.char,
			''
		);
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
			selectedCells.forEach((c) => {
				randomizeCell(c.row, c.col, true);
			});
			changeEnergy(energy);
			addWord({ word, score, energy });
			toast(
				<div className='container-row gap-4'>
					<span>{word}</span>
					<span className='text-yellow-200'>+{score}</span>
				</div>
			);

			if (round === maxRounds) {
				// If last round, then set completed
				console.log('completed');
				setCompleted(true);
			} else {
				// Otherwise, just increment
				incrementRound();
			}
		} else {
			toast('Invalid word');
		}

		setSelectedCells([]);
	};

	return { submitWord };
};

export default useGame;
