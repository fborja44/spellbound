import Board from '@/components/game/board';
import RefreshButton from '@/components/game/buttons/refresh-button';
import SwapButton from '@/components/game/buttons/swap-button';
import EnergyBar from '@/components/game/energy-bar';
import WordDisplay from '@/components/game/word-display';
import { Timer } from 'lucide-react';

export default function Home() {
	return (
		<main className='flex flex-row items-stretch justify-center gap-4 p-24 w-full'>
			<div className='container-col gap-3 w-20'>
				<div className='flex flex-row items-end gap-1 game-header-h text-2xl font-extrabold'>
					<Timer className='size-7 stroke-3' />
					<span>3/4</span>
				</div>
				<EnergyBar amount={0} />
				<RefreshButton />
				<SwapButton />
			</div>
			<div className='container-col gap-2.5'>
				<WordDisplay />
				<Board />
			</div>
		</main>
	);
}
