import ProductsContainer from '@/components/products/ProductsContainer';

type SearchParams = Promise<{
	layout?: string;
	search?: string;
}>;

async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
	const { layout = 'grid', search = '' } = await searchParams;

	return (
		<>
			<ProductsContainer layout={layout} search={search} />
		</>
	);
}

export default ProductsPage;
