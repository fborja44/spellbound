'use client';

import { useIsCompleted } from '@/store/game-store';
import { AnimatePresence } from 'motion/react';
import Board from './board/board';
import Results from './results';
import FadeDiv from '../animate/fade-div';
import EnergyBar from './info/energy';

const Main = () => {
	const isCompleted = useIsCompleted();

	return (
		<AnimatePresence mode='wait'>
			{!isCompleted ? (
				<FadeDiv className='flex flex-col gap-3'>
					<Board />
					<div className='h-18 sm:hidden'>
						<EnergyBar direction='horizontal' />
					</div>
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
