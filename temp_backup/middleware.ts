// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Include your full Codespace domain in publicRoutes
  publicRoutes: [
    "/sign-in", 
    "/sign-up", 
    "/",
    "/api(.*)" // Add this if you need public API routes
  ],
  
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      // Add your Codespace URL as trusted
      signInUrl.protocol = 'https:';
      return Response.redirect(signInUrl);
    }
  },

  // Add your Codespace domain to trusted hosts
  trustedOrigins: [
    "fuzzy-computing-machine-jj49x4p5x5fqgwv-3000.app.github.dev"
  ]
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};