/* eslint-disable react/prop-types */
import Button from '../../../base/Button';
import images from '../../../image/imageGalery';
import { addToCart } from '../../../../../services/cartService';
import { addToWishlist } from '../../../../../services/wishlistService';

const BookShipping = ({ product, buyQuantity, setBuyQuantity }) => {
	const addToCartHandler = async () => {
		try {
			const result = await addToCart(product.product_id, buyQuantity);
			console.log(result);
			alert('Product successfully added to your cart!');
		} catch (error) {
			console.error(error);
			alert('Failed to add product to your cart!');
		}
	};

	const addToWishlistHandler = async () => {
		try {
			const result = await addToWishlist(product.product_id);
			console.log(result);
			alert('Product successfully added to your wishlist!');
		} catch (error) {
			console.error(error);
			alert('Failed to add product to your wishlist!');
		}
	};

	return (
		<div>
			<div className='px-7 xl:px-5 xl:py-2 font-poppins bg-gray-50 '>
				<div className='px-3 py-4 xl:py-0'>
					<div className='flex gap-x-5 xl:justify-between md:justify-center'>
						<img
							src={images?.airplane}
							alt=''
							className='object-fit xl:w-16 xl:h-8 md:w-10 md:h-8'
						/>
						<div>
							<p className='font-semibold text-gray-800'>
								Free Shipping.
							</p>
							<small className='text-gray-500 text-xs'>
								*Terms and Condition
							</small>
						</div>
					</div>
					<div className='flex flex-col items-center gap-y-5 mt-8'>
						<p className='text-sm'>Delivered in:</p>
						<div className='flex flex-col gap-y-3'>
							<p className='font-semibold text-sm'>
								3 -7 business days (Others)
							</p>
							<div className='flex justify-center items-center'>
								<div className='w-12 text-center border border-gray-300 text-gray-500'>
									<button
										className='w-full h-full  py-2'
										disabled={buyQuantity <= 1}
										onClick={() =>
											setBuyQuantity(
												(current) => current - 1
											)
										}
									>
										-
									</button>
								</div>
								<div className='w-12 text-gray-500 text-center border border-gray-300 py-2'>
									{buyQuantity}
								</div>
								<div className='w-12 text-center border border-gray-300  text-gray-500'>
									<button
										className='w-full h-full py-2'
										// sesuaikan jika quantity nya melebihi product quantity
										// disabled={buyQuantity <= product quantity}
										onClick={() =>
											setBuyQuantity(
												(current) => current + 1
											)
										}
									>
										+
									</button>
								</div>
							</div>
							<div className='flex flex-col gap-y-1 items-center'>
								<Button
									className={
										'xl:px-6 xl:py-[7px] bg-blue-600 px-9 py-[7px] text-xs font-semibold text-white hover:bg-orange-400 hover:text-white transition-colors duration-300'
									}
									onClick={addToCartHandler}
								>
									ADD TO CART
								</Button>
								<Button
									className={
										'xl:px-4 xl:py-[7px] bg-gray-200 px-7 py-[7px] text-xs font-semibold text-black hover:bg-orange-400 hover:text-white transition-colors duration-300'
									}
									onClick={addToWishlistHandler}
								>
									ADD TO WISHLIST
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className='flex justify-center w-full h-10 items-center gap-x-3 font-poppins mt-4'>
					<p className='text-sm'>Share: </p>
					<img
						src={images?.fbicon}
						alt=''
						className='w-5 h-5  cursor-pointer'
					/>
					<img
						src={images?.twittericon}
						alt=''
						className='w-5 h-5  cursor-pointer'
					/>
					<img
						src={images?.email}
						alt=''
						className='w-5 h-5  cursor-pointer'
					/>
					<img
						src={images?.whatsappicon}
						alt=''
						className='w-5 h-5  cursor-pointer'
					/>
				</div>
			</div>
		</div>
	);
};
export default BookShipping;
