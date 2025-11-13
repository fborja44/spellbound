'use client';

import { MAX_ENERGY } from '@/constants/game';
import useGameStore from '@/store/game-store';
import { Zap } from 'lucide-react';
import { motion } from 'motion/react';

const EnergyBar = () => {
	const energy = useGameStore((store) => store.energy);

	return (
		<div className='container-col gap-1.5 flex-1 w-full h-full'>
			{[...Array(MAX_ENERGY)].map((_, index) => (
				<EnergyCell key={index} isFilled={MAX_ENERGY - index <= energy} />
			))}
		</div>
	);
};

export default EnergyBar;

interface EnergyCellProps {
	isFilled?: boolean;
}

const EnergyCell = ({ isFilled }: EnergyCellProps) => {
	const bgClass = isFilled ? 'bg-purple-600' : 'bg-slate-900';

	return (
		<div
			className={`container-center rounded ${bgClass} flex-1 w-full transition-colors duration-300`}
		>
			{isFilled && (
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0, opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<Zap className='size-3.5 text-purple-900 fill-purple-900' />
				</motion.div>
			)}
		</div>
	);
};
