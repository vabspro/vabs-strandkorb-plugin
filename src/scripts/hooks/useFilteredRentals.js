import { useState, useEffect } from "react";
import { groupBy } from "../utils/groupBy";
import { objReverse } from "../utils/objReverse";

// dynamic order and grouping
const beachRows = {
	3: "Düne",
	2: "Mitte",
	1: "Wasser",
};

export const useFilteredRentals = ({ beachChairs, layer }) => {
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		if (beachChairs.length) {
			const filtered = beachChairs.filter((rental) => rental.beachChairLocationId === layer.id);
			let grouped = groupBy(filtered, "beachRowNumber");

			let sorted = {};
			Object.keys(grouped).forEach((key) => {
				sorted[beachRows[key]] = grouped[key];
			});

			//sorted = objReverse(sorted);
			setFiltered(sorted);
		}
	}, [beachChairs, layer]);

	return filtered;
};
