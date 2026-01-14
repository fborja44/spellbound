import { AnimatePresence, MotionProps } from 'motion/react';
import FadeDiv from './fade-div';

interface FadeProps extends MotionProps {
	children?: React.ReactNode;
	className?: string;
	duration?: number;
	delay?: number;
	show: boolean;
	id?: string;
}

const Fade = ({
	children,
	className,
	duration = 0.75,
	delay = 0,
	show,
	id,
	...props
}: FadeProps) => {
	return (
		<AnimatePresence mode='wait'>
			{show && (
				<FadeDiv
					key={id}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					duration={duration}
					delay={delay}
					className={className}
					{...props}
				>
					{children}
				</FadeDiv>
			)}
		</AnimatePresence>
	);
};

export default Fade;
