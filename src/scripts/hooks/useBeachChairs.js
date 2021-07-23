import { useEffect, useState } from "react";

export const useBeachChairs = (bookables) => {
	const [response, setResponse] = useState([]);

	useEffect(() => {
		if (bookables) {
			setResponse(bookables.filter((r) => !r.isBuggy));
		}
	}, [bookables]);

	return response;
};
