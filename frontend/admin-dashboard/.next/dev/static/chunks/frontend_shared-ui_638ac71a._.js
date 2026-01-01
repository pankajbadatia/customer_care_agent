(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/shared-ui/theme/tokens.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "themeTokens",
    ()=>themeTokens
]);
const themeTokens = {
    light: {
        // Layout
        background: "#f4f6f8",
        surface: "#ffffff",
        surfaceMuted: "#f8fafc",
        surfaceAlt: "#eef2f6",
        // Borders
        border: "#d6d9e0",
        borderStrong: "#c3c7d0",
        // Text
        textPrimary: "#0b0f19",
        textSecondary: "#4b5565",
        textMuted: "#6b7280",
        // Accent / Brand
        accent: "#2563eb",
        accentSoft: "rgba(37,99,235,.12)",
        accentContrast: "#ffffff",
        // Semantic
        success: "#16a34a",
        warning: "#ca8a04",
        error: "#dc2626"
    },
    dark: {
        // Layout (NOT black — readable slate tones)
        background: "#0b0f19",
        surface: "#0f172a",
        surfaceMuted: "#111b2f",
        surfaceAlt: "#16213a",
        // Borders
        border: "#1f2a44",
        borderStrong: "#2b395c",
        // Text (WCAG-safe)
        textPrimary: "#e5e7eb",
        textSecondary: "#cbd5e1",
        textMuted: "#94a3b8",
        // Accent — bright enough to pop
        accent: "#38bdf8",
        accentSoft: "rgba(56,189,248,.18)",
        accentContrast: "#020617",
        // Semantic
        success: "#4ade80",
        warning: "#facc15",
        error: "#f87171"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/shared-ui/Theme.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/admin-dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/admin-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2d$ui$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/shared-ui/theme/tokens.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    // Load saved preference
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const saved = window.localStorage.getItem("csacp-theme");
            if (saved === "light" || saved === "dark") {
                setMode(saved);
            }
        }
    }["ThemeProvider.useEffect"], []);
    const tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ThemeProvider.useMemo[tokens]": ()=>mode === "light" ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2d$ui$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeTokens"].light : __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2d$ui$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeTokens"].dark
    }["ThemeProvider.useMemo[tokens]"], [
        mode
    ]);
    const applyCssVars = ()=>{
        const r = document.documentElement;
        Object.entries(tokens).forEach(([k, v])=>{
            r.style.setProperty(`--ui-${k}`, v);
        });
        // add body class
        document.body.dataset.theme = mode;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            applyCssVars();
            window.localStorage.setItem("csacp-theme", mode);
        }
    }["ThemeProvider.useEffect"], [
        mode
    ]);
    const value = {
        mode,
        tokens,
        toggleTheme: ()=>setMode((m)=>m === "light" ? "dark" : "light"),
        setTheme: setMode
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: value,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: "100vh",
                background: tokens.background,
                color: tokens.textPrimary,
                fontFamily: "-apple-system,BlinkMacSystemFont,Inter,system-ui,sans-serif"
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/frontend/shared-ui/Theme.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/shared-ui/Theme.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "ZwLg5b89Y7rDOW+2FE96Dgxm7M4=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
}
_s1(useTheme, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_shared-ui_638ac71a._.js.map