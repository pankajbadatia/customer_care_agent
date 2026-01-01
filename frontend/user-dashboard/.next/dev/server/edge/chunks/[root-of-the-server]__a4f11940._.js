(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__a4f11940._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/frontend/user-dashboard/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$user$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/user-dashboard/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$user$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/user-dashboard/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
const USER_ACCESS_COOKIE = "csacp_user_access_token";
const PUBLIC_ROUTES = [
    "/login",
    "/register",
    "/forgot-password"
];
function middleware(req) {
    const { pathname } = req.nextUrl;
    // allow static & Next internals
    if (pathname.startsWith("/_next") || pathname.startsWith("/static") || pathname.startsWith("/images") || pathname === "/favicon.ico") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$user$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // allow public pages
    if (PUBLIC_ROUTES.some((r)=>pathname.startsWith(r))) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$user$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const hasUserToken = req.cookies.has(USER_ACCESS_COOKIE);
    // Not logged in → redirect BEFORE page loads
    if (!hasUserToken) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$user$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$user$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/((?!api).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__a4f11940._.js.map