'use client';

import { LETTERS } from '@/constants/letters';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import Tile from '../game/tile';
import { useGameActions, useIsSwapping } from '@/store/game-store';
import { Cell, Letter } from '@/lib/validators/game-state';
import { useState } from 'react';

interface SwapDialogProps {
	prevCell: Cell;
	row: number;
	col: number;
	children: React.ReactNode;
}

const SwapDialog = ({ prevCell, row, col, children }: SwapDialogProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const isSwapping = useIsSwapping();
	const { changeEnergy, setCell, setIsSwapping } = useGameActions();

	const handleSwap = (newLetter: Letter) => {
		if (newLetter.char === prevCell.letter.char) return;
		setCell(row, col, {
			letter: newLetter,
			bonus: prevCell.bonus,
			isCharged: prevCell.isCharged,
		});
		changeEnergy(-3);
		setIsOpen(false);
		setIsSwapping(false);
	};

	return (
		<Dialog open={isOpen}>
			<DialogTrigger
				asChild
				onClick={() => {
					if (!isSwapping) return;
					setIsOpen(true);
				}}
			>
				{children}
			</DialogTrigger>
			<DialogContent
				className='bg-transparent border-transparent w-[900px]'
				showCloseButton={false}
			>
				<DialogHeader>
					<DialogTitle className='w-full text-center text-3xl font-bold text-white'>
						Select A New Letter
					</DialogTitle>
					<DialogDescription className='hidden'>
						Select the letter to swap for.
					</DialogDescription>
				</DialogHeader>
				<div className='flex flex-wrap items-center justify-center gap-2'>
					{Object.values(LETTERS)
						.filter((letter) => letter.score > 0)
						.map((letter) => (
							<Tile
								key={`swap-${letter.char}`}
								letter={letter}
								onClick={() => handleSwap(letter)}
								disabled={prevCell.letter.char === letter.char}
							/>
						))}
				</div>
				<DialogFooter className='container-row sm:justify-center justify-center w-full'>
					<DialogClose asChild>
						<Button
							onClick={() => setIsOpen(false)}
							className='uppercase font-bold bg-white hover:opacity-100'
						>
							Cancel
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SwapDialog;
