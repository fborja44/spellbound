import { Zap } from 'lucide-react';

const MAX_ENERGY = 10;

interface EnergyBarProps {
	amount: number;
}

const EnergyBar = ({ amount }: EnergyBarProps) => {
	return (
		<div className='container-col gap-1.5 flex-1 w-full h-full'>
			{[...Array(MAX_ENERGY)].map((_, index) => (
				<EnergyCell key={index} isFilled={MAX_ENERGY - index <= amount} />
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
		<div className={`container-center rounded ${bgClass} flex-1 w-full`}>
			{isFilled && <Zap className='size-4 text-purple-900 fill-purple-900' />}
		</div>
	);
};
