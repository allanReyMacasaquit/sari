import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

function Logo() {
	return (
		<Button size='icon' asChild>
			<Link href='/'>
				<Image src='/images/logo.svg' alt='Logo' width={100} height={100} />
			</Link>
		</Button>
	);
}

export default Logo;
