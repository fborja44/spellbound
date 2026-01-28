'use client';

import FadeDiv from '@/components/animate/fade-div';
import { geistMono } from '@/fonts';
import { useMaxRounds, useRound } from '@/store/game-store';
import { Timer } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

const Rounds = () => {
	const round = useRound();
	const maxRounds = useMaxRounds();

	return (
		<div className='flex flex-col gap-0.5'>
			<span className='sm:hidden uppercase font-bold text-sm text-slate-400 justify-self-end text-right'>
				Round
			</span>
			<div
				className={`container-row justify-end gap-1 text-2xl font-black ${geistMono.className}`}
			>
				<Timer className='hidden sm:inline size-6 stroke-3 text-slate-400' />
				<div className='min-w-11 leading-5 '>
					<AnimatePresence mode='wait'>
						<FadeDiv id={`round-${round}`} className='inline'>
							{round}
						</FadeDiv>
					</AnimatePresence>
					/
					<AnimatePresence mode='wait'>
						<FadeDiv id={`max-rounds-${maxRounds}`} className='inline'>
							{maxRounds}
						</FadeDiv>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default Rounds;
