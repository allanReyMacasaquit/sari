'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import db from '@/app/utils/db';
import { getAuthUser, getAdminUser } from '@/app/utils/auth';
import { renderError } from '@/app/utils/errors';
import {
	imageSchema,
	productSchema,
	validateWithZodSchema,
} from '@/app/utils/schemas';
import { deleteImage, uploadImage } from '@/app/utils/supabase';

export type actionFunction = (
	prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
	formData: FormData
) => Promise<{ message: string }>;

export const createProductAction = async (
	prevState: unknown,
	formData: FormData
): Promise<{ message: string }> => {
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

export const deleteProductAction = async (prevState: { productId: string }) => {
	const { productId } = prevState;
	await getAdminUser();
	try {
		const product = await db.product.delete({
			where: {
				id: productId,
			},
		});
		await deleteImage(product.image);
		revalidatePath('/admin/products');
		return { message: 'product removed' };
	} catch (error) {
		return renderError(error);
	}
};

export const updateProductAction = async (
	prevState: unknown,
	formData: FormData
) => {
	await getAdminUser();
	try {
		const productId = formData.get('id') as string;
		const rawData = Object.fromEntries(formData);

		const validatedFields = validateWithZodSchema(productSchema, rawData);

		await db.product.update({
			where: {
				id: productId,
			},
			data: {
				...validatedFields,
			},
		});
		revalidatePath(`/admin/products/${productId}/edit`);
		return { message: 'Product updated successfully' };
	} catch (error) {
		return renderError(error);
	}
};

export const updateProductImageAction = async (
	prevState: unknown,
	formData: FormData
) => {
	await getAuthUser();
	try {
		const image = formData.get('image') as File;
		const productId = formData.get('id') as string;
		const oldImageUrl = formData.get('url') as string;

		const validatedFile = validateWithZodSchema(imageSchema, { image });
		const fullPath = await uploadImage(validatedFile.image);
		await deleteImage(oldImageUrl);
		await db.product.update({
			where: {
				id: productId,
			},
			data: {
				image: fullPath,
			},
		});
		revalidatePath(`/admin/products/${productId}/edit`);
		return { message: 'Product Image updated successfully' };
	} catch (error) {
		return renderError(error);
	}
};
