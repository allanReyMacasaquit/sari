'use server';

import { getAdminUser, getAuthUser } from './auth';
import { fetchOrCreateCart } from './cart';
import db from '@/app/utils/db';
import { renderError } from './errors';
import { redirect } from 'next/navigation';

export const createOrderAction = async () => {
	const user = await getAuthUser();
	let orderId: null | string = null;
	let cartId: null | string = null;
	try {
		const cart = await fetchOrCreateCart({
			userId: user.id,
			errorOnFailure: true,
		});
		cartId = cart.id;
		await db.order.deleteMany({
			where: {
				clerkId: user.id,
				isPaid: false,
			},
		});

		const order = await db.order.create({
			data: {
				clerkId: user.id,
				products: cart.numItemsInCart,
				orderTotal: cart.orderTotal,
				tax: cart.tax,
				shipping: cart.shipping,
				email: user.emailAddresses[0].emailAddress,
			},
		});
		orderId = order.id;
	} catch (error) {
		return renderError(error);
	}
	redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
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
