'use client';

import { useIsCompleted } from '@/store/game-store';
import { AnimatePresence } from 'motion/react';
import Board from './board';
import Results from './results';
import FadeDiv from '../animate/fade-div';

const Main = () => {
	const isCompleted = useIsCompleted();

	return (
		<AnimatePresence mode='wait'>
			{!isCompleted ? (
				<FadeDiv>
					<Board />
				</FadeDiv>
			) : (
				<FadeDiv className='w-full'>
					<Results />
				</FadeDiv>
			)}
		</AnimatePresence>
	);
};

export default Main;
