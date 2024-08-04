import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../../../components/base/Input';
import images from '../../../components/image/imageGalery';
import Button from '../../../components/base/Button';
import Spinner from '../../../components/base/Spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
	const navigate = useNavigate();
	const apiURL = 'http://localhost:5000/api/register';
	const config = {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		},
	};

	const initialValue = {
		email: '',
		user_fname: '',
		user_lname: '',
		password: '',
		confirm_password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email format').required('Required'),
		user_fname: Yup.string().required('Required'),
		user_lname: Yup.string().required('Required'),
		password: Yup.string().required('Required'),
		confirm_password: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.required('Required'),
	});

	const onSubmit = async (values, { setSubmitting, setFieldError }) => {
		try {
			const response = await axios.post(apiURL, values, config);
			alert('Registration successful');
			navigate('/login');
		} catch (error) {
			setFieldError(
				'Submit',
				'Registration failed. Please check your details.'
			);
			console.error('Registration error.', error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<main className='flex flex-col items-center py-6 gap-y-6 font-poppins'>
			<a href='/'>
				<img src={images?.logoPeriplusLogin} alt='Periplus Logo' />
			</a>
			<div className='relative border border-gray-300 rounded w-[24%] px-3 py-5'>
				<h1 className='font-bold text-orange-400 text-2xl'>
					Account Registration
				</h1>
				<Formik
					initialValues={initialValue}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ isSubmitting }) => (
						<Form className='flex flex-col gap-y-2'>
							<div className='flex flex-col'>
								<label htmlFor='email' className='font-bold'>
									E-mail:
								</label>
								<Field
									as={Input}
									type='email'
									id='email'
									name='email'
									className='border border-gray-300 rounded mt-1 w-full'
								/>
								<div className='h-6'>
									<ErrorMessage
										name='email'
										component='p'
										className='text-red-500'
									/>
								</div>
							</div>

							<div className='flex flex-col'>
								<label
									htmlFor='user_fname'
									className='font-bold'
								>
									First Name:
								</label>
								<Field
									as={Input}
									type='text'
									id='user_fname'
									name='user_fname'
									className='border border-gray-300 rounded mt-1 w-full'
								/>
								<div className='h-6'>
									<ErrorMessage
										name='user_fname'
										component='p'
										className='text-red-500'
									/>
								</div>
							</div>

							<div className='flex flex-col'>
								<label
									htmlFor='user_lname'
									className='font-bold'
								>
									Last Name:
								</label>
								<Field
									as={Input}
									type='text'
									id='user_lname'
									name='user_lname'
									className='border border-gray-300 rounded mt-1 w-full'
								/>
								<div className='h-6'>
									<ErrorMessage
										name='user_lname'
										component='p'
										className='text-red-500'
									/>
								</div>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='password' className='font-bold'>
									Password:
								</label>
								<Field
									as={Input}
									type='password'
									id='password'
									name='password'
									className='border border-gray-300 rounded mt-1 w-full'
								/>
								<div className='h-6'>
									<ErrorMessage
										name='password'
										component='p'
										className='text-red-500'
									/>
								</div>
							</div>

							<div className='flex flex-col'>
								<label
									htmlFor='confirm_password'
									className='font-bold'
								>
									Re-type Password:
								</label>
								<Field
									as={Input}
									type='password'
									id='confirm_password'
									name='confirm_password'
									className='border border-gray-300 rounded mt-1 w-full'
								/>
								<div className='h-6'>
									<ErrorMessage
										name='confirm_password'
										component='p'
										className='text-red-500'
									/>
								</div>
							</div>

							<Button
								type='submit'
								className='hover:bg-blue-800 bg-blue-600 hover:text-yellow-400 text-white w-full py-1 text-center font-semibold rounded mb-3'
								disabled={isSubmitting}
							>
								{isSubmitting ? <Spinner /> : 'Register'}
							</Button>

							<ErrorMessage
								name='submit'
								component='p'
								className='text-red-500'
							/>
						</Form>
					)}
				</Formik>
			</div>
		</main>
	);
}
