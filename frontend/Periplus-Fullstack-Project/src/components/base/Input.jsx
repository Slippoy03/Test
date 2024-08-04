import clsx from 'clsx';

const Input = ({ className, error, ...props }) => {
	return (
		<input
			{...props}
			className={clsx(
				`px-5 py-[7px] mt-[1px] outline-none rounded-l w-80`,
				className
			)}
		/>
	);
};

export default Input;
