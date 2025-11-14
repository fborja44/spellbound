import Score from './info/score';
import WordHistory from './info/word-history';

const InfoBar = () => {
	return (
		<div className='flex flex-col gap-1 w-fit min-w-18'>
			<Score />
			<WordHistory />
		</div>
	);
};

export default InfoBar;
