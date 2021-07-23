import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const usePrices = ({ selectedRentals, startDate, endDate, startTime, endTime }) => {
	const [prices, setPrices] = useState([]);

	useEffect(() => {
		if (selectedRentals.length) {
			(async () => {
				const response = [];
				for (const id in selectedRentals) {
					const price = await fetchDataAsync({
						action: "/price",
						data: {
							id,
							startDate,
							endDate,
							startTime,
							endTime,
						},
					});
					response.push(price);
				}

				setPrices(response);
			})();
		}
	}, [selectedRentals]);

	return prices;
};
