import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const useSelectedRentals = ({ startDate, endDate, startTime, endTime, shouldFetch }) => {
	const [selectedRentals, setSelectedRentals] = useState([]);

	const updateSelectedRentals = async (item) => {
		if (shouldFetch) {
			if (selectedRentals.length && selectedRentals.find((selectedItem) => selectedItem === item)) {
				setSelectedRentals([...selectedRentals.filter((selectedItem) => selectedItem !== item)]);
			} else {
				const price = await fetchDataAsync({
					action: "/price",
					data: {
						id: item.id,
						startDate,
						endDate,
						startTime,
						endTime,
					},
				});
				setSelectedRentals([
					...selectedRentals,
					{
						...item,
						price,
					},
				]);
			}
		}
	};

	return { selectedRentals, setSelectedRentals, updateSelectedRentals };
};
