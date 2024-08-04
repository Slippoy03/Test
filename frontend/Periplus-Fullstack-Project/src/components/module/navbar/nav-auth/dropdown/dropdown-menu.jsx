import DropdownItem from './dropdown-item';

const Dropdown = ({
	items,
	handleNavigation,
	handleLogout,
	isAuthenticated,
}) => {
	return (
		<div className='bg-main-red text-white shadow-md rounded-md px-10 py-4 absolute top-28 right-56 z-10'>
			<ul>
				{items.map((item, index) => (
					<DropdownItem
						key={index}
						label={item.label}
						onClick={() => handleNavigation(item.path)}
					/>
				))}
				{isAuthenticated && (
					<DropdownItem
						label='Log Out'
						onClick={() => handleLogout()}
					/>
				)}
			</ul>
		</div>
	);
};

export default Dropdown;
