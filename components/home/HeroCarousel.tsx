'use client';

import Autoplay from 'embla-carousel-autoplay';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import hero1 from '@/public/images/hero1.jpg';
import hero2 from '@/public/images/hero2.jpg';
import hero3 from '@/public/images/hero3.jpg';
import hero4 from '@/public/images/hero4.jpg';

const carouselImages = [hero1, hero2, hero3, hero4];

function HeroCarousel() {
	return (
		<div className='hidden lg:block'>
			<Carousel
				plugins={[
					Autoplay({
						delay: 3000, // 2 seconds delay
						stopOnInteraction: true,
						stopOnMouseEnter: true,
					}),
				]}
			>
				<CarouselContent>
					{carouselImages.map((image, index) => (
						<CarouselItem key={index}>
							<Card className='border-none p-0'>
								<CardContent className='p-0'>
									<Image
										src={image}
										alt='hero'
										className='w-full rounded h-[24rem] object-cover'
									/>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* You can add CarouselPrevious and CarouselNext buttons here if needed */}
			</Carousel>
		</div>
	);
}

export default HeroCarousel;
