import { useEffect, useState } from 'react';
import images from '../../components/image/imageGalery'; // Assuming you have imported your images correctly
import Footer from '../../components/module/footer';
import Navbar from '../../components/module/navbar';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout';
import {
	getUserCart,
	removeUserCart,
	updateUserCart,
} from '../../../services/cartService';
import { formatIDR } from '../../utils/formatIDR';

export default function Cart() {
	const [cartItems, setCartItems] = useState([]);
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const userCartData = await getUserCart();
				setCartItems(userCartData);
			} catch (error) {
				console.error('Error fetching user cart data.', error);
			}
		};
		fetchCartItems();
	}, []);

	const handleRemove = (cartId) => {
		// console.log(cartId);
		removeUserCart(cartId);
		setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
	};

	const handleQuantityChange = (id, newQuantity) => {
		// Update quantity for the item
		setCartItems(
			cartItems.map((item) =>
				item.cart_id === id ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	const handleUpdateCart = async () => {
		try {
			await Promise.all(
				cartItems.map(async (item) => {
					await updateUserCart(item.product_id, item.quantity);
				})
			);
			console.log('Cart update successfully.');
		} catch (error) {
			console.error('Error updating cart items.');
		}
	};

	const subtotal = cartItems.reduce((acc, item) => {
		const price = parseFloat(item.Product.price);
		const discount = parseFloat(item.Product.discount);
		const discountedPrice = price * (1 - discount); // Harga setelah diskon
		const quantity = parseFloat(item.quantity);
		const totalPrice = discountedPrice * quantity; // Total harga setelah diskon dikalikan dengan quantity

		return acc + totalPrice;
	}, 0);

	return (
		<Layout>
			<Navbar />
			<div
				className='flex flex-col pt-[150px] bg-white p-8 font-poppins'
				style={{
					backgroundImage: `url(${images?.mainBg})`,
				}}
			>
				<div className=''>
					{cartItems.map((item) => {
						const price = parseFloat(item.Product.price);
						const discount = parseFloat(item.Product.discount);
						const discountedPrice = price * (1 - discount);

						const point = Math.round((discountedPrice / 1000) * 2);

						return (
							<div
								key={item.cart_id}
								className='flex justify-between h-[220px] items-center bg-white shadow-md p-4 mb-2 xl:max-w-[70%] xl:mx-auto'
							>
								<div>
									<img
										src={item.Product.image_path}
										alt={item.Product.product_name}
										className='w-40 h-40'
									/>
								</div>
								<div className='flex-col justify-between ml-4 flex-grow'>
									<p className='font-bold text-lg mb-2'>
										{item.Product.product_name}
									</p>
									<div className='text-gray-900 text-sm'>
										{formatIDR(discountedPrice)} or {point}{' '}
										Points
									</div>
									<div className='flex items-center mt-4'>
										<div className='w-12 text-center border border-gray-300 text-gray-500'>
											<button
												className='w-full h-full  py-2'
												onClick={() =>
													handleQuantityChange(
														item.cart_id,
														item.quantity - 1
													)
												}
												disabled={item.quantity <= 1}
											>
												-
											</button>
										</div>
										<div className='w-12 text-gray-500 text-center border border-gray-300 py-2'>
											{item.quantity}
										</div>
										<div className='w-12 text-center border border-gray-300  text-gray-500'>
											<button
												className='w-full h-full py-2'
												onClick={() =>
													handleQuantityChange(
														item.cart_id,
														item.quantity + 1
													)
												}
											>
												+
											</button>
										</div>
									</div>
									<button
										onClick={() =>
											handleRemove(item.cart_id)
										}
										className='bg-gray-300 text-gray-700 px-7 py-1 mt-4 hover:bg-orange-400 hover:text-white text-xs transition duration-300 ease-in-out'
									>
										REMOVE
									</button>
								</div>
							</div>
						);
					})}
					<div className='flex justify-between items-center bg-white shadow-md p-4 xl:max-w-[70%] xl:mx-auto'>
						<div className='flex space-x-4'>
							<button
								onClick={handleUpdateCart}
								className='hover:text-gray-800 px-4 py-2 mt-4 text-sm font-bold'
							>
								UPDATE
							</button>
							<button onClick={() => navigate('/')} className='bg-gray-700 text-white px-4 py-2 mt-4 hover:bg-orange-400 text-sm font-bold transition duration-300 ease-in-out'>
								CONTINUE SHOPPING
							</button>
						</div>
						<div className='w-1/5'>
							<div className='flex flex-col space-y-4 items-end'>
								<div className='flex w-full justify-between'>
									<div>
										<span className=''>Sub-Total:</span>
									</div>
									<div>
										<span className=''>
											{' '}
											{formatIDR(subtotal)}
										</span>
									</div>
								</div>
								<div className='flex w-full justify-between'>
									<div>
										<span className=''>Total:</span>
									</div>
									<div>
										<span className=''>
											{' '}
											{formatIDR(subtotal)}
										</span>
									</div>
								</div>
								<button className='w-full bg-gray-700 text-white px-4 py-2 mt-4 hover:bg-orange-400 text-sm transition duration-300 ease-in-out'>
									CHECKOUT
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</Layout>
	);
}
