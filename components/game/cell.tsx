import { Letter } from '@/lib/validators/game-state';
import type { Cell } from '@/lib/validators/game-state';
import useGameStore from '@/store/game-store';
import { AnimatePresence } from 'motion/react';
import SwapDialog from '../dialogs/SwapDialog';
import Tile from './tile';

interface CellProps {
	letter: Letter;
	isCharged?: boolean;
	bonus?: Cell['bonus'];
	row: number;
	col: number;
	index: number;
}

const Cell = ({ letter, isCharged, bonus, row, col, index }: CellProps) => {
	const selectedCells = useGameStore((state) => state.selectedCells);
	const isCompleted = useGameStore((state) => state.isCompleted);
	const isSwapping = useGameStore((state) => state.isSwapping);

	const isSelected = selectedCells.some((c) => c.row === row && c.col === col);

	return (
		<AnimatePresence mode='wait'>
			<SwapDialog
				prevCell={{
					letter,
					isCharged: !!isCharged,
					bonus,
				}}
				row={row}
				col={col}
			>
				<Tile
					key={`${row}-${col}-${letter.char}`}
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
						duration: 0.5,
						delay: col * 0.04 + row * 0.04,
					}}
					disabled={isCompleted || !isSwapping}
				/>
			</SwapDialog>
		</AnimatePresence>
	);
};

export default Cell;
