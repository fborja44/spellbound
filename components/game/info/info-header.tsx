import EnergyBar from './energy';
import Rounds from './rounds';
import Score from './score';

const InfoHeader = () => {
	return (
		<div className='flex flex-row items-center sm:hidden justify-between gap-9 w-full h-fit'>
			<Score />
			<EnergyBar direction='horizontal' />
			<Rounds />
		</div>
	);
};

export default InfoHeader;
