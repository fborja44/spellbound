'use client';

import { geistMono } from '@/fonts';
import { useGameActions, useScore, useWordHistory } from '@/store/game-store';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const Score = () => {
	const [pendingPoints, setPendingPoints] = useState<number | null>(null);

	const score = useScore();
	const wordHistory = useWordHistory();
	const { setScore } = useGameActions();

	useEffect(() => {
		if (!wordHistory.length) {
			return;
		}

		const newWord = wordHistory[wordHistory.length - 1];
		const points = newWord.score;
		setPendingPoints(newWord.score);

		// Trigger score count up after animation
		setTimeout(() => {
			setScore(score + points);
		}, 1600);
	}, [wordHistory]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='flex flex-col gap-0.5 justify-center game-header-h'>
			<span className='uppercase font-bold text-sm text-slate-400'>Score</span>
			<div className={`container-row relative w-fit ${geistMono.className}`}>
				<CountUp
					className={`relative uppercase font-black text-2xl leading-5 z-10`}
					preserveValue
					start={0}
					end={score}
					duration={4}
					useEasing
				/>
				<AnimatePresence>
					{pendingPoints && (
						<motion.div
							key={pendingPoints}
							initial={{ opacity: 1, x: 0 }}
							animate={{ opacity: 0, x: -15 }}
							exit={{ opacity: 0 }}
							transition={{
								delay: 1, // pause before exiting
								duration: 0.8,
								ease: 'easeOut',
							}}
							className='absolute left-full ml-4 text-green-400 font-bold -z-10'
						>
							+{pendingPoints}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Score;
