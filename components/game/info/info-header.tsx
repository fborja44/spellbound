'use client';

import { useIsCompleted } from '@/store/game-store';
import EnergyBar from './energy';
import Rounds from './rounds';
import Score from './score';
import { motion } from 'motion/react';

const InfoHeader = () => {
	const isCompleted = useIsCompleted();

	return (
		<motion.div
			className='flex flex-row items-center sm:hidden justify-between gap-9 w-full h-fit'
			animate={{ opacity: isCompleted ? 0 : 1 }}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
		>
			<Score />
			<EnergyBar direction='horizontal' />
			<Rounds />
		</motion.div>
	);
};

export default InfoHeader;
