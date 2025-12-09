import { Sparkles } from 'lucide-react';
import NewGameButton from '../buttons/new-game-button';
import Link from 'next/link';

const Header = () => {
	return (
		<header className='container-row justify-between h-16 px-4 w-full'>
			<Link href='/'>
				<h1 className='container-row gap-2 font-bold text-xl hover:text-yellow-200 transtion-colors duration-200'>
					<Sparkles strokeWidth={2.5} fill='white' />
					<span>spellbound</span>
					<small className='bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full text-xs font-bold'>
						alpha v0.5.0
					</small>
				</h1>
			</Link>
			<div className='container-row gap-2'>
				{/* <Button variant='ghost' size='sm' disabled>
					<span>Join Game</span>
				</Button> */}
				{/* <Button size='icon-sm' variant='outline'>
					<CircleQuestionMark />
				</Button> */}
				<NewGameButton />
				{/* <Avatar className='size-10 text-gray-400'>
					<AvatarImage src='' />
					<AvatarFallback>
						<User className='size-5' />
					</AvatarFallback>
				</Avatar> */}
			</div>
		</header>
	);
};

export default Header;
