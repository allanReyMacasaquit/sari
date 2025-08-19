'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='w-full max-w-lg mx-auto p-6 border rounded-2xl shadow-md space-y-4'>
			<Skeleton className='h-6 w-3/4 mx-auto' />
			<Skeleton className='h-10 w-full' />
			<Skeleton className='h-10 w-5/6 mx-auto' />
			<Skeleton className='h-14 w-full' />
			<Skeleton className='h-10 w-2/3 mx-auto' />
		</div>
	);
}
