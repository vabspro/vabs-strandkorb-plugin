export const useErrorHandler = async (error) => {
	try {
		const response = await fetch(`${location.origin}/wp-json/app/v1/errorhandling`, {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
			body: JSON.stringify({
				...error,
				dateTime: new Date(),
				userAgent: window.navigator.userAgent,
			}),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));

		//window.alert(error.message);
		//window.location = window.location.href;
	} catch (err) {
		console.log(err);
	}
};
