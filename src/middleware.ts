import { auth } from "@/auth";

export default auth(req => {
  if (!req.auth && req.nextUrl.pathname === "/protected") {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
