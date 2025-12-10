import { Word as WordType } from '@/lib/validators/game-state';
import Tile from './tile';

interface WordProps {
	word: WordType;
}

const Word = ({ word }: WordProps) => {
	return (
		<div className='container-row gap-2'>
			{word.tiles.map((tile, i) => (
				<Tile
					key={`word-${i}`}
					letter={tile.letter}
					bonus={tile.bonus}
					isCharged={tile.isCharged}
					size='sm'
					disabled
				/>
			))}
		</div>
	);
};

export default Word;
