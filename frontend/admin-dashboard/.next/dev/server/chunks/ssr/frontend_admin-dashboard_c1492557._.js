module.exports = [
"[project]/frontend/admin-dashboard/app/agent-traces/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00d36829a0a4e41664792ff11774dc3cc08e261e2c":"getAgentTraces","4031681afd29d3735a27b55073ca18a1dee911f5d1":"getAgentTraceDetails"},"",""] */ __turbopack_context__.s([
    "getAgentTraceDetails",
    ()=>getAgentTraceDetails,
    "getAgentTraces",
    ()=>getAgentTraces
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/admin-dashboard/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/admin-dashboard/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
/**
 * Mock trace store (UI-only for now).
 * Replace with API Gateway calls later.
 */ const TRACE_STORE = {
    'trace-001': {
        traceId: 'trace-001',
        agentName: 'root-cause-agent',
        status: 'success',
        startTime: Date.now() - 120_000,
        durationMs: 842,
        costUsd: 0.018,
        model: 'gpt-4o-mini',
        spans: [
            {
                spanId: 'span-1',
                name: 'Agent Initialization',
                startTimeMs: 0,
                durationMs: 42,
                status: 'success'
            },
            {
                spanId: 'span-2',
                name: 'TicketQueryTool',
                startTimeMs: 42,
                durationMs: 180,
                status: 'success',
                attributes: {
                    tool: 'ticket_query_tool',
                    ticketsFetched: 42
                }
            },
            {
                spanId: 'span-3',
                name: 'VectorSearchTool',
                startTimeMs: 222,
                durationMs: 310,
                status: 'success',
                attributes: {
                    tool: 'vector_search_tool',
                    topK: 5
                }
            },
            {
                spanId: 'span-4',
                name: 'LLM Reasoning',
                startTimeMs: 532,
                durationMs: 290,
                status: 'success',
                attributes: {
                    model: 'gpt-4o-mini',
                    tokens: 312
                }
            }
        ]
    },
    'trace-002': {
        traceId: 'trace-002',
        agentName: 'anomaly-agent',
        status: 'failed',
        startTime: Date.now() - 300_000,
        durationMs: 1320,
        costUsd: 0.006,
        model: 'gpt-4o-mini',
        spans: [
            {
                spanId: 'span-1',
                name: 'Agent Initialization',
                startTimeMs: 0,
                durationMs: 38,
                status: 'success'
            },
            {
                spanId: 'span-2',
                name: 'MLPredictionTool',
                startTimeMs: 38,
                durationMs: 214,
                status: 'failed',
                attributes: {
                    error: 'Model timeout'
                }
            }
        ]
    },
    'trace-003': {
        traceId: 'trace-003',
        agentName: 'monitoring-agent',
        status: 'running',
        startTime: Date.now() - 60_000,
        durationMs: 120,
        model: 'gpt-4o-mini',
        spans: [
            {
                spanId: 'span-1',
                name: 'Heartbeat Check',
                startTimeMs: 0,
                durationMs: 120,
                status: 'running'
            }
        ]
    }
};
async function getAgentTraces() {
    return Object.values(TRACE_STORE).map(({ traceId, agentName, status, startTime, durationMs })=>({
            traceId,
            agentName,
            status,
            startTime,
            durationMs
        }));
}
async function getAgentTraceDetails(traceId) {
    const trace = TRACE_STORE[traceId];
    if (!trace) {
        throw new Error(`Trace not found: ${traceId}`);
    }
    return trace;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAgentTraces,
    getAgentTraceDetails
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAgentTraces, "00d36829a0a4e41664792ff11774dc3cc08e261e2c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAgentTraceDetails, "4031681afd29d3735a27b55073ca18a1dee911f5d1", null);
}),
"[project]/frontend/admin-dashboard/.next-internal/server/app/agent-traces/[traceId]/page/actions.js { ACTIONS_MODULE0 => \"[project]/frontend/admin-dashboard/app/agent-traces/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$app$2f$agent$2d$traces$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/admin-dashboard/app/agent-traces/actions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/frontend/admin-dashboard/.next-internal/server/app/agent-traces/[traceId]/page/actions.js { ACTIONS_MODULE0 => \"[project]/frontend/admin-dashboard/app/agent-traces/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00d36829a0a4e41664792ff11774dc3cc08e261e2c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$app$2f$agent$2d$traces$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAgentTraces"],
    "4031681afd29d3735a27b55073ca18a1dee911f5d1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$app$2f$agent$2d$traces$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAgentTraceDetails"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f2e$next$2d$internal$2f$server$2f$app$2f$agent$2d$traces$2f5b$traceId$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$app$2f$agent$2d$traces$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/frontend/admin-dashboard/.next-internal/server/app/agent-traces/[traceId]/page/actions.js { ACTIONS_MODULE0 => "[project]/frontend/admin-dashboard/app/agent-traces/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$admin$2d$dashboard$2f$app$2f$agent$2d$traces$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/admin-dashboard/app/agent-traces/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/frontend/admin-dashboard/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/frontend/admin-dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/frontend/admin-dashboard/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=frontend_admin-dashboard_c1492557._.js.map