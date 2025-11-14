import { Sparkles } from 'lucide-react';
import NewGameButton from '../buttons/new-game-button';
import Link from 'next/link';

const Header = () => {
	return (
		<header className='container-row justify-between h-16 px-4'>
			<Link href='/'>
				<h1 className='container-row gap-2 font-bold text-xl hover:text-yellow-200 transtion-colors duration-200'>
					<Sparkles />
					<span>spellbound</span>
				</h1>
			</Link>
			<div className='container-row gap-4'>
				{/* <Button variant='ghost' size='sm' disabled>
					<span>Join Game</span>
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
