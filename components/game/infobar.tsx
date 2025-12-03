'use client';

import useGameStore from '@/store/game-store';
import Score from './info/score';
import WordHistory from './info/word-history';
import FadeDiv from '../animate/fade-div';
import { AnimatePresence } from 'motion/react';

const InfoBar = () => {
	const isCompleted = useGameStore((state) => state.isCompleted);

	return (
		<AnimatePresence mode='wait'>
			{!isCompleted && (
				<FadeDiv
					id={`infobar-${!isCompleted}`}
					className='flex flex-col gap-1 min-w-18 w-18 max-h-board'
				>
					<Score />
					<WordHistory />
				</FadeDiv>
			)}
		</AnimatePresence>
	);
};

export default InfoBar;
