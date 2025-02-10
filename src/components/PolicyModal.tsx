import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up"],
  async afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return Response.redirect(new URL('/sign-in', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/admin') || 
        req.nextUrl.pathname.startsWith('/api/admin')) {
      
      if (!auth.userId) {
        return Response.redirect(new URL('/sign-in', req.url));
      }

      if (auth.userId !== process.env.ADMIN_USER_ID) {
        return Response.redirect(new URL('/', req.url));
      }
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};