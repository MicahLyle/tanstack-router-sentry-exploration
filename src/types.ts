// Types for @tanstack/react-router >= 1.32.13

export interface TanstackRouter {
	history: TanstackRouterHistory;
	state: TanstackRouterState;
}

export interface TanstackRouterHistory {
	subscribe: (cb: () => void) => () => void;
}

export interface TanstackRouterState {
	matches: Array<TanstackRouterRouteMatch>;
	pendingMatches?: Array<TanstackRouterRouteMatch>;
}

export interface TanstackRouterRouteMatch {
	routeId: string;
	pathname: string;
	params: { [key: string]: string };
	status: "pending" | "success" | "error" | "redirected" | "notFound";
	isFetching: false | "beforeLoad" | "loader";
	error: unknown;
	cause: "preload" | "enter" | "stay";
	preload: boolean;
	invalid: boolean;
}
