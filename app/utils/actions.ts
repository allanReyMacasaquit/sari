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

export type actionFunction = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	prevState: any,
	formData: FormData
) => Promise<{ message: string }>;

import { currentUser } from '@clerk/nextjs/server';
import { imageSchema, productSchema, validateWithZodSchema } from './schemas';
import { uploadImage } from './supabase';

const renderError = (error: unknown): { message: string } => {
	console.log(error);
	return {
		message: error instanceof Error ? error.message : 'An error occurred',
	};
};

const getAuthUser = async () => {
	const user = await currentUser();
	if (!user) {
		throw new Error('You must be logged in to access this route');
	}
	return user;
};

export const createProductAction = async (
	prevState: unknown,
	formData: FormData
): Promise<{ message: string }> => {
	'use server';
	const user = await getAuthUser();

	try {
		const rawData = Object.fromEntries(formData);
		const file = formData.get('image') as File;
		const validatedFields = validateWithZodSchema(productSchema, rawData);
		const validatedFile = validateWithZodSchema(imageSchema, { image: file });

		const fullPath = await uploadImage(validatedFile.image);

		await db.product.create({
			data: {
				...validatedFields,
				image: fullPath,
				clerkId: user.id,
			},
		});
	} catch (error) {
		return renderError(error);
	}
	redirect('/admin/products');
};

const getAdminUser = async () => {
	const user = await getAuthUser();
	if (user.id !== process.env.ADMIN_USER_ID) redirect('/');
	return user;
};

export const fetchAdminProducts = async () => {
	await getAdminUser();
	const products = await db.product.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});
	return products;
};
