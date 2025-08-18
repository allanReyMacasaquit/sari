'use server';

import { getAdminUser, getAuthUser } from './auth';
import { fetchOrCreateCart } from './cart';
import db from '@/app/utils/db';
import { renderError } from './errors';
import { redirect } from 'next/navigation';

export const createOrderAction = async (
	prevState: unknown,
	formData: FormData
) => {
	const user = await getAuthUser();
	try {
		const cart = await fetchOrCreateCart({
			userId: user.id,
			errorOnFailure: true,
		});
		const order = await db.order.create({
			data: {
				clerkId: user.id,
				products: cart.numItemsInCart,
				orderTotal: cart.orderTotal,
				tax: cart.tax,
				shipping: cart.shipping,
				email: user.emailAddresses[0].emailAddress,
				isPaid: true,
			},
		});

		await db.cart.delete({
			where: {
				id: cart.id,
			},
		});
	} catch (error) {
		return renderError(error);
	}
	redirect('/orders');
};
export const fetchUserOrders = async () => {
	const user = await getAuthUser();
	const orders = await db.order.findMany({
		where: {
			clerkId: user.id,
			isPaid: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return orders;
};

export const fetchAdminOrders = async () => {
	await getAdminUser();

	const orders = await db.order.findMany({
		where: {
			isPaid: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return orders;
};
