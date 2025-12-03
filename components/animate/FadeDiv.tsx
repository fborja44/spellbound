import { motion, MotionProps } from 'motion/react';

interface FadeDivProps extends MotionProps {
	children?: React.ReactNode;
	className?: string;
	duration?: number;
	delay?: number;
	id?: string;
}

const FadeDiv = ({
	children,
	className,
	duration = 0.75,
	delay = 0,
	id,
	...props
}: FadeDivProps) => {
	return (
		<motion.div
			key={id}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				duration,
				delay,
			}}
			className={className}
			{...props}
		>
			{children}
		</motion.div>
	);
};

export default FadeDiv;
