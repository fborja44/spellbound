'use client';

import { Shuffle } from 'lucide-react';
import ActionButton from './action-button';
import useGameStore from '@/store/game-store';

const SwapButton = () => {
	const isSwapping = useGameStore((state) => state.setIsSwapping);
	const setIsSwapping = useGameStore((state) => state.setIsSwapping);
	const handleSwap = () => {
		setIsSwapping(!isSwapping); // ?
	};

	return (
		<ActionButton onClick={handleSwap} icon={Shuffle} cost={3}>
			<span>Swap</span>
		</ActionButton>
	);
};

export default SwapButton;
