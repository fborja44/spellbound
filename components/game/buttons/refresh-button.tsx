'use client';

import { RefreshCw } from 'lucide-react';
import ActionButton from './action-button';
import useGameStore from '@/store/game-store';

const RefreshButton = () => {
	const randomizeBoard = useGameStore((state) => state.randomizeBoard);

	const handleRefresh = () => {
		randomizeBoard(true);
		// TODO: Use energy
	};

	return (
		<ActionButton onClick={handleRefresh} icon={RefreshCw}>
			Refresh
		</ActionButton>
	);
};

export default RefreshButton;
