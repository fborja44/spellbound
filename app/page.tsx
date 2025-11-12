import Board from '@/components/game/board';
import RefreshButton from '@/components/game/buttons/refresh-button';
import SwapButton from '@/components/game/buttons/swap-button';
import EnergyBar from '@/components/game/energy-bar';
import WordDisplay from '@/components/game/word-display';
import { Timer } from 'lucide-react';

export default function Home() {
	return (
		<main className='flex flex-row items-stretch justify-center gap-4 p-24 w-full'>
			<div className='container-col gap-3 min-w-20'>
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
			<div className='container-col gap-2.5'>
				<WordDisplay />
				<Board />
			</div>
			<div className='flex flex-col gap-1 w-fit min-w-20'>
				<div className='flex flex-col justify-center game-header-h'>
					<span className='uppercase font-bold text-sm text-slate-400'>
						Score
					</span>
					<span className='uppercase font-bold text-2xl leading-5'>0</span>
				</div>
			</div>
		</main>
	);
}
