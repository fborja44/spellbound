'use client';

import useGameStore from '@/store/game-store';
import Cell from './cell';
import { useEffect } from 'react';

const Board = () => {
	const board = useGameStore((state) => state.board);
	const randomizeBoard = useGameStore((state) => state.randomizeBoard);

	useEffect(() => {
		randomizeBoard();
	}, [randomizeBoard]);

	return (
		<section className='grid grid-cols-5 grid-rows-5 gap-5'>
			{board.flat().map((cell, index) => (
				<Cell
					row={Math.floor(index / 5)}
					col={index % 5}
					key={index}
					letter={cell.letter}
					isCharged={cell.isCharged}
					bonus={cell.bonus}
				/>
			))}
		</section>
	);
};

export default Board;
