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
				url: window.location,
			}),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));

		window.alert(
			`Bei diesem Vorgang ist leider ein Fehler aufgetreten: ${error.message}. Unser Administrator wurde informiert. Bitte versucheen Sie es zu einem späteren Zeitpunkt erneut.`
		);
		//window.location = window.location.href;
	} catch (err) {
		console.log(err);
	}
};
