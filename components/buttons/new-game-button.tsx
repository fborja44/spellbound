'use client';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import useGameStore from '@/store/game-store';
import { Plus } from 'lucide-react';
import { MAX_ROUNDS } from '@/constants/game';

const NewGameButton = () => {
	const [maxRounds, setMaxRounds] = useState(5);
	const [open, setOpen] = useState(false);

	const startNewGame = useGameStore((state) => state.startNewGame);

	const handleNewGame = () => {
		startNewGame(maxRounds);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm'>
					<span>New Game</span>
					<Plus />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-80'
				align='end'
				sideOffset={10}
				onOpenAutoFocus={(e) => {
					e.preventDefault();
				}}
			>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h4 className='leading-none font-medium'>Start A New Game</h4>
						<p className='text-muted-foreground text-sm'>
							Begin a new game of Spellbound.
						</p>
					</div>
					<div className='grid gap-2'>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='width'>Max Rounds</Label>
							<Input
								id='width'
								type='number'
								value={maxRounds}
								min={3}
								max={MAX_ROUNDS}
								className='col-span-2 h-8'
								autoFocus={false}
								onChange={(ev) => {
									const value = ev.target.value;
									// Attempt to convert the string to a number
									const numValue = Number(value);

									if (!isNaN(numValue) && Number.isFinite(numValue)) {
										if (numValue < 3) {
											setMaxRounds(3);
										} else if (numValue > MAX_ROUNDS) {
											setMaxRounds(MAX_ROUNDS);
										} else {
											setMaxRounds(numValue);
										}
									}
								}}
							/>
						</div>
					</div>
					<div className='grid gap-2'>
						<Button variant='outline' onClick={handleNewGame}>
							Start Game
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default NewGameButton;
