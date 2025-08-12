import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/products(.*)', '/about']);

export default clerkMiddleware(async (auth, req) => {
	if (!isPublicRoute(req)) {
		const sessionAuth = await auth();
		sessionAuth.redirectToSignIn();
	}
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
