import { useErrorHandler } from "../hooks/useErrorHandler";

export const fetchDataAsync = async ({ action, data }) => {
	if (!data) {
		return await fetch(`${location.origin}/wp-json/app/v1${action}`)
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					useErrorHandler({
						message: res.error,
						action: action,
					});
				} else {
					return res;
				}
			})
			.catch((err) =>
				useErrorHandler({
					message: err.message,
					action: action,
				})
			);
	}

	return await fetch(`${location.origin}/wp-json/app/v1${action}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.error) {
				useErrorHandler({
					message: res.error,
					action: action,
				});
			} else {
				return res;
			}
		})
		.catch((err) =>
			useErrorHandler({
				message: err.message,
				action: action,
				payload: data,
			})
		);
};
