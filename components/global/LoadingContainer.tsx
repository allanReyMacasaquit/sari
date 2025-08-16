import { Skeleton } from '../ui/skeleton';
import { Card, CardContent } from '../ui/card';

interface LoadingContainerProps {
	count?: number;
}

function LoadingContainer({ count = 6 }: LoadingContainerProps) {
	const placeholders = Array.from({ length: count });

	return (
		<div className='pt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
			{placeholders.map((_, i) => (
				<LoadingProduct key={i} />
			))}
		</div>
	);
}

function LoadingProduct() {
	return (
		<Card className='animate-pulse'>
			<CardContent className='p-4'>
				<Skeleton className='h-48 w-full rounded-md' />
				<Skeleton className='h-4 w-3/4 mt-4 rounded' />
				<Skeleton className='h-4 w-1/4 mt-2 rounded' />
			</CardContent>
		</Card>
	);
}

export default LoadingContainer;
