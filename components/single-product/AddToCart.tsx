import { Button } from '../ui/button';

function AddToCart({ productId }: { productId: string }) {
	return (
		<Button className='capitalize mt-8' size='lg'>
			add to cart
			<div className='hidden'>{productId}</div>
		</Button>
	);
}
export default AddToCart;
