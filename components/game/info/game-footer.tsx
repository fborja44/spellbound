'use client';

import { useIsSwapping } from '@/store/game-store';
import { AnimatePresence, motion } from 'motion/react';

const GameFooter = () => {
	const isSwapping = useIsSwapping();

	return (
		<AnimatePresence mode='wait'>
			{isSwapping && (
				<motion.small
					className='text-base font-bold italic'
					initial={{ opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 5, opacity: 0 }}
					transition={{
						duration: 0.5,
					}}
				>
					Select A Cell To Swap
				</motion.small>
			)}
		</AnimatePresence>
	);
};

export default GameFooter;
