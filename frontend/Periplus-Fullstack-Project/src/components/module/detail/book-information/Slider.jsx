/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import images from '../../../image/imageGalery';
import { useSlideShow } from '../../../../hooks/useSlideShow';
import { useEffect, useState } from 'react';
import { fetchProductDetail } from '../../../../../services/productService';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

function PrevArrow({ onClick }) {
	return (
		<button
			onClick={onClick}
			className='absolute -bottom-14 left-32 xl:left-[46%] md:left-[44%] xl:-translate-x-1/2 ml-2 text-center py-1 px-3 text-white bg-gray-500 hover:bg-gray-800'
		>
			{'<'}
		</button>
	);
}
function NextArrow({ onClick }) {
	return (
		<button
			onClick={onClick}
			className='absolute -bottom-14 right-28 xl:right-[46%] md:right-[44%] xl:-translate-x-1/2 mr-1 text-center py-1 px-3 text-white bg-gray-500 hover:bg-blue-gray-800'
		>
			{'>'}
		</button>
	);
}

const BookSlider = () => {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return format(date, 'dd MMMM yyyy', { locale: id });
	};

	const { product_id } = useParams();
	const show = useSlideShow();
	const [productDetails, setProductDetails] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getProductDetails = async () => {
			try {
				const data = await fetchProductDetail(product_id);
				const details = [
					{
						title: 'Dimension',
						icon: images?.dimensions,
						value: `${data.dimension} CM`,
					},
					{
						title: 'Shipping Weight',
						icon: images?.weight,
						value: `${data.shippingWeight} KG`,
					},
					{
						title: 'Pages',
						icon: images?.printLength,
						value: data.pages,
					},
					{
						title: 'Language',
						icon: images?.language,
						value: data.language,
					},
					{
						title: 'Grade Level',
						icon: images?.grade,
						value: `${data.gradeLevel} years`,
					},
					{
						title: 'ISBN-13',
						icon: images?.isbnBarcode,
						value: data.isbn,
					},
					{
						title: 'Publisher',
						icon: images?.building,
						value: data.publisher,
					},
					{
						title: 'Publication Date',
						icon: images?.publishDate,
						value: formatDate(data.publicationDate),
					},
					{
						title: 'Age Range',
						icon: images?.ageGroups,
						value: `${data.ageRange} years`,
					},
				];
				setProductDetails(details);
			} catch (error) {
				setError('Error fetching detail product.');
			} finally {
				setLoading(false);
			}
		};

		if (product_id) {
			getProductDetails();
		}
	}, [product_id]);

	const settings = {
		infinite: true,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 2000,
		slidesToShow: show,
		slidesToScroll: 1,
		centerMode: true,
		cssEase: 'linear',
		centerPadding: '0px',
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div
			className='xl:px-[15%] py-0 px-0'
			style={{
				backgroundImage: `url(${images?.mainBg})`,
			}}
		>
			<div className='max-w-screen relative bg-white h-full xl:min-h-[230px]'>
				<Slider {...settings}>
					{productDetails.map((item, idx) => (
						<div
							key={idx}
							className='flex items-center justify-center h-full mx-auto text-sm xl:mt-5'
						>
							<p className='text-center text-black mt-2 mb-1'>
								{item?.title}
							</p>
							<div className='flex justify-center'>
								<img
									key={idx}
									className='m-2 object-fit xl:h-[40px] rounded max-w-full cursor-pointer h-10 w-10'
									src={item?.icon}
								/>
							</div>
							<p className='text-center text-black mt-1'>
								{item?.value}
							</p>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default BookSlider;
