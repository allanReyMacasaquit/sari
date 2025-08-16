'use server';

import { revalidatePath } from 'next/cache';
import { getAuthUser } from './auth';

import { renderError } from './errors';
import db from '@/app/utils/db';

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
	const user = await getAuthUser();
	const favorite = await db.favorite.findFirst({
		where: {
			productId,
			clerkId: user.id,
		},
		select: {
			id: true,
		},
	});
	return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
	productId: string;
	favoriteId: string | null;
	pathname: string;
}) => {
	const user = await getAuthUser();
	const { productId, favoriteId, pathname } = prevState;
	try {
		if (favoriteId) {
			await db.favorite.delete({
				where: {
					id: favoriteId,
				},
			});
		} else {
			await db.favorite.create({
				data: {
					productId,
					clerkId: user.id,
				},
			});
		}
		revalidatePath(pathname);
		return { message: favoriteId ? 'Removed from Faves' : 'Added to Faves' };
	} catch (error) {
		return renderError(error);
	}
};

export const fetchUserFavorites = async () => {
	const user = await getAuthUser();
	const favorites = await db.favorite.findMany({
		where: {
			clerkId: user.id,
		},
		include: {
			product: true,
		},
	});
	return favorites;
};
