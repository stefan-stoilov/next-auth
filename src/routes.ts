export const AUTH_VERIFICATION = "/auth-new-verification";
export const AUTH_NEW_PASSWORD = "/new-password";

/**
 * A set of routes that are publicly accessible.
 * These routes do not require authentication.
 */
export const publicRoutes = new Set(["/", AUTH_VERIFICATION]);

/**
 * A set of routes that are used for authentication
 * These routes will redirect logged in users to /protected
 */
export const authRoutes = new Set(["/sign-in", "/sign-up", "/auth-error", "/reset-password", "/new-password"]);

/**
 * The prefix for the API authentication routes.
 * Any route starting with this prefix is used for API authentication purposes.
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after successful login.
 */
export const DEFAULT_LOGIN_REDIRECT = "/protected";
