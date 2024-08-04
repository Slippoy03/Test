import { create } from 'zustand';

const useProductStore = create((set) => {
	products = [];
	setProducts = (productData) => set({ products : productData });
});
