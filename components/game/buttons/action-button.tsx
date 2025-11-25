'use client';

import { Badge } from '@/components/ui/badge';
import useGameStore from '@/store/game-store';
import { ElementType } from 'react';

interface ActionButtonProps {
	onClick?: () => void;
	icon: ElementType;
	cost?: number;
	spend?: boolean;
	children: React.ReactNode;
	isSelected?: boolean;
}

const ActionButton = ({
	onClick,
	icon: Icon,
	cost,
	spend,
	children,
	isSelected,
}: ActionButtonProps) => {
	const energy = useGameStore((store) => store.energy);
	const changeEnergy = useGameStore((store) => store.changeEnergy);

	return (
		<button
			onClick={() => {
				if (onClick) {
					onClick();
				}
				if (spend) {
					changeEnergy(-(cost ?? 0));
				}
			}}
			className={`relative flex flex-col items-center gap-1 uppercase text-base font-bold tracking-wider not-disabled:hover:cursor-pointer disabled:opacity-50 w-full transition-colors ${
				isSelected ? 'text-yellow-200' : 'text-inherit'
			}`}
			disabled={cost ? energy < cost : false}
		>
			<Icon className='size-12 stroke-3' />
			<span>{children}</span>
			{cost && (
				<Badge className='rounded-full absolute left-0 top-0 bg-purple-600 text-foreground font-bold size-5'>
					{cost}
				</Badge>
			)}
		</button>
	);
};

export default ActionButton;
