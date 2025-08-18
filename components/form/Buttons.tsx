'use client';

import { useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { ReloadIcon } from '@radix-ui/react-icons';
import { LucidePenSquare } from 'lucide-react';
import { LuTrash2 } from 'react-icons/lu';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { deleteProductAction } from '@/app/utils/actions';
import { SignInButton } from '@clerk/nextjs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type BtnSize = 'default' | 'lg' | 'sm';
type ActionType = 'edit' | 'delete';

type SubmitButtonProps = {
	className?: string;
	text?: string;
	size?: BtnSize;
};

export function SubmitButton({
	className = '',
	text = 'submit',
	size = 'lg',
}: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button
			type='submit'
			disabled={pending}
			className={cn('capitalize', className)}
			size={size}
		>
			{pending ? (
				<>
					<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
					Please wait...
				</>
			) : (
				text
			)}
		</Button>
	);
}

export const IconButton = ({
	actionType,
	onClick,
	disabled,
}: {
	actionType: ActionType;
	onClick?: () => void;
	disabled?: boolean;
}) => {
	const { pending } = useFormStatus();

	const renderIcon = () => {
		switch (actionType) {
			case 'edit':
				return <LucidePenSquare />;
			case 'delete':
				return <LuTrash2 />;
			default: {
				const never: never = actionType;
				throw new Error(`Invalid action type: ${never}`);
			}
		}
	};

	return (
		<Button
			type='submit'
			size='icon'
			variant='link'
			className='p-2 cursor-pointer'
			onClick={onClick}
			disabled={pending || disabled}
		>
			{pending ? <ReloadIcon className='animate-spin' /> : renderIcon()}
		</Button>
	);
};

export default function DeleteProductButton({
	productId,
}: {
	productId: string;
}) {
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		startTransition(async () => {
			const result = await deleteProductAction({ productId });
			if (result?.message) {
				toast.success(result.message);
			}
		});
	};

	return (
		<IconButton
			actionType='delete'
			onClick={handleDelete}
			disabled={isPending}
		/>
	);
}

export const CardSignInButton = () => {
	return (
		<SignInButton mode='modal'>
			<Button
				type='button'
				size='icon'
				variant='outline'
				className='p-2 cursor-pointer'
				asChild
			>
				<FaRegHeart />
			</Button>
		</SignInButton>
	);
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
	const { pending } = useFormStatus();
	return (
		<Button
			type='submit'
			size='icon'
			variant='outline'
			className='cursor-pointer rounded-full'
		>
			{pending ? (
				<ReloadIcon className='animate-spin size-5' />
			) : isFavorite ? (
				<FaHeart className='text-red-500 size-5' />
			) : (
				<FaRegHeart className='size-5' />
			)}
		</Button>
	);
};

export const ProductSignInButton = () => {
	return (
		<SignInButton mode='modal'>
			<Button type='button' size='default' className='mt-8'>
				Please Sign In
			</Button>
		</SignInButton>
	);
};
