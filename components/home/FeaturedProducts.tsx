import { fetchFeaturedProducts } from '@/app/utils/actions';

import ProductsGrid from '../products/ProductsGrid';
import SectionTitle from '../global/SectionTitle';
import EmptyList from '../global/EmptyList';
async function FeaturedProducts() {
	const products = await fetchFeaturedProducts();
	if (products.length === 0) return <EmptyList />;
	return (
		<section className='pt-24'>
			<SectionTitle text='featured products' />
			<ProductsGrid products={products} />
		</section>
	);
}
export default FeaturedProducts;
