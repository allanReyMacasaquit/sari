import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsListSkeleton() {
	return (
		<div className='mt-12 grid gap-y-8'>
			{Array.from({ length: 6 }).map((_, i) => (
				<article key={i} className='group relative'>
					<Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
						<CardContent className='p-8 gap-y-4 grid md:grid-cols-3'>
							{/* Image placeholder */}
							<Skeleton className='relative h-64 md:h-48 md:w-48 rounded-md' />

							{/* Title + company placeholder */}
							<div className='space-y-2'>
								<Skeleton className='h-6 w-3/4' />
								<Skeleton className='h-4 w-1/2' />
							</div>

							{/* Price placeholder */}
							<div className='md:ml-auto flex items-start'>
								<Skeleton className='h-5 w-16' />
							</div>
						</CardContent>
					</Card>

					{/* Favorite button placeholder */}
					<div className='absolute bottom-8 right-8'>
						<Skeleton className='h-10 w-10 rounded-full' />
					</div>
				</article>
			))}
		</div>
	);
}
