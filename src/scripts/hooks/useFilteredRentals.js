import { useState, useEffect } from "react";
import { groupBy } from "../utils/groupBy";
import { objReverse } from "../utils/objReverse";

const beachRows = {
	1: "Düne",
	2: "Mitte",
	3: "Wasser",
};

export const useFilteredRentals = ({ beachChairs, layer }) => {
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		if (beachChairs.length) {
			const filtered = beachChairs.filter((rental) => rental.beachChairLocationId === layer.id);
			let grouped = groupBy(filtered, "beachRow");

			let sorted = {};
			Object.keys(grouped).forEach((key) => {
				sorted[beachRows[key]] = grouped[key];
			});

			sorted = objReverse(sorted);
			setFiltered(sorted);
		}
	}, [beachChairs, layer]);

	return filtered;
};
