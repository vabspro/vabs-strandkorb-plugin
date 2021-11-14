import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const usePrices = ({ selectedRentals, startDate, endDate, startTime, endTime }) => {
	const [prices, setPrices] = useState([]);
	useEffect(() => {
		if (selectedRentals && selectedRentals.length) {
			(async () => {
				const response = [];
				for (let index = 0; index < selectedRentals.length; index++) {
					const element = selectedRentals[index];
					const price = await fetchDataAsync({
						action: "/price",
						data: {
							id: element.id,
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
