'use client';

import { calculateScore } from '@/lib/utils';
import useGameStore from '@/store/game-store';
import { AnimatePresence } from 'motion/react';
import FadeDiv from '../animate/FadeDiv';

const WordDisplay = () => {
	const board = useGameStore((state) => state.board);
	const selectedCells = useGameStore((state) => state.selectedCells);
	const isCompleted = useGameStore((state) => state.isCompleted);

	const letters = selectedCells.map((cell) => board[cell.row][cell.col]);

	return (
		<div className='container-row items-center justify-center border-5 border-slate-500 bg-background max-w-full w-board game-header-h rounded-lg px-4 text-3xl font-extrabold tracking-wide uppercase'>
			<AnimatePresence mode='wait'>
				{!isCompleted ? (
					<FadeDiv className='container-row justify-center gap-3 w-full mx-auto'>
						<span>{letters.map((l) => l.letter.char).join('')}</span>
						{selectedCells.length > 0 && (
							<div className='container-row tracking-normal text-yellow-200'>
								+{calculateScore(letters)}
							</div>
						)}
					</FadeDiv>
				) : (
					<FadeDiv>
						<div>Game Results</div>
					</FadeDiv>
				)}
			</AnimatePresence>
		</div>
	);
};

export default WordDisplay;
