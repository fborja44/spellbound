'use client';

import { Word } from '@/lib/validators/game-state';
import useGameStore from '@/store/game-store';
import { motion } from 'motion/react';

const WordHistory = () => {
	const wordHistory = useGameStore((state) => state.wordHistory);

	return (
		<div className='flex flex-col gap-2'>
			{wordHistory.map((word, i) => (
				<Entry key={`history-entry-${i}`} word={word} round={i + 1} />
			))}
		</div>
	);
};

export default WordHistory;

interface EntryProps {
	word: Word;
	round: number;
}

const Entry = ({ word }: EntryProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 15 }}
			animate={{ opacity: 0.5, x: 0 }}
			transition={{
				delay: 1,
				duration: 0.8,
				ease: 'easeOut',
			}}
			className='relative flex flex-row gap-1 h-4.5 max-w-full text-slate-400 font-medium opacity-50 hover:opacity-100! hover:text-yellow-200 transition-opacity duration-150'
		>
			<span className='absolute whitespace-nowrap inline-block'>
				{word.word} +{word.score}
			</span>
		</motion.div>
	);
};
