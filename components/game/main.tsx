'use client';

import useGameStore from '@/store/game-store';
import { AnimatePresence } from 'motion/react';
import Board from './board';
import Results from './results';
import FadeDiv from '../animate/FadeDiv';

const Main = () => {
	const isCompleted = useGameStore((state) => state.isCompleted);

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
