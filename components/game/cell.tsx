import { Letter } from '@/lib/validators/game-state';
import type { Cell } from '@/lib/validators/game-state';
import useGameStore from '@/store/game-store';
import { AnimatePresence } from 'motion/react';
import SwapDialog from '../dialogs/SwapDialog';
import Tile from './tile';

export interface CellControls {
	handleMouseDown: () => void;
	handleMouseEnter: () => void;
	handleTouchMove: (e: React.TouchEvent<HTMLButtonElement>) => void;
}

interface CellProps extends CellControls {
	id: string;
	letter: Letter;
	isCharged?: boolean;
	bonus?: Cell['bonus'];
	row: number;
	col: number;
	index: number;
}

const Cell = ({
	id,
	letter,
	isCharged,
	bonus,
	row,
	col,
	handleMouseDown,
	handleMouseEnter,
	handleTouchMove,
}: CellProps) => {
	const selectedCells = useGameStore((state) => state.selectedCells);
	const isCompleted = useGameStore((state) => state.isCompleted);
	const isSwapping = useGameStore((state) => state.isSwapping);

	const isSelected = selectedCells.some((c) => c.row === row && c.col === col);

	return (
		<AnimatePresence mode='wait'>
			<SwapDialog
				key={`${row}-${col}-${letter.char}`}
				prevCell={{
					letter,
					isCharged: !!isCharged,
					bonus,
				}}
				row={row}
				col={col}
			>
				<Tile
					id={id}
					letter={letter}
					isCharged={isCharged}
					bonus={bonus}
					variant={
						isSwapping ? 'cell-swapping' : isSelected ? 'cell-selected' : 'cell'
					}
					initial={{ opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 50, opacity: 0 }}
					transition={{
						duration: 0.75,
						delay: col * 0.055 + row * 0.055,
					}}
					disabled={isCompleted}
					className='hover:cursor-pointer'
					handleMouseDown={handleMouseDown}
					handleMouseEnter={handleMouseEnter}
					handleTouchMove={handleTouchMove}
				/>
			</SwapDialog>
		</AnimatePresence>
	);
};

export default Cell;
