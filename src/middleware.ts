import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up"],  // Keep existing public routes

  async afterAuth(auth, req, evt) {
    // Handle unauthenticated users
    if (!auth.userId && !auth.isPublicRoute) {
      return Response.redirect(new URL('/sign-in', req.url));
    }

    // Handle admin route protection
    if (req.nextUrl.pathname.startsWith('/admin') || 
        req.nextUrl.pathname.startsWith('/api/admin')) {
      
      // First check if user is authenticated
      if (!auth.userId) {
        return Response.redirect(new URL('/sign-in', req.url));
      }

      // Check if user is admin using environment variable
      if (auth.userId !== process.env.ADMIN_USER_ID) { // Note: Using server-side env variable
        return Response.redirect(new URL('/', req.url));
      }
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};