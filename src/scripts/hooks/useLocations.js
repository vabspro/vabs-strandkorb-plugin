import { useEffect, useState } from "react";

import { useErrorHandler } from "./useErrorHandler";
import moment from "moment";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const useLocations = ({ date, callback, shouldFetch }) => {
	const [locations, setLocations] = useState([]);

	const fetchRentalsAsync = async () => {
		const response = await fetchDataAsync({ action: "/locations", data: null });
		setLocations(response);
	};

	useEffect(() => {
		if (shouldFetch) {
			if (locations && date) {
				const year = moment(date).year();
				const newLocations = locations.map((loca) => {
					const l = {
						...loca,
						seasonFrom: loca.seasonFrom
							? moment(loca.seasonFrom).set("year", year).format("YYYY-MM-DD")
							: "",
						seasonTo: loca.seasonTo ? moment(loca.seasonTo).set("year", year).format("YYYY-MM-DD") : "",
					};

					return {
						...l,
						online:
							l.seasonFrom !== ""
								? moment(date).isBetween(l.seasonFrom, l.seasonTo, undefined, "[]")
								: true,
					};
				});
				setLocations(newLocations);
			} else {
				fetchRentalsAsync();
			}
			callback();
		}
	}, [date]);

	return locations;
};
