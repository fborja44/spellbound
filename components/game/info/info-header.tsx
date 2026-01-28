import Rounds from './rounds';
import Score from './score';

const InfoHeader = () => {
	return (
		<div className='flex flex-row items-center sm:hidden justify-between w-full h-fit'>
			<Score />
			<Rounds />
		</div>
	);
};

export default InfoHeader;
