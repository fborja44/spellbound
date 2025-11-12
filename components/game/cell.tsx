import { Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Letter } from '@/lib/validators/game-state';
import type { Cell } from '@/lib/validators/game-state';
import useGameStore from '@/store/game-store';

interface CellProps {
	letter: Letter;
	isCharged?: boolean;
	bonus?: Cell['bonus'];
	row: number;
	col: number;
}

const Cell = ({ letter, isCharged, bonus, row, col }: CellProps) => {
	const selectedCells = useGameStore((state) => state.selectedCells);

	const isSelected = selectedCells.some((c) => c.row === row && c.col === col);

	return (
		<Button
			variant={isSelected ? 'cell-selected' : 'cell'}
			className='relative container-center text-4xl font-extrabold border-5 size-18 rounded-lg'
		>
			<p>{letter.char}</p>
			<small className='absolute bottom-0 right-1 text-base font-medium tracking-tighter leading-tight'>
				{letter.score}
			</small>
			{isCharged && (
				<small className='absolute bottom-0.5 left-0.5 text-sm text-violet-500'>
					<Zap className='size-3.5 fill-violet-500' />
				</small>
			)}
			{bonus === 'DL' && (
				<Badge
					variant='double'
					className='absolute -top-2.5 -left-2.5 size-6 rounded-full font-bold uppercase'
				>
					DL
				</Badge>
			)}
		</Button>
	);
};

export default Cell;
