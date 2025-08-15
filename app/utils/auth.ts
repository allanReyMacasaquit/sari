'use server';

import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

export const getAuthUser = async () => {
	const user = await currentUser();
	if (!user) {
		throw new Error('You must be logged in to access this route');
	}
	return user;
};

export const getAdminUser = async () => {
	const user = await getAuthUser();
	if (user.id !== process.env.ADMIN_USER_ID) redirect('/');
	return user;
};
