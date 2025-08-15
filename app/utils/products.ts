'use server';

import { redirect } from 'next/navigation';
import db from '@/app/utils/db';
import { getAdminUser } from '@/app/utils/auth';

type AllProductsProps = {
	search?: string;
};

export const fetchFeaturedProducts = async () => {
	return db.product.findMany({
		where: { featured: true },
	});
};

export const fetchAllProducts = async ({
	search = '',
}: AllProductsProps = {}) => {
	return db.product.findMany({
		where: {
			OR: [
				{ name: { contains: search, mode: 'insensitive' } },
				{ company: { contains: search, mode: 'insensitive' } },
			],
		},
		orderBy: { createdAt: 'desc' },
	});
};

export const fetchSingleProduct = async (productId: string) => {
	const product = await db.product.findUnique({
		where: { id: productId },
	});
	if (!product) {
		redirect('/products');
	}
	return product;
};

export const fetchAdminProducts = async () => {
	await getAdminUser();
	return db.product.findMany({
		orderBy: { createdAt: 'desc' },
	});
};

export const fetchAdminProductDetails = async (productId: string) => {
	await getAdminUser();
	const product = await db.product.findUnique({
		where: {
			id: productId,
		},
	});
	if (!product) redirect('/admin/products');
	return product;
};
