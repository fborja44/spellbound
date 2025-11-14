import Score from './info/score';

const InfoBar = () => {
	return (
		<div className='flex flex-col gap-1 w-fit min-w-18'>
			<Score />
		</div>
	);
};

export default InfoBar;
