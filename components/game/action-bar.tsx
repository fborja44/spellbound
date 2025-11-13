import { Timer } from 'lucide-react';
import RefreshButton from './buttons/refresh-button';
import SwapButton from './buttons/swap-button';
import EnergyBar from './energy-bar';

const ActionBar = () => {
	return (
		<div className='container-col gap-3 min-w-18'>
			<div className='flex flex-row items-end game-header-h text-2xl font-extrabold'>
				<div className='container-row gap-1'>
					<Timer className='size-6 stroke-3 text-slate-400' />
					<span>3/4</span>
				</div>
			</div>
			<EnergyBar amount={0} />
			<RefreshButton />
			<SwapButton />
		</div>
	);
};

export default ActionBar;
