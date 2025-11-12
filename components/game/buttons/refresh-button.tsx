'use client';

import { RefreshCw } from 'lucide-react';
import ActionButton from './action-button';

const RefreshButton = () => {
	const handleRefresh = () => {
		// TODO
	};

	return (
		<ActionButton onClick={handleRefresh} icon={RefreshCw}>
			Refresh
		</ActionButton>
	);
};

export default RefreshButton;
