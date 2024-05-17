import { ErrorComponent, ErrorComponentProps, Link, createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { fetchPost } from "../posts";

export const Route = createFileRoute("/posts/$postId")({
	loader: async ({ params: { postId } }) => fetchPost(postId),
	errorComponent: PostErrorComponent as any,
	notFoundComponent: () => {
		return <p>Post not found</p>;
	},
	component: PostComponent,
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
	return <ErrorComponent error={error} />;
}

function PostComponent() {
	const post = Route.useLoaderData();

	return (
		<div className="space-y-2">
			<h4 className="text-xl font-bold underline">{post.title}</h4>
			<div className="text-sm">{post.body}</div>
			<button onClick={() => missingFnBoom()}></button>
			<Link
				to="/posts/$postId/deep"
				params={{
					postId: post.id,
				}}
				activeProps={{ className: "text-black font-bold" }}
				className="block py-1 text-blue-800 hover:text-blue-600">
				Deep View
			</Link>
		</div>
	);
}
