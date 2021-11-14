import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const useBookables = ({ onFetchStart, onFetchEnd, shouldFetch }) => {
	const [bookables, setBookables] = useState([]);

	useEffect(() => {
		if (shouldFetch) {
			(async () => {
				onFetchStart();
				const response = await fetchDataAsync({ action: "/rentals", data: null });
				setBookables(response);
				onFetchEnd();
			})();
		}
	}, []);

	return bookables;
};
