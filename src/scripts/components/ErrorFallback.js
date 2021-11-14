import React from "react";

export default function ErrorFallback({ error }) {
	return (
		<div className="notification">
			<h2>Something went wrong.</h2>

			<pre>{JSON.stringify(error)}</pre>
		</div>
	);
}
