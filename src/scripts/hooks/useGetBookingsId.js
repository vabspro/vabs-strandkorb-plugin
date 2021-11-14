import { useEffect, useState } from "react";

export const useGetBookingsId = ({ bookings }) => {
	const [ids, setIds] = useState([]);

	useEffect(() => {
		setIds([...bookings.map((b) => b.name)]);
	}, [bookings]);

	return ids;
};
