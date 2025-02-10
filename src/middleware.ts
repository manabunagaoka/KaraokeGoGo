import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Keep your existing public routes configuration
  publicRoutes: ["/sign-in", "/sign-up"],

  async afterAuth(auth, req, evt) {
    // Get the forwarded host from GitHub Codespaces
    const forwardedHost = req.headers.get("x-forwarded-host");
    const protocol = "https"; // GitHub Codespaces uses HTTPS
    const baseUrl = `${protocol}://${forwardedHost || req.headers.get("host")}`;

    // Handle policy page access
    if (req.nextUrl.pathname === '/policy') {
      if (!auth.userId) {
        return Response.redirect(`${baseUrl}/sign-up`);
      }
      return;
    }

    // Handle unauthenticated users
    if (!auth.userId && !auth.isPublicRoute) {
      return Response.redirect(`${baseUrl}/sign-in`);
    }

    // Check for policy agreement for authenticated users
    const policyAgreed = req.cookies.get('policyAgreed')?.value;
    if (auth.userId && !policyAgreed && 
        !req.nextUrl.pathname.startsWith('/sign-in') && 
        !req.nextUrl.pathname.startsWith('/sign-up') && 
        req.nextUrl.pathname !== '/policy') {
      return Response.redirect(`${baseUrl}/policy`);
    }

    // Handle admin route protection
    if (req.nextUrl.pathname.startsWith('/admin') || 
        req.nextUrl.pathname.startsWith('/api/admin')) {
      
      if (!auth.userId) {
        return Response.redirect(`${baseUrl}/sign-in`);
      }

      if (auth.userId !== process.env.ADMIN_USER_ID) {
        return Response.redirect(`${baseUrl}/`);
      }
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};