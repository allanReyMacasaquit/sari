import ProductsGrid from '../products/ProductsGrid';
import SectionTitle from '../global/SectionTitle';
import EmptyList from '../global/EmptyList';
import { fetchFeaturedProducts } from '@/app/utils/products';
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
