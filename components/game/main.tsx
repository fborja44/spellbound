'use client';

import { useIsCompleted } from '@/store/game-store';
import { AnimatePresence } from 'motion/react';
import Board from './board/board';
import Results from './results';
import FadeDiv from '../animate/fade-div';
import FooterActions from './info/footer-actions';

const Main = () => {
	const isCompleted = useIsCompleted();

	return (
		<AnimatePresence mode='wait'>
			{!isCompleted ? (
				<FadeDiv className='flex flex-col gap-3'>
					<Board />
					<FooterActions />
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
