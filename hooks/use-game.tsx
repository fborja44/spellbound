import { useGameActions } from '@/store/game-store';
import { toast } from 'sonner';

const useGame = () => {
	const { submitWord } = useGameActions();

	/**
	 * Handles the submission of a word.
	 */
	const handleSubmitWord = () => {
		const { status, word, message } = submitWord();
		if (status === 'success' && word) {
			toast(
				<div className='container-row gap-4'>
					<span>{word.word}</span>
					<span className='text-yellow-200'>+{word.score}</span>
				</div>
			);
		} else {
			toast(message || 'Word error');
		}
	};

	return {
		handleSubmitWord,
	};
};

export default useGame;
