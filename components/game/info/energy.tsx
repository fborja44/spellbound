'use client';

import { MAX_ENERGY } from '@/constants/game';
import { useEnergy } from '@/store/game-store';
import { Zap } from 'lucide-react';
import { motion } from 'motion/react';

const EnergyBar = () => {
	const energy = useEnergy();

	return (
		<div className='flex flex-col-reverse gap-1.5 flex-1 w-full h-full'>
			{[...Array(MAX_ENERGY)].map((_, index) => (
				<EnergyCell key={index} isFilled={index < energy} index={index} />
			))}
		</div>
	);
};

export default EnergyBar;

interface EnergyCellProps {
	isFilled?: boolean;
	index: number;
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
					transition={{ duration: 0.5 }}
				>
					<Zap className='size-3.5 text-purple-900 fill-purple-900' />
				</motion.div>
			)}
		</div>
	);
};
