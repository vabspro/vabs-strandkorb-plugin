import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";
import moment from "moment";
export const useBookings = ({ startDate, endDate, onFetchStart, onFetchEnd }) => {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		if (startDate || endDate) {
			(async () => {
				console.log("fetching bookings");
				onFetchStart();
				const response = await fetchDataAsync({
					action: `/bookings/?startDate=${startDate}&endDate=${endDate ? endDate : startDate}`,
					data: null,
				});

				const mapped = response.map((booking) => {
					let start = moment(booking.dateFrom.split(" ")[0]);
					const end = moment(booking.dateTo.split(" ")[0]);
					const range = [];
					while (start <= end) {
						range.push(start.format("YYYY-MM-DD"));
						start.add(1, "days");
					}

					return {
						...booking,
						range,
					};
				});
				setBookings(mapped);
				onFetchEnd();
			})();
		}
	}, [startDate, endDate]);

	return bookings;
};
