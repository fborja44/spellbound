'use client';

import { useIsCompleted } from '@/store/game-store';
import Score from './info/score';
import WordHistory from './info/word-history';
import FadeDiv from '../animate/fade-div';

const InfoBar = () => {
	const isCompleted = useIsCompleted();

	return (
		!isCompleted && (
			<FadeDiv
				id={`infobar-${!isCompleted}`}
				className='hidden sm:flex flex-col gap-1 min-w-18 w-18 max-h-game'
			>
				<Score />
				<WordHistory />
			</FadeDiv>
		)
	);
};

export default InfoBar;
