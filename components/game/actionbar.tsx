'use client';

import RefreshButton from './buttons/refresh-button';
import SwapButton from './buttons/swap-button';
import EnergyBar from './info/energy';
import { geistMono } from '@/fonts';
import Rounds from './info/rounds';

const ActionBar = () => {
	return (
		<div className='container-col gap-3 min-w-18'>
			<div
				className={`flex flex-row items-end game-header-h text-2xl font-black ${geistMono.className}`}
			>
				<Rounds />
			</div>
			<EnergyBar />
			<RefreshButton />
			<SwapButton />
		</div>
	);
};

export default ActionBar;
