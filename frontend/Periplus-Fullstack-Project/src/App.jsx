import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/landing-page';
import DetailBooks from './pages/detail-books';
import Required from './configs/middleware';
import Wishlist from './pages/wishlist';
import Cart from './pages/cart';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

const router = createBrowserRouter([
	{ path: '/', element: <Home /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },

	{ path: '/detail/:product_id', element: <DetailBooks /> },
	{
		element: <Required />,
		children: [
			{
				path: '/mycart',
				element: <Cart />,
			},
			{ path: '/wishlist', element: <Wishlist /> },
		],
	},
]);

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
