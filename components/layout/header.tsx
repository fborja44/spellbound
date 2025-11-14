import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const Header = () => {
	return (
		<header className='container-row justify-between h-16 px-4'>
			<h1 className='container-row gap-2 font-bold text-xl'>
				<Sparkles />
				<span>spellbound</span>
			</h1>
			<div className='container-row gap-4'>
				{/* <Button variant='ghost' size='sm' disabled>
					<span>Join Game</span>
				</Button> */}
				<Button size='sm'>
					<span>New Game</span>
				</Button>
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
