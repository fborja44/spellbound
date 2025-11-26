import { motion, MotionProps } from 'motion/react';
import { Button } from '../ui/button';
import { Cell, Letter } from '@/lib/validators/game-state';
import { Badge } from '../ui/badge';
import { Zap } from 'lucide-react';
import { CellControls } from './cell';
import { cn } from '@/lib/utils';

interface TileProps extends MotionProps, CellControls {
	id?: string;
	letter: Letter;
	variant?: 'cell-swapping' | 'cell-selected' | 'cell';
	disabled?: boolean;
	isCharged?: boolean;
	bonus?: Cell['bonus'];
	onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
}

const MotionButton = motion.create(Button);

const Tile = ({
	id,
	letter,
	isCharged,
	bonus,
	onClick,
	variant = 'cell',
	disabled,
	handleMouseDown,
	handleMouseEnter,
	handleTouchMove,
	className,
	...props
}: TileProps) => {
	return (
		<MotionButton
			id={id}
			variant={variant}
			className={cn(
				`relative container-center text-4xl font-extrabold border-5 size-18 rounded-lg`,
				className
			)}
			disabled={disabled}
			{...props}
			onClick={onClick}
			onMouseDown={handleMouseDown}
			onMouseEnter={handleMouseEnter}
			onTouchStart={handleMouseDown}
			onTouchMove={handleTouchMove}
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
