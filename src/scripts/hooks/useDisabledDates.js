import { useEffect, useState } from "react";
import moment from "moment";

export const useDisabledDates = ({ rentals }) => {
	const [disabledDates, setDisabledDates] = useState({});

	useEffect(() => {
		if (rentals) {
			const arr = {};
			rentals.forEach((chair) => {
				const dates = chair.beachChairBlockedDates ? chair.beachChairBlockedDates.split(",") : null;
				const response =
					dates &&
					dates.map((date) => {
						const array = [];
						const start = moment(date.split("#")[0]);
						const end = moment(date.split("#")[1]);

						while (start <= end) {
							array.push(start.format("YYYY-MM-DD"));
							start.add(1, "days");
						}
						return array;
					});

				arr[chair.id] = response;
			});

			setDisabledDates(arr);
		}
	}, [rentals]);

	return { disabledDates };
};
