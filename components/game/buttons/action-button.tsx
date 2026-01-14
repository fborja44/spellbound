'use client';

import { Badge } from '@/components/ui/badge';
import { useEnergy, useGameActions, useIsCompleted } from '@/store/game-store';
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
	spend = true,
	children,
	isSelected,
}: ActionButtonProps) => {
	const energy = useEnergy();
	const isCompleted = useIsCompleted();
	const { changeEnergy } = useGameActions();

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
				isSelected ? 'text-purple-300' : 'text-inherit hover:text-yellow-200'
			}`}
			disabled={(cost ? energy < cost : false) || isCompleted}
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
