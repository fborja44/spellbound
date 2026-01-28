'use client';

import { geistMono } from '@/fonts';
import { Word as WordType } from '@/lib/validators/game-state';
import {
	useGameActions,
	useMaxRounds,
	useWordHistory,
} from '@/store/game-store';
import { motion } from 'motion/react';
import CountUp from 'react-countup';
import { Separator } from '../ui/separator';
import { SendHorizonal, Sparkles } from 'lucide-react';
import FadeDiv from '../animate/fade-div';
import { Button } from '../ui/button';
import Word from './word';

const BASE_DELAY = 0.5;

const Results = () => {
	const wordHistory = useWordHistory();
	const maxRounds = useMaxRounds();
	const { startNewGame } = useGameActions();

	const scoreDelay = BASE_DELAY * wordHistory.length;

	const handleNewGame = () => {
		startNewGame(maxRounds);
	};

	return (
		<div className='container-col gap-2 py-2 w-full uppercase'>
			<h3 className='font-bold text-slate-400'>Your Words</h3>
			<div className='container-col min-w-full gap-6'>
				<ol className='flex flex-col items-center w-full gap-4 text-lg py-4'>
					{wordHistory.map((word, index) => (
						<WordItem key={`result-word-${index}`} word={word} index={index} />
					))}
				</ol>
				<FadeDiv delay={scoreDelay} className='w-full board-w'>
					<Separator className='h-0.5! rounded-full bg-slate-800' />
				</FadeDiv>
				<FadeDiv
					delay={scoreDelay}
					className={`container-row justify-between font-extrabold w-full board-w`}
				>
					<div className='container-row gap-2'>
						<Sparkles strokeWidth={2.5} className='size-7  text-purple-500' />
						<span className='text-3xl text-purple-500'>Total</span>
					</div>
					<CountUp
						className={`relative uppercase font-black text-4xl leading-5 ${geistMono.className}`}
						preserveValue
						start={0}
						end={wordHistory.reduce((acc, word) => acc + word.score, 0)}
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
	word: WordType;
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
			className='relative container-row justify-between gap-4 font-extrabold'
		>
			<div className='container-row gap-2'>
				{/* <span className='text-slate-500'>{index + 1}.</span> */}
				<Word word={word} />
			</div>
			<span
				className={`absolute left-full ml-4 text-yellow-200 ${geistMono.className}`}
			>
				+{word.score}
			</span>
		</motion.li>
	);
};
