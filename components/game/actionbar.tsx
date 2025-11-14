'use client';

import { Timer } from 'lucide-react';
import RefreshButton from './buttons/refresh-button';
import SwapButton from './buttons/swap-button';
import EnergyBar from './info/energy';
import useGameStore from '@/store/game-store';
import { AnimatePresence, motion } from 'motion/react';
import { geistMono } from '@/fonts';

const ActionBar = () => {
	const round = useGameStore((state) => state.round);

	return (
		<div className='container-col gap-3 min-w-18'>
			<div
				className={`flex flex-row items-end game-header-h text-2xl font-geist-mono font-black ${geistMono.className}`}
			>
				<div className='container-row gap-1'>
					<Timer className='size-6 stroke-3 text-slate-400' />
					<div className='min-w-11'>
						<AnimatePresence mode='wait'>
							<motion.span
								key={`round-${round}`}
								initial={{ opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: 50, opacity: 0 }}
							>
								{round}
							</motion.span>
						</AnimatePresence>
						<span>/4</span>
					</div>
				</div>
			</div>
			<EnergyBar />
			<RefreshButton />
			<SwapButton />
		</div>
	);
};

export default ActionBar;
