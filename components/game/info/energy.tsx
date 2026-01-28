'use client';

import { MAX_ENERGY } from '@/constants/game';
import { cn } from '@/lib/utils';
import { useEnergy } from '@/store/game-store';
import { Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface EnergyBarProps {
	direction?: 'horizontal' | 'vertical';
}

const EnergyBar = ({ direction = 'vertical' }: EnergyBarProps) => {
	const energy = useEnergy();

	return (
		<div
			className={cn(
				'flex gap-2 sm:gap-1.5 flex-1 w-full h-full',
				direction === 'vertical' ? 'flex-col-reverse' : 'flex-row',
			)}
		>
			{[...Array(MAX_ENERGY)].map((_, index) => (
				<EnergyCell
					direction={direction}
					key={index}
					isFilled={index < energy}
					index={index}
				/>
			))}
		</div>
	);
};

export default EnergyBar;

interface EnergyCellProps {
	isFilled?: boolean;
	index: number;
	direction: 'horizontal' | 'vertical';
}

const EnergyCell = ({ isFilled, direction }: EnergyCellProps) => {
	const bgClass = isFilled ? 'bg-purple-600' : 'bg-slate-900';

	return (
		<div
			className={cn(
				`container-center rounded-[6px] sm:rounded flex-1 transition-colors duration-300`,
				bgClass,
				direction === 'vertical' ? 'w-full' : 'h-full',
			)}
		>
			{isFilled && (
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0, opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Zap
						className={cn('size-4 sm:size-3.5 text-purple-900 fill-purple-900')}
					/>
				</motion.div>
			)}
		</div>
	);
};
