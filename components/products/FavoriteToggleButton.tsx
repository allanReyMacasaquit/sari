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
			<Button
				size='icon'
				variant='outline'
				className='cursor-pointer bg-gradient-to-br from-pink-500 to-primary border-none'
			>
				<FaHeart />
				<div className='hidden'>{productId}</div>
			</Button>
		</div>
	);
}
