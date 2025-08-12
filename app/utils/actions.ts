import db from '@/app/utils/db';

export const fetchFeaturedProducts = async () => {
	const products = await db.product.findMany({
		where: {
			featured: true,
		},
	});
	return products;
};

type AllProductsProps = {
	search?: string;
};

export const fetchAllProducts = ({ search = '' }: AllProductsProps = {}) => {
	return db.product.findMany({
		where: {
			OR: [
				{ name: { contains: search, mode: 'insensitive' } },
				{ company: { contains: search, mode: 'insensitive' } },
			],
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};

import { redirect } from 'next/navigation';

export const fetchSingleProduct = async (productId: string) => {
	const product = await db.product.findUnique({
		where: {
			id: productId,
		},
	});
	if (!product) {
		redirect('/products');
	}
	return product;
};
