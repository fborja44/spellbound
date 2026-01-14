'use client';

import { Shuffle } from 'lucide-react';
import ActionButton from './action-button';
import { useGameActions, useIsSwapping } from '@/store/game-store';

const SwapButton = () => {
	const isSwapping = useIsSwapping();
	const { setIsSwapping } = useGameActions();

	const handleSwap = () => {
		setIsSwapping(!isSwapping);
	};

	return (
		<ActionButton
			onClick={handleSwap}
			icon={Shuffle}
			cost={3}
			spend={false}
			isSelected={isSwapping}
		>
			<span>Swap</span>
		</ActionButton>
	);
};

export default SwapButton;
