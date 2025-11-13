'use client';

import { geistMono } from '@/fonts';
import useGameStore from '@/store/game-store';
import CountUp from 'react-countup';

const InfoBar = () => {
	const score = useGameStore((state) => state.score);

	return (
		<div className='flex flex-col gap-1 w-fit min-w-18'>
			<div className='flex flex-col justify-center game-header-h'>
				<span className='uppercase font-bold text-sm text-slate-400'>
					Score
				</span>
				<CountUp
					className={`uppercase font-black text-2xl leading-5 ${geistMono.className}`}
					preserveValue
					end={score}
				/>
			</div>
		</div>
	);
};

export default InfoBar;
