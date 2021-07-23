import { useState, useEffect } from "react";
import moment from "moment";

export const useDisabledDates = (year) => {
	const [firstHalf, setFirstHalf] = useState([]);
	const [secondHalf, setSecondHalf] = useState([]);

	const getDatesBetween = ({ start, end }) => {
		const response = [];
		while (start <= end) {
			response.push(start.format("DD.MM.YYYY"));
			start.add(1, "days");
		}
		return response;
	};

	useEffect(() => {
		if (year) {
			const startOfYear = moment().year(year).startOf("year");
			const endOfYear = moment().year(year).endOf("year");
			const firstAvailableDate = moment(`${year}-03-15`) < moment() ? moment() : moment(`${year}-03-15`);
			const lastAvailableDate = moment(`${year}-10-31`);

			setFirstHalf(getDatesBetween({ start: startOfYear, end: firstAvailableDate }));
			setSecondHalf(getDatesBetween({ start: lastAvailableDate, end: endOfYear }));
		}
	}, [year]);

	return [...firstHalf, ...secondHalf];
};
