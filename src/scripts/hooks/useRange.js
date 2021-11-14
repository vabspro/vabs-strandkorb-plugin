import { useState } from "react";
import moment from "moment";
import { useDisabledDates } from "./useDisbaledDates";

export const useRange = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);

	const [currentYear, setCurrentYear] = useState(moment().year());
	const disabledDates = useDisabledDates(currentYear);

	return {
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		startTime,
		setStartTime,
		endTime,
		setEndTime,
		currentYear,
		setCurrentYear,
		disabledDates,
	};
};
