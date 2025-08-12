import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { LucideUser2 } from 'lucide-react';
async function UserIcon() {
	const user = await currentUser();
	const profileImage = user?.imageUrl;
	if (profileImage)
		return (
			<Image
				src={profileImage}
				height={100}
				width={100}
				alt='Image'
				className='size-6 rounded-full object-cover'
			/>
		);
	return <LucideUser2 className='size-6 bg-primary rounded-full text-white' />;
}
export default UserIcon;
