'use client';

import { calculateScore, hasBonus } from '@/lib/utils';
import {
	useGameActions,
	useIsCompleted,
	useSelectedCells,
} from '@/store/game-store';
import { AnimatePresence } from 'motion/react';
import FadeDiv from '../animate/fade-div';

const WordDisplay = () => {
	const selectedCells = useSelectedCells();
	const isCompleted = useIsCompleted();
	const { getSelectedWord } = useGameActions();

	const { tiles } = getSelectedWord();

	const hasTL = hasBonus(tiles, 'TL');
	const has2X = hasBonus(tiles, '2X');

	const scoreColor = has2X
		? 'text-red-400'
		: hasTL
		? 'text-green-400'
		: 'text-yellow-200';

	return (
		<div className='container-row items-center justify-center border-5 border-slate-500 bg-background max-w-full w-board game-header-h rounded-lg px-4 text-3xl font-extrabold tracking-wide uppercase'>
			<AnimatePresence mode='wait'>
				{!isCompleted ? (
					<FadeDiv className='container-row justify-center gap-3 w-full mx-auto'>
						<span>{tiles.map((l) => l.letter.char).join('')}</span>
						{selectedCells.length > 0 && (
							<div className={`container-row tracking-normal ${scoreColor}`}>
								+{calculateScore(tiles)}
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
