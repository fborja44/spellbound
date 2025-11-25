import { motion, MotionProps } from 'motion/react';
import { Button } from '../ui/button';
import { Cell, Letter } from '@/lib/validators/game-state';
import { Badge } from '../ui/badge';
import { Zap } from 'lucide-react';

interface TileProps extends MotionProps {
	letter: Letter;
	variant?: 'cell-swapping' | 'cell-selected' | 'cell';
	disabled?: boolean;
	isCharged?: boolean;
	bonus?: Cell['bonus'];
	onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const MotionButton = motion(Button);

const Tile = ({
	letter,
	isCharged,
	bonus,
	onClick,
	variant = 'cell',
	disabled,
	...props
}: TileProps) => {
	return (
		<MotionButton
			variant={variant}
			className='relative container-center text-4xl font-extrabold border-5 size-18 rounded-lg'
			disabled={disabled}
			{...props}
			onClick={onClick}
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
		</MotionButton>
	);
};

export default Tile;
