import { useEffect, useState } from "react";
import moment from "moment";

export const useCalendar = ({ month }) => {
	const [days, setDays] = useState([]);

	useEffect(() => {
		const array = [];
		let firstDayOfMonth = moment(month).startOf("month");
		let lastDayOfMonth = moment(month).endOf("month");

		while (firstDayOfMonth < lastDayOfMonth) {
			array.push(firstDayOfMonth.format("YYYY-MM-DD"));
			firstDayOfMonth = firstDayOfMonth.add(1, "days");
		}

		setDays(array);
	}, [month]);
	return days;
};
