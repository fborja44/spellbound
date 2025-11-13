import ActionBar from '@/components/game/action-bar';
import Board from '@/components/game/board';
import InfoBar from '@/components/game/info-bar';
import WordDisplay from '@/components/game/word-display';

export default function Home() {
	return (
		<main className='flex flex-row items-stretch justify-center gap-4 p-24 w-full'>
			<ActionBar />
			<div className='container-col gap-2.5'>
				<WordDisplay />
				<Board />
			</div>
			<InfoBar />
		</main>
	);
}
