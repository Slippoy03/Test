const DropdownItem = ({ label, onClick }) => {
	return (
		<li
			className='text-sm px-3 py-2 cursor-pointer hover:text-orange-200 hover:translate-x-4 duration-300'
			onClick={onClick}
		>
			{label}
		</li>
	);
};

export default DropdownItem;
