import { motion, MotionProps } from 'motion/react';
import { Button } from '../ui/button';
import { Bonus, Letter } from '@/lib/validators/game-state';
import { CellControls } from './cell';
import { calculateLetterScore, cn } from '@/lib/utils';
import { Zap } from 'lucide-react';
import { Badge } from '../ui/badge';
import { geistMono } from '@/fonts';

interface TileProps extends MotionProps, CellControls {
	id?: string;
	letter: Letter;
	isCharged?: boolean;
	bonus?: Bonus;
	variant?: 'cell-swapping' | 'cell-selected' | 'cell';
	disabled?: boolean;
	onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	size?: 'sm' | 'lg';
}

const MotionButton = motion.create(Button);
const MotionBadge = motion.create(Badge);

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
	size = 'lg',
	...props
}: TileProps) => {
	const buttonStyles = {
		sm: 'text-3xl font-extrabold border-4 size-14 rounded-md',
		lg: 'text-4xl font-extrabold border-5 size-18 rounded-lg',
	};

	const scoreStyles = {
		sm: 'text-xs bottom-0 right-[3px]',
		lg: 'text-base bottom-0 right-1',
	};

	const badgeStyles = {
		sm: 'size-5.5 -top-2 -left-2.5 text-[10px] font-black border-2',
		lg: 'size-7 -top-2.5 -left-3 text-sm font-black',
	};

	return (
		<MotionButton
			id={id}
			variant={variant}
			className={cn(
				'relative container-center',
				buttonStyles[size],
				disabled && onClick ? 'opacity-50' : '',
				className
			)}
			disabled={disabled}
			onClick={onClick}
			onMouseDown={handleMouseDown}
			onMouseEnter={handleMouseEnter}
			onTouchStart={handleMouseDown}
			onTouchMove={handleTouchMove}
			{...props}
		>
			<p>{letter.char}</p>
			<small
				className={cn(
					scoreStyles[size],
					`absolute font-bold tracking-tighter leading-tight ${
						geistMono.className
					} ${bonus === 'TL' ? 'text-green-400' : ''}`
				)}
			>
				{calculateLetterScore(letter, bonus)}
			</small>
			{isCharged && (
				<small className='absolute bottom-0.5 left-0.5 text-sm text-violet-500'>
					<Zap className='size-3.5 fill-violet-500' />
				</small>
			)}
			{bonus && (
				<MotionBadge
					variant={bonus}
					className={cn(badgeStyles[size], 'absolute rounded-full uppercase')}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						duration: 0.75,
					}}
				>
					{bonus}
				</MotionBadge>
			)}
		</MotionButton>
	);
};

export default Tile;
