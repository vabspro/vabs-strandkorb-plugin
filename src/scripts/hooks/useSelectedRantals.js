import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const useSelectedRentals = ({ startDate, endDate, startTime, endTime, shouldFetch }) => {
	const [selectedRentals, setSelectedRentals] = useState([]);
	const [selectedRentalsMessage, setSelectedRentalsMessage] = useState(null);

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

	useEffect(() => {
		if (selectedRentals.length) {
			setSelectedRentals([]);
			setSelectedRentalsMessage("Bitte wähle deine Strandkörbe passend zum neuen Zeitraum aus.");
		}
	}, [startDate, endDate]);

	return { selectedRentals, setSelectedRentals, updateSelectedRentals, selectedRentalsMessage };
};
