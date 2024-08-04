import { useState } from 'react';
import Button from '../../../base/Button';
import Input from '../../../base/Input';
import SelectOption from '../../../base/Select';

const NavSearch = () => {
	const [query, setQuery] = useState('');
	const [categories, setCategories] = useState('');
	const options = [
		{
			title: 'All categories',
			value: 'all',
		},
		{
			title: 'Books',
			value: 'books',
		},
		{
			title: 'Magazine',
			value: 'magazine',
		},
		{
			title: 'Toys',
			value: 'toys',
		},
	];
	const handleSearch = (e) => {
		setQuery(e?.target?.value);
	};
	const handleCategories = (e) => {
		setCategories(e?.target?.value);
		alert(e?.target?.value);
	};
	return (
		<div className='flex items-center w-full bg-white xl:max-w-[550px] rounded xl:mr-20'>
			<div className='hidden text-gray-500 xl:block xl:px-2 py-[4px] rounded-l cursor-pointer xl:mt-[1px] outline-none'>
				<SelectOption
					onChange={(e) => handleCategories(e)}
					className={'px-1 py-1 bg-transparent cursor-pointer'}
				>
					{options?.map((item, i) => (
						<option
							key={i}
							value={item?.value}
							className='font-poppins'
						>
							{item?.title}
						</option>
					))}
				</SelectOption>
			</div>
			<Input
				className={
					'xl:px-5 xl:py-[7px] xl:mt-[1px] outline-none rounded-l xl:-ml-1 xl:w-96 w-72 px-2 py-2 md:w-[700px] bg-transparent'
				}
				onChange={(e) => handleSearch(e)}
				name='search'
				type='text'
				placeholder='Search by title / author / ISBN here...'
			/>
			<Button
				onClick={() => alert(`Seach for ${query}`)}
				className={
					'xl:-ml-3 xl:mt-[1px] xl:py-[6px] xl:px-4 py-[6.5px] mt-[1px] px-4 hover:bg-orange-400'
				}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='#fff'
					className='size-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
					/>
				</svg>
			</Button>
		</div>
	);
};
export default NavSearch;
