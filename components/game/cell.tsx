import { Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Letter } from '@/constants/letters';
import { Badge } from '../ui/badge';

interface CellProps {
	letter: Letter;
	isCharged?: boolean;
	bonus?: 'DL';
}

const Cell = ({ letter, isCharged, bonus }: CellProps) => {
	return (
		<Button
			variant='ghost'
			className='relative container-center text-3xl font-bold border-4 border-gray-300 text-gray-300 size-18 rounded-md'
		>
			<p>{letter.char}</p>
			<small className='absolute bottom-0 right-1 text-sm tracking-tighter leading-tight'>
				{letter.score}
			</small>
			{isCharged && (
				<small className='absolute bottom-0.5 left-0.5 text-sm text-violet-500'>
					<Zap
						className='size-3'
						stroke='none'
						fill='oklch(60.6% 0.25 292.717)'
					/>
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
