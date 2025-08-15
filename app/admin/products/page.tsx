import EmptyList from '@/components/global/EmptyList';
import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import DeleteProductButton, { IconButton } from '@/components/form/Buttons';
import { fetchAdminProducts } from '@/app/utils/products';

async function AdminProductsPage() {
	const items = await fetchAdminProducts();
	if (items.length === 0) return <EmptyList />;
	return (
		<section>
			<Table>
				<TableCaption className='capitalize'>
					total products : {items.length}
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Product Name</TableHead>
						<TableHead>Company</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items.map((item) => {
						const { id: productId, name, company, price } = item;
						return (
							<TableRow key={productId}>
								<TableCell>
									<Link
										href={`/products/${productId}`}
										className='underline text-muted-foreground tracking-wide capitalize'
									>
										{name}
									</Link>
								</TableCell>
								<TableCell>{company}</TableCell>
								<TableCell>{formatCurrency(price)}</TableCell>

								<TableCell className='flex items-center gap-x-2'>
									<Link href={`/admin/products/${productId}/edit`}>
										<IconButton actionType='edit'></IconButton>
									</Link>
									<DeleteProductButton productId={productId} />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</section>
	);
}

export default AdminProductsPage;
