import { FaHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

type FavoriteToggleButtonProps = {
	productId: string;
};

export default function FavoriteToggleButton({
	productId,
}: FavoriteToggleButtonProps) {
	return (
		<div className='pt-5'>
			<Button size='icon' variant='outline' className='cursor-pointer'>
				<FaHeart />
				<div className='hidden'>{productId}</div>
			</Button>
		</div>
	);
}
