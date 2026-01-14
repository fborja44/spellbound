import type { Cell } from '@/lib/validators/game-state';
import {
	useIsCompleted,
	useIsSwapping,
	useSelectedCells,
} from '@/store/game-store';
import { AnimatePresence } from 'motion/react';
import SwapDialog from '../dialogs/swap-dialog';
import Tile from './tile';

export interface CellControls {
	handleMouseDown?: () => void;
	handleMouseEnter?: () => void;
	handleTouchMove?: (e: React.TouchEvent<HTMLButtonElement>) => void;
}

interface CellProps extends CellControls {
	id: string;
	cell: Cell;
	row: number;
	col: number;
	index: number;
}

const Cell = ({
	id,
	row,
	col,
	cell,
	handleMouseDown,
	handleMouseEnter,
	handleTouchMove,
}: CellProps) => {
	const selectedCells = useSelectedCells();
	const isCompleted = useIsCompleted();
	const isSwapping = useIsSwapping();

	const isSelected = selectedCells.some((c) => c.row === row && c.col === col);
	const { letter, isCharged, bonus } = cell;

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
				<div className='size-fit'>
					<Tile
						id={id}
						letter={letter}
						isCharged={isCharged}
						bonus={bonus}
						variant={
							isSwapping
								? 'cell-swapping'
								: isSelected
								? 'cell-selected'
								: 'cell'
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
				</div>
			</SwapDialog>
		</AnimatePresence>
	);
};

export default Cell;
