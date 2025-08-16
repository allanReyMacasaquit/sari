import { createClient } from '@supabase/supabase-js';

const bucket = 'image_bucket';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	process.env.SUPABASE_URL as string,
	process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
	const timestamp = Date.now();
	// const newName = `/users/${timestamp}-${image.name}`;
	const newName = `${timestamp}-${image.name}`;

	const { data } = await supabase.storage.from(bucket).upload(newName, image, {
		cacheControl: '3600',
	});
	if (!data) throw new Error('Image upload failed');
	return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = (url: string) => {
	// Build bucket public URL base
	const bucketBaseUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/`;

	// Ensure we decode any %20, %xx encoding in file names
	const decodedUrl = decodeURIComponent(url);

	// Get only the path inside the bucket
	const relativePath = decodedUrl.replace(bucketBaseUrl, '');

	if (!relativePath) throw new Error('Invalid URL');

	return supabase.storage.from(bucket).remove([relativePath]);
};
