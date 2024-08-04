import { useState } from 'react';
import Input from '../../../components/base/Input';
import images from '../../../components/image/imageGalery';
import Button from '../../../components/base/Button';
import Spinner from '../../../components/base/Spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useUserStore from '../../../store/useUserStore';

export default function Login() {
	const [show, setShow] = useState('password');
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { login } = useUserStore();

	const handleShowPassword = () => {
		if (show === 'password') {
			return setShow('text');
		}
		setShow('password');
	};

	const apiURL = 'http://localhost:5000/api/login';

	const handleLogin = async (values) => {
		setLoading(true);
		setError('');

		try {
			const response = await axios.post(apiURL, {
				email: values.email,
				password: values.password,
			});

			// Perbarui state user menggunakan fungsi login dari useUserStore
			login(response.data.user); // Perhatikan bahwa user di sini harus ada pada respons dari API

			// Simpan token di localStorage untuk otentikasi selanjutnya
			localStorage.setItem('token', response.data.token);

			alert('Login berhasil');
			navigate('/');
		} catch (err) {
			setError('Email atau password salah');
			console.error('Error saat login', err);
		} finally {
			setLoading(false);
		}
	};

	const goToRegisterPage = () => {
		navigate('/register');
	};

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email format.').required('Required'),
		password: Yup.string().required('Required'),
	});

	return (
		<main className='flex flex-col items-center py-6 gap-y-6 font-poppins'>
			<a href='/'>
				<img src={images?.logoPeriplusLogin} alt='Periplus Logo' />
			</a>
			<div className='relative border border-gray-300 rounded w-[24%] px-3 py-5'>
				<h1 className='font-bold text-orange-400 text-2xl'>
					Sign In to Your Account
				</h1>
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={validationSchema}
					onSubmit={handleLogin}
				>
					{({ isSubmitting }) => (
						<Form className='flex flex-col gap-y-2'>
							<div className='flex flex-col'>
								<label htmlFor='email' className='font-bold'>
									E-mail:
								</label>
								<Field
									as={Input}
									name='email'
									type='email'
									id='email'
									className='border border-gray-300 rounded mt-1 w-full'
								/>
								<div className='h-6'>
									<ErrorMessage
										name='email'
										component='div'
										className='text-red-500 h-8'
									/>
								</div>
							</div>
							<div className='flex flex-col'>
								<label htmlFor='password' className='font-bold'>
									Password:
								</label>
								<Field
									as={Input}
									name='password'
									type={show}
									id='password'
									className='border border-gray-300 rounded mt-1 w-full'
								/>
								<div className='h-6'>
									<ErrorMessage
										name='password'
										component='div'
										className='text-red-500'
									/>
								</div>
							</div>
							<span
								className='absolute right-6 bottom-[52%] text-sm cursor-pointer'
								onClick={handleShowPassword}
							>
								Show
							</span>
							{error && <p className='text-red-500'>{error}</p>}
							<Button
								type='submit'
								className='hover:bg-blue-800 bg-blue-600 hover:text-yellow-400 text-white w-full py-1 text-center font-semibold rounded mb-3'
							>
								{loading || isSubmitting ? (
									<Spinner />
								) : (
									'Login'
								)}
							</Button>
						</Form>
					)}
				</Formik>
				<p className='text-blue-700 text-sm'>
					You don&#39;t have an account yet?
					<span
						className='ml-2 hover:underline cursor-pointer'
						onClick={goToRegisterPage}
					>
						Register here
					</span>
				</p>
				<p className='text-blue-700 text-sm cursor-pointer hover:underline'>
					Forgot your password?
				</p>
				<div className='flex flex-col items-center mt-2'>
					<p className='text-gray-500 font-bold text-sm'>
						Or Login With
					</p>
					<Button
						className='mt-2'
						onClick={() => window.alert('Login with Google')}
					>
						<img src={images?.googleBtn} alt='' />
					</Button>
				</div>
			</div>
		</main>
	);
}
