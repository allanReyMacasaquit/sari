'use client';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { toast } from 'sonner';

function ImageInput() {
	const name = 'image';

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const maxSizeMB = 1; // Max size same as Next.js Server Action default
		if (file.size > maxSizeMB * 1024 * 1024) {
			toast(`File is too large! Max allowed size is ${maxSizeMB} MB.`);
			e.target.value = ''; // reset the file input
		}
	};
	return (
		<div className='mb-2'>
			<Label htmlFor={name} className='capitalize'>
				Image
			</Label>
			<Input
				id={name}
				name={name}
				type='file'
				required
				accept='image/*'
				onChange={handleFileChange}
			/>
		</div>
	);
}
export default ImageInput;
