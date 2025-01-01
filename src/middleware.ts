import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Add public routes here if needed
  publicRoutes: ["/"]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};