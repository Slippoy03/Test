import { create } from 'zustand';

const useCartStore = create((set) => ({
	cartItems: [],
	addItemToCart: (item) =>
		set((state) => ({
			cartItems: [...state.cartItems, item],
		})),
	removeItemFromCart: (itemId) =>
		set((state) => ({
			cartItems: state.cartItems.filter((item) => item.id !== itemId),
		})),
}));

export default useCartStore;
