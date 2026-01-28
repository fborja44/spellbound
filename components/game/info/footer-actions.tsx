import RefreshButton from '../buttons/refresh-button';
import SwapButton from '../buttons/swap-button';

const FooterActions = () => {
	return (
		<div className='flex flex-row items-center justify-center sm:hidden gap-8 relative pt-4'>
			<RefreshButton />
			<SwapButton />
		</div>
	);
};

export default FooterActions;
