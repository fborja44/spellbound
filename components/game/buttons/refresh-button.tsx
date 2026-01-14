'use client';

import { RefreshCw } from 'lucide-react';
import ActionButton from './action-button';
import { useGameActions } from '@/store/game-store';

const RefreshButton = () => {
	const { randomizeBoard } = useGameActions();

	const handleRefresh = () => {
		randomizeBoard(true);
	};

	return (
		<ActionButton onClick={handleRefresh} icon={RefreshCw} cost={1}>
			Refresh
		</ActionButton>
	);
};

export default RefreshButton;
