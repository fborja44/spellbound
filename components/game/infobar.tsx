'use client';

import useGameStore from '@/store/game-store';
import Fade from '../animate/Fade';
import Score from './info/score';
import WordHistory from './info/word-history';

const InfoBar = () => {
	const isCompleted = useGameStore((state) => state.isCompleted);

	return (
		<Fade
			id={`infobar-${isCompleted}`}
			show={!isCompleted}
			className='flex flex-col gap-1 min-w-18 w-18'
		>
			<Score />
			<WordHistory />
		</Fade>
	);
};

export default InfoBar;
