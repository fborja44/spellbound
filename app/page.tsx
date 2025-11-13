import ActionBar from '@/components/game/action-bar';
import Board from '@/components/game/board';
import WordDisplay from '@/components/game/word-display';

export default function Home() {
	return (
		<main className='flex flex-row items-stretch justify-center gap-4 p-24 w-full'>
			<ActionBar />
			<div className='container-col gap-2.5'>
				<WordDisplay />
				<Board />
			</div>
			<div className='flex flex-col gap-1 w-fit min-w-18'>
				<div className='flex flex-col justify-center game-header-h'>
					<span className='uppercase font-bold text-sm text-slate-400'>
						Score
					</span>
					<span className='uppercase font-bold text-2xl leading-5'>0</span>
				</div>
			</div>
		</main>
	);
}
