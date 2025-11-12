'use client';

import useGameStore from '@/store/game-store';
import { Plus } from 'lucide-react';

const WordDisplay = () => {
	const board = useGameStore((state) => state.board);
	const selectedCells = useGameStore((state) => state.selectedCells);

	const letters = selectedCells.map((cell) => board[cell.row][cell.col]);

	return (
		<div className='container-row justify-center border-5 border-slate-500 bg-background w-full game-header-h rounded-lg px-4 text-3xl font-extrabold tracking-wide uppercase gap-3'>
			<span>{letters.map((l) => l.letter.char).join('')}</span>
			{selectedCells.length > 0 && (
				<div className='container-row tracking-normal text-yellow-200'>
					+
					{letters
						.map((l) => l.letter.score)
						.reduce((acc, score) => acc + score, 0)}
				</div>
			)}
		</div>
	);
};

export default WordDisplay;
