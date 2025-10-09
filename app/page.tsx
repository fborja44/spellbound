import Board from '@/components/game/board';

export default function Home() {
	return (
		<main className='flex flex-col items-center justify-between p-24'>
			<div className='container-col gap-6'>
				<div className='container-row justify-center border-3 border-gray-800 bg-gray-900 w-full h-14 rounded-lg px-4 text-3xl font-bold tracking-wider uppercase'>
					<span>Hello</span>
				</div>
				<Board />
			</div>
		</main>
	);
}
