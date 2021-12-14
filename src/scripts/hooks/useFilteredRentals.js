import { useState, useEffect } from "react";
import { groupBy } from "../utils/groupBy";
import { objReverse } from "../utils/objReverse";

export const useFilteredRentals = ({ beachChairs, layer }) => {
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		if (beachChairs.length) {
			const filtered = beachChairs.filter((rental) => rental.beachChairLocationId === layer.id);
			let grouped = groupBy(filtered, "beachRowName");
			let sorted = Object.keys(grouped).map((key) => grouped[key].sort((a, b) => a.number < b.number));

			//sorted = objReverse(sorted);
			setFiltered(sorted);
		}
	}, [beachChairs, layer]);

	return filtered;
};
