import {
    SEMANTIC_ATTRIBUTE_SENTRY_OP,
    SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
    SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
} from "@sentry/core";
import { startBrowserTracingNavigationSpan } from "@sentry/react";

import { browserTracingIntegration as originalBrowserTracingIntegration } from "@sentry/react";
import type { Client, Integration, TransactionSource } from "@sentry/types";

/**
 * A custom browser tracing integration for Next.js.
 */
export function tanstackRouterBrowserTracingIntegration(
	router: any,
	options: Parameters<typeof originalBrowserTracingIntegration>[0] = {}
): Integration {
	const browserTracingIntegrationInstance = originalBrowserTracingIntegration({
		...options,
		instrumentNavigation: false,
		instrumentPageLoad: false,
	});

	const { instrumentPageLoad = true, instrumentNavigation = true } = options;

	return {
		...browserTracingIntegrationInstance,
		afterAllSetup(client) {
			if (instrumentNavigation) {
				tanstackRouterInstrumentNavigation(router, client);
			}

			browserTracingIntegrationInstance.afterAllSetup(client);
		},
	};
}

export function tanstackRouterInstrumentNavigation(router: any, client: Client): void {
	router.history.notify(() => {
		console.log("Notify result");
	});

	router.history.subscribe(() => {
		console.log("Subscribe result");

		let newLocation: string;
		let spanSource: TransactionSource;

		const state = router.state;
		const matches = state.pendingMatches ?? state.matches;
		const length = matches.length;
		const lastMatch = matches[matches.length - 1];
		if (!lastMatch) return;
		const routeId = lastMatch?.routeId;

		newLocation = routeId;
		spanSource = "route";

		console.log(matches);
		console.log(lastMatch);
		console.log("duck");
		console.log(newLocation);
		console.log(spanSource);

		startBrowserTracingNavigationSpan(client, {
			name: newLocation,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "navigation",
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.navigation.tanstack_router.router_instrumentation",
				[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: spanSource,
			},
		});
	});
}
