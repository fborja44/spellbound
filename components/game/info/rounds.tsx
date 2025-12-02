import useGameStore from '@/store/game-store';
import { Timer } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const Rounds = () => {
	const round = useGameStore((state) => state.round);
	const maxRounds = useGameStore((state) => state.maxRounds);

	return (
		<div className='container-row gap-1'>
			<Timer className='size-6 stroke-3 text-slate-400' />
			<div className='min-w-11'>
				<AnimatePresence mode='wait'>
					<motion.span
						key={`round-${round}`}
						initial={{ opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 50, opacity: 0 }}
						transition={{
							duration: 0.5,
						}}
					>
						{round}
					</motion.span>
				</AnimatePresence>
				/
				<AnimatePresence mode='wait'>
					<motion.span
						key={`max-${maxRounds}`}
						initial={{ opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 50, opacity: 0 }}
						transition={{
							duration: 0.5,
						}}
					>
						{maxRounds}
					</motion.span>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Rounds;
