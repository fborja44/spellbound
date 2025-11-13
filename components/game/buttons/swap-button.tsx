'use client';

import { Shuffle } from 'lucide-react';
import ActionButton from './action-button';

const SwapButton = () => {
	const handleSwap = () => {
		// TODO
	};

	return (
		<ActionButton onClick={handleSwap} icon={Shuffle} cost={3}>
			<span>Swap</span>
		</ActionButton>
	);
};

export default SwapButton;
