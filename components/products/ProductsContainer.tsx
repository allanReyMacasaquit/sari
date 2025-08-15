import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import Link from 'next/link';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { Suspense } from 'react';
import LoadingContainer from '../global/LoadingContainer';
import ProductsListSkeleton from '../global/ProductsListSkeleton';
import { fetchAllProducts } from '@/app/utils/products';

type ProductsContainerProps = {
	layout: string;
	search: string;
};

export default async function ProductsContainer({
	layout,
	search,
}: ProductsContainerProps) {
	const products = await fetchAllProducts({ search }); // Should return Product[] if typed
	const totalProducts = products.length;
	const searchTerm = search ? `&search=${search}` : '';

	return (
		<>
			{/* HEADER */}
			<section>
				<div className='flex justify-between items-center'>
					<h4 className='font-medium text-lg'>
						{totalProducts} product{totalProducts > 1 && 's'}
					</h4>
					<div className='gap-x-4 hidden md:flex'>
						<Button
							variant={layout === 'grid' ? 'default' : 'ghost'}
							size='icon'
							asChild
						>
							<Link href={`/products?layout=grid${searchTerm}`}>
								<LuLayoutGrid />
							</Link>
						</Button>
						<Button
							variant={layout === 'list' ? 'default' : 'ghost'}
							size='icon'
							asChild
						>
							<Link href={`/products?layout=list${searchTerm}`}>
								<LuList />
							</Link>
						</Button>
					</div>
				</div>
				<Separator className='mt-4' />
			</section>

			{/* PRODUCTS */}
			<div>
				{totalProducts === 0 ? (
					<h5 className='text-2xl mt-16'>
						Sorry, no products matched your search...
					</h5>
				) : layout === 'grid' ? (
					<Suspense fallback={<LoadingContainer />}>
						<ProductsGrid products={products} />
					</Suspense>
				) : (
					<Suspense fallback={<ProductsListSkeleton />}>
						<ProductsList products={products} />
					</Suspense>
				)}
			</div>
		</>
	);
}
