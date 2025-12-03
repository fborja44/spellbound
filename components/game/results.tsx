'use client';

import { geistMono } from '@/fonts';
import { Word } from '@/lib/validators/game-state';
import useGameStore from '@/store/game-store';
import { motion } from 'motion/react';
import CountUp from 'react-countup';
import { Separator } from '../ui/separator';
import { SendHorizonal, Sparkles } from 'lucide-react';
import FadeDiv from '../animate/FadeDiv';
import { Button } from '../ui/button';
import { hasBonus } from '@/lib/utils';

const BASE_DELAY = 0.5;

const Results = () => {
	const wordHistory = useGameStore((state) => state.wordHistory);
	const score = useGameStore((state) => state.score);
	const maxRounds = useGameStore((state) => state.maxRounds);
	const startNewGame = useGameStore((state) => state.startNewGame);

	const scoreDelay = BASE_DELAY * wordHistory.length;

	const handleNewGame = () => {
		startNewGame(maxRounds);
	};

	return (
		<div className='container-col gap-2 py-2 w-full uppercase'>
			<h3 className='font-bold text-slate-400'>Submitted Words</h3>
			<div className='container-col w-4/5 gap-7'>
				<ol className='flex flex-col w-full gap-3 text-lg'>
					{wordHistory.map((word, index) => (
						<WordItem key={`result-word-${index}`} word={word} index={index} />
					))}
				</ol>
				<FadeDiv delay={scoreDelay} className='w-full'>
					<Separator className='h-0.5! rounded-full bg-slate-800' />
				</FadeDiv>
				<FadeDiv
					delay={scoreDelay}
					className={`container-row justify-between font-extrabold w-full`}
				>
					<div className='container-row gap-2'>
						<Sparkles strokeWidth={2.5} className='size-7  text-purple-500' />
						<span className='text-3xl text-purple-500'>Total</span>
					</div>
					<CountUp
						className={`relative uppercase font-black text-4xl leading-5 ${geistMono.className}`}
						preserveValue
						start={0}
						end={score}
						duration={4}
						delay={scoreDelay}
						useEasing
					/>
				</FadeDiv>
			</div>
			<Button
				className='my-10 uppercase text-2xl font-extrabold px-6! gap-3 h-14'
				size='lg'
				onClick={handleNewGame}
			>
				<span>Play Again</span>
				<SendHorizonal className='size-6' strokeWidth={3} />
			</Button>
		</div>
	);
};

export default Results;

interface WordItemProps {
	word: Word;
	index: number;
}

const WordItem = ({ word, index }: WordItemProps) => {
	return (
		<motion.li
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				duration: 0.75,
				delay: BASE_DELAY * index,
			}}
			className='container-row justify-between font-extrabold'
		>
			<div className='container-row gap-2'>
				<span className='text-slate-500'>{index + 1}.</span>
				<span>{word.word}</span>
				{hasBonus(word.tiles, 'DL') && (
					<span className='text-green-400 text-xs font-bold'>DL</span>
				)}
				{hasBonus(word.tiles, '2X') && (
					<span className='text-red-400 text-xs font-bold'>2X</span>
				)}
			</div>
			<span className={`text-yellow-200 ${geistMono.className}`}>
				+{word.score}
			</span>
		</motion.li>
	);
};
