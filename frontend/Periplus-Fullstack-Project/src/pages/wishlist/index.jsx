import { useEffect, useState } from 'react';
import images from '../../components/image/imageGalery';
import Footer from '../../components/module/footer';
import Navbar from '../../components/module/navbar';
import Sidebar from './sidebar';
import Layout from '../layout';
import {
	getUserWishlist,
	removeUserWishlist,
} from '../../../services/wishlistService';
import { formatIDR } from '../../utils/formatIDR';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

export default function Wishlist() {
	const [wishlistItem, setWishlistItem] = useState([]);
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return format(date, 'dd MMMM yyyy', { locale: id });
	};

	useEffect(() => {
		const fetchWishlistItem = async () => {
			try {
				const userWishlistData = await getUserWishlist();
				console.log(userWishlistData);
				setWishlistItem(userWishlistData);
			} catch (error) {
				console.error('Error fetching user wishlist data', error);
			}
		};
		fetchWishlistItem();
	}, []);

	const handleRemove = (wishlistId) => {
		removeUserWishlist(wishlistId);
		setWishlistItem(
			wishlistItem.filter((item) => item.wishlist_id !== wishlistId)
		);
	};

	return (
		<Layout>
			<Navbar />
			<div
				className='flex justify-center pt-[150px] bg-white p-8 font-poppins'
				style={{ backgroundImage: `url(${images?.mainBg})` }}
			>
				<div className='flex xl:w-[70%]'>
					<Sidebar />
					<div className='max-w-2xl mx-auto ml-8 w-3/4'>
						<div className='bg-white p-4 shadow-md rounded mb-8'>
							<h1 className='text-2xl font-bold mb-4'>
								My Wish List
							</h1>
						</div>
						<div className='bg-white p-4 shadow-md rounded mb-8'>
							<div className='flex items-center'>
								<input
									type='text'
									placeholder='Enter name or e-mail'
									className='p-2 border border-gray-300 rounded w-64 mr-2'
								/>
								<button className='w-24 bg-blue-500 text-white p-2 rounded'>
									GO!
								</button>
							</div>
							<p className='text-blue-500 text-left mt-2'>
								Find someone&apos;s Wish List
							</p>
						</div>
						{wishlistItem.map((item) => (
							<div
								key={item.product_id}
								className='bg-white border rounded-lg p-4 mb-8 shadow-md'
							>
								<div className='flex'>
									<img
										src={item.Product.image_path}
										alt={item.product_id}
										className='w-24 h-32 object-cover mr-4'
									/>
									<div className='flex-1 gap-6'>
										<h2 className='text-xl font-semibold'>
											{item.Product.product_name}
										</h2>
										<p>{item.Product.coverType}</p>
										<p>{item.Product.author1}</p>
										<p className='text-gray-700'>
											{formatIDR(item.Product.price)}
										</p>

										{/* Rating coming soon */}
										{/* <div className='flex items-center'>
											{Array(5)
												.fill()
												.map((_, i) => (
													<svg
														key={i}
														className={`w-5 h-5 ${
															i < item.rating
																? 'text-yellow-500'
																: 'text-gray-300'
														}`}
														fill='currentColor'
														viewBox='0 0 20 20'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.566 4.823a1 1 0 00.95.69h5.036c.97 0 1.371 1.24.588 1.81l-4.073 2.957a1 1 0 00-.364 1.118l1.566 4.823c.3.921-.755 1.688-1.539 1.118L10 15.417l-4.073 2.957c-.784.57-1.838-.197-1.539-1.118l1.566-4.823a1 1 0 00-.364-1.118L1.518 10.25c-.783-.57-.382-1.81.588-1.81h5.036a1 1 0 00.95-.69l1.566-4.823z' />
													</svg>
												))}
										</div> */}

										<p className='text-gray-500'>
											Added {formatDate(item.updatedAt)}
										</p>

										{/* Sharing coming soon */}
										{/* <div className='flex items-center mt-2'>
											<p className='mr-2'>
												Shared this item?
											</p>
											<input
												type='checkbox'
												checked={item.shared}
												readOnly
												className='h-4 w-4'
											/>
										</div> */}
										<div className='flex mt-2'>
											{/* Edit wihslist coming soon */}
											{/* <button className='bg-white text-black p-2 rounded mr-2'>
												EDIT
											</button> */}

											<button
												onClick={() =>
													handleRemove(
														item.wishlist_id
													)
												}
												className='bg-black text-white p-2 rounded hover:bg-gray-800 transition duration-300 ease-in-out'
											>
												DELETE
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</Layout>
	);
}
