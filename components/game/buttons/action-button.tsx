'use client';

import { ElementType } from 'react';

interface ActionButtonProps {
	onClick?: () => void;
	icon: ElementType;
	children: React.ReactNode;
}

const ActionButton = ({ onClick, icon: Icon, children }: ActionButtonProps) => {
	return (
		<button
			onClick={onClick}
			className='flex flex-col items-center gap-1 uppercase text-base font-bold tracking-wider'
		>
			<Icon className='size-12 stroke-3' />
			<span>{children}</span>
		</button>
	);
};

export default ActionButton;
