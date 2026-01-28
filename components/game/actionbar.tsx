'use client';

import RefreshButton from './buttons/refresh-button';
import SwapButton from './buttons/swap-button';
import EnergyBar from './info/energy';
import Rounds from './info/rounds';
import { useIsCompleted } from '@/store/game-store';
import FadeDiv from '../animate/fade-div';

const ActionBar = () => {
	const isCompleted = useIsCompleted();

	return (
		!isCompleted && (
			<FadeDiv
				key={`actionbar-${!isCompleted}`}
				className='hidden sm:flex flex-col items-center gap-3 min-w-18 w-18 max-h-game'
			>
				<div className={`flex flex-row items-end h-game-header`}>
					<Rounds />
				</div>
				<EnergyBar />
				<RefreshButton />
				<SwapButton />
			</FadeDiv>
		)
	);
};

export default ActionBar;
