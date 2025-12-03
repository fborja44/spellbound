'use client';

import RefreshButton from './buttons/refresh-button';
import SwapButton from './buttons/swap-button';
import EnergyBar from './info/energy';
import { geistMono } from '@/fonts';
import Rounds from './info/rounds';
import useGameStore from '@/store/game-store';
import FadeDiv from '../animate/fade-div';

const ActionBar = () => {
	const isCompleted = useGameStore((state) => state.isCompleted);

	return (
		!isCompleted && (
			<FadeDiv
				key={`actionbar-${!isCompleted}`}
				className='container-col gap-3 min-w-18 w-18 max-h-game'
			>
				<div
					className={`flex flex-row items-end game-header-h text-2xl font-black ${geistMono.className}`}
				>
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
