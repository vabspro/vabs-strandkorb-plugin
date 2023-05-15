import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";
import moment from "moment";

function useVacancy({ disabledDates, rentals, bookings, locations, startDate, endDate }) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const fetchVacancyDataAsync = async () => {
		const response = await fetchDataAsync({
			action: "/vacancy",
			data: {
				startDate,
				endDate,
			},
		});
		setData(response);
	};

	const availableChairs = () => {
		if (rentals && disabledDates && bookings && locations && startDate && endDate) {
			const rentalsCurrentlyDisabled = rentals
				.filter((r) => {
					const chairLocation = locations.find((l) => l.id === r.beachChairLocationId);
					if (chairLocation.seasonFrom !== "" && chairLocation.seasonTo !== "") {
						const seasonFrom = moment(chairLocation.seasonFrom).unix();
						const seasonTo = moment(chairLocation.seasonTo).unix();

						const start = moment(startDate).unix();
						const end = moment(endDate).unix();
						return start >= seasonFrom && end <= seasonTo;
					} else {
						return true;
					}
				})
				.filter((r) => r.online)
				.filter((r) => {
					if (disabledDates[r.id]) {
						return (
							disabledDates[r.id].filter(
								(arrayOfDates) => arrayOfDates.includes(startDate) || arrayOfDates.includes(endDate)
							).length === 0
						);
					} else {
						return true;
					}
				})
				.filter((r) => {
					const isBooked = bookings ? bookings.filter((b) => b.id === r.id).length > 0 : false;
					return !isBooked;
				});
			return rentalsCurrentlyDisabled.length == 0;
		}
	};

	useEffect(() => {
		if (availableChairs() > 0 && startDate && endDate) {
			fetchVacancyDataAsync();
		} else {
			setData(null);
		}
	}, [startDate, endDate, bookings, disabledDates, rentals, locations]);

	return { data, error };
}

export default useVacancy;
