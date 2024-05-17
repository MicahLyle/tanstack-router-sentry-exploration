import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/boom")({
	component: BoomComponent,
});

function BoomComponent() {
	return (
		<div className="p-2">
			<h3>About</h3>
			<div>
				<button onClick={() => methodDoesNotExist()}>Break the world</button>;
			</div>
		</div>
	);
}
