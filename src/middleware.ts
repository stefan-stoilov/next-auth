import { auth } from "@/auth";
import { authRoutes, publicRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.has(nextUrl.pathname);
  const isPublicRoute = publicRoutes.has(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }

  return;
  // if (!req.auth && req.nextUrl.pathname === "/protected") {
  //   const newUrl = new URL("/sign-in", req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }
});

/**
 * This matcher configuration for NextJS middleware is recommended by clerk auth provider.
 * @see https://clerk.com/docs/references/nextjs/auth-middleware#usage
 */
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
