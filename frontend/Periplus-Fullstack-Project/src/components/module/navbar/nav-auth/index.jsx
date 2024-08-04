import { useNavigate } from 'react-router-dom';
import Button from '../../../base/Button';
import useUserStore from '../../../../store/useUserStore';
import { useEffect, useState } from 'react';
import Dropdown from './dropdown/dropdown-menu.jsx';
import {
	guestDropdownItems,
	userDropDownItems,
} from '../../../../../services/listMenuDropdown.js';
import { fetchUserData } from '../../../../../services/userService.js';
import { getUserCart } from '../../../../../services/cartService.js';

const NavAuth = () => {
	const [cartItemCount, setCartItemCount] = useState(0);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [hideTimeout, setHideTimeout] = useState(null);
	const dropdownUser = userDropDownItems;
	const dropdownGuest = guestDropdownItems;
	const navigate = useNavigate();

	const { isAuthenticated, user, login, logout } = useUserStore(
		(state) => state
	);

	const fetchData = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const userData = await fetchUserData(token);
				// console.log(userData)
				login(userData); // Login dengan data pengguna yang diambil dari API
			} catch (error) {
				console.error('Error fetching user data', error);
				logout();
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const fetchCartItemCount = async () => {
			try {
				const cartData = await getUserCart();
				const itemCount = cartData.length;
				setCartItemCount(itemCount);
			} catch (error) {
				console.error('Error fetching user cart data');
			}
		};
		fetchCartItemCount();
	}, []);

	const handleMouseEnter = () => {
		if (hideTimeout) {
			clearTimeout(hideTimeout);
			setHideTimeout(null);
		}
		setIsDropdownVisible(true);
	};

	const handleMouseLeave = () => {
		const timeout = setTimeout(() => {
			setIsDropdownVisible(false);
		}, 300);
		setHideTimeout(timeout);
	};

	const handleNavigation = (path) => {
		navigate(path);
		setIsDropdownVisible(false); // Menutup dropdown setelah navigasi
	};

	const handleLogout = () => {
		logout();
		localStorage.removeItem('token');
		navigate('/login');
	};

	// console.log('User state:', user);

	return (
		<div className='hidden xl:flex gap-x-3 items-center w-100 hover:text-orange-200'>
			<div onClick={() => navigate('/wishlist')}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='#fff'
					className='size-6 cursor-pointer hover:stroke-orange-200'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
					/>
				</svg>
			</div>
			<div
				className='relative xl:mx-2'
				onClick={() => navigate('/mycart')}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='#fff'
					className='size-6 cursor-pointer hover:stroke-orange-200'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
					/>
				</svg>
				<Button
					className={
						'bg-white text-red-500 rounded-full absolute -top-2 -right-3 xl:w-5 xl:h-5 text-xs text-center'
					}
				>
					{cartItemCount}
				</Button>
			</div>
			<div
				className='flex fill-white text-white cursor-pointer w-full text-nowrap items-center hover:fill-orange-200 hover:text-orange-200'
				// onClick={() => navigate('/login')}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					className='size-8'
				>
					<path
						fillRule='evenodd'
						d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
						clipRule='evenodd'
					/>
				</svg>
				<small className='font-semibold'>
					{isAuthenticated && user
						? `Hi, ${user.user_fname}`
						: 'Sign in'}
				</small>
				{isDropdownVisible && (
					<Dropdown
						items={isAuthenticated ? dropdownUser : dropdownGuest}
						handleNavigation={handleNavigation}
						handleLogout={handleLogout}
						isAuthenticated={isAuthenticated}
					/>
				)}
			</div>
		</div>
	);
};

export default NavAuth;
