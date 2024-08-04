import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/module/footer';
import Navbar from '../../components/module/navbar';
import images from '../../components/image/imageGalery';
import Stars from '../../components/base/Stars';
import BookInformation from '../../components/module/detail/book-information';
import Button from '../../components/base/Button';
import BookShipping from '../../components/module/detail/book-shipping';
import BookSlider from '../../components/module/detail/book-information/Slider';
import Container from '../../components/module/container';
import FooterDetail from '../../components/module/detail/footer-detail';
import Layout from '../layout';
import { fetchProductDetail } from '../../../services/productService';

export default function DetailBooks() {
	const { product_id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [buyQuantity, setBuyQuantity] = useState(1);
	const categoryBooks = [
		{
			title: 'Customers who bought this also bought',
		},
		{
			title: 'Others items that might interest you',
		},
	];

	useEffect(() => {
		const getProductDetail = async () => {
			try {
				// console.log('fetching product with ID', product_id);
				const data = await fetchProductDetail(product_id);
				// console.log('fetched product data', data);
				setProduct(data);
				
			} catch (error) {
				setError('Error fetching detail product!');
			} finally {
				setLoading(false);
			}
		};
		if (product_id) {
			getProductDetail();
		} else {
			setLoading(false);
			setError('Invalid Product ID');
		}
	}, [product_id]);

	if (loading) {
		return <p>Loading ...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	const book = {
		image: images?.dummyBook,
		title: 'The Elemental Oracle: Alchemy Science Magic',
		author: [
			{
				name: 'DeMarco, Stacey',
				role: 'Author',
			},
			{
				name: 'Britschgi, Kinga',
				role: 'Ilustrator',
			},
		],
		ratings: 3.5,
		price: 20000,
		discount: 0.03,
		description: `Imagine a time when vast helium-fueled airships took the place of aircraft, and where the hunger for adventure and exploration took the human race into stranger places than we ever imagined. The Steampunk Tarot imagines this in an alternate-reality tarot where The Technomage is king, and the Punk Diva is queen. 
    Tumble down the rabbit hole into a construction of technology, machines, retro-art and culture, full of fantastic visions in a time and place that realizes an alternate world to our own. The world of steampunk combines Victoriana, the Gothic, and early invention with a huge dash of imagination and a tremendous sense of style. The Steampunk Tarot is a world apart: a nexus of opulence, innovation and alternate world-views that is reflected in 78 scenes. The 22 major arcana cards are the actors at the heart of the machine, the deos macninae or the gods of the machine.
    Acting as mediators of the Gods of the Machine are the 16 court cards who are the Legates of the Omniverse, or ambassadorial representatives of the Four Leagues, comprising all the skills that maintain the Imperium: they are the movers and shakers--the Commander, Lady, Navigator, and Messenger, or King, Queen, Knight and Page. They oversee the other 40 cards of the minor arcana, who are the elemental worlds of Airships, Engines, Submersibles and Gears, or Swords, Wands, Cups and Coins.
    There are still things to discover and uncover in the Steampunk Imperium. Many new methods of spreading and playing with tarot cards are included, as well as methods of life-navigation by the use of skillful questions. The Steampunk Tarot is an adventurous tarot for the discerning diviner, to be appreciated both by tarot-users and steampunk fans the world over.
    `,
	};
	// ilustrasi point berdasarkan perhitungan dari link (https://www.periplus.com/p/9780804843522/the-steampunk-tarot-wisdom-from-the-gods-of-the-machine-with-cards)
	// case 120.000 mendapatkan 636 point => maka 120.000 / 636 = 188.68 rupiah (1 point pec = rp.188.68)
	// rumus = diskon yang didapatkan / 188.68 => (price * discount) / 188.68

	const descParagraphs = book.description.trim().split('\n').filter(Boolean);

	const point = Math.round((book?.price * book?.discount) / 188.68);

	return (
		<Layout>
			<div
				style={{
					backgroundImage: `url(${images?.mainBg})`,
				}}
			>
				<Navbar />
				<div>
					<div className='min-h-screen py-5 px-2 font-poppins'>
						<BookInformation
							point={point}
							product={product}
							buyQuantity={buyQuantity}
							setBuyQuantity={setBuyQuantity}
						/>
						<div className='block md:hidden'>
							<BookShipping
								product={product}
								buyQuantity={buyQuantity}
								setBuyQuantity={setBuyQuantity}
							/>
						</div>
						<div className='bg-white my-2 min-h-48 px-5 xl:hidden'>
							<BookSlider productId={product_id} />
						</div>
						<div className='hidden xl:block xl:my-1'>
							<BookSlider productId={product_id} />
						</div>
						{categoryBooks?.map((item, i) => (
							<div
								key={i}
								className='mb-3 py-4 xl:py-8 bg-white xl:max-w-[70%] xl:mx-auto'
							>
								<Container
									className={
										'my-4 xl:text-xl xl:w-fit text-orange-400'
									}
									title={item?.title}
									books={item?.listBooks}
								/>
							</div>
						))}
						<FooterDetail title={'Description'}>
							{descParagraphs.map((paragraph, index) => (
								<p
									key={index}
									className='mb-2 text-justify text-sm text-gray-700 px-5'
								>
									{paragraph}
								</p>
							))}
						</FooterDetail>
						<FooterDetail title={'Customer Reviews'}>
							<div className='flex px-5 items-center'>
								<Stars ratings={book?.ratings} />
								<p className='text-sm'>
									({book?.ratings} customer reviews)
								</p>
							</div>
							<p className='px-5 text-sm font-bold'>
								There are no reviews for this product.
							</p>
							<div className='px-5 text-sm mt-4'>
								<p>Share your thoughts with other customers:</p>
								<Button
									className={
										'bg-black/80 text-white mt-1 px-4 py-[7px] hover:bg-orange-400 transition-colors duration-300'
									}
									onClick={() => alert('navigasi ke review')}
								>
									WRITE A CUSTOMER REVIEW
								</Button>
							</div>
						</FooterDetail>
					</div>
					<Footer />
				</div>
			</div>
		</Layout>
	);
}
