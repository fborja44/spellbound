import ActionBar from '@/components/game/actionbar';
import Board from '@/components/game/board';
import GameFooter from '@/components/game/info/game-footer';
import InfoBar from '@/components/game/infobar';
import WordDisplay from '@/components/game/word-display';

export default function Home() {
	return (
		<main className='container-col w-full p-24 gap-4'>
			<div className='flex flex-row items-stretch justify-center gap-4 w-full'>
				<ActionBar />
				<div className='container-col gap-2.5'>
					<WordDisplay />
					<Board />
				</div>
				<InfoBar />
			</div>
			<div className='container-row p-1'>
				<GameFooter />
			</div>
		</main>
	);
}
